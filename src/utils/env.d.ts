interface ImportMetaEnv {
	readonly GITHUB_TOKEN: string;
	readonly LAST_FM_API_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
