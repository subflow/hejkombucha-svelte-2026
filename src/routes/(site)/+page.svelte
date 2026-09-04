<script>
	import ContactForm from '$lib/components/ContactForm.svelte';

	const flavours = [
		{
			name: 'Ingefära',
			note: 'Het, rak och lite bitande.',
			img: '/images/bottle-ingefara.png'
		},
		{
			name: 'Hallon',
			note: 'Syrlig, bärig och torr i avslutet.',
			img: '/images/bottle-hallon.png'
		},
		{
			name: 'Blåbär',
			note: 'Mörkt bär, mjuk sötma, frisk syra.',
			img: '/images/bottle-blabar.png'
		}
	];
</script>

<svelte:head>
	<title>Hej Kombucha</title>
	<meta
		name="description"
		content="Kombucha som tillverkas i Örebro med 100% naturliga råvaror..."
	/>
	<meta property="og:title" content="Hej Kombucha" />
	<meta property="og:image" content="https://www.hejkombucha.se/images/og-share2.jpg" />
</svelte:head>

<!-- Hero -->
<section class="relative border-b-[1.5px] border-ink">
	<div
		class="absolute inset-0 bg-cover bg-center bg-no-repeat grayscale contrast-[1.05]"
		style="background-image:url('/images/DSCF0721.jpg')"
	></div>
	<div
		class="absolute inset-0"
		style="background:linear-gradient(90deg, rgba(17,17,17,0.62) 0%, rgba(17,17,17,0.25) 60%, rgba(17,17,17,0.1) 100%)"
	></div>
	<div class="relative mx-auto max-w-[1140px] px-7 pt-24 pb-28 sm:pt-30 sm:pb-35">
		<div class="kicker kicker-paper">Inga konstigheter</div>
		<h1
			class="mt-3.5 mb-7 max-w-[760px] font-display text-[clamp(44px,7vw,84px)] leading-[0.98] font-bold tracking-[-0.02em] text-cream"
		>
			Riktig frukt,<br />naturliga ingredienser.
		</h1>
		<div class="flex flex-wrap gap-3.5">
			<a class="btn btn-primary btn-lg" href="/stores">
				<span>Återförsäljare</span>
				<span aria-hidden="true">→</span>
			</a>
			<a class="btn btn-inverse btn-lg" href="/about">
				<span>Vår historia</span>
			</a>
		</div>
	</div>
</section>

<!-- Quote -->
<section class="border-b-[1.5px] border-ink bg-cream">
	<div class="mx-auto max-w-[860px] px-7 py-24 text-center">
		<blockquote
			class="font-display text-[clamp(26px,4vw,42px)] leading-[1.18] font-medium tracking-[-0.01em] text-ink"
		>
			”Vårat mål är att skapa en produkt med naturliga ingredienser och så lite miljöpåverkan som
			möjligt.”
		</blockquote>
	</div>
</section>

<!-- Flavours -->
<section class="border-b-[1.5px] border-ink bg-white">
	<div class="mx-auto max-w-[1140px] px-7 py-18">
		<div class="kicker">33 cl · bryggt i Lindbacka</div>
		<h2
			class="mt-3 mb-9 font-display text-[clamp(30px,4vw,48px)] font-bold tracking-[-0.02em] text-ink"
		>
			Smakerna
		</h2>
		<div class="grid gap-5 md:grid-cols-3">
			{#each flavours as flavour (flavour.name)}
				<article class="card card-interactive gap-3 p-6">
					<span class="kicker">Kombucha · 33 cl</span>
					<div
						class="flex h-[320px] items-center justify-center border-b-[1.5px] border-ink bg-cream py-4.5"
					>
						<img
							class="block h-full w-auto object-contain"
							src={flavour.img}
							alt="Hej Kombucha {flavour.name}"
						/>
					</div>
					<div
						class="pt-4.5 pb-3.5 font-display text-[40px] leading-none font-bold tracking-[-0.02em] text-brand"
					>
						{flavour.name}
					</div>
					<div class="border-t-[1.5px] border-ink pt-3.5 text-[14px] leading-[1.55]">
						{flavour.note}
					</div>
					<div class="mt-auto pt-3">
						<a class="btn btn-link" href="/stores">
							<span>Hitta i butik</span>
							<span aria-hidden="true">→</span>
						</a>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- Newsletter -->
<section class="border-b-[1.5px] border-ink bg-brand">
	<div class="mx-auto max-w-[720px] px-7 py-22 text-center">
		<div class="kicker kicker-paper">Joina klubben</div>
		<h2
			class="mt-3 mb-3.5 font-display text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.02em] text-cream"
		>
			Få reda på nya smaker först
		</h2>
		<p class="mx-auto mb-7 max-w-[460px] text-[14px] leading-[1.6] text-cream/90">
			Vi delar inte din info och skickar inga (vad vi tycker) onödiga mail. =)
		</p>
		<ContactForm tone="brand" done="Tack! Vi hörs snart." />
	</div>
</section>
