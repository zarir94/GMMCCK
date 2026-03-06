import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    let allow = event.cookies.get('allow') == 'true';
	if (event.url.pathname != '/sorry' && !allow) {
		return redirect(303, '/sorry');
	}

	const response = await resolve(event);
	return response;
};

