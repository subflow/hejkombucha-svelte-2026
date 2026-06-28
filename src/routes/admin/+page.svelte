<svelte:head>
	<title>Hej Kombucha - Content Management</title>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width,initial-scale=1" />
</svelte:head>

<div id="sveltia-cms"></div>

<script>
	import { onMount } from 'svelte';
	
	onMount(async () => {
		// Load Sveltia CMS dynamically
		const { CMS } = await import('https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js');
		new CMS();
	});
</script>