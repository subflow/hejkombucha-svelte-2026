import { redirect, type Handle } from '@sveltejs/kit';
import { building } from '$app/environment';
import { auth } from '$lib/server/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';

/** Sidor under /admin som får besökas utan inloggning. */
const PUBLIC = new Set(['/admin/login', '/admin/set-password']);

export const handle: Handle = async ({ event, resolve }) => {
	const session = await auth.api.getSession({ headers: event.request.headers });

	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;
	}

	// Spärren ligger här, inte i en layout-load: form actions körs före load,
	// så bara hooken skyddar POST:ar mot /admin också.
	const { pathname } = event.url;
	if (pathname.startsWith('/admin') && !PUBLIC.has(pathname) && !session) {
		redirect(303, '/admin/login');
	}

	return svelteKitHandler({ event, resolve, auth, building });
};
