<script>
	import ContactForm from '$lib/components/ContactForm.svelte';
</script>

<svelte:head>
	<title>Om Oss - Hej Kombucha</title>
	<meta
		name="description"
		content="Läs om Jonas Olsson och historien bakom Hej Kombucha - hur allt började med en placeholder-text och utvecklades till ett bryggeri i Lindbacka bruk."
	/>
	<meta property="og:title" content="Om Oss - Hej Kombucha" />
	<meta property="og:image" content="https://www.hejkombucha.se/images/og-share2.jpg" />
</svelte:head>

<h1 class="sr-only">About</h1>

<!-- Divider -->
<div class="flex w-full justify-center bg-cream pt-0 pb-4 text-brand">
	<div class="h-0 w-full max-w-7xl border-t border-current"></div>
</div>

<!-- Jonas' story -->
<section class="flex flex-col justify-center bg-cream px-4 pt-32 pb-56 text-brand">
	<div class="flex w-full justify-center">
		<div class="w-full max-w-5xl">
			<h2 class="text-left">Så du har startat ett bryggeri?</h2>
			<div class="markdown mt-6 text-left sm:text-lg">
				<p>
					Hur får man för sig att starta ett företag som gör kombucha? Ja det kan man ju fråga sig.
					Det är nog aldrig något jag planerade. Det började bara med att jag gjorde kombucha. Sen
					tyckte jag det vore lite kul att göra en etikett. Jag hade ingen riktig ide till vad
					företaget skulle heta så jag skrev bara "Hej detta är en Kombucha" som en placeholder tills
					jag kom på något bättre(jag har inte kommit på något bättre). Sen började jag ge bort till
					vänner, och alla (många i alla fall) sa att det var gott.
				</p>
				<p>
					Jag chansade lite och provade sälja den via en REKO(rekorderlig konsumtion)-grupp. Redan
					efter första gången jag var med så hörde en resturang av sig och ville köpa in den. Då
					insåg jag att jag behövde ett företag för att kunna sälja den och få lokalen godkänd för
					livsmedelsproduktion. Så allt hände på ett par månader då företaget mer eller mindre fann
					mig istället för att jag försökte skapa ett företag.
				</p>
				<p>
					Nu 2 år senare så har jag en ny lokal, och fortfarande i Lindbacka bruk där det känns som
					att mitt företag hör hemma.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Quote with background image -->
<section class="relative flex flex-col justify-center bg-ink px-4 pt-96 pb-10 text-ink">
	<div
		class="absolute inset-0 bg-cover bg-center bg-no-repeat"
		style="background-image:url('/images/IMG_20210926_174925.jpg');opacity:0.7"
	></div>
	<div class="relative flex w-full justify-center">
		<div class="w-full max-w-7xl">
			<blockquote>
				<div class="text-left text-4xl sm:text-6xl sm:leading-tight"></div>
			</blockquote>
		</div>
	</div>
</section>

<!-- Team -->
<section class="flex flex-col justify-center bg-cream px-4 pt-36 pb-72 text-brand">
	<div class="flex w-full justify-center">
		<div class="w-full max-w-5xl">
			<h2 class="text-center">Teamet</h2>
			<p class="mt-6 text-center text-lg sm:text-xl">
				Det skulle såklart vara kul om det var ett team. Men det är egentligen bara en kille som
				byter keps ett par gånger om dagen.
			</p>
			<div class="mt-12 grid gap-x-14 gap-y-12 sm:mt-20 sm:grid-cols-2">
				<div class="space-y-12 sm:space-y-16">
					<article>
						<div class="mb-4">
							<img
								class="w-full"
								src="/images/69955884_196432721355937_1899488696108041228_n.jpg"
								alt="Jonas Olsson"
							/>
						</div>
						<div>
							<h3 class="text-xl"><span>Jonas</span> <span>Olsson</span></h3>
							<p class="mt-1">Bryggmästare</p>
						</div>
					</article>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Contact -->
<section class="flex flex-col justify-center bg-cream px-4 pt-24 pb-24 text-brand">
	<ContactForm />
</section>

<!-- Divider -->
<div class="flex w-full justify-center bg-cream px-4 pt-4 pb-4 text-brand">
	<div class="h-0 w-full max-w-7xl border-t border-current"></div>
</div>
