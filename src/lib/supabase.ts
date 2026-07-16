/**
 * Clientes Supabase para Vanto Code.
 * - browserClient(): para el navegador (guarda la sesión en cookies vía @supabase/ssr).
 * - serverClient(request, cookies): para endpoints/SSR de Astro; lee la sesión de las cookies.
 */
import { createBrowserClient, createServerClient, parseCookieHeader } from '@supabase/ssr';
import type { AstroCookies } from 'astro';

const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

/** Cliente para el navegador (islands / páginas de auth). */
export function browserClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

/** Cliente para el servidor (API routes y páginas con prerender=false). */
export function serverClient(request: Request, cookies: AstroCookies) {
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return parseCookieHeader(request.headers.get('Cookie') ?? '').map((c) => ({
          name: c.name,
          value: c.value ?? '',
        }));
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookies.set(name, value, options);
        });
      },
    },
  });
}

/** Helper de respuesta JSON para endpoints. */
export const json = (data: unknown, status = 200): Response =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
