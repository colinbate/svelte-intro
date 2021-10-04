<div>
	<slot />
</div>

<style>
	div {
		left: 50%;
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
		background-color: hsl(0, 0%, 100%, 0.75);
		padding: 2rem;
		border-radius: 0.5rem;
	}

	div > :global(* + *) {
		margin-top: 0.5rem;
	}
</style>
