<svelte:head>
<title>{metatags.appName} | {metatags.title}</title>
<meta property="title" content="{metatags.appName} | {metatags.title}">
<meta property="description" content={metatags.description}>

<meta property="og:type" content="website">
<meta property="og:url" content={metatags.domain} />
<meta property="og:title" content="{metatags.appName} | {metatags.title}" />
<meta property="og:description" content={metatags.description}/>
<meta property="og:image" content={metatags.ogImage} />

<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content={metatags.domain} />
<meta property="twitter:title" content="{metatags.appName} | {metatags.title}" />
<meta property="twitter:description" content={metatags.description} />
<meta property="twitter:image" content={metatags.ogImage} />
</svelte:head>

<script>
export let metatags
</script>