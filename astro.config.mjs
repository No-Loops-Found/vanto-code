// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// output: 'static' → landing prerenderizada; niveles y páginas con sesión usan SSR.
export default defineConfig({
  output: 'static',
  adapter: vercel(),
});
