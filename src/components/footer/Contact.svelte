<div class="flex items-center flex-col gap-4">
  <span class="font-['Scheherazade_New'] text-sm tracking-widest uppercase">{footer.data.contactDisplayText}</span>
  <div class="flex gap-6 tracking-widest font-bold uppercase">
    {#each footer.data.networks as network}
      <a href={network.link} target="_blank">{network.name}</a>
    {/each}
  </div>
</div>

<script>
import { getContext } from 'svelte'

let footer = getContext('footer')
</script>