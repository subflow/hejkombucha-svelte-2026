import { error } from '@sveltejs/kit';
import { drinks } from '$lib/drinks';
import type { PageLoad, EntryGenerator } from './$types';

export const prerender = true;
export const entries: EntryGenerator = () => drinks.map(({ slug }) => ({ slug }));

export const load: PageLoad = ({ params }) => {
	const drink = drinks.find((item) => item.slug === params.slug);
	if (!drink) error(404, 'Drinken finns inte.');
	const index = drinks.indexOf(drink);
	return { drink, next: drinks[(index + 1) % drinks.length] };
};
