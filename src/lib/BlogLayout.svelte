<script>
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

<article class="mx-auto max-w-4xl bg-cream px-4 py-12 text-brand">
	<header class="mb-8">
		<h1 class="mb-4 text-4xl md:text-5xl">{title}</h1>
		{#if date}
			<time class="text-lg" datetime={date}>
				{new Date(date).toLocaleDateString('sv-SE', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}
			</time>
		{/if}
		{#if description}
			<p class="mt-4 text-xl leading-relaxed">{description}</p>
		{/if}
	</header>

	{#if image}
		<div class="mb-8">
			<img src={image} alt={title} class="w-full" />
		</div>
	{/if}

	<div class="markdown prose prose-lg max-w-none text-ink">
		<slot />
	</div>
</article>

<style>
	:global(.markdown h2) {
		color: var(--color-brand);
		margin-top: 2rem;
		margin-bottom: 1rem;
	}
	:global(.markdown h3) {
		color: var(--color-brand);
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
	}
	:global(.markdown a) {
		color: var(--color-brand);
		text-decoration: underline;
	}
	:global(.markdown a:hover) {
		text-decoration: none;
	}
	:global(.markdown blockquote) {
		border-left: 4px solid var(--color-brand);
		padding-left: 1.5rem;
		font-style: italic;
		margin: 1.5rem 0;
	}
</style>
