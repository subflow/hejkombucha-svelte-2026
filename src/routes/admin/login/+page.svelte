<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/state';

	let { form } = $props();

	let forgot = $state(false);
	const justReset = $derived(page.url.searchParams.has('reset'));
	const showForgot = $derived(forgot || !!form?.sent);
</script>

<svelte:head>
	<title>Logga in - Hej Kombucha admin</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-cream px-7 py-12 text-ink">
	<div class="w-full max-w-[420px]">
		<a href="/" class="mb-10 flex items-center gap-4">
			<img src="/images/hkb2026.png" alt="Hej Kombucha" class="h-10 w-auto" />
			<span class="kicker">Admin</span>
		</a>

		{#if !showForgot}
			<h1 class="mb-6 font-display text-4xl font-bold tracking-[-0.02em]">Logga in</h1>

			{#if justReset}
				<p class="mb-5 border-[1.5px] border-ink bg-white p-4 text-[14px] leading-[1.6]">
					Lösenordet är sparat. Logga in med det nya.
				</p>
			{/if}

			<form method="POST" action="?/login" use:enhance class="flex flex-col gap-3.5">
				<div>
					<label class="sr-only" for="email">Mail</label>
					<input
						class="field"
						type="email"
						id="email"
						name="email"
						required
						autocomplete="email"
						placeholder="Mail"
						value={form?.email ?? ''}
					/>
				</div>
				<div>
					<label class="sr-only" for="password">Lösenord</label>
					<input
						class="field"
						type="password"
						id="password"
						name="password"
						required
						autocomplete="current-password"
						placeholder="Lösenord"
					/>
				</div>
				{#if form?.error}
					<p class="text-[14px] text-brand">{form.error}</p>
				{/if}
				<button type="submit" class="btn btn-primary btn-lg">
					<span>Logga in</span>
					<span aria-hidden="true">→</span>
				</button>
				<button type="button" class="btn btn-link self-start" onclick={() => (forgot = true)}>
					Glömt lösenord?
				</button>
			</form>
		{:else}
			<h1 class="mb-6 font-display text-4xl font-bold tracking-[-0.02em]">Nytt lösenord</h1>

			{#if form?.sent}
				<p class="border-[1.5px] border-ink bg-white p-4 text-[14px] leading-[1.6]">
					Om adressen finns hos oss har vi skickat en länk för att sätta nytt lösenord. Kolla
					inkorgen — länken gäller i 24 timmar.
				</p>
			{:else}
				<form method="POST" action="?/forgot" use:enhance class="flex flex-col gap-3.5">
					<div>
						<label class="sr-only" for="forgot-email">Mail</label>
						<input
							class="field"
							type="email"
							id="forgot-email"
							name="email"
							required
							autocomplete="email"
							placeholder="Mail"
						/>
					</div>
					{#if form?.error}
						<p class="text-[14px] text-brand">{form.error}</p>
					{/if}
					<button type="submit" class="btn btn-primary btn-lg">
						<span>Skicka länk</span>
						<span aria-hidden="true">→</span>
					</button>
					<button type="button" class="btn btn-link self-start" onclick={() => (forgot = false)}>
						← Tillbaka
					</button>
				</form>
			{/if}
		{/if}
	</div>
</div>
