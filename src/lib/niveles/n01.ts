/** Nivel 1 · Guardar datos: variables y tipos. */
import type { Ctx, NivelPersonalizado } from './_shared';
import { valJS } from './_shared';

const TIPO: Record<string, string> = {
  texto: 'texto (string)',
  numero: 'número (number)',
  booleano: 'booleano (true/false)',
  fecha: 'fecha (texto con formato)',
};

export default function n01(ctx: Ctx): NivelPersonalizado {
  const { app, E, e, un, art, campos, c0, params } = ctx;

  const declsCode = [
    `// Cada campo de ${un} ${e}, en su propia variable`,
    ...campos.map((c) => `const ${c.nombre} = ${valJS(c)}; // ${TIPO[c.tipo]}`),
    '',
    `console.log(${params});`,
  ].join('\n');

  const letCode = [
    'const nombre = "fijo";   // const: NO se puede reasignar',
    'let contador = 0;        // let: SÍ puede cambiar',
    'contador = contador + 1;',
    'console.log(contador);   // 1',
  ].join('\n');

  const tiposEjemplo = campos
    .slice(0, 3)
    .map((c) => `<strong>${c.nombre}</strong> es ${TIPO[c.tipo]}`)
    .join('; ');

  const blocks: NivelPersonalizado['blocks'] = [
    {
      h: `Una variable por cada dato de ${un} ${e}`,
      p: [
        `Una <strong>variable</strong> es una caja con nombre donde guardas un dato. Para describir ${un} <strong>${e}</strong> de ${app} necesitas una caja por cada campo.`,
        `Fíjate en los campos: ${tiposEjemplo}.`,
      ],
      code: { label: `campos de ${un} ${e}`, text: declsCode },
      note: `El nombre de la variable (a la izquierda del <code>=</code>) lo eliges tú; el valor (a la derecha) es el dato que guardas.`,
    },
    {
      h: 'Los tipos: no todo es igual',
      p: [
        `Cada dato tiene un <strong>tipo</strong>, y eso decide qué puedes hacer con él:`,
        `El <strong>texto</strong> va entre comillas (<code>"Ejemplo"</code>). Los <strong>números</strong> van sin comillas (<code>3</code>) y sirven para calcular. Los <strong>booleanos</strong> solo valen <code>true</code> o <code>false</code> (sí/no). Las <strong>fechas</strong> las guardas como texto con formato (<code>"2026-07-10"</code>).`,
      ],
      note: `Un número entre comillas (<code>"3"</code>) es texto, no un número: <code>"3" + "3"</code> da <code>"33"</code>, no <code>6</code>. Cuidado con las comillas.`,
    },
    {
      h: 'const y let: ¿cambia o no cambia?',
      p: [
        `Usa <code>const</code> cuando el dato no va a cambiar (lo más habitual). Usa <code>let</code> cuando sí va a cambiar (un contador, un total que se actualiza).`,
        `Con <code>const</code>, si intentas reasignar, el programa se queja. Con <code>let</code>, puedes.`,
      ],
      code: { label: 'const vs let', text: letCode },
    },
  ];

  const ex: NivelPersonalizado['ex'] = [
    {
      t: `Crea una variable para cada campo de ${un} <strong>${e}</strong> (${campos.map((c) => c.nombre).join(', ')}) con su tipo correcto.`,
      hint: `Texto entre comillas, números sin comillas. Empieza por <code>const ${c0} = ${valJS(campos[0])};</code>`,
      sol: declsCode,
    },
    {
      t: `Muestra por consola todos los campos de tu ${e} a la vez.`,
      hint: `Puedes pasarle varios a <code>console.log</code> separados por comas: <code>console.log(${params});</code>`,
      sol: `console.log(${params});`,
    },
    {
      t: `Reto: declara con <code>let</code> un contador que empiece en <code>0</code>, súmale <code>1</code> y muéstralo.`,
      reto: true,
      hint: `<code>let contador = 0; contador = contador + 1; console.log(contador);</code>`,
    },
  ];

  const primerTipo = TIPO[campos[0].tipo];
  const quiz: NivelPersonalizado['quiz'] = [
    { q: `El campo ${c0} de tu ${e} es de tipo…`, o: [primerTipo, 'siempre número', 'siempre booleano'], a: 0 },
    { q: '¿Cómo se escribe un dato de texto?', o: ['Entre comillas: "Ejemplo"', 'Sin comillas: Ejemplo', 'Solo con números'], a: 0 },
    { q: '¿Cuándo usas let en vez de const?', o: ['Cuando el valor va a cambiar', 'Cuando el valor es texto', 'Nunca, const siempre'], a: 0 },
    { q: '¿Cuánto vale "3" + "3"?', o: ['"33" (texto pegado)', '6', 'Error'], a: 0 },
  ];

  return {
    intro: `En este nivel guardas los datos de <strong>${app}</strong>. Cada ${e} tiene sus campos, y cada campo va en una variable con su <strong>tipo</strong>: texto, número, booleano o fecha.`,
    blocks,
    ex,
    quiz,
  };
}
