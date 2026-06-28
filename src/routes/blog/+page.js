export async function load() {
	const allPostFiles = import.meta.glob('../content/blog/*.md');
	const iterablePostFiles = Object.entries(allPostFiles);
	
	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			const { metadata } = await resolver();
			const postPath = path.split('/').pop().replace('.md', ''); // Get filename without extension
			
			return {
				meta: metadata,
				slug: postPath
			};
		})
	);
	
	const posts = allPosts.map(post => ({
		slug: post.slug,
		title: post.meta.title,
		date: post.meta.date,
		description: post.meta.description,
		image: post.meta.image
	}));
	
	// Sort by date (newest first)
	posts.sort((a, b) => new Date(b.date) - new Date(a.date));
	
	return {
		posts
	};
}