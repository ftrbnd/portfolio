import { createAuthClient } from 'better-auth/solid';
import toast from 'solid-toast';

export const client = createAuthClient({
	baseURL: import.meta.env.BETTER_AUTH_URL,
});

export const signIn = async () => {
	const data = await client.signIn.social({
		provider: 'github',
		callbackURL: '/film',
	});

	toast.success('Successfully signed in');

	return data;
};
