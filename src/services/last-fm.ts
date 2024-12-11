export const ROOT_URL = 'https://ws.audioscrobbler.com/2.0/';
export const USERNAME = 'ftrbnd';

export const fetchCurrentlyPlaying = async () => {
	const res = await fetch(
		`${ROOT_URL}?method=user.getrecenttracks&user=${USERNAME}&api_key=${
			import.meta.env.LAST_FM_API_KEY
		}&format=json`
	);
	if (!res.ok) throw new Error('Failed to get recent tracks from last.fm');

	const { recenttracks }: LastFmResponse = await res.json();
	const mostRecentTrack = recenttracks.track[0];

	const isPlaying = mostRecentTrack?.['@attr']?.nowplaying === 'true';

	return { mostRecentTrack, isPlaying };
};

interface Text {
	'#text': string;
}

interface Mbid {
	mbid: string;
}

interface Image extends Text {
	size: 'small' | 'medium' | 'large' | 'extralarge';
}

interface Date extends Text {
	uts: string;
}

interface RecentTrack {
	artist: Mbid & Text;
	streamable: string;
	image: Image[];
	mbid: string;
	album: Mbid & Text;
	url: string;
	name: string;
	'@attr'?: {
		nowplaying: 'true' | 'false';
	};
	date?: Date;
}

interface LastFmResponse {
	recenttracks: {
		track: RecentTrack[];
		'@attr': {
			user: string;
			totalPages: string;
			page: string;
			perPage: string;
			total: string;
		};
	};
}
