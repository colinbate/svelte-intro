<script>
import MyComponent from './MyComponent.svelte';
let bar = 42;

function count() {
	bar += 1;
}
</script>

<MyComponent foo={bar} />

<button type="button" on:click={count}>Add more!</button>

<style>
button { padding: 2rem; }
</style>
