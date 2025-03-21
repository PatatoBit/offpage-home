<script>
	import ExtensionDemo from './ExtensionDemo.svelte';

	let email = $state('');
	let signUpSuccess = $state(false);

	async function subscribe() {
		signUpSuccess = false;

		const res = await fetch('/api/subscribe', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email })
		});

		if (res.ok) {
			signUpSuccess = true;
		} else {
			alert('Something went wrong. Please try again.');
		}
	}
</script>

<main class="page md">
	<div class="page-section flex-2/3">
		<h1 class="heading">A community behind</h1>
		<h1 class="heading">every page on the internet</h1>

		<p class="mt-10 mb-2">Be the first to know when offpage launches! Sign up for updates.</p>
		<form
			class="join flex w-full flex-row justify-center md:justify-normal"
			onsubmit={async (e) => {
				e.preventDefault();
				await subscribe();
			}}
		>
			<label class="floating-label">
				<span>Your Email</span>
				<input
					bind:value={email}
					type="email"
					placeholder="email@site.com"
					class="input join-item"
				/>
			</label>

			<button class="btn btn-primary join-item" type="submit">subscribe</button>
		</form>

		{#if signUpSuccess}
			<p class="mt-2">✅Thank you for subscribing!</p>
		{/if}
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

		@media (max-width: 768px) {
			margin-top: 7rem;

			flex-direction: column;
			text-align: center;
			align-items: center;
		}
	}
</style>
