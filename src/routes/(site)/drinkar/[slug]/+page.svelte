<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.drink.name} – recept | Hej Kombucha</title>
	<meta name="description" content={data.drink.description} />
	<meta property="og:title" content="{data.drink.name} | Hej Kombucha" />
	<meta property="og:description" content={data.drink.description} />
	<meta
		property="og:image"
		content="https://www.hejkombucha.se/images/drinks/{data.drink.slug}.jpg"
	/>
</svelte:head>

<article class="recipe mx-auto max-w-[1140px] px-7 py-9 sm:py-12">
	<a
		class="back inline-flex min-h-11 items-center gap-2 text-sm underline underline-offset-4"
		href={resolve('/drinkar')}><span aria-hidden="true">←</span> Alla drinkar</a
	>
	<div class="mt-6 grid items-start gap-8 md:grid-cols-2 md:gap-12">
		<img
			class="recipe-image aspect-square w-full object-cover"
			src="/images/drinks/{data.drink.slug}.jpg"
			alt="Illustration av {data.drink.name}"
			width="1000"
			height="1000"
			fetchpriority="high"
		/>
		<div class="md:py-5">
			<h1 class="text-[clamp(36px,4.5vw,58px)] leading-[1.08]">{data.drink.name}</h1>
			<p class="mt-5 text-base leading-relaxed">{data.drink.description}</p>
			<p class="mt-5 border-y-[1.5px] border-ink py-4 text-sm">
				{data.drink.servings} glas · {data.drink.base} · Innehåller alkohol
			</p>
			<section class="mt-7" aria-labelledby="ingredients">
				<h2 id="ingredients" class="text-[28px]">Ingredienser</h2>
				<ul class="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed">
					{#each data.drink.ingredients as ingredient (ingredient)}<li>{ingredient}</li>{/each}
				</ul>
			</section>
		</div>
	</div>

	<div
		class="mt-10 grid gap-9 border-t-[1.5px] border-ink pt-9 md:grid-cols-[1.35fr_1fr] md:gap-16"
	>
		<section aria-labelledby="method">
			<h2 id="method" class="text-[30px]">Gör så här</h2>
			<ol
				class="mt-6 list-decimal space-y-5 pl-6 text-base leading-relaxed marker:font-semibold marker:text-brand-ink"
			>
				{#each data.drink.steps as step (step)}<li class="pl-2">{step}</li>{/each}
			</ol>
		</section>
		<aside class="text-sm leading-relaxed">
			{#if data.drink.note}<p class="mb-6">{data.drink.note}</p>{/if}
			<h2 class="text-xl">Receptets ursprung</h2>
			<p class="mt-3">{data.drink.source.name}</p>
			<a
				class="inline-flex min-h-11 items-center gap-2 underline underline-offset-4"
				href={data.drink.source.url}>Till originalreceptet <span aria-hidden="true">↗</span></a
			>
			<p class="mt-3">
				Svensk bearbetning med avrundade mått och egna instruktioner. Illustrationerna visar
				serveringsförslag.
			</p>
		</aside>
	</div>
	<nav
		aria-label="Fler drinkar"
		class="more-drinks mt-14 flex flex-wrap items-center justify-between gap-5 border-t-[1.5px] border-ink pt-6"
	>
		<a class="btn btn-secondary" href={resolve('/drinkar')}>Alla drinkar</a>
		<a
			class="inline-flex min-h-11 items-center gap-2 text-sm underline underline-offset-4"
			href={resolve('/(site)/drinkar/[slug]', { slug: data.next.slug })}
			>{data.next.name} <span aria-hidden="true">→</span></a
		>
	</nav>
</article>

<style>
	.recipe a:focus-visible {
		outline: 2px solid var(--color-brand-ink);
		outline-offset: 5px;
	}
	.recipe a:hover {
		text-decoration-thickness: 2px;
	}
	@media print {
		:global(body) {
			background: white;
		}
		:global(body > div > header),
		:global(footer),
		.back,
		.more-drinks {
			display: none;
		}
		.recipe {
			padding: 0;
		}
		.recipe-image {
			max-width: 220px;
		}
	}
</style>
