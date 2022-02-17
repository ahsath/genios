<header class="fixed inset-x-0 [padding-inline:clamp(theme('spacing.4'),2vw,theme('spacing.6'))] py-3 flex items-center bg-white">
  <nav
    class="max-w-[90rem] [margin-inline:auto] flex grow items-center justify-between"
    aria-label="Main navigation"
  >
    <a href="/" class="w-44 sm:w-64 fill-current">
      <img src={logo} alt="Logo: Génio Reis, Design e Construção">
    </a>

    <div class="flex gap-1 items-center">
      <LanguageSelector class="hidden sm:block" />
      <a class="flex items-center justify-center w-12 h-12" href={footer.data.networks.find(network => network.link.startsWith('tel')).link}>
        <SharpPhone/>
      </a>
    </div>
  </nav>
</header>

<slot />

<Footer />

<script context="module">
export async function load({ fetch }) {
  const res = await fetch('/api/footer');
  return { props: {footer: await res.json() } }
}
</script>

<script>
import { onMount, setContext } from 'svelte';
import '~/assets/css/tailwind.css'
import logo from '~/assets/svg/logo.svg'
import SharpPhone from '~icons/ic/sharp-phone'
import LanguageSelector from '~/components/LanguageSelector.svelte';
import Footer from '~/components/footer/Footer.svelte';
import locale from '~/composables/useLocale';

export let footer
setContext('footer', footer)
    
onMount(() => document.documentElement.lang = locale.value)
</script>
