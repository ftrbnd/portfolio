import { defineCollection } from 'astro:content';
import { cldAssetsLoader } from 'astro-cloudinary/loaders';

export const collections = {
	photos: defineCollection({
		loader: cldAssetsLoader(),
	}),
};

// TODO: migrate images from actions to content layer
