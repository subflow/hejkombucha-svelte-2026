<script>
	// Demo newsletter form — mirrors the original static site (no backend yet).
	let submitted = $state(false);

	function handleSubmit(e) {
		e.preventDefault();
		const data = Object.fromEntries(new FormData(e.currentTarget));
		// ponytail: demo only — log instead of POSTing. Wire to a backend/Netlify forms when one exists.
		console.log('Sign-up form:', data);
		submitted = true;
		e.currentTarget.reset();
	}
</script>

<div class="mx-auto max-w-5xl">
	<h2 class="text-center">Joina klubben</h2>
	<div class="markdown mt-4 text-center">
		<p>
			Vill du vara en av de som får reda på aktiviteter runt bryggeriet, eller när vi skapat nya
			smaker eller annan info runt vårat företag? Fyll i dina kontaktuppgifter nedan i så fall. =)
		</p>
		<p>Vi kommer inte dela informationen eller skicka några (vad vi tycker) onödiga mail.</p>
	</div>

	{#if submitted}
		<p class="mt-12 text-center text-lg">Tack för din anmälan! 🎉</p>
	{:else}
		<form class="mt-12 inline-block w-full" name="sign-up-form" onsubmit={handleSubmit}>
			<div class="grid sm:grid-cols-2 sm:gap-x-4">
				<div class="mb-4">
					<label class="sr-only" for="firstName">Förnamn</label>
					<input class="field" type="text" id="firstName" name="firstName" required placeholder="Förnamn" />
				</div>
				<div class="mb-4">
					<label class="sr-only" for="lastName">Efternamn</label>
					<input class="field" type="text" id="lastName" name="lastName" placeholder="Efternamn" />
				</div>
				<div class="mb-4 sm:col-span-2">
					<label class="sr-only" for="email">Mail</label>
					<input class="field" type="email" id="email" name="email" required placeholder="Mail" />
				</div>
				<div class="mb-4 sm:col-span-2">
					<label class="sr-only" for="address">Adress</label>
					<input class="field" type="text" id="address" name="address" placeholder="Adress" />
				</div>
				<div class="mb-4 flex items-center sm:col-span-2">
					<input class="mr-3 h-6 w-6 flex-shrink-0" type="checkbox" id="updatesConsent" name="updatesConsent" required />
					<label for="updatesConsent">Japp, jag godkänner att ni kontaktar mig då och då.</label>
				</div>
			</div>
			<div class="mt-4 text-center">
				<button type="submit" class="btn btn-primary">Skicka iväg →</button>
			</div>
		</form>
	{/if}
</div>
