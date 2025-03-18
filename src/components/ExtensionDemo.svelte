<script lang="ts">
	import moment from 'moment';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	interface CommentData {
		content: string;
		created_at: string;
		image_url: string;
		profiles: {
			avatar_url: string;
			username: string;
		};
	}

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

	let comments: CommentData[] = $state([
		{
			content: 'This is a comment',
			created_at: '2021-09-01T00:00:00Z',
			image_url: 'https://placehold.co/400',
			profiles: {
				avatar_url: 'https://placehold.co/400',
				username: 'Pat'
			}
		},
		{
			content: 'This is another comment',
			created_at: '2021-09-01T00:00:00Z',
			image_url: 'https://placehold.co/400',
			profiles: {
				avatar_url: 'https://placehold.co/400',
				username: 'Pat'
			}
		},
		{
			content: 'This is a comment',
			created_at: '2021-09-01T00:00:00Z',
			image_url: 'https://placehold.co/400',
			profiles: {
				avatar_url: 'https://placehold.co/400',
				username: 'Pat'
			}
		},
		{
			content: 'This is another comment',
			created_at: '2021-09-01T00:00:00Z',
			image_url: 'https://placehold.co/400',
			profiles: {
				avatar_url: 'https://placehold.co/400',
				username: 'Pat'
			}
		}
	]);
</script>

<div class="card">
	<div class="header">
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

	<ul class="comments">
		{#each comments as comment}
			<li transition:fade>
				<div class="comment">
					<div class="user-profile">
						{#if comment.profiles}
							<img
								src={comment.profiles.avatar_url}
								alt={comment.profiles.username + "'s avatar"}
							/>
						{:else}
							<img src="https://placehold.co/400" alt="Placeholder" />
						{/if}
					</div>

					<div class="comment-main">
						<div class="comment-header">
							{#if comment.profiles}
								<h5>{comment.profiles.username}</h5>
							{/if}
							<h5 class="label">
								{moment.utc(comment.created_at).local().startOf('second').fromNow()}
							</h5>
						</div>

						<p>{comment.content}</p>

						{#if comment.image_url}
							<img src={comment.image_url} alt={comment.content} />
						{/if}
					</div>
				</div>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	.header {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		padding-bottom: 0.7rem;
		border-bottom: 1px dashed black;
	}

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
		width: 18rem;
		max-height: 40rem;

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

	.comments {
		display: flex;
		flex-direction: column;

		flex: auto;
		padding: 0;
		margin: 0;
		padding-bottom: 1rem;

		overflow-y: scroll;

		&::-webkit-scrollbar {
			display: none;
		}
	}

	.comment {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		padding-top: 1rem;
		width: 100%;

		h5,
		p {
			margin: 0;
		}

		.user-profile {
			img {
				width: 40px;
				height: 40px;
				border-radius: 20rem;
				aspect-ratio: 1/1;
				border: 1px solid var(--border);

				object-fit: cover;
			}
		}

		.comment-main {
			display: flex;
			flex-direction: column;
			gap: 0.2rem;
			flex: 1 1 1;

			margin-top: 0.1;
		}

		.comment-header {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 0.5rem;
		}

		img {
			width: 100%;
			height: auto;
			max-height: 15rem;

			object-fit: contain;
			object-position: left;
		}
	}
</style>
