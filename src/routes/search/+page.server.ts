import parsedData, { type Student } from "$lib/parsedData";
import type { PageServerLoad } from "./$types";
import { Paginator } from 'pagination-bar-generator';
import fuzzysort from 'fuzzysort';

const PER_PAGE = 36;

// Curated keys, identity first: names + roll/phones outrank
// villages, institutions and paper numbers. Noise keys
// (photo, subject codes, payment dates) are excluded entirely.
const NAME_KEYS = ['name_english', 'name_bangla'];
const PARENT_KEYS = ['father_name_english', 'father_name_bangla', 'mother_name_english', 'mother_name_bangla'];
const ID_KEYS = ['roll', 'mobile_number_student', 'mobile_number_guardian'];
const PLACE_KEYS = ['present_village', 'present_thana', 'present_district', 'permanent_village', 'permanent_thana', 'permanent_district', 'ssc_institution', 'ssc_roll', 'ssc_regno', 'online_birth_reg_no'];
const SEARCH_KEYS = [...NAME_KEYS, ...PARENT_KEYS, ...ID_KEYS, ...PLACE_KEYS];

// Field-specific search rows (fk + fv query pairs). Labels double as the UI options.
const FIELD_GROUPS = [
    {
        label: 'Student',
        fields: [
            { key: 'name_english', label: 'Name (English)' },
            { key: 'name_bangla', label: 'Name (Bangla)' },
            { key: 'roll', label: 'Roll' },
            { key: 'date_of_birth', label: 'Date of birth' },
            { key: 'online_birth_reg_no', label: 'Birth reg. no.' }
        ]
    },
    {
        label: 'Parents',
        fields: [
            { key: 'father_name_english', label: "Father's name (English)" },
            { key: 'father_name_bangla', label: "Father's name (Bangla)" },
            { key: 'mother_name_english', label: "Mother's name (English)" },
            { key: 'mother_name_bangla', label: "Mother's name (Bangla)" }
        ]
    },
    {
        label: 'Contact',
        fields: [
            { key: 'mobile_number_student', label: 'Mobile (student)' },
            { key: 'mobile_number_guardian', label: 'Mobile (guardian)' }
        ]
    },
    {
        label: 'Address',
        fields: [
            { key: 'present_village', label: 'Village (present)' },
            { key: 'present_district', label: 'District (present)' },
            { key: 'permanent_village', label: 'Village (permanent)' },
            { key: 'permanent_district', label: 'District (permanent)' }
        ]
    },
    {
        label: 'SSC',
        fields: [
            { key: 'ssc_institution', label: 'Institution' },
            { key: 'ssc_roll', label: 'Roll' },
            { key: 'ssc_regno', label: 'Registration no.' }
        ]
    }
];
const FIELD_KEYS = FIELD_GROUPS.flatMap((g) => g.fields.map((f) => f.key));

const GROUPS = ['science', 'humanities', 'business_studies'];
const SESSIONS = [...new Set(parsedData.map((s) => s.session))].sort();
const SORTS = ['relevance', 'roll', 'name', 'newest', 'oldest'];

function generatePagination(totalPages: number, currentPage: number) {
    if (totalPages == 0 || currentPage == 0) return [];
    let paginator = Paginator.builder(totalPages).currentPage(currentPage).maxItemCount(7).startSize(1).endSize(1).hasPrev(1).hasNext(1).buildPaginator();
    let r: (number | undefined)[] = [];
    for (const item of paginator.paginate()) {
        //@ts-ignore
        r.push(item.pageNumber)
    }
    return r;
}

const fieldVal = (s: Student, key: string) => String(s[key as keyof Student] ?? '');

export const load: PageServerLoad = async ({ url }) => {
    let q = url.searchParams.get('q')?.trim() || '';
    let group = url.searchParams.get('group') || '';
    if (!GROUPS.includes(group)) group = '';
    let session = url.searchParams.get('session') || '';
    if (!SESSIONS.includes(session)) session = '';
    let sort = url.searchParams.get('sort') || 'relevance';
    if (!SORTS.includes(sort)) sort = 'relevance';

    // Repeatable field rows: fk=name_english&fv=rumi. Unknown keys and blank values are ignored.
    let fkAll = url.searchParams.getAll('fk');
    let fvAll = url.searchParams.getAll('fv');
    let fieldFilters: { key: string; value: string }[] = [];
    for (let i = 0; i < fkAll.length; i++) {
        let v = (fvAll[i] || '').trim();
        if (FIELD_KEYS.includes(fkAll[i]) && v) fieldFilters.push({ key: fkAll[i], value: v });
    }

    let pool = parsedData;
    if (group) pool = pool.filter((s) => s.group == group);
    if (session) pool = pool.filter((s) => s.session == session);

    // Field rows stay strict (the main box is the broad one): any word in the
    // value may substring-match the field; more words matched ranks first.
    const isPhoneKey = (k: string) => k == 'mobile_number_student' || k == 'mobile_number_guardian';
    let scored = pool.map((s) => ({ s, h: 0 }));
    for (const f of fieldFilters) {
        let norm = (v: string) => (isPhoneKey(f.key) ? v.replace(/\D/g, '') : v.toLowerCase());
        let tokens = norm(f.value).split(/\s+/).filter(Boolean);
        let next: typeof scored = [];
        for (const { s, h } of scored) {
            let v = norm(fieldVal(s, f.key));
            let m = tokens.filter((t) => v.includes(t)).length;
            if (m > 0) next.push({ s, h: h + m });
        }
        scored = next;
    }
    if (!q && sort == 'relevance' && fieldFilters.length) scored.sort((a, b) => b.h - a.h);
    pool = scored.map((x) => x.s);

    // Phone fragments match on digits only, so 01XXX-XXX XXX,
    // +880..., 880... and bare local numbers all hit the same student.
    // Only narrows when a phone actually contains the digits, so long-digit
    // queries like birth reg. numbers still fall through to fuzzy search.
    let qDigits = q.replace(/\D/g, '');
    if (qDigits.length >= 7) {
        let tail = qDigits.startsWith('880') ? qDigits.slice(3) : qDigits;
        let phoneHits = pool.filter((s) =>
            [s.mobile_number_student, s.mobile_number_guardian].some(
                (m) => m && m.replace(/\D/g, '').includes(tail)
            )
        );
        if (phoneHits.length) pool = phoneHits;
    }

    let fzSearch = fuzzysort.go(q, pool, {
        keys: SEARCH_KEYS,
        all: true,
        scoreFn: (a) => {
            let at = (i: number) => a[i]?.score ?? -1000;
            let best = (from: number, to: number) => {
                let m = -1000;
                for (let i = from; i < to; i++) m = Math.max(m, at(i));
                return m;
            };
            let n = NAME_KEYS.length;
            let p = PARENT_KEYS.length;
            let d = ID_KEYS.length;
            return Math.max(
                best(0, n) + 30,
                best(n, n + p) + 15,
                best(n + p, n + p + d) + 15,
                best(n + p + d, SEARCH_KEYS.length)
            );
        }
    });
    let finalResult = fzSearch.map(s=>s.obj);

    if (sort == 'roll') finalResult.sort((a, b) => (Number(a.roll) || 0) - (Number(b.roll) || 0) || a.roll.localeCompare(b.roll));
    else if (sort == 'name') finalResult.sort((a, b) => a.name_english.localeCompare(b.name_english));
    else if (sort == 'newest') finalResult.sort((a, b) => +new Date(b.date) - +new Date(a.date));
    else if (sort == 'oldest') finalResult.sort((a, b) => +new Date(a.date) - +new Date(b.date));

    let page = parseInt(url.searchParams.get('page') || '') || 1;
    if (page < 1) page = 1;
    let totalPages = Math.ceil(finalResult.length / PER_PAGE);
    if (page > totalPages) page = totalPages;
    let offset = (page - 1) * PER_PAGE;
    let result = finalResult.slice(offset, offset + PER_PAGE).map(s=>({ id: s.id, roll: s.roll, date: s.date, name: s.name_english, group: s.group, photo: s.photo }))
    let pagination = generatePagination(totalPages, page);

    let params = new URLSearchParams(url.searchParams);
    params.delete('page');
    return { q, group, session, sort, groups: GROUPS, sessions: SESSIONS, fieldFilters, fieldGroups: FIELD_GROUPS, result, pagination, page, total: finalResult.length, qs: params.toString() }
};
