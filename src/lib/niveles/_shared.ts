/**
 * Base compartida de las plantillas de nivel personalizadas.
 * La IA extrae 1 vez el modelo; aquí se deriva un "contexto" listo para usar y
 * generadores de código deterministas. Cada nivel (n00..n11) es una función pura
 * (ctx) => NivelPersonalizado. CERO llamadas a IA.
 */

export type TipoCampo = 'texto' | 'numero' | 'fecha' | 'booleano';

export interface Campo {
  nombre: string;
  tipo: TipoCampo;
  ejemplo?: string;
}
export interface Accion {
  nombre: string;
  desc?: string;
}
export interface Modelo {
  entidad: string;
  plural: string;
  genero?: 'f' | 'm';
  campos: Campo[];
  acciones?: Accion[];
  entidades2?: string[];
}
export interface Proyecto {
  app: string;
  modelo: Modelo;
}

export interface NivelPersonalizado {
  intro: string;
  blocks: Array<{ h?: string; p?: string[]; code?: { label: string; text: string }; note?: string }>;
  ex: Array<{ t: string; hint?: string; sol?: string; reto?: boolean }>;
  quiz: Array<{ q: string; o: string[]; a: number }>;
}

/** Contexto derivado del modelo, listo para las plantillas. */
export interface Ctx {
  app: string;
  E: string; // Planta
  e: string; // planta
  plural: string; // plantas
  g: 'f' | 'm';
  art: string; // la / el
  un: string; // una / un
  art2: string; // las / los
  un2: string; // unas / unos
  este: string; // esta / este
  mismo: string; // misma / mismo
  campos: Campo[];
  c0: string; // primer campo
  campoNum?: Campo;
  campoFecha?: Campo;
  campoTexto?: Campo;
  params: string; // "nombre, especie, fechaRiego"
  acciones: Accion[];
  a0: string; // primera acción (o "describir")
  entidad2?: string; // entidad secundaria (PascalCase)
}

// ── helpers de texto ───────────────────────────────────────────────────────
export const esc = (s: string): string => String(s ?? '').replace(/[<>&"'`]/g, '').trim();
const lower1 = (s: string): string => (s ? s[0].toLowerCase() + s.slice(1) : s);
const cap1 = (s: string): string => (s ? s[0].toUpperCase() + s.slice(1) : s);

export function modeloValido(m: unknown): m is Modelo {
  const mm = m as Modelo;
  return !!mm && typeof mm.entidad === 'string' && mm.entidad.length > 0 && Array.isArray(mm.campos) && mm.campos.length > 0;
}

/** Valor JS de ejemplo para un campo. */
export function valJS(c: Campo): string {
  const ej = esc(c.ejemplo || '');
  switch (c.tipo) {
    case 'numero':
      return ej && /^-?\d+(\.\d+)?$/.test(ej) ? ej : '3';
    case 'fecha':
      return `"${ej || '2026-07-10'}"`;
    case 'booleano':
      return ej === 'false' ? 'false' : 'true';
    default:
      return `"${ej || 'Ejemplo'}"`;
  }
}

/** Construye el contexto a partir del proyecto. */
export function buildCtx(proyecto: Proyecto): Ctx {
  const m = proyecto.modelo;
  const E = cap1(esc(m.entidad));
  const e = lower1(E);
  const plural = esc(m.plural) || e + 's';
  const g: 'f' | 'm' = m.genero === 'f' || m.genero === 'm' ? m.genero : e.endsWith('a') ? 'f' : 'm';
  const campos = (m.campos || []).slice(0, 5).map((c) => ({ ...c, nombre: esc(c.nombre) })).filter((c) => c.nombre);
  const acciones = (m.acciones || []).slice(0, 3).map((a) => ({ ...a, nombre: esc(a.nombre) })).filter((a) => a.nombre);
  return {
    app: esc(proyecto.app) || 'tu app',
    E,
    e,
    plural,
    g,
    art: g === 'f' ? 'la' : 'el',
    un: g === 'f' ? 'una' : 'un',
    art2: g === 'f' ? 'las' : 'los',
    un2: g === 'f' ? 'unas' : 'unos',
    este: g === 'f' ? 'esta' : 'este',
    mismo: g === 'f' ? 'misma' : 'mismo',
    campos,
    c0: campos[0]?.nombre || 'nombre',
    campoNum: campos.find((c) => c.tipo === 'numero'),
    campoFecha: campos.find((c) => c.tipo === 'fecha'),
    campoTexto: campos.find((c) => c.tipo === 'texto'),
    params: campos.map((c) => c.nombre).join(', '),
    acciones,
    a0: acciones[0]?.nombre || 'describir',
    entidad2: m.entidades2 && m.entidades2[0] ? cap1(esc(m.entidades2[0])) : undefined,
  };
}

// ── generadores de código ──────────────────────────────────────────────────
/** `{ nombre: "Manolito", especie: "Aloe Vera", ... }` en una línea. */
export function filaInline(ctx: Ctx): string {
  return `{ ${ctx.campos.map((c) => `${c.nombre}: ${valJS(c)}`).join(', ')} }`;
}

/** Objeto literal multilínea: `const planta = { ... };` + acceso. */
export function objetoLiteral(ctx: Ctx, varName = ctx.e): string {
  return [
    `// Un objeto agrupa en una sola "caja" los datos de ${ctx.un} ${ctx.e}`,
    `const ${varName} = {`,
    ...ctx.campos.map((c, i) => `  ${c.nombre}: ${valJS(c)}${i < ctx.campos.length - 1 ? ',' : ''}`),
    '};',
    '',
    `console.log(${varName}.${ctx.c0});`,
  ].join('\n');
}

/** Lista de objetos con una fila de ejemplo. */
export function listaObjetos(ctx: Ctx, varName = ctx.plural): string {
  return [
    `const ${varName} = [`,
    `  ${filaInline(ctx)},`,
    `  // …y así con cada ${ctx.e}`,
    '];',
    '',
    `console.log(${varName}.length + " ${ctx.plural}");`,
  ].join('\n');
}

/** Clase con constructor y métodos a partir de las acciones. */
export function claseCode(ctx: Ctx): string {
  const args = ctx.campos.map(valJS).join(', ');
  const metodos =
    ctx.acciones.length > 0
      ? ctx.acciones
          .map((a) =>
            [`  ${a.nombre}() {`, `    // ${esc(a.desc || 'tu lógica aquí')}`, `    console.log(this.${ctx.c0} + " → ${a.nombre}");`, '  }'].join('\n')
          )
          .join('\n\n')
      : ['  describir() {', `    console.log(this.${ctx.c0});`, '  }'].join('\n');
  return [
    `class ${ctx.E} {`,
    `  constructor(${ctx.params}) {`,
    ...ctx.campos.map((c) => `    this.${c.nombre} = ${c.nombre};`),
    '  }',
    '',
    metodos,
    '}',
    '',
    `const ${ctx.e} = new ${ctx.E}(${args});`,
    `${ctx.e}.${ctx.a0}();`,
  ].join('\n');
}
