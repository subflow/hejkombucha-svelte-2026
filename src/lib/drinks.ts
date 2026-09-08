export type Drink = {
	slug: string;
	name: string;
	description: string;
	base: string;
	servings: number;
	ingredients: string[];
	steps: string[];
	source: { name: string; url: string };
	note?: string;
};

// Metric quantities are rounded from US fluid ounces (about 3 cl) and cups (2.4 dl).
// Text is written for this collection; source prose and photography are not reused.
export const drinks: Drink[] = [
	{
		slug: 'moscow-mule',
		name: 'Kombucha Moscow Mule',
		description: 'Ingefära, lime och vodka med kombuchans friska syra.',
		base: 'Vodka',
		servings: 1,
		ingredients: [
			'4,5 cl vodka',
			'13,5 cl ingefärskombucha',
			'Saft från ½ lime',
			'Is',
			'Limeskiva till garnering (valfritt)'
		],
		steps: [
			'Fyll ett högt glas eller en drinkmugg med is.',
			'Häll i vodka och pressa över limen.',
			'Tillsätt kall kombucha, rör försiktigt och garnera med lime.'
		],
		source: {
			name: 'Kathryne Taylor · Cookie and Kate',
			url: 'https://cookieandkate.com/kombucha-moscow-mules/'
		}
	},
	{
		slug: 'margarita',
		name: 'Kombuchamargarita',
		description: 'Tequila och citrus med lite lönnsirap och en saltad glaskant.',
		base: 'Tequila',
		servings: 1,
		ingredients: [
			'6 cl tequila',
			'6 cl kombucha, valfri smak',
			'3 cl apelsinjuice eller Cointreau',
			'3 msk limejuice',
			'1 tsk lönnsirap',
			'Is',
			'Salt eller socker till glaskanten (valfritt)',
			'Limeklyftor'
		],
		steps: [
			'Fukta glaskanten med lime och doppa den i salt eller socker. Fyll glaset med is.',
			'Skaka tequila, apelsinjuice, limejuice och lönnsirap med is. Sila ner i glaset.',
			'Häll i kombuchan och rör varsamt. Lägg till en limeklyfta.'
		],
		source: {
			name: 'LaKita Anderson · Simply LaKita',
			url: 'https://www.simplylakita.com/kombucha-margarita/'
		},
		note: 'Vi tillsätter kombuchan efter skakningen för att behålla bubblorna.'
	},
	{
		slug: 'jordgubbsmojito',
		name: 'Jordgubbsmojito med kombucha',
		description: 'Mosade jordgubbar, mynta och lime i ett glas med bubblor.',
		base: 'Rom / vodka',
		servings: 2,
		ingredients: [
			'4 myntablad',
			'1,8 dl skivade jordgubbar',
			'2 msk limejuice',
			'12 cl ljus rom eller vodka',
			'36 cl naturell kombucha eller ingefärskombucha',
			'2,4 dl is',
			'En skvätt kolsyrat vatten (valfritt)',
			'Jordgubbar, lime och mynta till garnering (valfritt)'
		],
		steps: [
			'Mosa jordgubbar och mynta tillsammans med limejuicen i en skål.',
			'Fördela blandningen mellan två rymliga glas. Häll 6 cl rom eller vodka i varje glas.',
			'Fördela kombuchan och isen. Tillsätt eventuellt lite kolsyrat vatten, rör varsamt och garnera.'
		],
		source: {
			name: 'Stacie Hassing · The Real Food Dietitians',
			url: 'https://therealfooddietitians.com/strawberry-mojito-kombucha-cocktail/'
		}
	},
	{
		slug: 'mimosa',
		name: 'Kombuchamimosa',
		description: 'En mimosa med kombucha.',
		base: 'Mousserande vin',
		servings: 1,
		ingredients: ['12 cl kallt mousserande vin', '6 cl kall kombucha'],
		steps: ['Häll vinet i ett champagneglas. Toppa med kombucha.'],
		source: { name: 'Liquor.com', url: 'https://www.liquor.com/recipes/kombucha-mimosa/' }
	},
	{
		slug: 'citron-ingefara',
		name: 'Citron & ingefära',
		description: 'En frisk kombuchadrink med vodka och mynta.',
		base: 'Vodka',
		servings: 1,
		ingredients: [
			'12 cl citron- och ingefärskombucha',
			'4,5 cl vodka',
			'1 msk citronjuice',
			'3 myntablad',
			'1 citronskiva',
			'Is'
		],
		steps: [
			'Lägg is och mynta i ett glas.',
			'Häll i vodka och citronjuice. Tillsätt kombuchan och rör försiktigt.',
			'Garnera med citronskivan.'
		],
		source: {
			name: 'Carolyn Casner · EatingWell',
			url: 'https://www.eatingwell.com/recipe/7959080/lemon-ginger-kombucha-cocktail/'
		},
		note: 'Kombuchan rörs ner sist i vår version.'
	},
	{
		slug: 'ananas-granatapple',
		name: 'Ananas & granatäpple',
		description: 'Ananasjuice och granatäppelskombucha med hemgjord ingefärssirap.',
		base: 'Vodka',
		servings: 1,
		ingredients: [
			'6 cl citronjuice',
			'6 cl ananasjuice',
			'2–3 msk ingefärssirap',
			'3 cl vodka',
			'Granatäppelskombucha att toppa med',
			'Krossad is',
			'Till en sats sirap: 2,4 dl strösocker, 2,4 dl vatten och en tumstor bit skivad ingefära'
		],
		steps: [
			'Gör sirapen i förväg: värm socker, vatten och ingefära tills sockret lösts upp. Ta från värmen, låt dra 10–15 minuter och sila. Låt svalna. Satsen räcker till flera drinkar.',
			'Rör ihop citronjuice, ananasjuice, vodka och 2–3 msk av den kalla sirapen i ett stort glas.',
			'Fyll glaset till tre fjärdedelar med krossad is. Häll långsamt på granatäppelskombucha och servera direkt.'
		],
		source: {
			name: 'Elizabeth Van Lierde · Everyday Elizabeth',
			url: 'https://everydayelizabeth.com/2018-1-9-pineapple-pomegranate-kombucha-cocktails'
		},
		note: 'Förbered sirapen i god tid så att den hinner kallna.'
	},
	{
		slug: 'spicy-stormy',
		name: 'Spicy & Stormy Booch',
		description: 'Kryddad rom, ingefärskombucha och lime över is.',
		base: 'Rom',
		servings: 1,
		ingredients: [
			'4,5 cl kryddad rom',
			'12 cl ingefärskombucha',
			'1,5 cl limejuice',
			'Krossad is',
			'Limeskiva till garnering (valfritt)'
		],
		steps: [
			'Fyll ett högt glas med krossad is.',
			'Häll i rom och limejuice.',
			'Toppa med kall ingefärskombucha. Rör försiktigt och garnera med lime.'
		],
		source: {
			name: 'The First Mess',
			url: 'https://thefirstmess.com/2019/06/08/spicy-stormy-booch/'
		},
		note: 'En egen tolkning av drinken i MyBartenders lista. Originalreceptet kunde inte nås vid sammanställningen; mängderna här är våra förslag och har inte verifierats mot originalet.'
	},
	{
		slug: 'tequila-lime',
		name: 'Tequila, lime & kombucha',
		description: 'En enkel blandning med tequila, lime och en aning honung.',
		base: 'Tequila',
		servings: 1,
		ingredients: [
			'4 cl silvertequila',
			'16 cl kombucha',
			'Limejuice efter smak',
			'Lite flytande honung',
			'Frukt, bär eller örter till garnering (valfritt)'
		],
		steps: [
			'Rör ihop tequila, en skvätt limejuice och lite honung i ett glas tills honungen lösts upp.',
			'Häll i kylskåpskall kombucha och rör försiktigt.',
			'Smaka av och garnera med frukt, bär eller örter om du vill.'
		],
		source: {
			name: 'Monica · Nourish and Fete',
			url: 'https://www.nourish-and-fete.com/tequila-kombucha-cocktail/'
		},
		note: 'Originalets proportion är en del tequila till fyra delar kombucha. Här är den räknad till ett glas.'
	},
	{
		slug: 'vattenmelon-gin',
		name: 'Vattenmelon & gin',
		description: 'Vattenmelonjuice, gin och citronlemonad med en skvätt kombucha.',
		base: 'Gin',
		servings: 1,
		ingredients: [
			'4,5 cl gin',
			'9 cl kolsyrad citronlemonad',
			'6 cl vattenmelonjuice',
			'0,75 cl limejuice',
			'En skvätt smaksatt kombucha, gärna ingefära och bär',
			'Krossad is'
		],
		steps: [
			'Häll gin, citronlemonad, vattenmelonjuice och limejuice i ett rymligt glas. Rör om.',
			'Fyll på med krossad is och avsluta med en skvätt kombucha.'
		],
		source: {
			name: 'Carolyn Pascual · The Social Sipper',
			url: 'https://thesocialsipper.com/gin-watermelon-kombucha-crush/'
		}
	},
	{
		slug: 'cara-cara',
		name: 'Cara Cara & kombucha',
		description: 'Apelsin möter lime och dubbla lager ingefära från kombucha och ginger beer.',
		base: 'Vodka',
		servings: 1,
		ingredients: [
			'6 cl färskpressad Cara Cara-apelsinjuice, ungefär 1 apelsin',
			'6 cl ingefärskombucha',
			'6 cl ginger beer',
			'6 cl vodka',
			'2 msk limejuice',
			'Is',
			'Apelsin- eller limeskivor till garnering'
		],
		steps: [
			'Fyll ett rymligt glas med is. Häll i apelsinjuice, vodka och limejuice.',
			'Tillsätt ingefärskombucha och ginger beer. Rör varsamt.',
			'Garnera med en skiva apelsin eller lime.'
		],
		source: {
			name: 'Hannah · Plants in My Pants',
			url: 'https://plantsinmypants.com/cara-cara-kombucha-cocktails/'
		},
		note: 'Vanlig navelapelsin fungerar också om du inte hittar Cara Cara.'
	}
];
