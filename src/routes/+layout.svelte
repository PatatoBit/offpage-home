<script lang="ts">
	import '../app.css';
	import '../styles/global.scss';
	import '../styles/variables.scss';
	let { children } = $props();
</script>

<!-- HTML Meta Tags -->
<title>offpage | A community behind every page on the internet</title>
<meta
	name="description"
	content="offPage adds a comment section to any webpage, allowing users to discuss, share, and engage—even on sites without built-in comments. With a unified account system, OffPage makes it easy to participate in discussions across different websites, creating a seamless and intuitive experience"
/>

<!-- Facebook Meta Tags -->
<meta property="og:url" content="https://offpage.patato.me/" />
<meta property="og:type" content="website" />
<meta property="og:title" content="offpage | A community behind every page on the internet" />
<meta
	property="og:description"
	content="offPage adds a comment section to any webpage, allowing users to discuss, share, and engage—even on sites without built-in comments. With a unified account system, OffPage makes it easy to participate in discussions across different websites, creating a seamless and intuitive experience"
/>
<meta
	property="og:image"
	content="https://opengraph.b-cdn.net/production/images/57a0270e-7e64-4278-869b-9ed1b53c01b6.png?token=zCpZGGcw_ViiKNSaGVycrn8FPMr_MdN8-INg8HW-ONM&height=630&width=1200&expires=33278546023"
/>

<!-- Twitter Meta Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta property="twitter:domain" content="offpage.patato.me" />
<meta property="twitter:url" content="https://offpage.patato.me/" />
<meta name="twitter:title" content="offpage | A community behind every page on the internet" />
<meta
	name="twitter:description"
	content="offPage adds a comment section to any webpage, allowing users to discuss, share, and engage—even on sites without built-in comments. With a unified account system, OffPage makes it easy to participate in discussions across different websites, creating a seamless and intuitive experience"
/>
<meta
	name="twitter:image"
	content="https://opengraph.b-cdn.net/production/images/57a0270e-7e64-4278-869b-9ed1b53c01b6.png?token=zCpZGGcw_ViiKNSaGVycrn8FPMr_MdN8-INg8HW-ONM&height=630&width=1200&expires=33278546023"
/>

{@render children()}

<style lang="scss">
	@use '../styles/variables.scss';
</style>
