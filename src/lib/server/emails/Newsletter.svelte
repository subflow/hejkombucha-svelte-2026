<script lang="ts">
	// Nyhetsbrevsmallen. Renderas server-side av @better-svelte-email/server, som gör om
	// Tailwind-klasserna till inlinade stilar (e-postklienter läser ingen <style>).
	// Varumärkets färger skrivs som literaler — mallens Tailwind känner inte till app.css.
	import {
		Body,
		Button,
		Container,
		Head,
		Heading,
		Hr,
		Html,
		Img,
		Link,
		Preview,
		Section,
		Text
	} from '@better-svelte-email/components';
	import type { Block } from '../newsletter';
	import { textToHtml } from './html';

	let {
		subject,
		previewText,
		blocks,
		origin
	}: { subject: string; previewText: string; blocks: Block[]; origin: string } = $props();

	// Resend byter ut platshållaren per mottagare. Som sträng-prop, annars tolkar Svelte {{…}}.
	const unsubscribe = '{{{RESEND_UNSUBSCRIBE_URL}}}';
	const mono = "font-['Roboto_Mono',ui-monospace,SFMono-Regular,Menlo,monospace]";
	const display = "font-['Space_Grotesk',Arial,Helvetica,sans-serif]";
</script>

<Html lang="sv">
	<Head>
		<title>{subject}</title>
		<link
			href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Roboto+Mono&display=swap"
			rel="stylesheet"
		/>
	</Head>
	<Preview preview={previewText || subject} />

	<Body class="m-0 bg-[#f3f5f0] py-8 {mono} text-[#333333]">
		<Container class="max-w-[600px] border-[1.5px] border-solid border-[#111111] bg-white">
			<!-- Logga -->
			<Section class="border-b-[1.5px] border-solid border-[#111111] px-8 pt-8 pb-6">
				<Img src="{origin}/images/hkb2026.png" alt="Hej Kombucha" width="140" height="64" />
			</Section>

			<!-- Innehåll -->
			<Section class="px-8 pt-8 pb-4">
				{#each blocks as b, i (i)}
					{#if b.type === 'heading'}
						<Heading
							as="h2"
							class="m-0 mb-4 {display} text-[28px] leading-[1.15] font-bold tracking-[-0.02em] text-[#111111]"
						>
							{b.text}
						</Heading>
					{:else if b.type === 'text'}
						<!-- eslint-disable-next-line svelte/no-at-html-tags -- textToHtml escapar all text innan den bygger HTML -->
						{@html textToHtml(b.text)}
					{:else if b.type === 'image'}
						<Img
							src={b.src}
							alt={b.alt}
							width="536"
							height="auto"
							class="mb-5 block h-auto w-full border-[1.5px] border-solid border-[#111111]"
						/>
					{:else if b.type === 'button'}
						<Button
							href={b.href}
							pX={22}
							pY={12}
							class="mb-6 bg-[#f24440] {mono} text-[14px] font-semibold tracking-[0.08em] text-[#f3f5f0] no-underline"
						>
							{b.label} →
						</Button>
					{:else}
						<Hr class="my-6 border-t-[1.5px] border-solid border-[#111111]" />
					{/if}
				{/each}
			</Section>

			<!-- Footer -->
			<Section class="bg-[#111111] px-8 py-6">
				<Text class="m-0 {mono} text-[12px] leading-[1.7] text-[#f3f5f0]">
					Hej Kombucha · Lindbacka 403, 705 93 Örebro ·
					<Link href="mailto:yo@hejkombucha.se" class="text-[#f3f5f0]">yo@hejkombucha.se</Link>
				</Text>
				<Text class="m-0 mt-2 {mono} text-[12px] leading-[1.7] text-[#9a9a9a]">
					Vill du inte ha fler mail från oss?
					<Link href={unsubscribe} class="text-[#f3f5f0] underline">Avregistrera dig här</Link>.
				</Text>
			</Section>
		</Container>
	</Body>
</Html>
