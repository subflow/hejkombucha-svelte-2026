<script>
	import { enhance } from '$app/forms';

	let { data, form } = $props();
</script>

<svelte:head>
	<title>Sätt lösenord - Hej Kombucha admin</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-cream px-7 py-12 text-ink">
	<div class="w-full max-w-[420px]">
		<a href="/" class="mb-10 flex items-center gap-4">
			<img src="/images/hkb2026.png" alt="Hej Kombucha" class="h-10 w-auto" />
			<span class="kicker">Admin</span>
		</a>

		{#if !data.token}
			<h1 class="mb-6 font-display text-4xl font-bold tracking-[-0.02em]">Länken gäller inte</h1>
			<p class="text-[15px] leading-[1.6] text-charcoal">
				Länken är ogiltig eller har gått ut. Be om en ny via <em>Glömt lösenord?</em> på
				<a href="/admin/login" class="text-brand underline">inloggningen</a>.
			</p>
		{:else}
			<h1 class="mb-6 font-display text-4xl font-bold tracking-[-0.02em]">Sätt lösenord</h1>

			<form method="POST" action="?/reset" use:enhance class="flex flex-col gap-3.5">
				<input type="hidden" name="token" value={data.token} />
				<div>
					<label class="sr-only" for="password">Nytt lösenord</label>
					<input
						class="field"
						type="password"
						id="password"
						name="password"
						required
						minlength="8"
						autocomplete="new-password"
						placeholder="Nytt lösenord (minst 8 tecken)"
					/>
				</div>
				<div>
					<label class="sr-only" for="confirm">Upprepa lösenordet</label>
					<input
						class="field"
						type="password"
						id="confirm"
						name="confirm"
						required
						minlength="8"
						autocomplete="new-password"
						placeholder="Upprepa lösenordet"
					/>
				</div>
				{#if form?.error}
					<p class="text-[14px] text-brand">{form.error}</p>
				{/if}
				<button type="submit" class="btn btn-primary btn-lg">
					<span>Spara lösenord</span>
					<span aria-hidden="true">→</span>
				</button>
			</form>
		{/if}
	</div>
</div>
