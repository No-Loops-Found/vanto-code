/**
 * Personalización híbrida (entrada pública).
 * La IA extrae 1 vez el modelo del proyecto; cada nivel se genera por plantilla
 * programática (src/lib/niveles/nNN.ts), sin más IA.
 */
import { buildCtx, modeloValido } from './niveles/_shared';
import type { Ctx, NivelPersonalizado, Proyecto } from './niveles/_shared';

import n00 from './niveles/n00';
import n01 from './niveles/n01';
import n02 from './niveles/n02';
import n03 from './niveles/n03';
import n04 from './niveles/n04';
import n05 from './niveles/n05';
import n06 from './niveles/n06';
import n07 from './niveles/n07';
import n08 from './niveles/n08';
import n09 from './niveles/n09';
import n10 from './niveles/n10';
import n11 from './niveles/n11';

export type { Proyecto, NivelPersonalizado, Modelo, Campo, Accion } from './niveles/_shared';

/** Generadores por nivel (índice de ruta 0..11). */
const GENERADORES: Record<number, (ctx: Ctx) => NivelPersonalizado> = {
  0: n00,
  1: n01,
  2: n02,
  3: n03,
  4: n04,
  5: n05,
  6: n06,
  7: n07,
  8: n08,
  9: n09,
  10: n10,
  11: n11,
};

/** Contenido personalizado de un nivel, o null si no hay plantilla/modelo. */
export function personalizarNivel(n: number, proyecto: Proyecto | null): NivelPersonalizado | null {
  if (!proyecto || !modeloValido(proyecto.modelo)) return null;
  const gen = GENERADORES[n];
  if (!gen) return null;
  return gen(buildCtx(proyecto));
}

export const NIVELES_PERSONALIZABLES = Object.keys(GENERADORES).map(Number);
