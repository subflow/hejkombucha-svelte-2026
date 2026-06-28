<script>
	// Retailer list — order and copy mirror the original stores.html.
	const stores = [
		{
			name: 'CozoCoffee',
			img: 'cozocoffee.jpg',
			body: `<p>Det lilla kafferosteriet i Örebro. Rostar bara såkallat specialkaffe, dvs kaffe av mycket hög kvalité. Allt på en gjutjärnsrost av märket GIesen W15A.</p>
				<p>Finns i Lindbacka Bruk strax utanför Karlslund i Örebro.</p>
				<p><a href="https://www.cozocoffee.com/">https://www.cozocoffee.com/</a></p>`
		},
		{
			name: 'Rosengrens Skafferi',
			img: 'rosengrens.jpg',
			body: `<p>Rosengrens Skafferi är en vegetarisk resturang med mycket fokus på närproducerade lokala råvaror och klimatsmart mat. Maten är lagad från grunden med ekologiska råvaror, kärlek och kreativ kryddning på ett trendigt sätt.</p>
				<p><a href="https://www.rosengrensskafferi.se/">https://www.rosengrensskafferi.se/</a></p>`
		},
		{
			name: 'Kulturbistron',
			img: 'kulturbistron.jpg',
			body: `<p>"Lokala råvaror, ett handplockat utbud av vin, lokal öl och en levande meny som passar säsongen är vår filosofi. Smakerna influeras från världens alla kök med den gemensamma nämnaren att allt lagas från grunden."</p>
				<p><a href="https://www.kulturbistron.se/">https://www.kulturbistron.se/</a></p>`
		},
		{
			name: 'Pinklish Foodtruck',
			img: 'pinklish.jpg',
			body: `<p>Pinklish rosa truck levererar skönare street food med mycket grönt och med fokus på smak!</p>
				<p><a href="https://pinklish.se/">https://pinklish.se/</a></p>`
		},
		{
			name: 'Ekobutiken',
			img: 'ekobutiken.jpg',
			body: `<p>Så gott som alla deras produkter är certifierat ekologiska. Undantaget är en handfull produkter som de på annat sätt tycker passar in i deras sortiment. Dessa är då tydligt märkta "konventionell" på hyllkanten. De har dessutom ett stort antal produkter som är både ekologiska och Rättvisemärkta.</p>
				<p><a href="http://ekobutikerna.com/">http://ekobutikerna.com/</a></p>`
		},
		{
			name: 'Berga Skafferi',
			img: 'berga.jpg',
			body: `<p>Välkommen till Berga Skafferi, gårdsbutik och café mitt på Närkeslätten. Här kan du handla lokalt producerad mat och dryck från Örebro län samt ta en fika i lantlig miljö.</p>
				<p><a href="https://www.berga.net/">https://www.berga.net/</a></p>`
		},
		{
			name: 'Sallad&',
			img: 'sallad&.jpg',
			body: `<p>Hos Sallad&amp; hittar du uppfriskande juicer, krämiga smoothies och gott kaffe. Testa deras omtyckta rawfoodbollar eller handgjorda praliner.</p>
				<p><a href="https://salladoch.se/">https://salladoch.se/</a></p>`
		},
		{
			name: 'Granelunds Odlingar',
			img: 'granelundsodlingar.jpg',
			body: `<p>De har ett KRAV-märkt självplock där du får uppleva att skörda din egen mat. De har även ett trädgårdscafé där det finns fikabröd, mackor och luncher som såsom sallad, soppa och cåfflor.</p>
				<p><a href="https://www.granelundsodlingar.se/">https://www.granelundsodlingar.se/</a></p>`
		},
		{
			name: 'Egastronomi',
			img: 'egastronomi.jpg',
			body: `<p>Egastronimi är levande matstudio som ordnar allt från bröllop och konferenser till aktivmatlagningskurser och galna middagar!</p>
				<p><a href="https://www.egastronomi.se/">https://www.egastronomi.se/</a></p>`
		}
	];
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

<h1 class="sr-only">Återförsäljare</h1>

<section class="flex flex-col justify-center bg-cream px-4 pt-12 pb-12 text-brand">
	<div class="flex w-full justify-center">
		<div class="w-full max-w-7xl">
			<h2 class="text-center">Återförsäljare</h2>
			<div class="mt-12 grid gap-4 md:grid-cols-3">
				{#each stores as store}
					<article class="text-left">
						<div class="mb-6">
							<img class="inline-block" src="/images/{store.img}" alt={store.name} />
						</div>
						<h3>{store.name}</h3>
						<!-- eslint-disable-next-line svelte/no-at-html-tags — trusted static copy -->
						<div class="markdown mt-4">{@html store.body}</div>
					</article>
				{/each}
			</div>
		</div>
	</div>
</section>
