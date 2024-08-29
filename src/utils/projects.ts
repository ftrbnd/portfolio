export interface FavoriteProject {
	repository_name: string;
	project_name: string;
	screenshots: string[];
	technologies: string[];
	points: string[];
}

export const favorites: FavoriteProject[] = [
	{
		repository_name: 'apt-manager',
		project_name: 'Apt Manager',
		screenshots: [
			'https://i.imgur.com/uV2jZht.png',
			'https://i.imgur.com/SAFWuJy.png',
		],
		technologies: [
			'TypeScript',
			'Next.js',
			'Lucia',
			'shadcn/ui',
			'Vercel Postgres',
		],
		points: [
			'Developed a web app to streamline the management of apartment buildings, units, and rent receipts',
			'Implemented authentication with Apple Sign-In using Lucia for a seamless user experience',
		],
	},
	{
		repository_name: 'on-tour',
		project_name: 'On Tour',
		screenshots: [
			'https://i.imgur.com/NyupHK9.png',
			'https://i.imgur.com/0OizE26.png',
		],

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
			'https://i.imgur.com/78JjsgF.png',
			'https://i.imgur.com/d8fgocD.png',
		],
		technologies: [
			'React',
			'Next.js',
			'TypeScript',
			'TailwindCSS',
			'Supabase',
			'Express',
		],
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
			'https://i.imgur.com/8NdiTks.png',
			'https://i.imgur.com/3UJdSi7.png',
		],
		technologies: ['JavaScript', 'Node.js', 'MongoDB', 'Heroku'],
		points: [
			'Designed a Discord bot for a server of 3000+ members to handle moderation, event hosting, and interactive features',
			'Utilized Discord.js and  external libraries to create server-specific features that were requested',
			'Deployed the bot through Heroku and stored data on MongoDB to announce birthdays, track ongoing tournaments of 200+ users, track warnings',
		],
	},
];
