<script>
	// Props from frontmatter
	export let title = '';
	export let date = '';
	export let description = '';
	export let image = '';
</script>

<svelte:head>
	<title>{title} - Hej Kombucha</title>
	<meta name="description" content={description} />
	{#if image}
		<meta property="og:image" content={image} />
	{/if}
</svelte:head>

<article class="max-w-4xl mx-auto px-4 py-12">
	<!-- Header -->
	<header class="mb-8">
		<h1 class="text-4xl md:text-5xl font-bold text-red-600 mb-4">{title}</h1>
		{#if date}
			<time class="text-gray-600 text-lg" datetime={date}>
				{new Date(date).toLocaleDateString('sv-SE', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}
			</time>
		{/if}
		{#if description}
			<p class="text-xl text-gray-700 mt-4 leading-relaxed">{description}</p>
		{/if}
	</header>

	<!-- Featured Image -->
	{#if image}
		<div class="mb-8">
			<img src={image} alt={title} class="w-full rounded-lg shadow-lg" />
		</div>
	{/if}

	<!-- Content -->
	<div class="prose prose-lg prose-red max-w-none">
		<slot />
	</div>
</article>

<style>
	:global(.prose h2) {
		@apply text-3xl font-semibold text-red-600 mt-8 mb-4;
	}
	
	:global(.prose h3) {
		@apply text-2xl font-medium text-red-500 mt-6 mb-3;
	}
	
	:global(.prose p) {
		@apply text-gray-800 leading-relaxed mb-4;
	}
	
	:global(.prose ul, .prose ol) {
		@apply ml-6 mb-4;
	}
	
	:global(.prose li) {
		@apply mb-2;
	}
	
	:global(.prose a) {
		@apply text-red-600 underline hover:text-red-700 transition-colors;
	}
	
	:global(.prose img) {
		@apply rounded-lg shadow-md mx-auto;
	}
	
	:global(.prose blockquote) {
		@apply border-l-4 border-red-300 pl-6 italic text-gray-700 my-6;
	}
</style>