<script>
	const nav = [
		{ href: '/', label: 'Hem' },
		{ href: '/drinkar', label: 'Drinkar' },
		{ href: '/stores', label: 'Återförsäljare' },
		{ href: '/bli-aterforsaljare', label: 'Bli återförsäljare' },
		// { href: '/blog', label: 'Aktuellt' }, // hidden for now — re-enable when there are fresh posts
		{ href: '/about', label: 'Om oss' }
	];

	const year = new Date().getFullYear();
</script>

<footer class="border-t-[1.5px] border-ink bg-ink text-cream">
	<div class="mx-auto max-w-[1140px] px-7 pt-16 pb-7">
		<div class="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
			<div>
				<h3 class="mb-3 font-display text-4xl font-bold tracking-[-0.02em] text-cream">Säg Hej</h3>
				<p class="max-w-[320px] text-[13px] leading-[1.7] text-cream/70">
					Nedan finns lite olika sätt att nå oss. Snabbast svar är via telefon eller instagram.
				</p>
			</div>

			<div>
				<div class="kicker mb-4">Meny</div>
				<ul class="flex flex-col gap-2.5">
					{#each nav as { href, label } (href)}
						<li>
							<a {href} class="text-[13px] text-cream no-underline hover:text-brand">{label}</a>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<div class="kicker mb-4">Kontakt</div>
				<ul class="flex flex-col gap-2.5 text-[13px] text-cream/85">
					<li><a href="tel:+46704171239" class="hover:text-brand">+46 70 417 12 39</a></li>
					<li><a href="mailto:yo@hejkombucha.se" class="hover:text-brand">yo@hejkombucha.se</a></li>
					<li>
						<a
							href="https://www.google.com/maps/search/Lindbacka 403, 705 93 Lindbacka"
							target="_blank"
							rel="noopener noreferrer"
							class="hover:text-brand">Lindbacka 403, 705 93 Örebro</a
						>
					</li>
					<li class="flex gap-3.5 pt-1.5">
						<a
							href="https://www.instagram.com/hejkombucha/"
							target="_blank"
							rel="noopener noreferrer"
							class="text-cream hover:text-brand">Instagram</a
						>
						<a
							href="https://www.facebook.com/hejkombucha"
							target="_blank"
							rel="noopener noreferrer"
							class="text-cream hover:text-brand">Facebook</a
						>
					</li>
				</ul>
			</div>
		</div>

		<div
			class="mt-12 flex flex-col gap-2 border-t-[1.5px] border-cream/20 pt-5 text-[11px] tracking-[0.06em] text-cream/50 sm:flex-row sm:justify-between"
		>
			<span>© {year} Hej Kombucha — Örebro</span>
			<span>Powered by <a href="https://www.subflow.se/" class="hover:text-brand">Subflow</a></span>
		</div>
	</div>
</footer>
