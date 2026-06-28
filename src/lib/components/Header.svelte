<script>
	import Arrow from './Arrow.svelte';

	let open = $state(false);

	const nav = [
		{ href: '/', label: 'Hem' },
		{ href: '/stores', label: 'Återförsäljare' },
		// { href: '/blog', label: 'Aktuellt' }, // hidden for now — re-enable when there are fresh posts
		{ href: '/about', label: 'Om Oss' }
	];
</script>

<header class="sticky top-0 z-10 bg-cream px-4 py-5 text-brand">
	<div class="mx-auto max-w-7xl">
		<a href="#main" class="sr-only">Skip to main content</a>
		<div class="relative flex items-center">
			<div class="mr-8">
				<a aria-label="Hej Kombucha" class="flex items-center" href="/">
					<img class="max-h-20" src="/images/hkb2026.png" alt="Hej kombucha" />
				</a>
			</div>

			<!-- Desktop Navigation -->
			<ul
				class="absolute top-1/2 left-1/2 hidden w-auto -translate-x-1/2 -translate-y-1/2 space-x-8 lg:flex lg:items-center"
			>
				{#each nav as { href, label } (href)}
					<li><a class="link" {href}><span>{label}</span></a></li>
				{/each}
			</ul>

			<ul class="ml-auto hidden space-x-8 lg:flex lg:items-center">
				<li>
					<a href="mailto:yo@hejkombucha.se" aria-label="Kontakta oss" class="btn btn-secondary">
						<span>Kontakta oss</span>
						<Arrow />
					</a>
				</li>
			</ul>

			<!-- Mobile Menu Button -->
			<div class="ml-auto lg:hidden">
				<button
					aria-label="Open Menu"
					class="-mr-1 p-2 focus:outline-none"
					onclick={() => (open = true)}
				>
					<span class="sr-only">Open Menu</span>
					<svg class="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M3 13h18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1zM3 7h18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1zM3 19h18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1z"
						></path>
					</svg>
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if open}
		<div class="fixed inset-0 z-20 overflow-y-auto bg-cream px-4 py-5 text-brand sm:px-8">
			<div class="flex min-h-full flex-col">
				<div class="mb-10 flex items-center justify-between">
					<div class="mr-8">
						<a aria-label="Hej Kombucha" class="flex items-center" href="/">
							<img class="max-h-20" src="/images/hkb2026.png" alt="Hej kombucha" />
						</a>
					</div>
					<button
						aria-label="Close Menu"
						class="-mr-1 p-2 focus:outline-none"
						onclick={() => (open = false)}
					>
						<svg
							class="h-6 w-6 fill-current"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M5.293 6.707l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5.293-5.293 5.293 5.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-5.293-5.293 5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"
							></path>
						</svg>
					</button>
				</div>
				<ul class="mb-10 flex-grow space-y-6">
					{#each nav as { href, label } (href)}
						<li><a class="link" {href} onclick={() => (open = false)}><span>{label}</span></a></li>
					{/each}
				</ul>
				<ul class="mb-10 space-y-5">
					<li>
						<a
							href="mailto:yo@hejkombucha.se"
							aria-label="Kontakta oss"
							class="btn btn-secondary w-full"
						>
							<span>Kontakta oss</span>
							<Arrow />
						</a>
					</li>
				</ul>
			</div>
		</div>
	{/if}
</header>
