import { defineCollection, type CollectionEntry } from 'astro:content';
import { cldAssetsLoader } from 'astro-cloudinary/loaders';
import 'astro:content';

export const collections = {
	photos: defineCollection({
		loader: cldAssetsLoader(),
	}),
};

export type PhotoCollectionEntry = CollectionEntry<'photos'> & {
	data: {
		asset_folder: string;
	};
};
