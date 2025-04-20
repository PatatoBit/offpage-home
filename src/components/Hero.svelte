<script lang="ts">
	import ExtensionDemo from './ExtensionDemo.svelte';
	import { MessageSquareDot } from '@lucide/svelte';

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

		<div class="flex flex-row flex-wrap justify-center gap-2">
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

			<a href="https://discord.gg/nRSUg3t6Ag" target="_blank">
				<button class="btn btn-outline">
					<MessageSquareDot />
					Join our Discord
				</button>
			</a>
		</div>

		{#if signUpSuccess}
			<p class="mt-2">✅Thank you for subscribing!</p>
		{/if}
	</div>

	<ExtensionDemo />
</main>

<style>
	.page {
		display: flex;
		flex-direction: column;

		padding-top: 5rem;
	}

	.page-section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;

		form {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
		}

		margin-bottom: 5rem;

		@media (max-width: 768px) {
			margin-top: 7rem;

			flex-direction: column;
			text-align: center;
			align-items: center;
		}
	}
</style>
