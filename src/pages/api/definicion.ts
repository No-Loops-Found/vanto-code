import type { APIRoute } from 'astro';
import { serverClient, json } from '../../lib/supabase';

export const prerender = false;

/**
 * Guarda una definición de "define tu app" (lead/onboarding).
 * Body: { nombre, funciones: string[], resultado: Record<string,string[]> }.
 * Funciona con o sin sesión: si hay usuario, la fila se le atribuye.
 */
export const POST: APIRoute = async ({ request, cookies }) => {
  const supabase = serverClient(request, cookies);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const body = await request.json().catch(() => null);
  const nombre = typeof body?.nombre === 'string' ? body.nombre.trim().slice(0, 200) : '';
  const funciones = Array.isArray(body?.funciones)
    ? body.funciones.filter((x: unknown) => typeof x === 'string').slice(0, 100)
    : [];
  const resultado = body?.resultado && typeof body.resultado === 'object' ? body.resultado : {};
  if (!nombre && funciones.length === 0) {
    return json({ error: 'vacio' }, 400);
  }

  const { error } = await supabase
    .from('app_definitions')
    .insert({
      user_id: user?.id ?? null,
      nombre: nombre || 'Tu app',
      funciones,
      resultado,
    });
  if (error) return json({ error: error.message }, 500);
  return json({ ok: true });
};
