<script>
	import { page } from '$app/stores';

	import colors from '$lib/action/color';
	export let pages = [];
</script>

<nav>
	{#each pages as { hsl, href }, i}
		<a use:colors={hsl} {href} aria-current={$page.path == href}>
			{i + 1}
		</a>
	{/each}
</nav>

<style>
	nav {
		display: flex;
		flex-direction: column;
		font-size: 1.5em;
		gap: 0.25em;
	}
	a {
		background-color: white;
		border: 2px solid hsla(var(--hue), var(--sat), var(--lum), 70%);
		border-radius: 0.25em;
		cursor: pointer;
		flex: 0;
		min-width: 5ch;
		padding: 0.25em;
		text-align: center;
		text-decoration: none;
	}

	a[aria-current~='true'],
	a:active,
	a:focus,
	a:hover {
		background-color: hsla(var(--hue), var(--sat), var(--lum), 50%);
		outline: none;
	}
</style>
