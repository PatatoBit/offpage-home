<script lang="ts">
	import moment from 'moment';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	import { getBaseUrlAndPath, isValidImage } from '$lib';
	import dummyData from '$lib/dummy.json';
	import Cross from '../../static/icons/cross.svg';
	import Image from '../../static/icons/image.svg';
	import ReturnIcon from '../../static/icons/return.svg';

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
	let currentPageIndex = $state(0);

	let currentUrlSplit: {
		baseUrl: string;
		domain: string;
		route: string;
	} = $derived({
		baseUrl: dummyData.pages[currentPageIndex].url,
		domain: getBaseUrlAndPath(dummyData.pages[currentPageIndex].url)?.domain || '',
		route: getBaseUrlAndPath(dummyData.pages[currentPageIndex].url)?.route || ''
	});

	let comments: CommentData[] = $derived(
		dummyData.pages[currentPageIndex].comments.map((comment) => {
			return {
				content: comment.content,
				created_at: new Date().toISOString(),
				image_url: '',
				profiles: {
					avatar_url: `https://api.dicebear.com/9.x/dylan/svg?seed=${comment.author}`,
					username: comment.author
				}
			};
		})
	);

	let inputRef: HTMLInputElement | null = null;
	let file: File | null = null;
	let currentFileUrl: string | null = null;
	let currentComment: string = '';

	// Handle form submission
	const handleSubmit = async () => {
		console.log('Submitting comment...');
	};

	async function handleEnterKey(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault(); // Prevent new line
			await handleSubmit(); // Call submit function
		}
	}

	function handleFileDrop(event: DragEvent) {
		event.preventDefault();
		const droppedFile = event.dataTransfer?.files[0];

		if (droppedFile && isValidImage(droppedFile)) {
			file = droppedFile;
			currentFileUrl = URL.createObjectURL(file);
		}
	}

	function handleFileSelect(event: Event) {
		const selectedFile = (event.target as HTMLInputElement)?.files?.[0];
		if (selectedFile && isValidImage(selectedFile)) {
			file = selectedFile;
			currentFileUrl = URL.createObjectURL(file);
		} else {
			console.error('Invalid file type.');
		}
	}

	function triggerFileInput() {
		if (inputRef) {
			inputRef.click();
		}
	}

	onMount(() => {
		const interval = setInterval(() => {
			currentPageIndex = currentPageIndex === dummyData.pages.length - 1 ? 0 : currentPageIndex + 1;
			console.log('Switching to next page...', currentPageIndex);
		}, 5000);

		return () => clearInterval(interval); // Cleanup on component unmount
	});
</script>

<div class="card mt-5 md:mt-0">
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
		{#each comments as comment, index}
			<li transition:fade={{ duration: 300, delay: index * 100 }}>
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

	<form
		class="input-form"
		onsubmit={async (event) => {
			event.preventDefault();
			await handleSubmit();
		}}
		ondragover={(event) => event.preventDefault()}
		ondrop={handleFileDrop}
	>
		{#if currentFileUrl}
			<div class="file-dropdown-area">
				<div class="dropped-image">
					<img src={currentFileUrl} alt="Dropped file" />

					<button
						onclick={() => {
							file = null;
							currentFileUrl = null;
						}}
					>
						<img src={Cross} alt="Remove" />
					</button>
				</div>
			</div>
		{/if}

		<textarea
			bind:value={currentComment}
			onkeydown={handleEnterKey}
			placeholder="Share your thoughts..."
			required
			rows="3"
			maxlength="500"
		></textarea>

		<!-- Hidden file input -->
		<input
			type="file"
			bind:this={inputRef}
			accept="image/png, image/jpeg, image/gif"
			onchange={handleFileSelect}
			hidden
		/>

		<div class="form-buttons">
			<button type="button" class="file-input" onclick={triggerFileInput}>
				<img src={Image} alt="File input" />
			</button>

			<button class="form-submit" type="submit">
				<img src={ReturnIcon} alt="Return" />
			</button>
		</div>
	</form>
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
		width: 20rem;
		height: 40rem;
		box-sizing: border-box;

		padding: 1rem;
		border-radius: 0.8rem;
		box-shadow: 1px 9px 10px 2px rgba(0, 0, 0, 0.16);
		-webkit-box-shadow: 1px 9px 10px 2px rgba(0, 0, 0, 0.16);
		-moz-box-shadow: 1px 9px 10px 2px rgba(0, 0, 0, 0.16);

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

		-ms-overflow-style: none; /* Internet Explorer 10+ */
		scrollbar-width: none; /* Firefox */
		&::-webkit-scrollbar {
			display: none;
		}
	}

	.comment {
		display: flex;
		padding-block: 0.5rem;
		gap: 0.5rem;

		.user-profile {
			display: flex;
			flex: auto 1 0;

			img {
				width: 40px;
				height: 40px;
				border-radius: 20rem;
				object-fit: cover;
				aspect-ratio: 1/1;
				border: 1px solid var(--border);
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

	.file-dropdown-area {
		position: absolute;
		display: flex;
		flex-direction: row;
		/* overflow-x: scroll; */
		gap: 0.5rem;
		height: 10rem;
		width: 100%;
		top: -10.5rem;

		.dropped-image {
			position: relative;
			border-radius: 0.5rem;
			background-color: var(--border);

			box-shadow: -1px 5px 7px 0px rgba(0, 0, 0, 0.17);
			-webkit-box-shadow: -1px 5px 7px 0px rgba(0, 0, 0, 0.17);
			-moz-box-shadow: -1px 5px 7px 0px rgba(0, 0, 0, 0.17);

			button {
				position: absolute;
				top: -0.5rem;
				right: -0.5rem;

				background-color: var(--red);
				border: none;
				padding: 0.25rem;
				border-radius: 50%;
				cursor: pointer;

				display: flex;
				justify-content: center;
				align-items: center;

				img {
					filter: invert(1);
					width: 10px;
					height: 10px;
				}
			}

			img {
				height: 100%;
				width: auto;
			}
		}
	}

	.input-form {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 1rem;
		flex: 1 1 1;

		.form-buttons {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			gap: 0.5rem;

			height: 2rem;

			button {
				cursor: pointer;
			}
		}

		.file-input {
			all: unset;
			border: none;
			cursor: pointer;

			display: flex;
			justify-content: center;
			align-items: center;

			transition: scale 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

			img {
				width: 30px;
				height: 30px;
			}

			&:hover {
				transform: scale(1.05);
			}
		}

		.form-submit {
			background-color: var(--text);
			color: var(--background);
			border: none;
			padding: 0.5rem 1rem;
			border: 1px solid var(--text);
			border-radius: 6px;
			cursor: pointer;

			display: flex;
			justify-content: center;
			align-items: center;

			transition: scale 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

			img {
				width: 20px;
				height: 20px;

				filter: invert(1);
			}

			&:hover {
				transform: scale(1.05);
			}
		}
	}
</style>
