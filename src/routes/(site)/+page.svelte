<script>
	import Arrow from '$lib/components/Arrow.svelte';
	import ContactForm from '$lib/components/ContactForm.svelte';
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

<h1 class="sr-only">Home</h1>

<!-- Divider -->
<div class="flex w-full justify-center bg-cream pt-0 pb-6 text-brand">
	<div class="h-0 w-full max-w-7xl border-t border-current"></div>
</div>

<!-- Hero -->
<section class="flex justify-center">
	<div
		class="relative flex w-full max-w-7xl flex-col justify-center bg-cream px-12 pt-20 pb-96 text-brand"
	>
		<div
			class="absolute inset-0 bg-cover bg-center bg-no-repeat"
			style="background-image:url('/images/DSCF0721.jpg');opacity:0.85"
		></div>
		<div class="relative w-full">
			<div class="flex w-full flex-1 flex-col">
				<h2 class="text-left text-5xl font-semibold xs:text-6xl">
					Riktig frukt, naturliga ingredienser.
				</h2>
				<p class="mt-4 text-left text-xl sm:text-2xl">Inga konstigheter</p>
				<div class="mt-8">
					<a class="btn btn-primary lg:whitespace-nowrap" href="/stores">
						<span>Återförsäljare</span>
						<Arrow />
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Quote -->
<section class="flex flex-col justify-center bg-cream px-4 pt-28 pb-36 text-brand">
	<div class="flex w-full justify-center">
		<blockquote class="w-full max-w-7xl">
			<div class="text-center text-4xl sm:text-6xl sm:leading-tight">
				<p>
					"Vårat mål är att skapa en produkt med naturliga ingredienser och så lite miljöpåverkan
					som möjligt."
				</p>
			</div>
		</blockquote>
	</div>
</section>

<!-- Instagram -->
<section class="flex flex-col justify-center bg-brand px-4 pt-36 pb-36 text-cream">
	<div class="flex w-full justify-center">
		<div class="w-full max-w-5xl text-center sm:text-lg">
			<h2>
				<a class="underline hover:no-underline" href="https://www.instagram.com/hejkombucha/"
					><em>Följ oss på instagram</em></a
				>
			</h2>
		</div>
	</div>
</section>

<!-- Feature highlight -->
<section
	class="relative flex flex-col items-center justify-center bg-cream px-4 pt-36 pb-72 text-brand"
>
	<div
		class="absolute inset-0 bg-cover bg-center bg-no-repeat"
		style="background-image:url('/images/DSCF0727-2.jpg');opacity:0.9"
	></div>
	<div class="relative flex w-full max-w-7xl justify-start">
		<div class="card max-w-2xl px-6 py-10 sm:px-12 sm:py-14">
			<h2 class="text-left">Stick och köp kombucha nu!</h2>
			<div class="markdown mt-6 text-left sm:text-lg">
				<p>Här kan du hitta våra återförsäljare.</p>
			</div>
			<div class="mt-8">
				<a class="link lg:whitespace-nowrap" href="/stores">
					<span>Återförsäljare</span>
					<Arrow />
				</a>
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
