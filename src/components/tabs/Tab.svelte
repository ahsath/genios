<div
  on:click={() => currentTab = tab}
  id={`${name}-${tab}`}
  aria-selected={ariaSelected}
  aria-controls={`tabpanel-${name}-${tab}`}
  role="tab"
  tabindex="0"
  class="flex items-center h-12 px-4 cursor-pointer text-sm sm:text-xl font-bold uppercase tracking-wide"
>
  <span class="w-max pointer-events-none">
    <slot />
  </span>
</div>

<script>
export let tab 
export let name
export let currentTab = 0

$: ariaSelected = currentTab == tab
</script>