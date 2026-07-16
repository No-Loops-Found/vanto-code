import type { APIRoute } from 'astro';
import { serverClient, json } from '../../lib/supabase';

export const prerender = false;

/** Guarda el resultado de un test rápido. Body: { nivel, aciertos, total }. */
export const POST: APIRoute = async ({ request, cookies }) => {
  const supabase = serverClient(request, cookies);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return json({ error: 'no-session' }, 401);

  const body = await request.json().catch(() => null);
  const nivel = Number(body?.nivel);
  const aciertos = Number(body?.aciertos);
  const total = Number(body?.total);
  if (
    !Number.isInteger(nivel) || nivel < 0 || nivel > 11 ||
    !Number.isInteger(aciertos) || aciertos < 0 ||
    !Number.isInteger(total) || total <= 0 || aciertos > total
  ) {
    return json({ error: 'datos-invalidos' }, 400);
  }

  const { error } = await supabase
    .from('quiz_results')
    .insert({ user_id: user.id, nivel, aciertos, total });
  if (error) return json({ error: error.message }, 500);
  return json({ ok: true });
};
