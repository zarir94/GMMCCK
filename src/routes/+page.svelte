<script lang="ts">
  import og_image from "$lib/assets/og_image.jpg";
  import bg_image from "$lib/assets/bg_image.jpg";
	import { ArrowBigRightIcon, BookOpenIcon, BriefcaseBusinessIcon, CalendarIcon, FlaskConicalIcon, SearchIcon, TagIcon, UsersIcon } from "lucide-svelte";
	import { CDN, defaultImg, formatDate, onImageMounted } from "$lib/func.js";
  export let data;
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

<div class="hero relative">
  <div class="img-cont absolute size-full top-0 left-0 pointer-events-none">
    <div class="size-full bg-cover bg-center opacity-30 brightness-50" style="background-image: url('{bg_image}');"></div>
  </div>
  <div class="hero-content py-20 text-neutral-content text-center">
    <div class="max-w-3xl">
      <h1 class="mb-5 text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-emerald-400">Complete Student Database</h1>
      <p class="mb-8 text-balance">
        Access detailed information about every student in our college. From photos and personal details to parent information and admission records, find everything you need in one place. Easily search through the database by name, phone number, parents, or any other details to locate the student you're looking for.
      </p>
      <form action="/search" method="get">
        <div class="join w-full max-w-sm">
          <input class="input input-primary w-full join-item" type="text" name="q" placeholder="Search name, phone or parent" />
          <button class="btn btn-primary px-2 join-item" aria-label="Search" type="submit">
            <SearchIcon/>
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

<div class="mt-5 flex flex-col justify-center items-center">
  <h2 class="text-2xl md:text-3xl font-bold relative mb-4">
    Half Yearly Overview
  </h2>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full mb-8">
    {#each [
      {
        icon: UsersIcon,
        name: "Overall Results",
        total: data.totalStudent,
        genres: {
          Passed: data.passedStudent,
          Failed: data.failedStudent,
          Absent: data.totalStudent - data.passedStudent - data.failedStudent,
          'GPA 1': data.gpa1Student,
          'GPA 2': data.gpa2Student,
          'GPA 3': data.gpa3Student,
          'GPA 4': data.gpa4Student,
          'GPA 5': data.gpa5Student,
        },
      },
      {
        icon: FlaskConicalIcon,
        name: "Science",
        total: data.totalScienceStudent,
        genres: {
          Passed: data.passedScienceStudent,
          Failed: data.failedScienceStudent,
          Absent: data.totalScienceStudent - data.passedScienceStudent - data.failedScienceStudent,
          'GPA 1': data.gpa1ScienceStudent,
          'GPA 2': data.gpa2ScienceStudent,
          'GPA 3': data.gpa3ScienceStudent,
          'GPA 4': data.gpa4ScienceStudent,
          'GPA 5': data.gpa5ScienceStudent,
        },
      },
      {
        icon: BookOpenIcon,
        name: "Humanities",
        total: data.totalHumanitiesStudent,
        genres: {
          Passed: data.passedHumanitiesStudent,
          Failed: data.failedHumanitiesStudent,
          Absent: data.totalHumanitiesStudent - data.passedHumanitiesStudent - data.failedHumanitiesStudent,
          'GPA 1': data.gpa1HumanitiesStudent,
          'GPA 2': data.gpa2HumanitiesStudent,
          'GPA 3': data.gpa3HumanitiesStudent,
          'GPA 4': data.gpa4HumanitiesStudent,
          'GPA 5': data.gpa5HumanitiesStudent,
        },
      },
      {
        icon: BriefcaseBusinessIcon,
        name: "Business Studies",
        total: data.totalBusinessStudent,
        genres: {
          Passed: data.passedBusinessStudent,
          Failed: data.failedBusinessStudent,
          Absent: data.totalBusinessStudent - data.passedBusinessStudent - data.failedBusinessStudent,
          'GPA 1': data.gpa1BusinessStudent,
          'GPA 2': data.gpa2BusinessStudent,
          'GPA 3': data.gpa3BusinessStudent,
          'GPA 4': data.gpa4BusinessStudent,
          'GPA 5': data.gpa5BusinessStudent,
        },
      }
    ] as d}
      {@const iconClass = d.name == 'Overall Results' ? 'bg-primary/10 text-primary' :
                          d.name == 'Science' ? 'bg-secondary/10 text-secondary' :
                          d.name == 'Humanities' ? 'bg-accent/10 text-accent' :
                          d.name == 'Business Studies' ? 'bg-info/10 text-info' : 'bg-warning/10 text-warning'}
      <div class="card bg-base-200 rounded-xl shadow-lg border border-base-300 hover:-translate-y-1 transition duration-300 hover:bg-primary/5 hover:border-primary/10">
        <div class="card-body p-6">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h2 class="card-title text-lg font-semibold text-base-content/80">{d.name}</h2>
            </div>
            <!-- Icon -->
            <div class="{iconClass} p-3 rounded-xl">
              <svelte:component this={d.icon}/>
            </div>
          </div>
          
          <div class="mb-6">
            <div class="text-4xl font-bold text-base-content">{d.total}</div>
            <div class="text-xs text-base-content/50 font-medium uppercase tracking-wider mt-1">Total Candidates</div>
          </div>

          <div class="space-y-4">
            {#each Object.entries(d.genres) as [k, v]}
              {@const perc = v / d.total * 100}
              {@const colorClass =  k == 'Passed' ? 'text-success' :
                                                k == 'Failed' ? 'text-error' :
                                                k == 'Absent' ? 'text-accent' :
                                                k == 'GPA 1' ? 'text-rose-400' :
                                                k == 'GPA 2' ? 'text-warning' :
                                                k == 'GPA 3' ? 'text-info' :
                                                k == 'GPA 4' ? 'text-emerald-400':
                                                k == 'GPA 5' ? 'text-amber-400' : ''}
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="{colorClass} font-semibold">{k}</span>
                  <span class="font-bold">{v} <span class="text-xs font-normal opacity-60 ml-1">({Math.round(perc * 10) / 10}%)</span></span>
                </div>
                <progress class="progress {colorClass} w-full bg-slate-500/30" value="{perc}" max="100"></progress>
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/each}
  </div>
  <h2 class="text-2xl md:text-3xl font-bold relative">
    Recent Folks
    <a href="/search" class="btn btn-primary btn-xs btn-soft absolute right-0 bottom-1/2 translate-x-full translate-y-1/2 scale-75">View All</a>
  </h2>
  <p class="mb-4 opacity-50">Those who were admitted last</p>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full">
    {#each data.students as s}
      <a href="/student-{s.id}" class="group relative card card-side h-14 rounded-md bg-base-200 border border-base-300 shadow-md hover:bg-primary/10 hover:border-primary/30 transition duration-300 ease-out active:scale-75 overflow-hidden">
        <figure class="shrink-0 size-14 bg-base-300">
          {#key s.photo}
            <img class="size-full text-transparent skeleton rounded-none" src="{CDN(s.photo || defaultImg, 70)}" alt="{s.name}" loading="lazy" use:onImageMounted />
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
    {/each}
  </div>
  <div class="my-5 flex items-center justify-center">
    <a href="/search" class="btn btn-primary">View All <ArrowBigRightIcon class="size-4"/></a>
  </div>
</div>

<style lang="postcss">
  .img-cont {
    -webkit-mask-composite: intersect;
    -webkit-mask-image: linear-gradient(90deg,transparent 0%,#000 20% 80%,transparent 100%), linear-gradient(transparent 0%,#000 20% 80%,transparent 100%);
    mask-image: linear-gradient(90deg,transparent,#000 20% 80%,transparent), linear-gradient(transparent,#000 20% 80%,transparent);
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-composite: source-in;
    mask-composite: intersect;
  }
</style>
