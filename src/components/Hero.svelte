<script>
	import ExtensionDemo from './ExtensionDemo.svelte';
</script>

<main class="page full-height md:ali flex-col gap-5 md:flex-row">
	<div class="page-section flex-2/3">
		<h1 class="heading line-clamp-1">A community behind</h1>
		<h1 class="heading line-clamp-1">every page of the internet</h1>

		<p class="mt-10 mb-2">join the mailing list!</p>
		<form class="flex w-full flex-row gap-1">
			<label class="floating-label">
				<span>Your Email</span>
				<input type="email" placeholder="mail@site.com" class="input" />
			</label>

			<button class="btn btn-primary" disabled type="submit">subscribe</button>
		</form>
	</div>

	<ExtensionDemo />
</main>

<style>
	.page {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.page-section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: 100%;
	}
</style>
