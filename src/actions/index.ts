import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro:content';
import { fetchCurrentlyPlaying } from '../services/last-fm';
import { v2 as cloudinary } from 'cloudinary';
import { getSecret } from 'astro:env/server';
import { fetchRepository } from '../services/github';

cloudinary.config({
	cloud_name: getSecret('PUBLIC_CLOUDINARY_CLOUD_NAME'),
	api_key: getSecret('PUBLIC_CLOUDINARY_API_KEY'),
	api_secret: getSecret('CLOUDINARY_API_SECRET'),
});

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
	removeImage: defineAction({
		input: z.object({
			publicId: z.string(),
		}),
		handler: async ({ publicId }) => {
			await cloudinary.uploader.destroy(publicId, {
				invalidate: true,
			});
		},
	}),
	batchRemoveImages: defineAction({
		input: z.object({
			publicIds: z.string().array(),
		}),
		handler: async ({ publicIds }) => {
			await cloudinary.api.delete_resources(publicIds);
		},
	}),
	saveRotatedImage: defineAction({
		input: z.object({
			publicId: z.string(),
			angle: z.number(),
		}),
		handler: ({ publicId, angle }) => {
			cloudinary.image(publicId, {
				angle,
			});
		},
	}),
};
