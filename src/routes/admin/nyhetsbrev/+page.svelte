<script>
	import { enhance } from '$app/forms';

	let { data, form } = $props();

	/**
	 * Ett block i mailet. Alla fält finns på alla block så formuläret kan binda fritt;
	 * servern plockar bara ut de som hör till typen.
	 * @typedef {{ id: string, type: 'heading' | 'text' | 'image' | 'button' | 'divider',
	 *   text: string, src: string, alt: string, label: string, href: string }} Block
	 */

	const TYPES = /** @type {const} */ ([
		['heading', 'Rubrik'],
		['text', 'Text'],
		['image', 'Bild'],
		['button', 'Knapp'],
		['divider', 'Linje']
	]);
	const LABEL = Object.fromEntries(TYPES);

	/** @param {Block['type']} type @returns {Block} */
	const blank = (type) => ({
		id: crypto.randomUUID(),
		type,
		text: '',
		src: '',
		alt: '',
		label: '',
		href: ''
	});

	let subject = $state('');
	let previewText = $state('');
	/** @type {Block[]} */
	let blocks = $state([blank('heading'), blank('text')]);
	let confirm = $state(false);

	/** @param {number} i @param {-1 | 1} dir */
	function move(i, dir) {
		const j = i + dir;
		if (j < 0 || j >= blocks.length) return;
		[blocks[i], blocks[j]] = [blocks[j], blocks[i]];
	}

	/**
	 * Blocken serialiseras i submit-ögonblicket — inte via ett reaktivt hidden-fält — så det
	 * som skickas alltid är exakt det som står i editorn.
	 * @type {import("@sveltejs/kit").SubmitFunction}
	 */
	const submit = ({ formData }) => {
		formData.set('blocks', JSON.stringify(blocks));
		// Behåll det som står i editorn efter förhandsgranskning/test — enhance nollställer annars formuläret.
		return async ({ update }) => update({ reset: false });
	};
</script>

<svelte:head>
	<title>Nyhetsbrev - Hej Kombucha admin</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="min-h-screen bg-cream text-ink">
	<header class="border-b-[1.5px] border-ink">
		<div class="mx-auto flex max-w-[1400px] items-center justify-between px-7 py-5">
			<a href="/admin" class="flex items-center gap-4">
				<img src="/images/hkb2026.png" alt="Hej Kombucha" class="h-10 w-auto" />
				<span class="kicker">Admin · Nyhetsbrev</span>
			</a>
			<a href="/admin" class="text-[13px] text-ink hover:text-brand">← Till admin</a>
		</div>
	</header>

	<main class="mx-auto max-w-[1400px] px-7 py-12">
		{#if form?.sent}
			<div class="max-w-[720px] border-[1.5px] border-ink bg-white p-8">
				<div class="kicker mb-2">Skickat</div>
				<h1 class="mb-3 font-display text-3xl font-bold tracking-[-0.02em]">Utskicket är på väg</h1>
				<p class="text-[14px] leading-[1.6] text-charcoal">
					Resend levererar till alla {data.subscriberCount} prenumeranter. Utskicks-id:
					<code class="text-ink">{form.sent}</code>
				</p>
				<a href="/admin/nyhetsbrev" class="btn btn-primary mt-6">
					<span>Nytt utskick</span>
					<span aria-hidden="true">→</span>
				</a>
			</div>
		{:else}
			<div class="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
				<!-- Editor -->
				<form method="POST" use:enhance={submit} class="flex flex-col gap-6">
					<div>
						<div class="kicker">Nyhetsbrev</div>
						<h1 class="mt-2 font-display text-4xl font-bold tracking-[-0.02em]">Nytt utskick</h1>
					</div>

					<div class="flex flex-col gap-3">
						<div>
							<label class="sr-only" for="subject">Ämne</label>
							<input
								class="field"
								id="subject"
								name="subject"
								required
								placeholder="Ämne"
								bind:value={subject}
							/>
						</div>
						<div>
							<label class="sr-only" for="previewText">Förhandstext</label>
							<input
								class="field"
								id="previewText"
								name="previewText"
								placeholder="Förhandstext — raden som syns i inkorgen under ämnet"
								bind:value={previewText}
							/>
						</div>
					</div>

					<!-- Block -->
					<div class="flex flex-col gap-3">
						{#each blocks as b, i (b.id)}
							<div class="card gap-3 p-4">
								<div class="flex items-center justify-between">
									<span class="kicker">{LABEL[b.type]}</span>
									<div class="flex gap-1">
										<button
											type="button"
											class="chip px-2.5 py-1"
											onclick={() => move(i, -1)}
											disabled={i === 0}
											aria-label="Flytta upp">↑</button
										>
										<button
											type="button"
											class="chip px-2.5 py-1"
											onclick={() => move(i, 1)}
											disabled={i === blocks.length - 1}
											aria-label="Flytta ner">↓</button
										>
										<button
											type="button"
											class="chip px-2.5 py-1"
											onclick={() => blocks.splice(i, 1)}
											aria-label="Ta bort">✕</button
										>
									</div>
								</div>

								{#if b.type === 'heading'}
									<input class="field" placeholder="Rubrik" bind:value={b.text} />
								{:else if b.type === 'text'}
									<textarea
										class="field"
										rows="5"
										placeholder="Skriv text. Tom rad blir nytt stycke. Webbadresser blir klickbara länkar."
										bind:value={b.text}></textarea>
								{:else if b.type === 'image'}
									<input class="field" placeholder="Bildadress (https://…)" bind:value={b.src} />
									<input
										class="field"
										placeholder="Kort beskrivning av bilden, för den som inte ser den"
										bind:value={b.alt}
									/>
									{#if b.src}
										<img
											src={b.src}
											alt={b.alt}
											class="max-h-40 w-auto border-[1.5px] border-ink object-contain"
										/>
									{/if}
								{:else if b.type === 'button'}
									<input class="field" placeholder="Knapptext" bind:value={b.label} />
									<input class="field" placeholder="Länk (https://…)" bind:value={b.href} />
								{:else}
									<p class="text-[13px] text-muted">En tunn linje mellan två delar.</p>
								{/if}
							</div>
						{/each}
					</div>

					<div class="flex flex-wrap gap-2">
						{#each TYPES as [type, label] (type)}
							<button type="button" class="chip" onclick={() => blocks.push(blank(type))}>
								+ {label}
							</button>
						{/each}
					</div>

					{#if form?.error}
						<p class="text-[14px] text-brand">{form.error}</p>
					{/if}
					{#if form?.tested}
						<p class="border-[1.5px] border-ink bg-white p-4 text-[14px]">
							Testmail skickat till <strong>{form.tested}</strong>. Kolla inkorgen.
						</p>
					{/if}

					<div class="flex flex-wrap gap-3 border-t-[1.5px] border-ink pt-6">
						<button type="submit" formaction="?/preview" class="btn btn-secondary">
							Förhandsgranska
						</button>
						<button type="submit" formaction="?/test" class="btn btn-secondary">
							Skicka test till mig
						</button>
					</div>

					<div class="flex flex-col gap-4 border-[1.5px] border-ink bg-white p-5">
						<label class="check text-charcoal">
							<input type="checkbox" name="confirm" bind:checked={confirm} />
							<span>
								Ja, skicka till alla {data.subscriberCount} prenumeranter. Det går inte att ångra.
							</span>
						</label>
						<div>
							<button
								type="submit"
								formaction="?/send"
								class="btn btn-primary btn-lg"
								disabled={!confirm}
							>
								<span>Skicka till alla</span>
								<span aria-hidden="true">→</span>
							</button>
						</div>
					</div>
				</form>

				<!-- Förhandsgranskning -->
				<aside class="lg:sticky lg:top-8 lg:self-start">
					<div class="kicker mb-3">Förhandsgranskning</div>
					{#if form?.html}
						<iframe
							title="Förhandsgranskning av mailet"
							srcdoc={form.html}
							sandbox=""
							class="h-[780px] w-full border-[1.5px] border-ink bg-white"
						></iframe>
					{:else}
						<div
							class="flex h-[780px] items-center justify-center border-[1.5px] border-dashed border-ink/40 p-8 text-center text-[14px] text-muted"
						>
							Klicka <em>Förhandsgranska</em> för att se mailet som det kommer att se ut.
						</div>
					{/if}
				</aside>
			</div>
		{/if}
	</main>
</div>
