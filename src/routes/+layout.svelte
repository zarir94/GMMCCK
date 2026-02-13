<script lang="ts">
	import { page } from '$app/stores';
	import './layout.css';
	import logo from "$lib/assets/logo.png";
	import { ProgressBar } from "@prgm/sveltekit-progress-bar";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="canonical" href="{$page.url.toString()}" />
	<meta property="og:url" content="{$page.url.toString()}" />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
	<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@100..900&display=swap" rel="stylesheet">
</svelte:head>

<ProgressBar class="text-primary" />

<div class="w-full">
	<nav class="navbar bg-base-100 border-b border-gray-800 shadow-sm">
		<div class="w-full max-w-7xl flex items-center mx-auto">
			<div class="flex-1">
				<a class="btn btn-ghost px-1 active:scale-75 ease-out duration-300 transition" href="/">
					<img class="size-full" src="{logo}" alt="GMMCCK">
				</a>
			</div>
			<div class="flex-none">
				<ul class="menu menu-horizontal px-1">
					<li><a href="https://form.jotform.com/252451193893463" target="_blank">Contact</a></li>
				</ul>
			</div>
		</div>
	</nav>
	<main class="container max-w-7xl mx-auto p-3 md:p-4 lg:p-5" style="min-height: calc(100vh - 120px);">
		{@render children()}
	</main>
	<footer class="footer sm:footer-horizontal footer-center bg-base-200 text-base-content p-4">
		<aside>
			<p>&copy; Copyright GMMCCK {new Date().getFullYear()} - All right reserved</p>
		</aside>
	</footer>
</div>


