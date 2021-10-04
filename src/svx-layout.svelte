<script context="module">
  import { a } from '$lib/layouts/components';
  export { a };
</script>
<script>
	import layouts from '$lib/layouts';
	export let layout;

	$: LayoutComponent = layouts[layout] ?? layouts['default'];
</script>

<div>
	<svelte:component this={LayoutComponent}><slot /></svelte:component>
</div>

<style>
	div {
		height: 100%;
		padding: 2em;
		position: relative;
		width: 100%;
		--hue: 14.6;
		--sat: 100%;
		--lum: 50%;
	}
</style>
