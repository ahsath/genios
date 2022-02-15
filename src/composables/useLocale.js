import { watch, ref } from 'vue';
import { browser } from '$app/env';
import Cookies from 'js-cookie';

let locale = ref(Cookies.get('locale'));

const cookieAttrs = { expires: 365, path: '/', sameSite: 'lax' };
const supportedLocales = ['en', 'pt'];

if (!supportedLocales.includes(locale.value)) {
  if (browser) {
    const browserLang = navigator.language.split('-')[0];

    if (supportedLocales.includes(browserLang)) {
      Cookies.set('locale', browserLang, cookieAttrs);
      locale.value = Cookies.get('locale');
    } else {
      Cookies.set('locale', 'en', cookieAttrs);
      locale.value = Cookies.get('locale');
    }
  }
}

watch(locale, (locale) => {
  Cookies.set('locale', locale, cookieAttrs);
  window.location.reload();
});

export default locale;
