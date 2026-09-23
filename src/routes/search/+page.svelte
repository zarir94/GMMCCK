<script lang="ts">
  import og_image from "$lib/assets/og_image.jpg";
	import { CDN, defaultImg, formatDate, onImageMounted } from "$lib/func.js";
	import { CalendarIcon, ChevronDownIcon, PlusIcon, SearchIcon, SlidersHorizontalIcon, TagIcon, UserXIcon, XIcon } from "lucide-svelte";
	import { slide } from "svelte/transition";
  export let data;

  $: hasFilter = data.group || data.session || data.sort != 'relevance' || data.fieldFilters.length;
  $: activeCount = (data.group ? 1 : 0) + (data.session ? 1 : 0) + (data.sort != 'relevance' ? 1 : 0) + data.fieldFilters.length;

  let showFilters = false;
  $: if (hasFilter) showFilters = true;

  let rows = data.fieldFilters.map((f) => ({ key: f.key, value: f.value }));
  function addRow() {
    rows = [...rows, { key: 'name_english', value: '' }];
  }
  function removeRow(i: number) {
    rows = rows.filter((_, j) => j != i);
  }
</script>

<svelte:head>
  <title>GMMCCK - All Students' Information</title>
  <meta property="og:title" content="GMMCCK - All Students' Information" />
  <meta property="og:description" content="Explore the full student directory of our college, featuring detailed profiles with personal information, academic history, and more. Browse and learn about each student's journey." />
  <meta property="og:image" content="{og_image}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="GMMCCK - All Students' Information" />
  <meta name="twitter:description" content="Explore the full student directory of our college, featuring detailed profiles with personal information, academic history, and more. Browse and learn about each student's journey." />
  <meta name="twitter:image" content="{og_image}" />
</svelte:head>

<div class="mb-5">
  <form action="/search" method="get" class="flex flex-col gap-2">
    <div class="join w-full">
      <input class="input input-primary w-full join-item" type="text" name="q" value="{data.q}" placeholder="Search name, phone or parent" />
      <button class="btn btn-primary px-2 join-item" aria-label="Search" type="submit">
        <SearchIcon/>
      </button>
    </div>
    {#if showFilters}
      <div transition:slide={{ duration: 250 }} class="flex flex-col gap-2">
        <div class="flex flex-wrap items-center gap-2">
          <select name="group" class="select select-bordered select-sm field-control max-w-44 capitalize" aria-label="Filter by group" value={data.group} onchange={(e) => e.currentTarget.form?.requestSubmit()}>
            <option value="">All groups</option>
            {#each data.groups as g}
              <option value={g} class="capitalize">{g.replaceAll('_', ' ')}</option>
            {/each}
          </select>
          <select name="session" class="select select-bordered select-sm field-control max-w-44" aria-label="Filter by session" value={data.session} onchange={(e) => e.currentTarget.form?.requestSubmit()}>
            <option value="">All sessions</option>
            {#each data.sessions as s}
              <option value={s}>{s}</option>
            {/each}
          </select>
          <select name="sort" class="select select-bordered select-sm field-control max-w-44" aria-label="Sort results" value={data.sort} onchange={(e) => e.currentTarget.form?.requestSubmit()}>
            <option value="relevance">Sort: Relevance</option>
            <option value="roll">Sort: Roll</option>
            <option value="name">Sort: Name</option>
            <option value="newest">Sort: Newest</option>
            <option value="oldest">Sort: Oldest</option>
          </select>
          {#if hasFilter}
            <a href="/search" class="btn btn-ghost btn-sm"><XIcon class="size-4"/> Clear</a>
          {/if}
        </div>
        {#each rows as r, i}
          <div class="flex items-center gap-2">
            <select name="fk" class="select select-bordered select-sm field-control w-36 sm:max-w-44 shrink-0" aria-label="Field to search" bind:value={r.key}>
              {#each data.fieldGroups as g}
                <optgroup label={g.label}>
                  {#each g.fields as f}
                    <option value={f.key}>{f.label}</option>
                  {/each}
                </optgroup>
              {/each}
            </select>
            <input name="fv" class="input input-bordered input-sm field-control min-w-0 flex-1" type="text" placeholder="Value…" bind:value={r.value} />
            <button type="button" class="btn btn-ghost btn-sm btn-square shrink-0" onclick={() => removeRow(i)} aria-label="Remove field"><XIcon class="size-4"/></button>
          </div>
        {/each}
        <button type="button" class="btn btn-dash btn-sm self-start" onclick={addRow}><PlusIcon class="size-4"/> Add field</button>
      </div>
    {/if}
  </form>
  <div class="mt-2 flex items-center justify-between gap-2">
    <p class="text-sm text-base-content/60">{data.total} student{data.total == 1 ? '' : 's'} found</p>
    <button type="button" class="btn btn-ghost btn-sm" onclick={() => (showFilters = !showFilters)} aria-expanded={showFilters}>
      <SlidersHorizontalIcon class="size-4"/> Filters
      {#if activeCount}
        <span class="badge badge-primary badge-xs">{activeCount}</span>
      {/if}
      <ChevronDownIcon class="size-4 transition-transform duration-300 {showFilters ? 'rotate-180' : ''}"/>
    </button>
  </div>
</div>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full">
  {#each data.result as s}
    <a href="/student-{s.id}" class="group relative card card-side h-14 rounded-md bg-base-200 border border-base-300 shadow-md hover:bg-primary/10 hover:border-primary/30 transition duration-300 ease-out active:scale-75 overflow-hidden">
      <figure class="shrink-0 size-14 bg-base-300">
        {#key s.photo}
          <img class="size-full text-transparent skeleton rounded-none" src="{CDN(s.photo || defaultImg, 70)}" alt="{s.name}" loading="lazy" use:onImageMounted/>
        {/key}
      </figure>
      <div class="card-body px-3 py-2 gap-1">
        <div class="flex items-center justify-between gap-1">
          <h2 class="line-clamp-1 break-all font-semibold">{s.name}</h2>
          <span class="badge badge-soft badge-primary badge-sm group-hover:bg-primary/10 group-hover:border-primary/20 transition ease-out duration-300 absolute -right-px -top-px rounded-none rounded-bl-md">{s.roll}</span>
          <span class="-mr-1 invisible opacity-0">{s.roll}</span>
        </div>
        <div class="text-xs flex items-center gap-2">
          <span class="line-clamp-1 break-all flex gap-1"><CalendarIcon class="size-3"/>{formatDate(s.date)}</span>
          <span class="capitalize flex gap-1"><TagIcon class="size-3"/>{s.group.replaceAll('_', ' ')}</span>
        </div>
      </div>
    </a>
  {:else}
    <div class="my-5 flex items-center justify-center flex-col col-span-full text-center gap-5 mx-auto max-w-lg">
      <div class="bg-warning/30 text-warning border-warning/50 border rounded-box p-3">
        <UserXIcon class="size-14"/>
      </div>
      <div class="space-y-3">
        <h3 class="text-xl md:text-2xl font-semibold">No Student Found</h3>
        <p class="text-balance">Please double-check your search criteria. Try using different names or numbers, and attempt again.</p>
        <a href="/search" class="btn btn-primary btn-sm">Clear search & filters</a>
      </div>
    </div>
  {/each}
</div>

<div class="my-5 flex items-center justify-center" class:hidden={data.pagination.length < 2}>
  <div class="join">
    {#each data.pagination as p}
      <svelte:element this={p ? 'a' : 'button'} class="join-item btn {data.page == p ? 'btn-primary' : ''} {p ? '' : 'btn-disabled text-base-content'}" href={p ? `/search?${data.qs ? data.qs + '&' : ''}page=${p}` : undefined}>{p || '...'}</svelte:element>
    {/each}
  </div>
</div>

<style lang="postcss">
  @reference 'tailwindcss';
  .field-control {
    @apply h-auto py-1;
  }
</style>
