import {
	createResource,
	ErrorBoundary,
	For,
	Suspense,
	type Component,
} from 'solid-js';
import { getImagesFromBucket } from '../../services/s3';
import FolderPreview from './FolderPreview';

const fetchImages = async () => {
	'use server';

	const folders = await getImagesFromBucket(import.meta.env.MY_AWS_BUCKET_NAME);
	return folders;
};

const Skeleton: Component = () => (
	<div class='skeleton h-48 md:h-80 w-full rounded-sm'></div>
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
		class='alert alert-error md:col-span-2 xl:col-span-3 rounded-sm'>
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

const EmptyAlert = () => (
	<div
		role='alert'
		class='alert md:col-span-2 xl:col-span-3 rounded-sm'>
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			class='stroke-info h-6 w-6 shrink-0'>
			<path
				stroke-linecap='round'
				stroke-linejoin='round'
				stroke-width='2'
				d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
		</svg>
		<span>No photos yet...</span>
	</div>
);

const Gallery: Component = () => {
	const [folders] = createResource(fetchImages);
	const keys = () =>
		Array.from(folders()?.keys() ?? new Map<string, string[]>().keys());

	return (
		<div class='gap-4 md:gap-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 max-w-screen-2xl'>
			<ErrorBoundary fallback={<ErrorAlert />}>
				<Suspense fallback={<Skeletons />}>
					<For
						each={keys()}
						fallback={<EmptyAlert />}>
						{(folderKey) => (
							<FolderPreview
								title={folderKey}
								urls={folders()?.get(folderKey) ?? []}
							/>
						)}
					</For>
				</Suspense>
			</ErrorBoundary>
		</div>
	);
};

export default Gallery;
