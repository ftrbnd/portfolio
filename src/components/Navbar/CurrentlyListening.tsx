import { Match, Show, Switch, createResource, type Component } from 'solid-js';
import type { Response } from '../../utils/types';

const ROOT_URL = 'https://ws.audioscrobbler.com/2.0/';
const USERNAME = 'ftrbnd';

// https://www.last.fm/api/show/user.getRecentTracks
const fetchCurrentlyListening = async () => {
	'use server';

	const res = await fetch(
		`${ROOT_URL}?method=user.getrecenttracks&user=${USERNAME}&api_key=${
			import.meta.env.LAST_FM_API_KEY
		}&format=json`
	);
	if (!res.ok) throw new Error('Failed to get recent tracks from last.fm');

	const { recenttracks }: Response = await res.json();
	const mostRecentTrack = recenttracks.track[0];

	return mostRecentTrack;
};

const CurrentlyListening: Component = () => {
	const [track] = createResource(fetchCurrentlyListening);
	const derivedClass = () =>
		track()?.['@attr']?.nowplaying === 'true' ? 'fa-fade' : '';

	const Fallback = () => (
		<Switch fallback={<p class='text-error'>Not found</p>}>
			<Match when={track.loading}>
				<span class='loading loading-dots loading-sm'></span>
			</Match>
			<Match when={track.error}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					class='stroke-current shrink-0 h-6 w-6 text-error'
					fill='none'
					viewBox='0 0 24 24'>
					<path
						stroke-linecap='round'
						stroke-linejoin='round'
						stroke-width='2'
						d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
					/>
				</svg>
			</Match>
		</Switch>
	);

	return (
		<Show
			when={track()}
			fallback={<Fallback />}>
			{(track) => (
				<div class='card bg-base-100 image-full'>
					<figure>
						<img
							src={track().image[3]['#text']}
							alt={track().album['#text']}
							class='w-full max-h-12'
						/>
					</figure>
					<div class='card-body flex items-center justify-center py-0'>
						<a
							href={`https://last.fm/user/${USERNAME}`}
							target='_blank'
							class='flex flex-col sm:flex-row gap-2 items-center justify-center text-center'>
							<i class={`fa-solid fa-record-vinyl ${derivedClass()} fa-xl`}></i>
							<div class='hidden sm:flex flex-col'>
								<h2 class='card-title hidden sm:block text-start'>
									{track().name}
								</h2>
								<p class='hidden lg:block text-start'>
									{track().artist['#text']}
								</p>
							</div>
						</a>
					</div>
				</div>
			)}
		</Show>
	);
};

export default CurrentlyListening;
