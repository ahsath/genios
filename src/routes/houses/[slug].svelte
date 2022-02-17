<Metatags metatags={{
	appName: metatags.appName,
	domain: `${metatags.domain}houses/${property.slug}`,
	title: property.title,
	description: property.about.text,
	ogImage: property.image.src
}}/>

<Container class="grid grid-cols-12">
	<!-- video -->
	<VideoPlayer class="col-span-full" src={property.video.url} poster={property.image.src} type={property.video.mime} />

	<!-- title + price -->
	<div class="text-center col-start-2 col-end-12">
		<h1 class="text-[clamp(1.5rem,2.5vw,2.25rem)] uppercase font-bold tracking-wide mt-4">{property.title}</h1>
		<div class="text-sm sm:text-lg tracking-widest mt-2">{property.price}</div>
	</div>

	<!-- about -->
	<div class="col-start-2 col-end-12 mt-20 sm:mt-36">
		<h2 class="font-['Scheherazade_New'] subtitle uppercase tracking-tighter text-black/20">{property.about.name}</h2>
		<p class="mt-5 max-w-[50ch] leading-8 sm:leading-10 body tracking-wide">{property.about.text}</p>
	</div>
	<img
		class="col-span-full mt-10"
		src={property.about.image.src}
		srcset={property.about.image.srcset}
		alt={property.title}
		data-zoomable
	/>

	<!-- stats -->
	<div class="col-start-2 col-end-12 grid grid-cols-[repeat(auto-fit,minmax(7rem,auto))] gap-10 mt-10">
		{#each property.stats as stat}
			<div class="flex-grow">
				<div class="stat_title font-light">{stat.stat}</div>
				<div class="sm:text-xl">{stat.description}</div>
			</div>
		{/each}
	</div>

	<!-- location -->
	<div class="col-start-2 col-end-12 sm:col-end-6 mt-20 sm:mt-36">
		<h2 class="font-['Scheherazade_New'] subtitle uppercase tracking-tighter text-black/20">
			{property.location.name}
		</h2>
		<h3 class="mt-10 location_title font-light">{property.location.locality}, {property.location.capital}</h3>
		<p class="text-sm sm:text-base mt-1">{property.location.zipCode} {property.location.rua}</p>
	</div>
	<img
		class="col-span-full mt-10"
		src={property.location.image.src}
		srcset={property.location.image.srcset}
		alt={property.title}
		loading="lazy"
		data-zoomable
	/>

	<!-- layout + features -->
	<h2 class="col-start-2 col-end-12 mt-20 sm:mt-36 font-['Scheherazade_New'] subtitle uppercase tracking-tighter text-black/20">
		{property.layout.name}
	</h2>
	<TabList ariaLabel={property.layout.name} class="col-start-2 col-span-10 mt-6 -mx-4">
		{#each property.layout.floors.map(floor => floor.title) as floor, i}
			<Tab tab={i} bind:currentTab={selectedFloorTab} name={slugify(property.layout.name)}>{floor}</Tab>
		{/each}
	</TabList>
	{#each property.layout.floors as floor, i}
		<TabPanel 
			panel={i} 
			bind:currentPanel={selectedFloorTab}
			controlledBy={slugify(property.layout.name)}
			class="grid grid-cols-12 col-span-full mt-4"
		>
			<div class="grid grid-cols-[repeat(2,minmax(6.25rem,1fr))] gap-8 sm:gap-14 col-start-2 col-span-10 sm:col-end-6 place-self-center w-full">
				{#each floor.spaces as space}
					<div v-for="space in floor.spaces" class="flex items-center gap-4">
						<img class="w-8 h-8 sm:w-10 sm:h-10" src={space.icon.url} alt="{space.name} icon" loading="lazy" />
						<div class="flex flex-col">
							<div class="text-sm tracking-wide">{space.name}</div>
							<div class="font-bold">{space.amount}</div>
						</div>
					</div>
				{/each}
			</div>
			<img
				class="col-span-full sm:col-start-7 sm:col-end-13 place-self-center m-4 sm:m-0"
				src={floor.image.src}
				srcset={floor.image.srcset}
				alt={property.title}
				loading="lazy"
				data-zoomable
      />

			<!-- spaces -->
			{#each floor.spaces as space, i}
				<div class="grid grid-cols-12 place-items-center gap-y-12 col-span-full mt-16 sm:mt-6">
					<div class="col-span-full sm:col-span-5 flex flex-col {(i + 1) % 2 === 0 && 'sm:order-1'}">
						<div class="grid grid-cols-12 sm:grid-cols-5 gap-y-6">
							<h2 class="col-[2_/_span_10] sm:col-[2_/_span_3] text-2xl">{space.name}</h2>
							<p class="col-[2_/_span_10] sm:col-[2_/_span_3] leading-8 sm:leading-10 body tracking-wide">
								{space.text}
							</p>
						</div>
					</div>
						<div class="flex flex-col gap-0.5 col-span-full sm:col-span-7">
							<SlideShow count={space.images.length}>
								{#each space.images as image}
									<img
										class="snap-start"
										src={image.src}
										srcset={image.srcset}
										alt={space.text}
										loading="lazy"
										data-zoomable
									/>
								{/each}
								<svelte:fragment slot="thumbnail" let:scrollTo>
									{#each space.images as image, i}
										{#if space.images.length > 1}
											<button on:click={scrollTo(i)} class="max-w-[9rem]">
												<img src={image.thumbnail} alt />
											</button>
										{/if}
									{/each}
								</svelte:fragment>
							</SlideShow>
						</div>
					</div>
				{/each}
		</TabPanel>
	{/each}

	<!-- amenities -->
	<h2 class="col-start-2 col-end-12 mt-20 sm:mt-36 font-['Scheherazade_New'] subtitle uppercase tracking-tighter text-black/20">
		{property.amenity.name}
	</h2>
	<TabList ariaLabel={property.amenity.name} class="col-start-2 col-span-10 mt-6 -mx-4">
		{#each property.amenity.amenities.map(amenity => amenity.name) as amenity, i}
			<Tab tab={i} bind:currentTab={selectedAmenityTab} name={slugify(property.amenity.name)}>{amenity}</Tab>
		{/each}
	</TabList>
	{#each property.amenity.amenities as amenity, i}
		<TabPanel 
			panel={i} 
			bind:currentPanel={selectedAmenityTab}
			controlledBy={slugify(property.amenity.name)}
			class="grid grid-cols-12 col-span-full"
		>
			<img
				class="col-span-full object-contain mx-auto"
				src={amenity.image.src}
				srcset={amenity.image.srcset}
				alt={amenity.text}
				data-zoomable
			/>
			<figcaption class="col-start-2 col-span-10 max-w-[60ch] text-center mx-auto mt-4">
				{amenity.text}
			</figcaption>
		</TabPanel>
	{/each}
</Container>

<script>
import { onMount } from 'svelte';
import Metatags from "~/components/Metatags.svelte";
import Container from "~/components/Container.svelte";
import VideoPlayer from '~/components/VideoPlayer.svelte';
import TabList from '~/components/tabs/TabList.svelte';
import Tab from '~/components/tabs/Tab.svelte';
import TabPanel from '~/components/tabs/TabPanel.svelte';
import SlideShow from '~/components/SlideShow.svelte';
import { slugify } from '~/helpers';

export let property;
export let metatags;

let selectedFloorTab = 0
let selectedAmenityTab = 0

onMount(() => window.mediumZoom('[data-zoomable]'))
</script>

<style>
.subtitle {
	font-size: clamp(1.5rem, 6vw, 3.75rem);
}
.body {
	font-size: clamp(1rem, 1.5vw, 1.25rem);
}
.stat_title {
	font-size: clamp(2.5rem, 4vw, 5rem);
}
.location_title {
	font-size: clamp(1.5rem, 6vw, 2.25rem);
}
</style>