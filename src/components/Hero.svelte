<div class="page">
	<div class="page-section flex-2/3">
		<h1 class="heading line-clamp-1">A community behind</h1>
		<h1 class="heading line-clamp-1">every page of the internet</h1>

		<p class="mt-10 mb-2">join the mailing list!</p>
		<form class="flex w-full flex-row gap-1">
			<label class="floating-label">
				<span>Your Email</span>
				<input type="email" placeholder="mail@site.com" class="input" />
			</label>

			<button class="btn btn-primary" type="submit">subscribe</button>
		</form>
	</div>

	<div class="page-section flex-1/3 border-1 border-red-500"></div>
</div>

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
