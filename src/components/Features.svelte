<section class="page mt-20 mb-30 flex flex-col content-center gap-5">
	<p>
		<span class="font-bold underline">offpage</span>
		is a browser extension that gives every page on the internet a place to chat, share, completely separately
		from the web itself.
	</p>

	<video class="videoplayer" controls autoplay loop muted>
		<source src="/demo.mp4" type="video/mp4" />
		<track kind="captions" src="/demo_captions.vtt" srclang="en" label="English" />
	</video>

	<div class="features">
		<div class="max-w-2xs">
			<img src="/icons/globe.svg" alt="Globe" class="w-10" />
			<h4 class="font-bold">Works Everywhere</h4>
			<p>
				Engage in discussions on any webpage, from Youtube to Wikipedia to the US.gov website. You
				name it.
			</p>
		</div>

		<div class="max-w-2xs">
			<img src="/icons/users.svg" alt="Globe" class="w-10" />
			<h4 class="font-bold">Independent Community</h4>
			<p>A separate, open space for discussions beyond platform restrictions.</p>
		</div>

		<div class="max-w-2xs">
			<img src="/icons/media.svg" alt="Globe" class="w-10" />
			<h4 class="font-bold">Media Support</h4>
			<p>
				Share images and GIFs to enhance conversations. Imagine memes on research papers, or graphs
				to fact check news.
			</p>
		</div>
	</div>
</section>

<style lang="scss">
	.features {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
	}

	.videoplayer {
		border-radius: 0.8rem;

		box-shadow: 1px 9px 10px 2px rgba(0, 0, 0, 0.16);
		-webkit-box-shadow: 1px 9px 10px 2px rgba(0, 0, 0, 0.16);
		-moz-box-shadow: 1px 9px 10px 2px rgba(0, 0, 0, 0.16);
	}
</style>
