import parsedData from "$lib/parsedData";
import type { PageServerLoad } from "./$types";
import stats_hyr from "./stats_hyr";
import stats_yfr from "./stats_yfr";

export const load: PageServerLoad = async ({  }) => {
    let students = parsedData
			.slice(0, 36)
			.map((s) => ({
				id: s.id,
				roll: s.roll,
				date: s.date,
				name: s.name_english,
				group: s.group,
				photo: s.photo,
				isPass: s.half_yearly_result ? Boolean(Number(s.half_yearly_result.gpa)) : undefined
			}));
    return {
        students,
        hyr: stats_hyr,
        yfr: stats_yfr,
    };
};

