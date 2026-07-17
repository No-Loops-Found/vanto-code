import type { APIRoute } from 'astro';
import { serverClient, json } from '../../lib/supabase';
import { cursoById } from '../../lib/courses';

export const prerender = false;

/** Lista de cursos en los que está inscrito el usuario: { cursos: string[] }. */
export const GET: APIRoute = async ({ request, cookies }) => {
  const supabase = serverClient(request, cookies);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return json({ cursos: [] }, 401);

  const { data, error } = await supabase.from('inscripciones').select('curso');
  if (error) return json({ error: error.message }, 500);
  return json({ cursos: (data ?? []).map((r) => r.curso) });
};

/** Apuntarse a un curso. Body: { curso }. */
export const POST: APIRoute = async ({ request, cookies }) => {
  const supabase = serverClient(request, cookies);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return json({ error: 'no-session' }, 401);

  const body = await request.json().catch(() => null);
  const curso = typeof body?.curso === 'string' ? body.curso : '';
  const def = cursoById(curso);
  if (!def) return json({ error: 'curso-desconocido' }, 400);
  if (!def.disponible) return json({ error: 'curso-no-disponible' }, 400);

  const { error } = await supabase
    .from('inscripciones')
    .upsert({ user_id: user.id, curso }, { onConflict: 'user_id,curso' });
  if (error) return json({ error: error.message }, 500);
  return json({ ok: true, curso });
};

/** Darse de baja de un curso. Body: { curso }. */
export const DELETE: APIRoute = async ({ request, cookies }) => {
  const supabase = serverClient(request, cookies);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return json({ error: 'no-session' }, 401);

  const body = await request.json().catch(() => null);
  const curso = typeof body?.curso === 'string' ? body.curso : '';
  if (!curso) return json({ error: 'curso-invalido' }, 400);

  const { error } = await supabase
    .from('inscripciones')
    .delete()
    .eq('user_id', user.id)
    .eq('curso', curso);
  if (error) return json({ error: error.message }, 500);
  return json({ ok: true });
};
