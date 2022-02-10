const { fontFamily } = require('tailwindcss/defaultTheme');

const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      aspectRatio: {
        '3/2': '3 / 2',
      },
    },
    screens: {
      sm: '48rem',
    },
    fontFamily: {
      sans: ['Greycliff CF', ...fontFamily.sans],
    },
  },
  corePlugins: {
    container: false,
  },
};

module.exports = config;
