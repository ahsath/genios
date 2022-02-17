<figure class="grid {$$props.class || ''}">
  <video
    bind:this={video}
    {poster}
    on:click={() => { pressed = !pressed, debouncedFn() }}
    on:ended={() => { video.load(), paused = true }}
    class="max-h-[calc(85vh-56px)] mx-auto aspect-video object-cover row-start-1 col-start-1"
    preload="metadata"
    muted
  >
    <source {src} {type} />
  </video>
  {#if pressed || paused}
    <button
      transition:fade={{ duration: 300 }}
      class="col-start-1 row-start-1 z-10 place-self-center text-white"
      on:click={play}
    >
      {#if paused}
        <SharpPlayArrow class="w-12 h-12 sm:w-16 sm:h-16" />
      {:else}
        <SharpPause v-else class="w-12 h-12 sm:w-16 sm:h-16" />
      {/if}
    </button>
  {/if}
</figure>

<script>
import { fade } from 'svelte/transition';
import { useDebounceFn } from '@vueuse/core';
import SharpPlayArrow from '~icons/ic/SharpPlayArrow'
import SharpPause from '~icons/ic/SharpPause'

export let poster
export let src
export let type

let video
let paused = true
let pressed = false

const debouncedFn = useDebounceFn(() => pressed = false, 2000)

const play = () => {
  if (video.paused || video.ended) video.play();
  else video.pause();

  paused = video.paused
}
</script>