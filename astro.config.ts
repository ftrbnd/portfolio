import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import solidJs from '@astrojs/solid-js';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), solidJs()],
	adapter: netlify(),
});
