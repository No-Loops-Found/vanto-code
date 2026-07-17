/**
 * Personalización híbrida: la IA extrae UNA vez un modelo estructurado del
 * proyecto del alumno (entidad, campos, acciones). A partir de ahí, los niveles
 * se generan por PLANTILLA programática, sin más llamadas a la IA.
 *
 * POC: Nivel 7 (objetos). El resto de niveles seguirán el mismo patrón.
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
  entidad: string; // "Planta"
  plural: string; // "plantas"
  campos: Campo[];
  acciones?: Accion[];
  entidades2?: string[];
}
export interface Proyecto {
  app: string;
  modelo: Modelo;
}

/** Forma (parcial) del contenido de un nivel que se puede sobrescribir. */
export interface NivelPersonalizado {
  intro: string;
  blocks: Array<{ h?: string; p?: string[]; code?: { label: string; text: string }; note?: string }>;
  ex: Array<{ t: string; hint?: string; sol?: string; reto?: boolean }>;
  quiz: Array<{ q: string; o: string[]; a: number }>;
}

// ── helpers ──────────────────────────────────────────────────────────────
/** Deja solo caracteres seguros para identificadores/prosa (evita inyección). */
const safe = (s: string): string => String(s ?? '').replace(/[<>&"'`]/g, '').trim();
const lower1 = (s: string): string => (s ? s[0].toLowerCase() + s.slice(1) : s);
const cap1 = (s: string): string => (s ? s[0].toUpperCase() + s.slice(1) : s);

/** Valor JS de ejemplo para un campo, según su tipo. */
function valorEjemplo(c: Campo): string {
  const ej = safe(c.ejemplo || '');
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

/** ¿Es un modelo utilizable? */
export function modeloValido(m: unknown): m is Modelo {
  const mm = m as Modelo;
  return !!mm && typeof mm.entidad === 'string' && mm.entidad.length > 0 && Array.isArray(mm.campos) && mm.campos.length > 0;
}

// ── Nivel 7 · objetos ────────────────────────────────────────────────────
function nivel7(proyecto: Proyecto): NivelPersonalizado {
  const m = proyecto.modelo;
  const app = safe(proyecto.app) || 'tu app';
  const E = cap1(safe(m.entidad)); // Planta
  const e = lower1(E); // planta
  const plural = safe(m.plural) || e + 's'; // plantas
  const campos = m.campos.slice(0, 5).map((c) => ({ ...c, nombre: safe(c.nombre) })).filter((c) => c.nombre);
  const c0 = campos[0]?.nombre || 'nombre';
  const params = campos.map((c) => c.nombre).join(', ');
  const args = campos.map(valorEjemplo).join(', ');
  const acciones = (m.acciones || []).slice(0, 3).map((a) => ({ ...a, nombre: safe(a.nombre) })).filter((a) => a.nombre);
  const a0 = acciones[0]?.nombre || 'describir';

  // objeto literal
  const objLiteral = [
    '// Un objeto agrupa en una sola "caja" los datos de algo',
    `const ${e} = {`,
    ...campos.map((c, i) => `  ${c.nombre}: ${valorEjemplo(c)}${i < campos.length - 1 ? ',' : ''}`),
    '};',
    '',
    '// Accedes a cada dato con el punto',
    `console.log(${e}.${c0});`,
  ].join('\n');

  // lista de objetos
  const listaObj = [
    `const ${plural} = [`,
    `  { ${campos.map((c) => `${c.nombre}: ${valorEjemplo(c)}`).join(', ')} },`,
    `  { ${campos.map((c) => `${c.nombre}: ${valorEjemplo(c)}`).join(', ')} },`,
    '];',
    '',
    `console.log(${plural}.length + " ${plural} en ${app}");`,
  ].join('\n');

  // clase
  const metodos =
    acciones.length > 0
      ? acciones
          .map((a) =>
            [`  ${a.nombre}() {`, `    // ${safe(a.desc || 'tu lógica aquí')}`, `    console.log(this.${c0} + " → ${a.nombre}");`, '  }'].join('\n')
          )
          .join('\n\n')
      : ['  describir() {', `    console.log(this.${c0});`, '  }'].join('\n');
  const clase = [
    `class ${E} {`,
    `  constructor(${params}) {`,
    ...campos.map((c) => `    this.${c.nombre} = ${c.nombre};`),
    '  }',
    '',
    metodos,
    '}',
    '',
    `const ${e} = new ${E}(${args});`,
    `${e}.${a0}();`,
  ].join('\n');

  const listaCampos = campos.map((c) => `<strong>${c.nombre}</strong>`).join(', ');

  const blocks: NivelPersonalizado['blocks'] = [
    {
      h: `Un objeto: tu ${e} en una sola caja`,
      p: [
        `Hasta ahora cada dato iba por su lado. Un <strong>objeto</strong> junta en una sola variable todo lo que describe a un <strong>${e}</strong> de ${app}: sus campos (${listaCampos}).`,
        'Cada campo tiene un <strong>nombre</strong> y un <strong>valor</strong>, y accedes a él con el punto.',
      ],
      code: { label: `un ${e}`, text: objLiteral },
      note: `Piensa en el objeto como una ficha de <b>${e}</b>: todo lo de un mismo ${e}, junto y con etiquetas.`,
    },
    {
      h: `Muchos ${plural}: una lista de objetos`,
      p: [`Tu ${app} no tiene un solo ${e}, sino muchos. Los guardas en una <strong>lista de objetos</strong> (un array donde cada elemento es un ${e}).`],
      code: { label: `${plural}`, text: listaObj },
    },
    {
      h: `Una clase ${E}: el molde de tus ${plural}`,
      p: [
        `Si vas a crear ${plural} a menudo, una <strong>clase</strong> es el <em>molde</em>: defines una vez qué campos tiene un <strong>${E}</strong> y qué sabe hacer, y luego creas ${plural} con <strong>new</strong>.`,
        `El <strong>constructor</strong> recibe los datos y los guarda con <strong>this</strong>. Los <strong>métodos</strong> (${acciones.map((a) => `<code>${a.nombre}()</code>`).join(', ') || '<code>describir()</code>'}) son las acciones de cada ${e}.`,
      ],
      code: { label: `class ${E}`, text: clase },
      note: `<b>this</b> es "este ${e} concreto". <code>this.${c0}</code> es el ${c0} del ${e} con el que estás trabajando.`,
    },
  ];

  if (m.entidades2 && m.entidades2.length) {
    const e2 = cap1(safe(m.entidades2[0]));
    if (e2) {
      blocks.push({
        h: `Y también: ${e2}`,
        p: [`Tu app maneja más de una cosa. <strong>${e2}</strong> se modela igual: su propia clase o sus propios objetos, con sus campos. Cada entidad de ${app}, su molde.`],
      });
    }
  }

  const ex: NivelPersonalizado['ex'] = [
    {
      t: `Crea un objeto <strong>${e}</strong> con sus campos (${campos.map((c) => c.nombre).join(', ')}) y muéstralo por consola.`,
      hint: `Empieza con <code>const ${e} = { ... };</code> y usa <code>console.log(${e});</code>`,
      sol: objLiteral,
    },
    {
      t: `Crea la clase <strong>${E}</strong> con su constructor y el método <code>${a0}()</code>. Luego crea un ${e} con <code>new</code>.`,
      hint: `El constructor recibe ${params} y guarda cada uno con <code>this.campo = campo</code>.`,
      sol: clase,
    },
    {
      t: `Reto: crea dos ${plural} en una lista y recórrela con <code>for...of</code> mostrando el <strong>${c0}</strong> de cada uno.`,
      reto: true,
      hint: `for (const ${e} of ${plural}) { console.log(${e}.${c0}); }`,
    },
  ];

  const quiz: NivelPersonalizado['quiz'] = [
    {
      q: `¿Cómo accedes al campo ${c0} de tu ${e}?`,
      o: [`${e}.${c0}`, `${e}[${c0}]`, `${c0}(${e})`],
      a: 0,
    },
    {
      q: `¿Qué palabra crea un objeto ${E} nuevo a partir de su clase?`,
      o: ['new', 'class', 'this'],
      a: 0,
    },
    {
      q: `Dentro del constructor de ${E}, ¿cómo guardas el campo ${c0}?`,
      o: [`this.${c0} = ${c0}`, `${c0} = this`, `let ${c0} = new`],
      a: 0,
    },
    {
      q: `¿Para qué sirve la clase ${E}?`,
      o: [`Es el molde para crear muchos ${plural} iguales por dentro`, 'Publica tu app en internet', 'Borra los datos guardados'],
      a: 0,
    },
  ];

  return {
    intro: `En este nivel modelas <strong>${app}</strong> con objetos. Tu entidad principal es <strong>${E}</strong>, y cada ${e} tiene sus campos (${listaCampos}). Los fundamentos son los de siempre; los ejemplos y ejercicios son los de tu proyecto.`,
    blocks,
    ex,
    quiz,
  };
}

/** Generadores por nivel (se irán completando). POC: solo el 7. */
const GENERADORES: Record<number, (p: Proyecto) => NivelPersonalizado> = {
  7: nivel7,
};

/** Devuelve el contenido personalizado de un nivel, o null si no hay plantilla/modelo. */
export function personalizarNivel(n: number, proyecto: Proyecto | null): NivelPersonalizado | null {
  if (!proyecto || !modeloValido(proyecto.modelo)) return null;
  const gen = GENERADORES[n];
  return gen ? gen(proyecto) : null;
}

/** Niveles que ya tienen plantilla de personalización. */
export const NIVELES_PERSONALIZABLES = Object.keys(GENERADORES).map(Number);
