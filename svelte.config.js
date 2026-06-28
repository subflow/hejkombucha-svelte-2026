import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex({
		extensions: ['.md', '.svx'],
		layout: {
			// `_` is the default layout applied to every post (frontmatter carries no `layout` field).
			// Absolute path: mdsvex reads it from disk AND injects it as an import specifier.
			_: join(__dirname, 'src/lib/BlogLayout.svelte')
		}
	})],
	kit: { 
		adapter: adapter()
	},
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
