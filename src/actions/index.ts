import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { fetchCurrentlyPlaying } from '@services/last-fm';
import { fetchRepository } from '@services/github';

export const server = {
	getCurrentlyPlaying: defineAction({
		handler: async () => {
			return fetchCurrentlyPlaying();
		},
	}),
	getRepository: defineAction({
		input: z.object({
			name: z.string(),
		}),
		handler: async ({ name }) => {
			return fetchRepository(name);
		},
	}),
};
