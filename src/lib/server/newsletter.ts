import { Renderer, toPlainText } from '@better-svelte-email/server';
import Newsletter from './emails/Newsletter.svelte';

/** Ett block i nyhetsbrevet, efter validering. */
export type Block =
	| { type: 'heading'; text: string }
	| { type: 'text'; text: string }
	| { type: 'image'; src: string; alt: string }
	| { type: 'button'; label: string; href: string }
	| { type: 'divider' };

const MAX_BLOCKS = 50;
const isHttpUrl = (s: string) => /^https?:\/\/\S+$/i.test(s);

/**
 * Tolkar blocken från editorn (JSON i ett hidden-fält). Okända fält kastas, allt trimmas
 * och längdbegränsas. Första felet returneras med blockets nummer så användaren hittar det.
 */
export function parseBlocks(json: string): { blocks: Block[] } | { error: string } {
	let raw: unknown;
	try {
		raw = JSON.parse(json);
	} catch {
		return { error: 'Kunde inte läsa blocken.' };
	}
	if (!Array.isArray(raw)) return { error: 'Kunde inte läsa blocken.' };
	if (raw.length > MAX_BLOCKS) return { error: `Max ${MAX_BLOCKS} block per utskick.` };

	const blocks: Block[] = [];
	for (const [i, b] of raw.entries()) {
		const n = i + 1;
		const str = (k: string, max = 5000) =>
			String((b as Record<string, unknown>)?.[k] ?? '')
				.trim()
				.slice(0, max);

		switch ((b as { type?: unknown })?.type) {
			case 'heading':
				if (!str('text')) return { error: `Rubriken i block ${n} är tom.` };
				blocks.push({ type: 'heading', text: str('text', 200) });
				break;
			case 'text':
				if (!str('text')) return { error: `Textblocket (block ${n}) är tomt.` };
				blocks.push({ type: 'text', text: str('text') });
				break;
			case 'image':
				if (!isHttpUrl(str('src')))
					return { error: `Bilden i block ${n} saknar en giltig adress (https://…).` };
				blocks.push({ type: 'image', src: str('src', 2000), alt: str('alt', 300) });
				break;
			case 'button':
				if (!str('label')) return { error: `Knappen i block ${n} saknar text.` };
				if (!isHttpUrl(str('href')))
					return { error: `Knappen i block ${n} saknar en giltig länk (https://…).` };
				blocks.push({ type: 'button', label: str('label', 100), href: str('href', 2000) });
				break;
			case 'divider':
				blocks.push({ type: 'divider' });
				break;
			default:
				return { error: `Block ${n} har en okänd typ.` };
		}
	}
	return { blocks };
}

// En renderer för hela processen — Tailwind-kompileringen sker per anrop, instansen är billig.
const renderer = new Renderer();

/** Renderar nyhetsbrevet till e-postsäker HTML (inlinade stilar) plus en klartextversion. */
export async function renderNewsletter(props: {
	subject: string;
	previewText: string;
	blocks: Block[];
	origin: string;
}): Promise<{ html: string; text: string }> {
	const html = await renderer.render(Newsletter, { props });
	return { html, text: toPlainText(html) };
}
