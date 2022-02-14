import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-netlify';
import Icons from 'unplugin-icons/vite';
import 'dotenv/config';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    vite: {
      resolve: {
        alias: {
          '~': '/src',
        },
      },
      plugins: [
        Icons({
          compiler: 'svelte',
          iconCustomizer(_c, _i, props) {
            props.width = '24';
            props.height = '24';
          },
        }),
      ],
      server: {
        proxy: {
          '/uploads': process.env.BASE_URL,
        },
      },
    },
  },
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],
};

export default config;
