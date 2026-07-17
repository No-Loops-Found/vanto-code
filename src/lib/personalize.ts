/**
 * Personalización híbrida (entrada pública).
 * La IA extrae 1 vez el modelo del proyecto; cada nivel se genera por plantilla
 * programática (src/lib/niveles/nNN.ts), sin más IA.
 */
import { buildCtx, modeloValido } from './niveles/_shared';
import type { Ctx, NivelPersonalizado, Proyecto } from './niveles/_shared';

import n07 from './niveles/n07';

export type { Proyecto, NivelPersonalizado, Modelo, Campo, Accion } from './niveles/_shared';

/** Generadores por nivel. Se añaden aquí conforme se crean las plantillas. */
const GENERADORES: Record<number, (ctx: Ctx) => NivelPersonalizado> = {
  7: n07,
};

/** Contenido personalizado de un nivel, o null si no hay plantilla/modelo. */
export function personalizarNivel(n: number, proyecto: Proyecto | null): NivelPersonalizado | null {
  if (!proyecto || !modeloValido(proyecto.modelo)) return null;
  const gen = GENERADORES[n];
  if (!gen) return null;
  return gen(buildCtx(proyecto));
}

export const NIVELES_PERSONALIZABLES = Object.keys(GENERADORES).map(Number);
