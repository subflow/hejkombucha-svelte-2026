<script>
	import { enhance } from '$app/forms';

	let { form } = $props();
</script>

<svelte:head>
	<title>Bli återförsäljare - Hej Kombucha</title>
	<meta
		name="description"
		content="Vill du sälja Hej Kombucha i din butik, ditt kafé eller din restaurang? Hör av dig så berättar vi mer."
	/>
	<meta property="og:title" content="Bli återförsäljare - Hej Kombucha" />
	<meta property="og:image" content="https://www.hejkombucha.se/images/og-share2.jpg" />
</svelte:head>

<section class="bg-cream">
	<div class="mx-auto max-w-[720px] px-7 pt-18 pb-24">
		<div class="kicker">För butiker, kaféer och restauranger</div>
		<h1
			class="mt-3.5 mb-6 font-display text-[clamp(34px,5vw,60px)] leading-none font-bold tracking-[-0.02em] text-ink"
		>
			Bli återförsäljare
		</h1>
		<p class="mb-10 max-w-[560px] text-[16px] leading-[1.7] text-charcoal">
			Vill du ha Hej Kombucha i din butik, ditt kafé eller din restaurang? Berätta lite om er så hör
			vi av oss.
		</p>

		{#if form?.ok}
			<div class="border-[1.5px] border-ink bg-white p-6">
				<div class="kicker mb-2">Tack!</div>
				<p class="text-[15px] leading-[1.6] text-charcoal">
					Vi har fått din ansökan och hör av oss så snart vi kan.
				</p>
			</div>
		{:else}
			<form method="POST" action="?/apply" use:enhance class="flex flex-col gap-3.5">
				<!-- Honeypot — dolt för människor, bottar fyller i det. -->
				<input
					type="text"
					name="website"
					tabindex="-1"
					autocomplete="off"
					class="hidden"
					aria-hidden="true"
				/>

				<div class="grid gap-3 sm:grid-cols-2">
					<div>
						<label class="sr-only" for="company">Företag</label>
						<input
							class="field"
							id="company"
							name="company"
							required
							placeholder="Företag *"
							value={form?.values?.company ?? ''}
						/>
					</div>
					<div>
						<label class="sr-only" for="contactName">Kontaktperson</label>
						<input
							class="field"
							id="contactName"
							name="contactName"
							required
							placeholder="Kontaktperson *"
							value={form?.values?.contactName ?? ''}
						/>
					</div>
				</div>

				<div class="grid gap-3 sm:grid-cols-2">
					<div>
						<label class="sr-only" for="email">Mail</label>
						<input
							class="field"
							type="email"
							id="email"
							name="email"
							required
							placeholder="Mail *"
							value={form?.values?.email ?? ''}
						/>
					</div>
					<div>
						<label class="sr-only" for="phone">Telefon</label>
						<input
							class="field"
							type="tel"
							id="phone"
							name="phone"
							placeholder="Telefon"
							value={form?.values?.phone ?? ''}
						/>
					</div>
				</div>

				<div>
					<label class="sr-only" for="city">Ort</label>
					<input
						class="field"
						id="city"
						name="city"
						placeholder="Ort"
						value={form?.values?.city ?? ''}
					/>
				</div>

				<div>
					<label class="sr-only" for="message">Meddelande</label>
					<textarea
						class="field"
						id="message"
						name="message"
						rows="5"
						placeholder="Berätta om er — typ av verksamhet, ungefärliga volymer, frågor."
						>{form?.values?.message ?? ''}</textarea
					>
				</div>

				{#if form?.error}
					<p class="text-[14px] text-brand">{form.error}</p>
				{/if}

				<div class="mt-2">
					<button type="submit" class="btn btn-primary btn-lg">
						<span>Skicka ansökan</span>
						<span aria-hidden="true">→</span>
					</button>
				</div>
			</form>
		{/if}
	</div>
</section>
