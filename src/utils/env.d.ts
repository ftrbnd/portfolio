interface ImportMetaEnv {
	readonly GITHUB_TOKEN: string;
	readonly LAST_FM_API_KEY: string;
	readonly MY_AWS_ACCESS_KEY_ID: string;
	readonly MY_AWS_SECRET_ACCESS_KEY: string;
	readonly MY_AWS_BUCKET_NAME: string;
	readonly MY_AWS_REGION: string;
	readonly BETTER_AUTH_URL: string;
	readonly DATABASE_URL: string;
	readonly GITHUB_CLIENT_ID: string;
	readonly GITHUB_CLIENT_SECRET: string;
	readonly ADMIN_GITHUB_USER_ID: string;
	readonly MY_AWS_CLOUDFRONT_DOMAIN: string;
	readonly FILM_SYNC_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
