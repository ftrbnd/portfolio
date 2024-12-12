import { defineCollection, z, type CollectionEntry } from 'astro:content';
import { cldAssetsLoader } from 'astro-cloudinary/loaders';
import 'astro:content';
import { file } from 'astro/loaders';

export const collections = {
	photos: defineCollection({
		loader: cldAssetsLoader(),
	}),
	projects: defineCollection({
		loader: file('src/data/projects.json'),
		schema: z.object({
			repository_name: z.string(),
			project_name: z.string(),
			screenshots: z.string().url().array(),
			technologies: z.string().array(),
			points: z.string().array(),
		}),
	}),
};

export type PhotoCollectionEntry = CollectionEntry<'photos'> & {
	data: {
		asset_folder: string;
	};
};
