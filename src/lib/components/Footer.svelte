<script>
	const nav = [
		{ href: '/', label: 'Hem' },
		{ href: '/stores', label: 'Återförsäljare' },
		// { href: '/blog', label: 'Aktuellt' }, // hidden for now — re-enable when there are fresh posts
		{ href: '/about', label: 'Om oss' }
	];
</script>

<footer class="bg-cream px-4 py-16 text-brand">
	<div class="mx-auto max-w-7xl">
		<div class="flex flex-col items-center pb-20 text-center">
			<div class="mb-20">
				<a class="flex items-center justify-center font-display" href="/">
					<span class="text-3xl font-medium">Säg Hej</span>
				</a>
				<div class="markdown mt-8 max-w-2xl">
					<p>
						Nedan finns lite olika sätt att nå oss.<br />
						Snabbast svar är via telefon eller instagram.
					</p>
				</div>
			</div>

			<div class="w-full max-w-5xl">
				<ul class="mb-6 flex flex-wrap justify-evenly text-lg">
					{#each nav as { href, label }}
						<li class="mx-4 mb-2"><a class="link" {href}><span>{label}</span></a></li>
					{/each}
					<li class="mx-4 mb-2">
						<a href="mailto:yo@hejkombucha.se" aria-label="Maila oss" class="link">
							<svg
								class="order-first mr-1.5 h-5 w-5 fill-current"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M3 7.921l8.427 5.899c0.34 0.235 0.795 0.246 1.147 0l8.426-5.899v10.079c0 0.272-0.11 0.521-0.295 0.705s-0.433 0.295-0.705 0.295h-16c-0.272 0-0.521-0.11-0.705-0.295s-0.295-0.433-0.295-0.705zM1 5.983c0 0.010 0 0.020 0 0.030v11.987c0 0.828 0.34 1.579 0.88 2.12s1.292 0.88 2.12 0.88h16c0.828 0 1.579-0.34 2.12-0.88s0.88-1.292 0.88-2.12v-11.988c0-0.010 0-0.020 0-0.030-0.005-0.821-0.343-1.565-0.88-2.102-0.541-0.54-1.292-0.88-2.12-0.88h-16c-0.828 0-1.579 0.34-2.12 0.88-0.537 0.537-0.875 1.281-0.88 2.103zM20.894 5.554l-8.894 6.225-8.894-6.225c0.048-0.096 0.112-0.183 0.188-0.259 0.185-0.185 0.434-0.295 0.706-0.295h16c0.272 0 0.521 0.11 0.705 0.295 0.076 0.076 0.14 0.164 0.188 0.259z"
								></path>
							</svg>
							<span>Säg Hej via mail</span>
						</a>
					</li>
				</ul>
			</div>

			<div class="flex flex-wrap justify-evenly">
				<ul class="mx-4 mb-4 flex items-center justify-center">
					<li class="mx-4 mb-2">
						<a
							href="https://www.instagram.com/hejkombucha/"
							aria-label="Instagram"
							class="social"
						>
							<span class="sr-only">Instagram</span>
							<svg class="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M12 0c-3.26 0-3.667 0.015-4.947 0.072-1.278 0.060-2.148 0.261-2.913 0.558-0.789 0.306-1.459 0.717-2.126 1.384s-1.079 1.336-1.384 2.126c-0.297 0.765-0.499 1.635-0.558 2.913-0.060 1.28-0.072 1.687-0.072 4.947s0.015 3.667 0.072 4.947c0.060 1.277 0.261 2.148 0.558 2.913 0.306 0.788 0.717 1.459 1.384 2.126s1.336 1.079 2.126 1.384c0.766 0.296 1.636 0.499 2.913 0.558 1.28 0.060 1.687 0.072 4.947 0.072s3.667-0.015 4.947-0.072c1.277-0.060 2.148-0.262 2.913-0.558 0.788-0.306 1.459-0.718 2.126-1.384 0.666-0.667 1.079-1.335 1.384-2.126 0.296-0.765 0.499-1.636 0.558-2.913 0.060-1.28 0.072-1.687 0.072-4.947s-0.015-3.667-0.072-4.947c-0.060-1.277-0.262-2.149-0.558-2.913-0.306-0.789-0.718-1.459-1.384-2.126-0.667-0.667-1.335-1.079-2.126-1.384-0.765-0.297-1.636-0.499-2.913-0.558-1.28-0.060-1.687-0.072-4.947-0.072zM12 2.16c3.203 0 3.585 0.016 4.85 0.071 1.17 0.055 1.805 0.249 2.227 0.415 0.562 0.217 0.96 0.477 1.382 0.896 0.419 0.42 0.679 0.819 0.896 1.381 0.164 0.422 0.36 1.057 0.413 2.227 0.057 1.266 0.070 1.646 0.070 4.85s-0.015 3.585-0.074 4.85c-0.061 1.17-0.256 1.805-0.421 2.227-0.224 0.562-0.479 0.96-0.899 1.382-0.419 0.419-0.824 0.679-1.38 0.896-0.42 0.164-1.065 0.36-2.235 0.413-1.274 0.057-1.649 0.070-4.859 0.070-3.211 0-3.586-0.015-4.859-0.074-1.171-0.061-1.816-0.256-2.236-0.421-0.569-0.224-0.96-0.479-1.379-0.899-0.421-0.419-0.69-0.824-0.9-1.38-0.165-0.42-0.359-1.065-0.42-2.235-0.045-1.26-0.061-1.649-0.061-4.844 0-3.196 0.016-3.586 0.061-4.861 0.061-1.17 0.255-1.814 0.42-2.234 0.21-0.57 0.479-0.96 0.9-1.381 0.419-0.419 0.81-0.689 1.379-0.898 0.42-0.166 1.051-0.361 2.221-0.421 1.275-0.045 1.65-0.060 4.859-0.060l0.045 0.030zM12 5.838c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zM19.846 5.595c0 0.795-0.646 1.44-1.44 1.44-0.795 0-1.44-0.646-1.44-1.44s0.646-1.439 1.44-1.439c0.793-0.001 1.44 0.645 1.44 1.439z"
								></path>
							</svg>
						</a>
					</li>
					<li class="mx-4 mb-2">
						<a href="https://www.facebook.com/hejkombucha" aria-label="Facebook" class="social">
							<span class="sr-only">Facebook</span>
							<svg class="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686 0.235 2.686 0.235v2.953h-1.514c-1.491 0-1.956 0.925-1.956 1.874v2.25h3.328l-0.532 3.47h-2.796v8.385c5.738-0.901 10.126-5.866 10.126-11.855z"
								></path>
							</svg>
						</a>
					</li>
				</ul>

				<div class="mx-4 mb-4 flex flex-wrap justify-center">
					<p class="mx-4 mb-2"><a href="tel:+46704171239" aria-label="Vårat telefonnummer">+46704171239</a></p>
					<p class="mx-4 mb-2"><a href="mailto:yo@hejkombucha.se" aria-label="Våran email">yo@hejkombucha.se</a></p>
					<p class="mx-4 mb-2">
						<a
							href="https://www.google.com/maps/search/Lindbacka 403, 705 93 Lindbacka"
							aria-label="Vår adress"
							target="_blank"
							rel="noopener noreferrer">Lindbacka 403, 705 93 Lindbacka</a
						>
					</p>
				</div>
			</div>
		</div>

		<div
			class="flex flex-col-reverse items-center border-t-2 border-current pt-8 lg:flex-row lg:items-start lg:justify-between"
		>
			<p class="markdown mt-6 lg:mt-0">Powered by <a href="https://www.subflow.se/">Subflow</a></p>
			<ul class="flex flex-wrap justify-center">
				<li class="mx-4 mb-2 lg:mr-0 lg:ml-8"><a class="link" href="/"><span>Privacy Policy</span></a></li>
				<li class="mx-4 mb-2 lg:mr-0 lg:ml-8"><a class="link" href="/"><span>Terms &amp; Conditions</span></a></li>
			</ul>
		</div>
	</div>
</footer>
