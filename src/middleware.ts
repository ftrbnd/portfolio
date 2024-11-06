import { defineMiddleware } from 'astro:middleware';
import { auth } from './utils/auth';

export const onRequest = defineMiddleware(async (context, next) => {
	const isAuthed = await auth.api.getSession({
		headers: context.request.headers,
	});
	if (context.url.pathname === '/film/dashboard' && !isAuthed) {
		return context.redirect('/film');
	}
	return next();
});
