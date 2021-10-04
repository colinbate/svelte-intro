<script>
  export let foo = 0;
</script>

<div>
  <span>{foo}</span>
</div>

<style>
  div {
    font-size: 3rem;
    background-color: gray;
    padding: 3rem;
    display: grid;
    place-content: center;
    margin-bottom: 1rem;
  }
  span {
    color: #ff3e00;
    font-weight: bold;
  }
</style>