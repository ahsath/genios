<Metatags {metatags}/>

<Container class="grid gap-4 sm:gap-6">
  {#each properties as property, i}
    <PropertyCard property={property} class={(i + 1) % 2 === 0 && 'sm:order-1'}/>
  {/each}
</Container>

<script>
import { onMount } from 'svelte';
import PropertyCard from "~/components/PropertyCard.svelte";
import Container from "~/components/Container.svelte";
import Metatags from "~/components/Metatags.svelte";

export let properties
export let metatags

onMount(() => window.mediumZoom('[data-zoomable]'))
</script>