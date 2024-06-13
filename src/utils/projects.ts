export interface FavoriteProject {
	repository_name: string;
	project_name: string;
	screenshots: string[];
	description: string;
	technologies: string[];
	points: string[];
}

export const favorites: FavoriteProject[] = [
	{
		repository_name: 'on-tour',
		project_name: 'On Tour',
		screenshots: [
			'https://camo.githubusercontent.com/be17da803ee8d680b933bf521907c7540b211c5e4d4986ace7db2d2329b7c60c/68747470733a2f2f692e696d6775722e636f6d2f64344942524a462e706e67',
			'https://camo.githubusercontent.com/39d52c4047c92a54a421e603241641d1ba502a1e89ebe639f739320ff2c8277d/68747470733a2f2f692e696d6775722e636f6d2f5548356d5242612e706e67',
			'https://camo.githubusercontent.com/36ea055fcb537f74e5fe6454cc9a50a25a37f39b0112904f5dbde055da07e6f8/68747470733a2f2f692e696d6775722e636f6d2f4763615a6e766a2e706e67',
			'https://camo.githubusercontent.com/2e6db8a0d1a8b6eb56619a5d2c2b565e1dc6df9417a5fd53fc5371c9df1f139b/68747470733a2f2f692e696d6775722e636f6d2f4f4e4d523050392e706e67',
		],
		description:
			'a React Native application to create playlists from live shows',
		technologies: ['React Native', 'Expo', 'TypeScript', 'Fastify', 'NeonDb'],
		points: [
			"Used APIs from Spotify and setlist.fm to create a customized feed for users' favorite artists and their recent concerts",
			'Implemented a custom server with Fastify and Lucia to handle authentication and API requests',
			'Published the app to the Google Play Store after receiving feedback from 20 users',
		],
	},
	{
		repository_name: 'eden-heardle',
		project_name: 'EDEN Heardle',
		screenshots: [
			'https://camo.githubusercontent.com/06c7ac9fcc287880299483bead7d1caeb9e5c9e22904a9a066bcfe366252215f/68747470733a2f2f692e696d6775722e636f6d2f4f7a45545778532e706e67',
			'https://camo.githubusercontent.com/71a00e9781cadd280157f3f6f2eab7e0a32d3c7b79fd5876526d5c04d450770c/68747470733a2f2f692e696d6775722e636f6d2f64567234414f422e706e67',
			'https://camo.githubusercontent.com/4f64fc7dd918be78a86cdb46c29fbcabaad981223c78d4a71fe80cb5f0ab9e00/68747470733a2f2f692e696d6775722e636f6d2f7730573443464e2e706e67',
		],
		description: 'a custom version of Heardle, the music version of Wordle',
		technologies: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Supabase'],
		points: [
			'Built a full-stack Heardle game for a dedicated community of 50 daily users',
			'Developed a dedicated Express server for running a daily cron job and handling custom Heardle requests',
			'Implemented authentication with NextAuth, and used Supabase for the database and audio file storage',
		],
	},
	{
		repository_name: 'futurebound-bot',
		project_name: 'Futurebound Bot',
		screenshots: [
			'https://camo.githubusercontent.com/1cb2507ba4920c8655a9567eae7c2460c6b1d620827b44a1b5f114d5f70faacf/68747470733a2f2f692e696d6775722e636f6d2f33547954494b652e706e67',
			'https://camo.githubusercontent.com/2689524ab953ff61da04ae7a61c45f0a0a6b6b55eae554beab6449f09e2d045b/68747470733a2f2f692e696d6775722e636f6d2f305364326b58572e706e67',
		],
		description: 'a Discord bot application',
		technologies: ['JavaScript', 'Node.js', 'MongoDB', 'Heroku'],
		points: [
			'Designed a Discord bot for a server of 3000+ members to handle moderation, event hosting, and interactive features',
			'Utilized Discord.js and  external libraries to create server-specific features that were requested',
			'Deployed the bot through Heroku and stored data on MongoDB to announce birthdays, track ongoing tournaments of 200+ users, track warnings',
		],
	},
];
