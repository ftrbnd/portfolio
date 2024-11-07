import { defineMiddleware } from 'astro:middleware';
import { auth } from './utils/auth';
import { client } from './utils/auth/client';

export const onRequest = defineMiddleware(async (context, next) => {
	const session = await auth.api.getSession({
		headers: context.request.headers,
	});

	if (
		/\/film\/.*\/edit/.test(context.url.pathname) &&
		session?.user.id !== import.meta.env.ADMIN_GITHUB_USER_ID
	) {
		await client.revokeSessions();
		return context.redirect('/film');
	}
	return next();
});
