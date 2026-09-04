<script>
	// Newsletter sign-up. Two tones in the design: the red band on the home page
	// and the paper section on /about (which also asks for an address).
	let { tone = 'paper', address = false, done = 'Tack för din anmälan!' } = $props();

	let submitted = $state(false);

	/** @param {SubmitEvent & { currentTarget: HTMLFormElement }} e */
	function handleSubmit(e) {
		e.preventDefault();
		const data = Object.fromEntries(new FormData(e.currentTarget));
		// ponytail: demo only — log instead of POSTing. Wire to a backend when one exists.
		console.log('Sign-up form:', data);
		submitted = true;
		e.currentTarget.reset();
	}
</script>

{#if submitted}
	{#if tone === 'brand'}
		<div class="bg-ink px-5 py-5 text-[14px] text-cream">{done} →</div>
	{:else}
		<p class="text-center text-[15px] text-ink">{done}</p>
	{/if}
{:else}
	<form name="sign-up-form" class="flex flex-col gap-3.5 text-left" onsubmit={handleSubmit}>
		<div class="grid gap-3 sm:grid-cols-2">
			<div>
				<label class="sr-only" for="firstName">Förnamn</label>
				<input
					class="field"
					type="text"
					id="firstName"
					name="firstName"
					required
					placeholder="Förnamn"
				/>
			</div>
			<div>
				<label class="sr-only" for="lastName">Efternamn</label>
				<input class="field" type="text" id="lastName" name="lastName" placeholder="Efternamn" />
			</div>
		</div>

		<div>
			<label class="sr-only" for="email">Mail</label>
			<input class="field" type="email" id="email" name="email" required placeholder="Mail" />
		</div>

		{#if address}
			<div>
				<label class="sr-only" for="address">Adress</label>
				<input class="field" type="text" id="address" name="address" placeholder="Adress" />
			</div>
		{/if}

		<label class="check {tone === 'brand' ? 'text-cream' : 'text-charcoal'}">
			<input type="checkbox" name="updatesConsent" required />
			<span>Japp, jag godkänner att ni kontaktar mig då och då.</span>
		</label>

		<div class={tone === 'brand' ? '' : 'mt-2 text-center'}>
			<button
				type="submit"
				class="btn btn-lg {tone === 'brand' ? 'btn-inverse w-full' : 'btn-primary'}"
			>
				<span>Skicka iväg</span>
				<span aria-hidden="true">→</span>
			</button>
		</div>
	</form>
{/if}
