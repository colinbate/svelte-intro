import adapter from '@sveltejs/adapter-static';
import md from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  preprocess: [md.mdsvex(mdsvexConfig)],
  kit: {
    adapter: adapter(),
    target: 'body',
  },
};

export default config;
