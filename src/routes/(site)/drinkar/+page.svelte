<script lang="ts">
	import { resolve } from '$app/paths';
	import { drinks } from '$lib/drinks';
</script>

<svelte:head>
	<title>Drinkar med kombucha | Hej Kombucha</title>
	<meta
		name="description"
		content="Tio drinkar med kombucha. Hitta din favorit bland margarita, mojito och fler recept med svenska mått och länkar till originalen."
	/>
</svelte:head>

<div class="drinks-page mx-auto max-w-[1140px] px-7 py-12 sm:py-18">
	<header class="mb-12 max-w-[760px]">
		<h1 class="text-[clamp(40px,6vw,72px)] leading-[1.05]">
			Drinkar med<br /><span class="text-brand-ink">kombucha.</span>
		</h1>
		<p class="mt-6 max-w-[620px] text-base leading-relaxed">
			Syra, frukt och lite bubblor. Tio sätt att blanda med kombucha, från en enkel Mule till en
			jordgubbsmojito.
		</p>
		<p class="mt-4 text-sm leading-relaxed">
			Recept på svenska, med mängder och steg för steg. Alla drinkar i samlingen innehåller alkohol.
		</p>
	</header>

	<div class="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
		{#each drinks as drink, index (drink.slug)}
			<article>
				<a class="drink-link block" href={resolve('/(site)/drinkar/[slug]', { slug: drink.slug })}>
					<img
						src="/images/drinks/{drink.slug}.jpg"
						alt=""
						width="1000"
						height="1000"
						loading={index < 3 ? 'eager' : 'lazy'}
						class="aspect-square w-full object-cover"
					/>
					<div class="mt-4 flex items-center justify-between gap-3 text-xs">
						<span>{drink.base}</span><span>{drink.servings} glas</span>
					</div>
					<h2 class="mt-2 text-[26px] leading-tight">{drink.name}</h2>
					<p class="mt-3 text-sm leading-relaxed">{drink.description}</p>
					<span
						class="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-ink underline underline-offset-4"
						>Se recept <span aria-hidden="true">→</span></span
					>
				</a>
			</article>
		{/each}
	</div>

	<aside class="mt-16 border-t-[1.5px] border-ink pt-7 text-sm leading-relaxed">
		<p>
			Samlingen utgår från <a
				class="underline underline-offset-4"
				href="https://mybartender.com/drinks/kombucha-cocktails/"
				>MyBartenders tio kombuchadrinkar</a
			>. Varje recept har en länk till sin ursprungliga skapare. Texterna är skrivna för den här
			samlingen och måtten är anpassade till svenska köksmått.
		</p>
	</aside>
</div>

<style>
	.drink-link {
		text-decoration: none;
	}
	.drink-link:hover h2 {
		color: var(--color-brand-ink);
	}
	.drinks-page a:focus-visible {
		outline: 2px solid var(--color-brand-ink);
		outline-offset: 6px;
	}
</style>
