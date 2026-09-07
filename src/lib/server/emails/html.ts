// Små hjälpare för HTML i mail. Ligger separat så både mallen och block-parsern kan
// importera dem utan cirkulära beroenden.

const ESC: Record<string, string> = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#39;'
};

export const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ESC[c] ?? c);

const P_STYLE =
	"margin:0 0 16px;font-family:'Roboto Mono',ui-monospace,SFMono-Regular,Menlo,monospace;font-size:15px;line-height:1.7;color:#333333";

/**
 * Klartext från ett textblock → e-post-HTML: tom rad blir nytt stycke, radbrytning blir <br>,
 * webbadresser blir länkar. Allt escapas först — innehållet kommer från ett formulär.
 */
export function textToHtml(text: string): string {
	return text
		.split(/\n{2,}/)
		.map((para) => {
			const withBreaks = esc(para).replace(/\n/g, '<br>');
			const linked = withBreaks.replace(/https?:\/\/[^\s<]+/g, (raw) => {
				// Avslutande skiljetecken tillhör meningen, inte adressen.
				const m = /^(.*?)([.,;:)]*)$/.exec(raw) ?? [raw, raw, ''];
				return `<a href="${m[1]}" style="color:#f24440">${m[1]}</a>${m[2]}`;
			});
			return `<p style="${P_STYLE}">${linked}</p>`;
		})
		.join('');
}
