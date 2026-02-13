import parsedData from "$lib/parsedData";
import type { PageServerLoad } from "./$types";


export const load: PageServerLoad = async ({  }) => {
    let students = parsedData.slice(0, 36).map(s=>({ id: s.id, roll: s.roll, date: s.date, name: s.name_english, group: s.group, photo: s.photo }))
    return { students };
};

