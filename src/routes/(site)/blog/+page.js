export async function load() {
	// Absolute glob so it resolves regardless of this route's nesting.
	const modules = import.meta.glob('/src/content/blog/*.md');

	const posts = await Promise.all(
		Object.entries(modules).map(async ([path, resolver]) => {
			const { metadata } = await resolver();
			const slug = path.split('/').pop().replace('.md', '');
			return {
				slug,
				title: metadata.title,
				date: metadata.date,
				description: metadata.description,
				image: metadata.image
			};
		})
	);

	posts.sort((a, b) => new Date(b.date) - new Date(a.date));

	return { posts };
}
