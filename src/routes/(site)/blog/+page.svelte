<script>
	import Arrow from '$lib/components/Arrow.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Aktuellt - Hej Kombucha</title>
	<meta name="description" content="Läs de senaste nyheterna från Hej Kombucha bryggeri i Lindbacka" />
	<meta property="og:title" content="Aktuellt - Hej Kombucha" />
	<meta property="og:image" content="https://www.hejkombucha.se/images/og-share2.jpg" />
</svelte:head>

<!-- Page title -->
<div class="flex justify-center bg-cream px-4 py-12 text-brand lg:py-16">
	<h1 class="w-full max-w-5xl text-center">Aktuellt</h1>
</div>

<!-- Posts -->
<section class="flex flex-col justify-center bg-cream px-4 pt-0 pb-12 text-brand">
	<div class="flex w-full justify-center">
		<div class="w-full max-w-5xl">
			{#if data.posts.length > 0}
				<div class="grid gap-6 md:grid-cols-6 lg:gap-8">
					{#each data.posts as post}
						<article class="card overflow-hidden md:col-span-3">
							<div class="flex min-h-full flex-col">
								{#if post.image}
									<a
										class="relative block h-0 w-full overflow-hidden pt-[66.666%]"
										href="/blog/{post.slug}"
									>
										<img
											class="absolute top-0 left-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
											src={post.image}
											alt={post.title}
										/>
									</a>
								{/if}
								<div class="flex flex-grow flex-col px-4 pt-6 pb-10 sm:px-6">
									<div class="flex-grow">
										<h2 class="text-3xl">
											<a href="/blog/{post.slug}">{post.title}</a>
										</h2>
										{#if post.description}
											<p class="mt-4">{post.description}</p>
										{/if}
									</div>
									<div class="mt-12 space-y-6">
										{#if post.date}
											<div class="mb-2">
												<time datetime={post.date}>
													{new Date(post.date).toLocaleDateString('sv-SE', {
														year: 'numeric',
														month: 'long',
														day: 'numeric'
													})}
												</time>
											</div>
										{/if}
										<div>
											<a class="btn btn-primary" href="/blog/{post.slug}">
												<span class="mr-3">Läs mer</span>
												<Arrow class="h-5 w-5" />
											</a>
										</div>
									</div>
								</div>
							</div>
						</article>
					{/each}
				</div>
			{:else}
				<p class="text-center text-xl">Inga inlägg än. Kom tillbaka snart!</p>
			{/if}
		</div>
	</div>
</section>
