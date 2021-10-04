<script>
	import { TabControl, TabControlItem } from 'renderless-svelte';

	export let components = [];

	const handleKey = (ev) => {
		if (ev.key === 'ArrowUp' || ev.key === 'ArrowDown') {
			ev.stopPropagation();
		}
		if (ev.key === 'Tab') {
			ev.preventDefault();

			const { target } = ev;
			const { selectionStart, value } = target;
			target.value = value.substr(0, selectionStart) + '  ' + value.substr(selectionStart);
			target.selectionEnd = selectionStart + 2;
		}
	};
</script>

<div>
	<TabControl>
		<div class="tabs" slot="tabs" let:tabs>
			{#each tabs as { active, payload, select }}
				<button class:active on:click={select}>{payload}</button>
			{/each}
		</div>
		{#each components as component, id}
			<TabControlItem {id} payload={`${component.name}.${component.type}`} active={id === 0}>
				<textarea
					autocomplete="off"
					autocorrect="off"
					autocapitalize="off"
					class="borders"
					spellcheck="false"
					bind:value={component.source}
					on:keydown={handleKey}
				/>
			</TabControlItem>
		{/each}
	</TabControl>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
	}
	.tabs {
		flex-direction: row;
	}
	button {
		background-color: white;
		border-color: hsl(var(--hue), var(--sat), var(--lum));
		border-style: solid;
		border-width: 2px 0.5px 0 0.5px;
		cursor: pointer;
		padding: 0.25rem 0.5rem;
	}
	button:first-child {
		border-left-width: 2px;
		border-top-left-radius: 0.25rem;
	}
	button:last-child {
		border-right-width: 2px;
		border-top-right-radius: 0.25rem;
	}
	button.active,
	button:active,
	button:focus,
	button:hover {
		background-color: hsla(var(--hue), var(--sat), var(--lum), 50%);
	}
	textarea {
		background-color: white;
		border-top-left-radius: 0;
		flex: 1 0;
		font-family: monospace;
		padding: 0.5rem;
		resize: none;
		width: 100%;
	}

	button.active,
	button:active,
	button:focus,
	button:hover,
	textarea:active,
	textarea:focus,
	textarea:hover {
		outline: none;
	}
</style>
