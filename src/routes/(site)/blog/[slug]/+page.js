import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const modules = import.meta.glob('/src/content/blog/*.md');
	const match = Object.entries(modules).find(([path]) => path.endsWith(`/${params.slug}.md`));

	if (!match) {
		error(404, `Could not find ${params.slug}`);
	}

	const post =
		/** @type {{ default: import('svelte').Component, metadata: Record<string, string> }} */ (
			await match[1]()
		);

	return {
		content: post.default,
		meta: post.metadata
	};
}
