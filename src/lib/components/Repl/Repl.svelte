<script>
	import { onMount } from 'svelte';
	import Input from './Input.svelte';
	import Output from './Output.svelte';

	export let components = [];

	let compiled;
	let worker;

	$: worker && worker.postMessage(components);

	onMount(() => {
		worker = new Worker('./worker.js');
		worker.addEventListener('message', (event) => (compiled = event.data));
	});
</script>

<div class="wrapper">
	<Input bind:components />
	<Output {compiled} />
</div>

<style>
	.wrapper {
		display: flex;
		flex: 1 0;
		flex-direction: row;
		gap: 0.5rem;
	}
	.wrapper > :global(*) {
		flex: 1 0;
	}
</style>
