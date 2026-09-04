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

<section class="bg-cream">
	<!-- Story -->
	<div class="mx-auto max-w-[720px] px-7 pt-18 pb-10">
		<div class="kicker">Om oss</div>
		<h1
			class="mt-3.5 mb-8 font-display text-[clamp(34px,5vw,60px)] leading-none font-bold tracking-[-0.02em] text-ink"
		>
			Så du har startat ett bryggeri?
		</h1>
		<div class="flex flex-col gap-5 text-[16px] leading-[1.7] text-charcoal">
			<p>
				Hur får man för sig att starta ett företag som gör kombucha? Ja det kan man ju fråga sig.
				Det är nog aldrig något jag planerade. Det började bara med att jag gjorde kombucha. Sen
				tyckte jag det vore lite kul att göra en etikett. Jag hade ingen riktig idé till vad
				företaget skulle heta så jag skrev bara <strong>”Hej detta är en Kombucha”</strong> som en placeholder
				tills jag kom på något bättre (jag har inte kommit på något bättre). Sen började jag ge bort till
				vänner, och alla (många i alla fall) sa att det var gott.
			</p>
			<p>
				Jag chansade lite och provade sälja den via en REKO(rekorderlig konsumtion)-grupp. Redan
				efter första gången jag var med så hörde en restaurang av sig och ville köpa in den. Då
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

	<!-- Brewery -->
	<div class="mx-auto max-w-[1140px] px-7">
		<img
			class="block h-[420px] w-full border-[1.5px] border-ink object-cover grayscale contrast-[1.05]"
			src="/images/IMG_20210926_174925.jpg"
			alt="Lindbacka bruk"
		/>
	</div>

	<!-- Team -->
	<div class="mx-auto max-w-[900px] px-7 pt-14 pb-6">
		<div class="divider">
			<span class="kicker whitespace-nowrap">Teamet</span>
		</div>
		<p class="mx-auto mt-6 mb-9 max-w-[520px] text-center text-[14px] leading-[1.6] text-muted">
			Det skulle såklart vara kul om det var ett team. Men det är egentligen bara en kille som byter
			keps ett par gånger om dagen.
		</p>
		<div class="grid items-end gap-8 sm:grid-cols-2">
			<article>
				<img
					class="block w-full border-[1.5px] border-ink"
					src="/images/69955884_196432721355937_1899488696108041228_n.jpg"
					alt="Jonas Olsson"
				/>
				<h2 class="mt-4 mb-1 font-display text-2xl font-bold tracking-[-0.01em] text-ink">
					Jonas Olsson
				</h2>
				<p class="text-[13px] tracking-[0.08em] uppercase text-brand">Bryggmästare</p>
			</article>
		</div>
	</div>

	<!-- Newsletter -->
	<div class="mx-auto max-w-[720px] px-7 pt-16 pb-24">
		<h2
			class="mb-3.5 text-center font-display text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.02em] text-ink"
		>
			Joina klubben
		</h2>
		<div
			class="mx-auto mb-8 flex max-w-[520px] flex-col gap-3 text-center text-[14px] leading-[1.7] text-charcoal"
		>
			<p>
				Vill du vara en av de som får reda på aktiviteter runt bryggeriet, eller när vi skapat nya
				smaker eller annan info runt vårat företag? Fyll i dina kontaktuppgifter nedan i så fall. =)
			</p>
			<p class="text-muted">
				Vi kommer inte dela informationen eller skicka några (vad vi tycker) onödiga mail.
			</p>
		</div>

		<ContactForm address />

		<div class="mt-12 text-center">
			<a class="btn btn-secondary" href="/stores">
				<span>Hitta vår kombucha</span>
				<span aria-hidden="true">→</span>
			</a>
		</div>
	</div>
</section>
