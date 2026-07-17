import type { APIRoute } from 'astro';
import { serverClient, json } from '../../lib/supabase';

export const prerender = false;

/** Devuelve los niveles superados del usuario logueado: { niveles: number[] }. */
export const GET: APIRoute = async ({ request, cookies }) => {
  const supabase = serverClient(request, cookies);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return json({ niveles: [] }, 401);

  const { data, error } = await supabase
    .from('progreso')
    .select('nivel')
    .eq('superado', true);
  if (error) return json({ error: error.message }, 500);
  return json({ niveles: (data ?? []).map((r) => r.nivel) });
};

/** Marca (o desmarca) un nivel como superado. Body: { nivel, superado }. */
export const POST: APIRoute = async ({ request, cookies }) => {
  const supabase = serverClient(request, cookies);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return json({ error: 'no-session' }, 401);

  const body = await request.json().catch(() => null);
  const nivel = Number(body?.nivel);
  const superado = body?.superado !== false; // por defecto true
  if (!Number.isInteger(nivel) || nivel < 0 || nivel > 11) {
    return json({ error: 'nivel-invalido' }, 400);
  }

  const { error } = await supabase
    .from('progreso')
    .upsert(
      { user_id: user.id, nivel, superado, updated_at: new Date().toISOString() },
      { onConflict: 'user_id,nivel' }
    );
  if (error) return json({ error: error.message }, 500);

  // Avanzar en un nivel implica estar inscrito en el curso Web (best-effort).
  await supabase
    .from('inscripciones')
    .upsert({ user_id: user.id, curso: 'web' }, { onConflict: 'user_id,curso' })
    .then(() => {}, () => {});

  return json({ ok: true });
};
