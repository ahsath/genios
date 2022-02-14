<svelte:head>
<title>Génios Reis | Contemporary House Maker</title>
</svelte:head>

<Container class="grid gap-4 sm:gap-6">
  <!-- <h1 class="[font-size:clamp(1.5rem,2.5vw,2.25rem)] tracking-wide leading-tight font-bold uppercase pt-20">Genios</h1>
  <div class="font-['Scheherazade_New'] text-sm tracking-widest uppercase">Colares</div> -->
  {#each properties as property, i}
    <PropertyCard property={property} class={(i + 1) % 2 === 0 && 'sm:order-1'}/>
  {/each}
</Container>

<script>
import PropertyCard from "~/components/PropertyCard.svelte";
import Container from "~/components/Container.svelte";

export let properties
</script>