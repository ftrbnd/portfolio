import { ActionError, defineAction } from 'astro:actions';
import {
	batchDeleteImages,
	deleteImage,
	downloadImage,
	getImagesFromBucket,
	replaceImage,
} from '../services/s3';
import { z } from 'astro:content';
import { fetchCurrentlyPlaying } from '../services/last-fm';
import sharp from 'sharp';
import { auth } from '../utils/auth';

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
	removeImage: defineAction({
		input: z.object({
			objectKey: z.string(),
		}),
		handler: async ({ objectKey }) => {
			await deleteImage(objectKey);
		},
	}),
	batchRemoveImages: defineAction({
		input: z.object({
			objectKeys: z.string().array(),
		}),
		handler: async ({ objectKeys }) => {
			await batchDeleteImages(objectKeys);
		},
	}),
	saveRotatedImage: defineAction({
		input: z.object({
			objectKey: z.string(),
			degrees: z.number(),
		}),
		handler: async ({ objectKey, degrees }) => {
			const bytes = await downloadImage(objectKey);
			if (!bytes)
				throw new ActionError({
					code: 'INTERNAL_SERVER_ERROR',
					message: `Failed to download ${objectKey}`,
				});

			const rotatedBuffer = await sharp(bytes).rotate(degrees).toBuffer();

			await replaceImage(objectKey, rotatedBuffer);
		},
	}),
};
