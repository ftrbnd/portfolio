import {
	createResource,
	ErrorBoundary,
	For,
	Suspense,
	type Component,
} from 'solid-js';
import { getImagesFromBucket } from '../../services/s3';

const fetchImages = async () => {
	'use server';

	const images = await getImagesFromBucket(import.meta.env.AWS_BUCKET_NAME);
	return images;
};

const Skeleton: Component = () => (
	<div class='skeleton h-48 md:h-80 w-full rounded-none'></div>
);

const Skeletons: Component = () => (
	<>
		<Skeleton />
		<Skeleton />
		<Skeleton />
		<Skeleton />
		<Skeleton />
		<Skeleton />
	</>
);

const ErrorAlert: Component = () => (
	<div
		role='alert'
		class='alert alert-error md:col-span-2 xl:col-span-3'>
		<svg
			xmlns='http://www.w3.org/2000/svg'
			class='h-6 w-6 shrink-0 stroke-current'
			fill='none'
			viewBox='0 0 24 24'>
			<path
				stroke-linecap='round'
				stroke-linejoin='round'
				stroke-width='2'
				d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
			/>
		</svg>
		<span>Oops! Failed to fetch my photos.</span>
	</div>
);

const Gallery: Component = () => {
	const [images] = createResource(fetchImages);

	return (
		<div class='gap-4 md:gap-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 max-w-screen-2xl'>
			<ErrorBoundary fallback={<ErrorAlert />}>
				<Suspense fallback={<Skeletons />}>
					<For each={images()}>
						{(image) => (
							<img
								src={image}
								alt='a film photo'
							/>
						)}
					</For>
				</Suspense>
			</ErrorBoundary>
		</div>
	);
};

export default Gallery;
