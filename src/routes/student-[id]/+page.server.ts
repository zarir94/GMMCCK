import parsedData from "$lib/parsedData";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    let { id } = params;
    let student = parsedData.find(s=>s.id == id);
    if (!student) return error(404);
    return { student };
};

