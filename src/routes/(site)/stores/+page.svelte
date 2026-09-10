<script>
	// Retailer list, copy and ordering from the Claude Design template.
	const stores = [
		{
			name: 'CozoCoffee',
			city: 'Örebro',
			img: '/images/cozocoffee.jpg',
			url: 'https://www.cozocoffee.com/',
			text: 'Det lilla kafferosteriet i Örebro. Rostar bara specialkaffe av mycket hög kvalité. Finns i Lindbacka Bruk.'
		},
		{
			name: 'Kulturbistron',
			city: 'Örebro',
			img: '/images/kulturbistron.jpg',
			url: 'https://www.kulturbistron.se/',
			text: 'Lokala råvaror, handplockat vin, lokal öl och en levande meny som passar säsongen.'
		},
		{
			name: 'Pinklish Foodtruck',
			city: 'Örebro',
			img: '/images/pinklish.jpg',
			url: 'https://pinklish.se/',
			text: 'Den rosa trucken levererar skönare street food med mycket grönt och fokus på smak.'
		},
		{
			name: 'Ekobutiken',
			city: 'Örebro',
			img: '/images/ekobutiken.jpg',
			url: 'http://ekobutikerna.com/',
			text: 'Så gott som alla produkter är certifierat ekologiska. Stort utbud av Rättvisemärkt.'
		},
		{
			name: 'Berga Skafferi',
			city: 'Närke',
			img: '/images/berga.jpg',
			url: 'https://www.berga.net/',
			text: 'Gårdsbutik och café mitt på Närkeslätten med lokalt producerad mat och dryck från Örebro län.'
		},
		{
			name: 'Sallad&',
			city: 'Örebro',
			img: '/images/sallad&.jpg',
			url: 'https://salladoch.se/',
			text: 'Uppfriskande juicer, krämiga smoothies och gott kaffe. Testa rawfoodbollarna eller pralinerna.'
		},
		{
			name: 'Granelunds Odlingar',
			city: 'Närke',
			img: '/images/granelundsodlingar.jpg',
			url: 'https://www.granelundsodlingar.se/',
			text: 'KRAV-märkt självplock och ett trädgårdscafé med fikabröd, mackor och luncher.'
		},
		{
			name: 'Naturens Hus',
			city: 'Örebro',
			img: '/images/naturenshus.png',
			url: 'https://www.naturenshus.se',
			text: 'Restaurang och mötesplats vid Oset och Rynningeviken, med naturen precis utanför fönstret.'
		},
		{
			name: 'Egastronomi',
			city: 'Örebro',
			img: '/images/egastronomi.jpg',
			url: 'https://www.egastronomi.se/',
			text: 'Levande matstudio som ordnar allt från bröllop och konferenser till matlagningskurser och galna middagar.'
		}
	];

	const cities = ['Alla', 'Örebro', 'Närke'];

	let city = $state('Alla');
	const shown = $derived(city === 'Alla' ? stores : stores.filter((s) => s.city === city));
</script>

<svelte:head>
	<title>Återförsäljare - Hej Kombucha</title>
	<meta
		name="description"
		content="Hitta butiker och restauranger i Örebro där du kan köpa Hej Kombucha"
	/>
	<meta property="og:title" content="Återförsäljare - Hej Kombucha" />
	<meta property="og:image" content="https://www.hejkombucha.se/images/og-share2.jpg" />
</svelte:head>

<section class="min-h-[70vh] bg-cream">
	<div class="mx-auto max-w-[1140px] px-7 pt-18 pb-24">
		<div class="kicker">Stick och köp kombucha nu</div>
		<h1
			class="mt-3.5 mb-7 font-display text-[clamp(40px,6vw,72px)] leading-[0.98] font-bold tracking-[-0.02em] text-ink"
		>
			Återförsäljare
		</h1>

		<!-- CTA för nya återförsäljare -->
		<div
			class="mb-12 border-[1.5px] border-ink bg-white p-8 sm:flex sm:items-center sm:justify-between sm:gap-8"
		>
			<div>
				<div class="kicker">Driver du butik, kafé eller restaurang?</div>
				<h2 class="mt-2 font-display text-2xl font-bold tracking-[-0.02em] text-ink">
					Sälj Hej Kombucha hos dig
				</h2>
			</div>
			<a class="btn btn-primary mt-5 shrink-0 sm:mt-0" href="/bli-aterforsaljare">
				<span>Bli återförsäljare</span>
				<span aria-hidden="true">→</span>
			</a>
		</div>

		<div class="mb-9 flex flex-wrap gap-2.5">
			{#each cities as c (c)}
				<button class="chip" aria-pressed={city === c} onclick={() => (city = c)}>{c}</button>
			{/each}
		</div>

		<div class="grid gap-5 md:grid-cols-3">
			{#each shown as store (store.name)}
				<article class="card card-interactive">
					<div
						class="relative h-[180px] border-b-[1.5px] border-ink bg-cover bg-center bg-no-repeat grayscale contrast-[1.05]"
						style="background-image:url('{store.img}')"
					>
						<span class="tag tag-ink absolute top-3 left-3">{store.city}</span>
					</div>
					<div class="flex flex-1 flex-col gap-3 p-6">
						<span class="kicker">Återförsäljare</span>
						<h2 class="font-display text-[1.375rem] leading-snug font-bold text-ink">
							{store.name}
						</h2>
						<p class="text-[14px] leading-[1.55]">{store.text}</p>
						<div class="mt-auto pt-3">
							<a class="btn btn-link" href={store.url} target="_blank" rel="noreferrer">
								<span>Till butiken</span>
								<span aria-hidden="true">→</span>
							</a>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>
