import { defineAction } from 'astro:actions';
import { getImagesFromBucket } from '../services/s3';
import { z } from 'astro:content';
import { fetchCurrentlyPlaying } from '../services/last-fm';

export const server = {
	getFolders: defineAction({
		input: z.object({
			bucketName: z.string(),
		}),
		handler: async ({ bucketName }) => {
			return getImagesFromBucket(bucketName);
		},
	}),
	getOneFolder: defineAction({
		input: z.object({
			bucketName: z.string(),
			folderName: z.string(),
		}),
		handler: async ({ bucketName, folderName }) => {
			const folders = await getImagesFromBucket(bucketName, folderName);
			return folders.get(folderName);
		},
	}),
	getCurrentlyPlaying: defineAction({
		handler: async () => {
			return fetchCurrentlyPlaying();
		},
	}),
};
