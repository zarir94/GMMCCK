<script lang="ts">
	import { CDN, defaultImg, formatDate, getSubject, onImageMounted } from '$lib/func.js';
	import { BookIcon, BookOpenTextIcon, GraduationCapIcon, HouseIcon, InfoIcon, MapIcon, MapPinIcon, PinIcon, SparkleIcon, StarIcon, UserIcon, UsersIcon } from 'lucide-svelte';

  export let data;

  $: s = data.student;
</script>

<svelte:head>
  <title>{s.name_english} - GMMCCK</title>
  <meta property="og:title" content="{s.name_english} - GMMCCK" />
  <meta property="og:description" content="{s.name_english} is a child of {s.father_name_english} and {s.mother_name_english} who was born on {s.date_of_birth} reading now in group {s.group.replaceAll('_', ' ')}" />
  <meta property="og:image" content="https:{CDN(s.photo || defaultImg)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{s.name_english} - GMMCCK" />
  <meta name="twitter:description" content="{s.name_english} is a child of {s.father_name_english} and {s.mother_name_english} who was born on {s.date_of_birth} reading now in group {s.group.replaceAll('_', ' ')}" />
  <meta name="twitter:image" content="https:{CDN(s.photo || defaultImg)}" />
</svelte:head>

<div class="w-full flex flex-col items-center justify-center gap-5 md:flex-row">
  <div class="w-2/3 max-w-50">
    <figure class="aspect-17/20 rounded-xl overflow-hidden border-2 border-primary/50">
      <img class="size-full text-transparent skeleton rounded-none hover:scale-105 transition ease-out duration-300" src="{CDN(s.photo || defaultImg, 200)}" alt="{s.name_english}" use:onImageMounted>
    </figure>
  </div>
  <div class="w-full">
    <h2 class="text-3xl text-center md:text-left font-semibold">{s.name_bangla}</h2>
    <h3 class="text-2xl text-center md:text-left font-semibold text-base-content/70">{s.name_english}</h3>
    <div class="my-3 flex items-center justify-center md:justify-start gap-3">
      <div class="capitalize badge badge-primary badge-lg"><BookIcon class="size-5"/> {s.group.replaceAll('_', ' ')}</div>
      <div class="capitalize badge badge-warning badge-lg"><SparkleIcon class="size-5"/> {s.religion}</div>
    </div>
    <div class="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-5 whitespace-nowrap">
      {#each Object.entries({ 'Roll': s.roll, 'Date of Birth': formatDate(s.date_of_birth), 'Blood Group': s.blood_group, 'Mobile Number': s.mobile_number_student || s.mobile_number_guardian }) as [k, v]}
        <div class="bg-base-200 border border-base-300 shadow rounded-lg py-3 px-5 flex flex-col gap-1 hover:bg-primary/10 hover:border-primary/30 hover:-translate-y-1 transition ease-out duration-300">
          <span class="uppercase text-xs tracking-wide text-base-content/70 font-semibold">{k}</span>
          <span class="font-semibold">{v}</span>
        </div>
      {/each}
    </div>
  </div>
</div>

<div class="card bg-base-200 border border-base-300 shadow-md mt-10">
  <div class="card-body">
    <div class="flex items-center justify-start gap-3">
      <div class="p-2 bg-linear-to-bl from-primary to-warning rounded-md text-primary-content"><UserIcon/></div>
      <div class="flex flex-col gap-0.5">
        <h2 class="card-title">ব্যক্তিগত তথ্য</h2>
        <h3 class="tracking-wide">Personal Information</h3>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 responsive-border rounded-lg mt-2 border-white/10">
      {#each Object.entries({
        'নাম (বাংলা)': s.name_bangla,
        'Name (English)': s.name_english,
        'পিতার নাম (বাংলা)': s.father_name_bangla,
        "Father's Name (English)": s.father_name_english,
        'মাতার নাম (বাংলা)': s.mother_name_bangla,
        "Mother's Name (English)": s.mother_name_english,
        'Form Created': formatDate(s.date, 'long'),
        'Date of Birth': formatDate(s.date_of_birth, 'long'),
        'Religion': s.religion,
        'Blood Group': s.blood_group,
        'Mobile (Student) ': s.mobile_number_student,
        'Online Birth Registration No.': s.online_birth_reg_no,
      }) as [k, v]}
        <div class="py-3 px-5 flex flex-col gap-1 hover:bg-primary/5">
          <span class="uppercase text-xs tracking-wide text-base-content/70 font-semibold">{k}</span>
          <span class="font-semibold">{v || 'N/A'}</span>
        </div>
      {/each}
    </div>
  </div>
</div>

<div class="card bg-base-200 border border-base-300 shadow-md mt-5">
  <div class="card-body">
    <div class="flex items-center justify-start gap-3">
      <div class="p-2 bg-linear-to-bl from-secondary to-accent rounded-md text-secondary-content"><UsersIcon/></div>
      <div class="flex flex-col gap-0.5">
        <h2 class="card-title">অভিভাবকের তথ্য</h2>
        <h3 class="tracking-wide">Guardian Information</h3>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 responsive-border rounded-lg mt-2 border-white/10">
      {#each Object.entries({
        'অভিভাবকের নাম': s.guardian_name,
        'Guardian Mobile': s.mobile_number_guardian,
        'পেশা (Profession)': s.guardian_profession,
        "কর্মস্থল (Work Station)": s.guardian_work_station,
        'মাসিক আয় (Monthly Income)': s.guardian_monthly_income,
        "Religion": s.religion,
      }) as [k, v]}
        <div class="py-3 px-5 flex flex-col gap-1 hover:bg-primary/5">
          <span class="uppercase text-xs tracking-wide text-base-content/70 font-semibold">{k}</span>
          <span class="font-semibold">{v || 'N/A'}</span>
        </div>
      {/each}
    </div>
  </div>
</div>

<div class="card bg-base-200 border border-base-300 shadow-md mt-5">
  <div class="card-body">
    <div class="flex items-center justify-start gap-3">
      <div class="p-2 bg-linear-to-bl from-success to-error rounded-md text-secondary-content"><MapIcon/></div>
      <div class="flex flex-col gap-0.5">
        <h2 class="card-title">ঠিকানা</h2>
        <h3 class="tracking-wide">Address Information</h3>
      </div>
    </div>
    <div class="flex flex-col md:flex-row gap-5 items-start justify-center mt-2">
      <div class="w-full rounded-xl overflow-hidden border border-white/10">
        <h3 class="flex items-center gap-2 text-lg font-semibold px-5 py-3 bg-linear-to-r from-white/10 to-white/5 text-white/80">
          <HouseIcon/> স্থায়ী ঠিকানা (Permanent)
        </h3>
        <div class="flex flex-col divide-y divide-white/10">
          {#each Object.entries({
            'গ্রাম/রাস্তা': s.permanent_village,
            'ওয়ার্ড': s.permanent_ward,
            'ডাকঘর': s.permanent_post,
            "থানা": s.permanent_thana,
            'জেলা': s.permanent_district,
          }) as [k, v]}
            <div class="py-3 px-5 flex flex-col gap-1 hover:bg-primary/5">
              <span class="uppercase text-xs tracking-wide text-base-content/70 font-semibold">{k}</span>
              <span class="font-semibold">{v || 'N/A'}</span>
            </div>
          {/each}
        </div>
      </div>
      <div class="w-full rounded-xl overflow-hidden border border-white/10">
        <h3 class="flex items-center gap-2 text-lg font-semibold px-5 py-3 bg-linear-to-r from-white/10 to-white/5 text-white/80">
          <MapPinIcon/> বর্তমান ঠিকানা (Present)
        </h3>
        <div class="flex flex-col divide-y divide-white/10">
          {#each Object.entries({
            'গ্রাম/রাস্তা': s.present_village,
            'ওয়ার্ড': s.present_ward,
            'ডাকঘর': s.present_post,
            "থানা": s.present_thana,
            'জেলা': s.present_district,
          }) as [k, v]}
            <div class="py-3 px-5 flex flex-col gap-1 hover:bg-primary/5">
              <span class="uppercase text-xs tracking-wide text-base-content/70 font-semibold">{k}</span>
              <span class="font-semibold">{v || 'N/A'}</span>
            </div>
          {/each}
        </div>
      </div>
    </div>
    <div class="bg-emerald-900/20 px-5 py-4 border border-emerald-800 rounded-lg mt-5 flex gap-3 items-center">
      <div class="text-emerald-600"><InfoIcon/></div>
      <div class="flex flex-col gap-1">
        <h4 class="font-semibold text-lg">স্থানীয় অভিভাবকের তথ্য (Local Guardian)</h4>
        <div class="flex flex-wrap gap-3">
          <div><span>নাম:</span> <span class="font-bold">{s.present_local_guardian_name || 'N/A'}</span></div>
          <div><span>সম্পর্ক:</span> <span class="font-bold">{s.present_local_guardian_relation || 'N/A'}</span></div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="card bg-base-200 border border-base-300 shadow-md mt-5">
  <div class="card-body">
    <div class="flex items-center justify-start gap-3">
      <div class="p-2 bg-linear-to-bl from-cyan-700 to-purple-700 rounded-md text-white/90"><GraduationCapIcon/></div>
      <div class="flex flex-col gap-0.5">
        <h2 class="card-title">শিক্ষাগত তথ্য</h2>
        <h3 class="tracking-wide">Academic Records</h3>
      </div>
    </div>
    <div class="flex flex-col md:flex-row gap-5 items-start justify-center mt-2">
      <div class="w-full rounded-xl overflow-hidden border border-white/10">
        <h3 class="flex items-center justify-between gap-2 text-lg font-semibold px-5 py-3 bg-linear-to-r from-white/10 to-white/5 text-white/80">
          <span>JSC / JDC</span>
          <span class="bg-white/20 px-3 py-1 rounded-box text-sm border border-white/20">{s.jsc_gpa ? `GPA ${s.jsc_gpa}` : 'N/A'}</span>
        </h3>
        <div class="flex flex-col divide-y divide-white/10">
          {#each Object.entries({
            'Board': s.jsc_board,
            'Session': s.jsc_session,
            'Passing Year': s.jsc_passing_year,
            "Institution": s.jsc_institution,
            'Registration No.': s.jsc_regno,
            'Roll No.': s.jsc_roll,
            'GPA Point': s.jsc_gpa,
            'Scholarship': 'Not Applicable'
          }) as [k, v]}
            <div class="py-3 px-5 flex flex-col gap-1 hover:bg-primary/5">
              <span class="uppercase text-xs tracking-wide text-base-content/70 font-semibold">{k}</span>
              <span class="font-semibold">{v || 'N/A'}</span>
            </div>
          {/each}
        </div>
      </div>
      <div class="w-full rounded-xl overflow-hidden border border-white/10">
        <h3 class="flex items-center justify-between gap-2 text-lg font-semibold px-5 py-3 bg-linear-to-r from-white/10 to-white/5 text-white/80">
          <span>SSC / Dakhil</span>
          <span class="bg-white/20 px-3 py-1 rounded-box text-sm border border-white/20">{s.ssc_gpa ? `GPA ${s.ssc_gpa}` : 'N/A'}</span>
        </h3>
        <div class="flex flex-col divide-y divide-white/10">
          {#each Object.entries({
            'Board': s.ssc_board,
            'Session': s.ssc_session,
            'Passing Year': s.ssc_passing_year,
            "Institution": s.ssc_institution,
            'Registration No.': s.ssc_regno,
            'Roll No.': s.ssc_roll,
            'GPA Point': s.ssc_gpa,
            'Scholarship': s.board_scholarship,
          }) as [k, v]}
            <div class="py-3 px-5 flex flex-col gap-1 hover:bg-primary/5">
              <span class="uppercase text-xs tracking-wide text-base-content/70 font-semibold">{k}</span>
              <span class="font-semibold">{v || 'N/A'}</span>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>

{#snippet subjectBox(title: string, desc: string)}
  <div class="bg-white/5 border border-white/10 shadow rounded-lg py-3 px-5 flex flex-col gap-1 hover:bg-primary/10 hover:border-primary/30 hover:-translate-y-1 transition ease-out duration-300">
    <span class="font-semibold text-base">{title}</span>
    <span class="font-semibold tracking-wide text-base-content/70">{desc}</span>
  </div>
{/snippet}

<div class="card bg-base-200 border border-base-300 shadow-md mt-5">
  <div class="card-body">
    <div class="flex items-center justify-start gap-3">
      <div class="p-2 bg-linear-to-bl from-indigo-700 to-rose-700 rounded-md text-white/90"><BookOpenTextIcon/></div>
      <div class="flex flex-col gap-0.5">
        <h2 class="card-title">HSC বিষয় নির্বাচন</h2>
        <h3 class="tracking-wide">HSC Subject Selection</h3>
        <span class="badge badge-primary badge-xs capitalize">{s.group.replaceAll('_', ' ')}</span>
      </div>
    </div>
    <div class="flex flex-col gap-5 items-center justify-center mt-2">
      <div class="flex items-center gap-3 w-full">
        <span class="flex gap-2 shrink-0 badge badge-warning badge-soft"><PinIcon class="size-4 rotate-45"/> আবশ্যিক বিষয়সমূহ (Compulsory)</span>
        <span class="w-full h-px rounded bg-warning/50"></span>
      </div>
      <div class="flex flex-wrap items-center *:grow gap-5 w-full">
        {#each Object.keys(s).filter(k=>k.startsWith('hsc_compulsory_subjects')) as k}
          {@const v = s[k as keyof typeof s]}
          {#if v}
            {@render subjectBox(getSubject(v) || 'Unknown', `Code: ${v.replaceAll('_', ', ')}`)}
          {/if}
        {/each}
      </div>
      <div class="flex items-center gap-3 w-full">
        <span class="flex gap-2 shrink-0 badge badge-success badge-soft"><StarIcon class="size-4"/> ঐচ্ছিক বিষয়সমূহ (Elective)</span>
        <span class="w-full h-px rounded bg-success/50"></span>
      </div>
      <div class="flex flex-wrap items-center *:grow gap-5 w-full">
        {#each Object.keys(s).filter(k=>k.startsWith('hsc_optional_subjects')) as k}
          {@const v = s[k as keyof typeof s]}
          {#if v}
            {@render subjectBox(getSubject(v) || 'Unknown', `Code: ${v.replaceAll('_', ', ')}`)}
          {/if}
        {/each}
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  @reference 'tailwindcss';
  .responsive-border {
    @apply divide-x divide-y border divide-inherit;
    & > * {
      @apply border-e-0;
      &:nth-child(2n + 1) {
        @apply md:border-e;
      }
      &:nth-last-child(2) {
        @apply md:border-b-0;
      }
    }
  }
</style>