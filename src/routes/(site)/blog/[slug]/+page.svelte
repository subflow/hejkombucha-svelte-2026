<script>
	let { data } = $props();
	const Content = $derived(data.content);
</script>

<Content {...data.meta} />
