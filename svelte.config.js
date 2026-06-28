import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex({
		extensions: ['.md', '.svx'],
		layout: {
			blog: 'src/lib/BlogLayout.svelte'
		}
	})],
	kit: { 
		adapter: adapter()
	},
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
