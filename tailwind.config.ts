import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

const config: Config = {
	content: ['./src/**/*.{astro,html,ts,tsx}'],
	theme: {
		extend: {},
	},
	plugins: [daisyui],
	daisyui: {
		themes: ['dracula'],
	},
};

export default config;
