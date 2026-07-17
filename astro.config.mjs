// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://vanto-code.vercel.app';

// output: 'static' → landing prerenderizada; niveles y páginas con sesión usan SSR.
export default defineConfig({
  site: SITE,
  output: 'static',
  adapter: vercel(),
  integrations: [
    sitemap({
      // Fuera páginas privadas/utilitarias del sitemap.
      filter: (page) => !page.includes('/entrar') && !page.includes('/cuenta'),
      // Páginas SSR (no se autodescubren): las públicas se añaden a mano.
      // Los niveles 1-11 están tras login → no se indexan a propósito.
      customPages: [
        `${SITE}/curso/web`,
        `${SITE}/curso/datos`,
        `${SITE}/curso/movil`,
        `${SITE}/curso/ia`,
        `${SITE}/nivel/0`,
      ],
    }),
  ],
});
