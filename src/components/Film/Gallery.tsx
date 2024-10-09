import { createResource, For, Match, Switch, type Component } from 'solid-js';
import { getImagesFromBucket } from '../../services/s3';

const fetchImages = async () => {
	'use server';

	const images = await getImagesFromBucket(import.meta.env.AWS_BUCKET_NAME);
	return images;
};

const Gallery: Component = () => {
	const [images] = createResource(fetchImages);

	return (
		<Switch fallback={<div>Something went wrong.</div>}>
			<Match when={images.error}>Error!</Match>
			<Match when={images()}>
				<For each={images()}>
					{(image, i) => (
						<img
							src={image}
							alt='a film photo'
						/>
					)}
				</For>
			</Match>
			<Match when={images.loading}>Loading...</Match>
		</Switch>
	);
};

export default Gallery;
