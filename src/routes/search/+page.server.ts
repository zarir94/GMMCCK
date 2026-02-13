import parsedData from "$lib/parsedData";
import type { PageServerLoad } from "./$types";
import { Paginator } from 'pagination-bar-generator';
import fuzzysort from 'fuzzysort';

const PER_PAGE = 36;
const INFO_KEYs = Object.keys(parsedData[0]);

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

export const load: PageServerLoad = async ({ url }) => {
    let q = url.searchParams.get('q')?.trim() || '';
    let page = parseInt(url.searchParams.get('page') || '') || 1;
    if (page < 1) page = 1;
    let fzSearch = fuzzysort.go(q, parsedData, { keys: INFO_KEYs, all: true });
    let finalResult = fzSearch.map(s=>s.obj);
    let totalPages = Math.ceil(finalResult.length / PER_PAGE);
    if (page > totalPages) page = totalPages;
    let offset = (page - 1) * PER_PAGE;
    let result = finalResult.slice(offset, offset + PER_PAGE).map(s=>({ id: s.id, roll: s.roll, date: s.date, name: s.name_english, group: s.group, photo: s.photo }))
    let pagination = generatePagination(totalPages, page);
    return { q, result, pagination, page }
};

