<script lang="ts">
	import { onMount } from 'svelte';

	let { likes, dislikes } = $state({ likes: 0, dislikes: 0 });

	let icon = $state('https://placehold.co/300');

	let currentUrlSplit: {
		baseUrl: string;
		domain: string;
		route: string;
	} = $state({
		baseUrl: 'offpage.app',
		domain: 'offpage.app',
		route: ''
	});
</script>

<div class="card">
	<div class="domain-route">
		{#if currentUrlSplit?.route}
			<div class="domain">
				{#if icon}
					<img class="webicon" src={icon} alt=" " />
				{/if}

				<strong>{currentUrlSplit?.domain}</strong>
			</div>

			<h2>{currentUrlSplit?.route}</h2>
		{:else}
			<div class="domain">
				{#if icon}
					<img class="webicon" src={icon} alt=" " />
				{/if}

				<h2>{currentUrlSplit?.domain}</h2>
			</div>
		{/if}
	</div>

	<div class="votes-button">
		<button onclick={() => likes++}>
			<span>👍</span>
			<span>{likes}</span>
		</button>
		<button onclick={() => dislikes++}>
			<span>👎</span>
			<span>{dislikes}</span>
		</button>
	</div>
</div>

<style lang="scss">
	.webicon {
		width: 20px;
		height: 20px;
	}

	.card {
		display: flex;
		flex-direction: column;
		justify-self: flex-end;
		margin-inline: auto;

		background: white;
		min-width: 18rem;
		min-height: 30rem;

		padding: 1rem;
		border-radius: 0.8rem;
		box-shadow: 1px 9px 10px 2px rgba(0, 0, 0, 0.16);
		-webkit-box-shadow: 1px 9px 10px 2px rgba(0, 0, 0, 0.16);
		-moz-box-shadow: 1px 9px 10px 2px rgba(0, 0, 0, 0.16);

		gap: 1rem;

		transition: transform 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
	}

	.domain {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		align-items: center;
	}

	.domain-route {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.votes-button {
		display: flex;
		flex-direction: row;
		align-items: center;
		overflow: hidden;

		height: 2rem;
		width: 10rem;
		background-color: var(--inner-background);
		border: 1px solid var(--border-var);
		border-radius: 5rem;

		button {
			all: unset;
			cursor: pointer;
			height: 100%;
			width: 100%;

			height: 100%;
			padding: 0 1rem;
			gap: 0.4rem;
			border-right: 1px solid var(--border-var);
			border-radius: 0;

			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;

			&:active {
				background-color: var(--border-var);
			}
		}

		button:last-child {
			border-right: none;
		}
	}
</style>
