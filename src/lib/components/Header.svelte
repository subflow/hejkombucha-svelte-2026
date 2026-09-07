<script>
	import { page } from '$app/state';

	let open = $state(false);

	const nav = [
		{ href: '/', label: 'Hem' },
		{ href: '/stores', label: 'Återförsäljare' },
		{ href: '/bli-aterforsaljare', label: 'Bli återförsäljare' },
		// { href: '/blog', label: 'Aktuellt' }, // hidden for now — re-enable when there are fresh posts
		{ href: '/about', label: 'Om oss' }
	];

	const isActive = (/** @type {string} */ href) =>
		href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);
</script>

<header class="sticky top-0 z-20 border-b-[1.5px] border-ink bg-cream/92 backdrop-blur-[6px]">
	<div class="mx-auto flex max-w-[1140px] items-center justify-between gap-6 px-7 py-6">
		<a href="#main" class="sr-only">Skip to main content</a>

		<a aria-label="Hej Kombucha" class="flex items-center gap-3" href="/">
			<img class="h-[64px] w-auto" src="/images/hkb2026.png" alt="Hej Kombucha" />
		</a>

		<!-- Desktop navigation -->
		<nav class="hidden items-center gap-1 lg:flex">
			{#each nav as { href, label } (href)}
				<a
					{href}
					aria-current={isActive(href) ? 'page' : undefined}
					class="px-4 py-2.5 text-[14px] tracking-[0.04em] {isActive(href)
						? 'text-brand underline underline-offset-4'
						: 'text-ink no-underline hover:text-brand'}"
				>
					{label}
				</a>
			{/each}
			<a href="mailto:yo@hejkombucha.se" class="btn btn-secondary ml-2">
				<span>Kontakta oss</span>
				<span aria-hidden="true">→</span>
			</a>
		</nav>

		<!-- Mobile menu button -->
		<button
			aria-label="Öppna menyn"
			class="-mr-1 p-2 text-ink focus:outline-none lg:hidden"
			onclick={() => (open = true)}
		>
			<svg class="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M3 13h18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1zM3 7h18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1zM3 19h18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1z"
				></path>
			</svg>
		</button>
	</div>
</header>

<!-- Mobile menu -->
{#if open}
	<div class="fixed inset-0 z-30 overflow-y-auto bg-cream px-7 py-6 text-ink">
		<div class="flex min-h-full flex-col">
			<div class="mb-10 flex items-center justify-between">
				<a aria-label="Hej Kombucha" class="flex items-center" href="/">
					<img class="h-[64px] w-auto" src="/images/hkb2026.png" alt="Hej Kombucha" />
				</a>
				<button
					aria-label="Stäng menyn"
					class="-mr-1 p-2 focus:outline-none"
					onclick={() => (open = false)}
				>
					<svg class="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M5.293 6.707l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5.293-5.293 5.293 5.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-5.293-5.293 5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"
						></path>
					</svg>
				</button>
			</div>
			<ul class="mb-10 flex-grow space-y-6">
				{#each nav as { href, label } (href)}
					<li>
						<a
							{href}
							onclick={() => (open = false)}
							class="font-display text-3xl font-bold tracking-[-0.02em] {isActive(href)
								? 'text-brand'
								: 'text-ink'}"
						>
							{label}
						</a>
					</li>
				{/each}
			</ul>
			<a href="mailto:yo@hejkombucha.se" class="btn btn-secondary mb-10 w-full">
				<span>Kontakta oss</span>
				<span aria-hidden="true">→</span>
			</a>
		</div>
	</div>
{/if}
