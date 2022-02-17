export const getLocale = (locale) => {
  return ['en', 'pt'].includes(locale) ? locale : 'en';
};
