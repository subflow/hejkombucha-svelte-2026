<script>
	import { enhance } from '$app/forms';

	let { data, form } = $props();

	/** @param {Date | string} d */
	const fmt = (d) => new Date(d).toLocaleDateString('sv-SE');

	const th = 'p-3 text-[11px] font-medium tracking-[0.14em] uppercase text-brand';
</script>

<svelte:head>
	<title>Admin - Hej Kombucha</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="min-h-screen bg-cream text-ink">
	<header class="border-b-[1.5px] border-ink">
		<div class="mx-auto flex max-w-[1140px] items-center justify-between px-7 py-5">
			<a href="/" class="flex items-center gap-4">
				<img src="/images/hkb2026.png" alt="Hej Kombucha" class="h-10 w-auto" />
				<span class="kicker">Admin</span>
			</a>
			<div class="flex items-center gap-5 text-[13px]">
				<span class="text-muted">{data.user.email}</span>
				<form method="POST" action="?/logout" use:enhance>
					<button type="submit" class="btn btn-secondary btn-sm">Logga ut</button>
				</form>
				<a href="/" class="text-ink hover:text-brand">← Till sajten</a>
			</div>
		</div>
	</header>

	<main class="mx-auto flex max-w-[1140px] flex-col gap-16 px-7 py-12">
		<!-- Nyhetsbrev -->
		<section>
			<div class="kicker">Nyhetsbrev</div>
			<h1 class="mt-2 mb-6 font-display text-4xl font-bold tracking-[-0.02em]">Skicka utskick</h1>

			{#if form?.sent}
				<div class="max-w-[720px] border-[1.5px] border-ink bg-white p-6">
					<div class="kicker mb-2">Skickat</div>
					<p class="text-[14px] leading-[1.6] text-charcoal">
						Utskicket är på väg. Resend-id: <code class="text-ink">{form.sent}</code>
					</p>
				</div>
			{:else}
				<form
					method="POST"
					action="?/sendNewsletter"
					use:enhance
					class="flex max-w-[720px] flex-col gap-3.5"
				>
					<div>
						<label class="sr-only" for="subject">Ämne</label>
						<input
							class="field"
							id="subject"
							name="subject"
							required
							placeholder="Ämne"
							value={form?.subject ?? ''}
						/>
					</div>
					<div>
						<label class="sr-only" for="body">Innehåll</label>
						<textarea
							class="field"
							id="body"
							name="body"
							rows="12"
							required
							placeholder="Skriv i klartext. Tom rad = nytt stycke. Avregistreringslänk läggs till automatiskt längst ner."
							>{form?.body ?? ''}</textarea
						>
					</div>
					<label class="check text-charcoal">
						<input type="checkbox" name="confirm" required />
						<span>
							Ja, skicka till alla {data.subscribers.length} prenumeranter. Det går inte att ångra.
						</span>
					</label>
					{#if form?.error}
						<p class="text-[14px] text-brand">{form.error}</p>
					{/if}
					<div>
						<button type="submit" class="btn btn-primary btn-lg">
							<span>Skicka utskick</span>
							<span aria-hidden="true">→</span>
						</button>
					</div>
				</form>
			{/if}
		</section>

		<!-- Återförsäljaransökningar -->
		<section>
			<div class="kicker">Återförsäljare</div>
			<h2 class="mt-2 mb-6 font-display text-3xl font-bold tracking-[-0.02em]">
				Ansökningar <span class="text-muted">({data.applications.length})</span>
			</h2>

			{#if data.applications.length === 0}
				<p class="text-[14px] text-muted">Inga ansökningar än.</p>
			{:else}
				<div class="overflow-x-auto border-[1.5px] border-ink bg-white">
					<table class="w-full text-left text-[13px]">
						<thead class="border-b-[1.5px] border-ink">
							<tr>
								<th class={th}>Datum</th>
								<th class={th}>Företag</th>
								<th class={th}>Kontakt</th>
								<th class={th}>Ort</th>
								<th class={th}>Meddelande</th>
								<th class={th}>Status</th>
							</tr>
						</thead>
						<tbody>
							{#each data.applications as a (a.id)}
								<tr class="border-b border-ink/15 align-top">
									<td class="p-3 whitespace-nowrap text-muted">{fmt(a.createdAt)}</td>
									<td class="p-3 font-semibold">{a.company}</td>
									<td class="p-3">
										{a.contactName}<br />
										<a href="mailto:{a.email}" class="text-brand underline">{a.email}</a>
										{#if a.phone}<br /><a href="tel:{a.phone}">{a.phone}</a>{/if}
									</td>
									<td class="p-3">{a.city ?? '–'}</td>
									<td class="max-w-[320px] p-3 whitespace-pre-line text-charcoal"
										>{a.message ?? '–'}</td
									>
									<td class="p-3">
										<form method="POST" action="?/setStatus" use:enhance>
											<input type="hidden" name="id" value={a.id} />
											<select
												name="status"
												value={a.status}
												class="field py-1.5 text-[12px] tracking-[0.1em] uppercase"
												onchange={(e) => e.currentTarget.form?.requestSubmit()}
											>
												{#each data.statuses as s (s)}
													<option value={s}>{s}</option>
												{/each}
											</select>
										</form>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
		</section>

		<!-- Prenumeranter -->
		<section>
			<div class="kicker">Nyhetsbrev</div>
			<h2 class="mt-2 mb-6 font-display text-3xl font-bold tracking-[-0.02em]">
				Prenumeranter <span class="text-muted">({data.subscribers.length})</span>
			</h2>

			{#if data.subscribers.length === 0}
				<p class="text-[14px] text-muted">Inga prenumeranter än.</p>
			{:else}
				<div class="overflow-x-auto border-[1.5px] border-ink bg-white">
					<table class="w-full text-left text-[13px]">
						<thead class="border-b-[1.5px] border-ink">
							<tr>
								<th class={th}>Datum</th>
								<th class={th}>Namn</th>
								<th class={th}>Mail</th>
								<th class={th}>Adress</th>
							</tr>
						</thead>
						<tbody>
							{#each data.subscribers as s (s.id)}
								<tr class="border-b border-ink/15">
									<td class="p-3 whitespace-nowrap text-muted">{fmt(s.consentedAt)}</td>
									<td class="p-3">{s.firstName} {s.lastName ?? ''}</td>
									<td class="p-3"
										><a href="mailto:{s.email}" class="text-brand underline">{s.email}</a></td
									>
									<td class="p-3 text-charcoal">{s.address ?? '–'}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
		</section>
		<!-- Admins -->
		<section>
			<div class="kicker">Konton</div>
			<h2 class="mt-2 mb-6 font-display text-3xl font-bold tracking-[-0.02em]">
				Admins <span class="text-muted">({data.admins.length})</span>
			</h2>

			<div class="grid gap-10 md:grid-cols-[1fr_1.4fr]">
				<div>
					<h3 class="mb-3 font-display text-xl font-bold">Bjud in</h3>
					{#if form?.invited}
						<div class="border-[1.5px] border-ink bg-white p-4 text-[14px] leading-[1.6]">
							Inbjudan skickad till <strong>{form.invited}</strong>. Länken gäller i 24 timmar.
						</div>
					{:else}
						<form method="POST" action="?/invite" use:enhance class="flex flex-col gap-3">
							<div>
								<label class="sr-only" for="invite-name">Namn</label>
								<input
									class="field"
									id="invite-name"
									name="name"
									required
									placeholder="Namn"
									value={form?.name ?? ''}
								/>
							</div>
							<div>
								<label class="sr-only" for="invite-email">Mail</label>
								<input
									class="field"
									type="email"
									id="invite-email"
									name="email"
									required
									placeholder="Mail"
									value={form?.email ?? ''}
								/>
							</div>
							{#if form?.inviteError}
								<p class="text-[14px] text-brand">{form.inviteError}</p>
							{/if}
							<div>
								<button type="submit" class="btn btn-primary">
									<span>Skicka inbjudan</span>
									<span aria-hidden="true">→</span>
								</button>
							</div>
						</form>
					{/if}
				</div>

				<div class="overflow-x-auto border-[1.5px] border-ink bg-white">
					<table class="w-full text-left text-[13px]">
						<thead class="border-b-[1.5px] border-ink">
							<tr>
								<th class={th}>Namn</th>
								<th class={th}>Mail</th>
								<th class={th}>Skapad</th>
							</tr>
						</thead>
						<tbody>
							{#each data.admins as a (a.id)}
								<tr class="border-b border-ink/15">
									<td class="p-3">{a.name}</td>
									<td class="p-3">{a.email}</td>
									<td class="p-3 whitespace-nowrap text-muted">{fmt(a.createdAt)}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	</main>
</div>
