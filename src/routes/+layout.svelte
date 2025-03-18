<script lang="ts">
	import '../app.css';
	import '../styles/global.scss';
	import '../styles/variables.scss';
	let { children } = $props();
</script>

{@render children()}

<style lang="scss">
	@use '../styles/variables.scss';
</style>
