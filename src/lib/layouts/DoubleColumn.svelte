<div>
	<slot />
</div>

<style>
	div {
		align-content: flex-start;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		height: calc(100% - 0.5rem);
		gap: 0.5rem;
	}

	div > :global(h1) {
		flex: 1 0 100%;
	}
	div > :global(*) {
		flex: 1 0 calc(50% - 1rem);
	}
</style>
