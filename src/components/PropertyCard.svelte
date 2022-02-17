<template>
  <div class="grid grid-cols-12 sm:gap-6 auto-rows-[minmax(20rem,auto)]">
    <div class="w-full col-span-full sm:col-span-7 place-self-center {$$props.class || ''}" >
      <img
        src={property.image.src}
        srcset={property.image.srcset}
        alt={property.title}
        class="sm:aspect-3/2 object-cover"
        loading="lazy"
        data-zoomable
      />
    </div>
    <div class="col-span-full sm:col-span-5 flex items-center flex-col justify-between p-6">
      <div
        class="font-['Scheherazade_New'] text-sm tracking-widest uppercase"
      >{ property.locality }</div>
      <div class="flex flex-col gap-4 text-center">
        <div
          class="[font-size:clamp(1.5rem,2.5vw,2.25rem)] tracking-wide leading-tight font-bold uppercase"
        >{ property.title }</div>
        <div class="text-sm sm:text-base tracking-widest">{ property.price }</div>
      </div>
      <a href="/houses/{property.slug}" class="sm:text-xl text-sky-600">See</a>
      <a href="/houses/{property.slug}" class="sm:text-xl text-sky-600">{property.linkDisplayText}</a>
    </div>
  </div>
</template>

<script>
export let property
</script>
