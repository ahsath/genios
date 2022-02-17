<div bind:this={slideshow} class="flex gap-0.5 overflow-x-scroll snap-mandatory snap-x scroll-pt-14 scroll-smooth">
  <slot />
</div>
<div class="flex gap-0.5">
  <slot name="thumbnail" {scrollTo} />
</div>

<script>
export let count

let slideshow 

const scrollTo = pos => {
  let scrollAmount = slideshow.scrollWidth / count
  let scrollIncrements = [0]

  for (let i = 0; i < count; i++) {
    scrollIncrements.push(scrollIncrements[i] += scrollAmount)
  }
  scrollIncrements.unshift(0)

  slideshow.scrollLeft = scrollIncrements[pos]
}
</script>