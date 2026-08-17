import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

// export const load: PageServerLoad = async ({  }) => {
//     return {};
// };


export const actions: Actions = {
    async default ({ cookies }) {
        cookies.set('allow', 'true', { path: '/', httpOnly: false, secure: false, maxAge: 30 * 24 * 60 * 60 });
        redirect(303, '/');
    }
};

