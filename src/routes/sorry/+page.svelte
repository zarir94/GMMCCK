<script lang="ts">
	import { enhance } from '$app/forms';
	import { ArrowBigRightIcon, CircleOffIcon, InfoIcon, LockKeyholeIcon } from 'lucide-svelte';
  
	// export let data;
  let count = 0;
  let showContinue = false;
  let timeout: NodeJS.Timeout | undefined = undefined;
  $: if (count >= 10) { showContinue = true }
</script>

<svelte:head>
	<title>403 Access Restricted - GMMCCK</title>
</svelte:head>

<svelte:window on:click={(e)=>{
  count++;
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    count = 0;
  }, 500);
}}/>

<div class="card mx-auto w-full max-w-3xl border border-base-content/10 bg-base-200 shadow-2xl select-none">
	<div class="card-body">
		<div class="mb-2 flex items-start gap-4 sm:items-center">
			<div class="shrink-0 rounded-2xl bg-error/10 p-3 text-error">
				<LockKeyholeIcon class="size-8" />
			</div>
			<div>
				<h1 class="text-3xl font-bold text-error">Public Access Restricted</h1>
				<p class="mt-1 font-mono text-sm text-base-content/50">
					Forbidden by Administrative Order
				</p>
			</div>
		</div>

		<div class="divider mt-0 mb-4"></div>

		<div class="mb-6 space-y-4 text-lg text-base-content/80">
			<p>
				<strong>The Context:</strong> Our official college website looks like a fossil from the 90s and
				leaves all student data completely unprotected. I simply collected that already-exposed, scattered
				information and built this modern, organized interface to make it actually usable.
			</p>
			<p>
				Unfortunately, it got a little <em>too</em> popular. The principal found out, and since
				<span class="font-semibold text-error">I don't have a death wish (or a desire for a forced TC)</span>, I am shutting down public access effective immediately.
			</p>
		</div>

		<div class="mockup-code mb-6 bg-neutral text-neutral-content shadow-lg border border-slate-500/20">
			<pre data-prefix="$" class="text-success"><code>fetch_admin_logs.sh --latest</code></pre>
			<pre data-prefix=">" class="text-warning"><code>INCOMING TRANSMISSION...</code></pre>
			<pre data-prefix=">"><code>Name: Md Monirul Islam</code></pre>
			<pre data-prefix=">"><code>Email: sardermonirul69@gmail.com</code></pre>
			<pre data-prefix=">"><code>Message:</code></pre>
			<pre
				data-prefix="~"
				class="px-6 whitespace-pre-wrap text-error italic">"This site has violated the private data security. Why our students informations are open? Stop this immedietly."</pre>
		</div>

		<div class="alert border border-info/20 bg-info/10 alert-info text-info shadow-sm">
			<InfoIcon/>
			<div>
				<h3 class="font-bold">Notice to Students</h3>
				<div class="text-sm">
					Your data was already open on the official site; I just made it look good. Anyway, the project is suspended. Stay safe out there.
				</div>
			</div>
		</div>

		<div class="mt-6 card-actions justify-center">
      {#if showContinue}
        <form method="post" use:enhance>
          <button class="btn btn-outline btn-success">Continue Anyway <ArrowBigRightIcon class="size-4"/></button>
        </form>
      {:else}
        <div class="cursor-not-allowed">
          <button class="btn pointer-events-none gap-2 btn-outline btn-error flex items-center">
            <CircleOffIcon class="size-4"/>
            Database Locked
          </button>
        </div>
      {/if}
		</div>
	</div>
</div>
