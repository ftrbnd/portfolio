interface ImportMetaEnv {
	readonly GITHUB_TOKEN: string;
	readonly LAST_FM_API_KEY: string;
	readonly MY_AWS_ACCESS_KEY_ID: string;
	readonly MY_AWS_SECRET_ACCESS_KEY: string;
	readonly MY_AWS_BUCKET_NAME: string;
	readonly MY_AWS_REGION: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
