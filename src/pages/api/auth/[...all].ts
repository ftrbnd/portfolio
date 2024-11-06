import type { APIRoute } from 'astro';
import { auth } from '../../../utils/auth';

export const ALL: APIRoute = async (ctx) => {
	return auth.handler(ctx.request);
};
