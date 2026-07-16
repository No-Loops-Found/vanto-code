// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// output: 'static' → páginas prerenderizadas por defecto (landing, niveles).
// Las páginas con sesión (login, cuenta, endpoints) usan `export const prerender = false`.
export default defineConfig({
  output: 'static',
  adapter: vercel(),
});
