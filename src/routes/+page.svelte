<script lang="ts">
	let count = $state(0);
</script>

<div class="page">
	<h1 class="prose-xl mb-5">SvelteKit 5 + TailwindSCSS + DaisyUI</h1>

	<button class="btn" onclick={() => (count += 1)}>{count}</button>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
	}
</style>
