import { ActionError, defineAction } from 'astro:actions';
import {
	deleteImage,
	downloadImage,
	getImagesFromBucket,
	replaceImage,
} from '../services/s3';
import { z } from 'astro:content';
import { fetchCurrentlyPlaying } from '../services/last-fm';
import sharp from 'sharp';

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
			userId: z.string(),
		}),
		handler: async ({ objectKey, userId }) => {
			if (userId !== import.meta.env.ADMIN_GITHUB_USER_ID) {
				throw new ActionError({
					code: 'UNAUTHORIZED',
					message: 'You are not an admin of this page.',
				});
			}

			await deleteImage(objectKey);
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
