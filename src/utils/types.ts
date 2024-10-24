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

export interface LastFmResponse {
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
