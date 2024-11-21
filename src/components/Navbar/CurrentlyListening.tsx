import { actions } from 'astro:actions';
import { createResource, type Component } from 'solid-js';
import { USERNAME } from '../../services/last-fm';

const fetchCurrentlyPlaying = async () => {
	'use server';

	const { data, error } = await actions.getCurrentlyPlaying();
	if (error) throw error;

	return data;
};

const CurrentlyListening: Component = () => {
	const [data] = createResource(fetchCurrentlyPlaying);
	const derivedClass = () =>
		data()?.mostRecentTrack?.['@attr']?.nowplaying === 'true' ? 'fa-fade' : '';

	return data.error ? (
		<div
			class='tooltip tooltip-left'
			data-tip={data.error.message}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				class='stroke-current shrink-0 h-6 w-6 text-error'
				fill='none'
				viewBox='0 0 24 24'>
				<path
					stroke-linecap='round'
					stroke-linejoin='round'
					stroke-width='2'
					d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'></path>
			</svg>
		</div>
	) : (
		<div class='card bg-base-100 image-full'>
			<figure>
				<img
					src={data()?.mostRecentTrack.image[2]['#text']}
					alt={data()?.mostRecentTrack.album['#text']}
					class='w-full max-h-12'
				/>
			</figure>
			<div class='card-body flex items-center justify-center py-0'>
				<a
					href={`https://last.fm/user/${USERNAME}`}
					target='_blank'
					class='flex flex-col sm:flex-row gap-2 items-center justify-center text-center'>
					<i class={`fa-solid fa-record-vinyl ${derivedClass()} fa-xl`} />
					<div class='hidden sm:flex flex-col'>
						<h2 class='card-title hidden sm:block text-start'>
							{data()?.mostRecentTrack.name}
						</h2>
						<p class='hidden lg:block text-start'>
							{data()?.mostRecentTrack.artist['#text']}
						</p>
					</div>
				</a>
			</div>
		</div>
	);
};

export default CurrentlyListening;
