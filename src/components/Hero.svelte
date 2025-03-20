<script>
	import ExtensionDemo from './ExtensionDemo.svelte';
</script>

<main class="page md">
	<div class="page-section flex-2/3">
		<h1 class="heading">A community behind</h1>
		<h1 class="heading">every page on the internet</h1>

		<p class="mt-10 mb-2">join the mailing list!</p>
		<form class="join flex w-full flex-row">
			<label class="floating-label">
				<span>Your Email</span>
				<input type="email" placeholder="email@site.com" class="input join-item" />
			</label>

			<button class="btn btn-primary join-item" disabled type="submit">subscribe</button>
		</form>
	</div>

	<ExtensionDemo />
</main>

<style>
	.page {
		display: flex;
		flex-direction: row;

		@media (max-width: 768px) {
			flex-direction: column;
		}
	}

	.page-section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: 100%;
	}
</style>
