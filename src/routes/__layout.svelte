<script context="module">
	export async function load({ page, fetch }) {
		const pages = await fetch('/pages.json').then((res) => res.json());
		const currentIndex = pages.find((p) => p.href == page.path)?.index;

		return {
			props: {
				currentIndex,
				pages,
			}
		};
	}
</script>

<script>
	import '../app.css';
	import { fly } from 'svelte/transition';
	import { navigating } from '$app/stores';
	import { goto } from '$app/navigation';

	export let currentIndex;
	export let pages = [];
	

	let direction = -1;
	let innerHeight;

	function setDirection(navigation) {
		if (!navigation) return;
		direction = navigation.to.path > navigation.from.path ? 1 : -1;
	}

	$: setDirection($navigating);

	const handleKey = ({ key }) => {
		switch (key) {
			case 'ArrowUp':
				currentIndex !== 0 && goto(pages[currentIndex - 1].href);
				return;
			case 'ArrowDown':
				currentIndex !== pages.length - 1 && goto(pages[currentIndex + 1].href);
				return;
		}
	};
</script>

<svelte:window bind:innerHeight on:keydown={handleKey} />

<main>
	{#key currentIndex}
		<div
			in:fly={{ y: direction * innerHeight, duration: 800 }}
			out:fly={{ y: direction * (0 - innerHeight), duration: 800 }}
		>
			<slot />
		</div>
	{/key}
</main>

<style>
	main {
		display: flex;
		flex: 1 0;
		position: relative;
	}
	div {
		height: 100%;
		overflow: hidden;
		padding: 0.5rem;
		position: absolute;
		width: 100%;
	}
</style>
