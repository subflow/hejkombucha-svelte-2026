<script>
	export let data;
</script>

<svelte:head>
	<title>Aktuellt - Hej Kombucha</title>
	<meta name="description" content="Läs våra senaste nyheter och uppdateringar från Hej Kombucha bryggeriet." />
</svelte:head>

<div class="max-w-6xl mx-auto px-4 py-12">
	<header class="mb-12 text-center">
		<h1 class="text-5xl font-bold text-red-600 mb-4">Aktuellt</h1>
		<p class="text-xl text-gray-700">Händer kring bryggeriet</p>
	</header>

	{#if data.posts && data.posts.length > 0}
		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each data.posts as post}
				<article class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
					{#if post.image}
						<img src={post.image} alt={post.title} class="w-full h-48 object-cover" />
					{/if}
					<div class="p-6">
						<h2 class="text-2xl font-semibold text-red-600 mb-3">
							<a href="/blog/{post.slug}" class="hover:text-red-700 transition-colors">
								{post.title}
							</a>
						</h2>
						{#if post.date}
							<time class="text-gray-500 text-sm" datetime={post.date}>
								{new Date(post.date).toLocaleDateString('sv-SE', {
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})}
							</time>
						{/if}
						{#if post.description}
							<p class="text-gray-700 mt-3 leading-relaxed">{post.description}</p>
						{/if}
						<a 
							href="/blog/{post.slug}" 
							class="inline-flex items-center mt-4 text-red-600 hover:text-red-700 font-medium"
						>
							Läs mer
							<svg class="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
							</svg>
						</a>
					</div>
				</article>
			{/each}
		</div>
	{:else}
		<div class="text-center py-12">
			<p class="text-xl text-gray-600">Inga inlägg än. Kom tillbaka snart!</p>
		</div>
	{/if}
</div>