/** Nivel 9 · Guardar en base de datos (Supabase). */
import type { Ctx, NivelPersonalizado } from './_shared';
import { filaInline } from './_shared';

const tipoLabel = (t: string): string =>
  t === 'numero' ? 'número' : t === 'fecha' ? 'fecha' : t === 'booleano' ? 'sí/no' : 'texto';

export default function n09(ctx: Ctx): NivelPersonalizado {
  const { app, E, e, plural, art, un, art2, campos, c0, g } = ctx;
  const nuevo = g === 'f' ? 'nueva' : 'nuevo';
  const guardada = g === 'f' ? 'guardada' : 'guardado';
  const listaCampos = campos.map((c) => `<strong>${c.nombre}</strong>`).join(', ');
  const fila = filaInline(ctx);

  // Representación de la tabla con SUS columnas (los campos del proyecto).
  const tablaTxt = [
    `Tabla: ${plural}`,
    `  id            (número, automático)`,
    ...campos.map((c) => `  ${(c.nombre + ' ').padEnd(15)}(${tipoLabel(c.tipo)})`),
  ].join('\n');

  const clienteTxt = [
    `// Conectas una sola vez con tu proyecto de Supabase`,
    `import { createClient } from '@supabase/supabase-js';`,
    '',
    `const supabase = createClient(`,
    `  'https://TU-PROYECTO.supabase.co',`,
    `  'TU-CLAVE-PUBLICA'`,
    `);`,
  ].join('\n');

  const insertTxt = [
    `// Guardar ${un} ${e} ${nuevo} en la tabla "${plural}"`,
    `const { data, error } = await supabase`,
    `  .from('${plural}')`,
    `  .insert(${fila})`,
    `  .select('*');`,
    '',
    `if (error) {`,
    `  console.log("No se pudo guardar:", error.message);`,
    `} else {`,
    `  console.log("${E} ${guardada}:", data);`,
    `}`,
  ].join('\n');

  const selectTxt = [
    `// Leer ${art2} ${plural} que ya tienes ${guardada}s`,
    `const { data, error } = await supabase`,
    `  .from('${plural}')`,
    `  .select('*');`,
    '',
    `if (error) {`,
    `  console.log("Error al leer:", error.message);`,
    `} else {`,
    `  console.log(data.length + " ${plural}");`,
    `  for (const ${e} of data) {`,
    `    console.log(${e}.${c0});`,
    `  }`,
    `}`,
  ].join('\n');

  const blocks: NivelPersonalizado['blocks'] = [
    {
      h: `Una tabla para ${art2} ${plural}`,
      p: [
        `Hasta ahora ${art2} ${plural} de <strong>${app}</strong> vivían en memoria: al cerrar, se perdían. Una <strong>base de datos</strong> los guarda de verdad, para siempre.`,
        `Se organiza en <strong>tablas</strong>. Una tabla es como una hoja de cálculo: cada <strong>fila</strong> es ${un} <strong>${e}</strong>, y cada <strong>columna</strong> es uno de sus campos (${listaCampos}).`,
      ],
      code: { label: `tabla ${plural}`, text: tablaTxt },
      note: `En el panel de Supabase creas la tabla <b>${plural}</b> y le añades una columna por cada campo. La columna <b>id</b> la pone Supabase sola.`,
    },
    {
      h: 'Conectar con Supabase',
      p: [
        `<strong>Supabase</strong> es tu base de datos con panel web. Desde tu código te conectas con <strong>createClient</strong>, pasándole la URL de tu proyecto y tu clave pública.`,
        `Ese objeto <strong>supabase</strong> es tu puerta de entrada: desde él insertas, lees y consultas ${art2} ${plural}.`,
      ],
      code: { label: 'createClient', text: clienteTxt },
    },
    {
      h: `Guardar ${un} ${e}: insert`,
      p: [
        `Para meter ${un} <strong>${e}</strong> ${nuevo} usas <strong>.from('${plural}')</strong> (elige la tabla) y <strong>.insert(...)</strong> con un objeto cuyos campos coinciden con las columnas.`,
        `Casi todo en Supabase te devuelve <strong>{ data, error }</strong>: <strong>data</strong> es lo que salió bien; <strong>error</strong> es <code>null</code> si todo fue bien, o el fallo si algo se rompió. Comprueba siempre <strong>error</strong> antes de fiarte de <strong>data</strong>.`,
      ],
      code: { label: `insert ${e}`, text: insertTxt },
      note: `<code>.select('*')</code> al final hace que <b>data</b> te devuelva ${art} <b>${e}</b> ya ${guardada}, con su <b>id</b> incluido.`,
    },
    {
      h: `Leer ${art2} ${plural}: select`,
      p: [
        `Para recuperar lo guardado usas <strong>.select('*')</strong>: el <code>*</code> significa "todas las columnas". En <strong>data</strong> te llega una lista con ${un} objeto por cada ${e}.`,
        `Y como es una lista, la recorres igual que en los niveles anteriores: con <strong>for...of</strong>.`,
      ],
      code: { label: `select ${plural}`, text: selectTxt },
    },
  ];

  const ex: NivelPersonalizado['ex'] = [
    {
      t: `En el panel de Supabase, crea la tabla <strong>${plural}</strong> con una columna por cada campo (${campos.map((c) => c.nombre).join(', ')}).`,
      hint: `Cada columna lleva el tipo que le toca: ${campos.map((c) => `${c.nombre} → ${tipoLabel(c.tipo)}`).join(', ')}.`,
    },
    {
      t: `Inserta ${un} <strong>${e}</strong> ${nuevo} en la tabla y comprueba que <code>error</code> es <code>null</code>.`,
      hint: `Usa <code>await supabase.from('${plural}').insert(${fila})</code>.`,
      sol: insertTxt,
    },
    {
      t: `Lee ${art2} <strong>${plural}</strong> guardad${g === 'f' ? 'a' : 'o'}s y muestra el <strong>${c0}</strong> de cada ${e} por consola.`,
      hint: `<code>.select('*')</code> te devuelve una lista en <code>data</code>; recórrela con <code>for...of</code>.`,
      sol: selectTxt,
    },
    {
      t: `Reto: antes de insertar, comprueba con un <code>if</code> que <strong>${c0}</strong> no está vacío; si lo está, no guardes y avisa por consola.`,
      reto: true,
      hint: `Un dato vacío en la base de datos es un problema para siempre. Vale más un <code>if</code> a tiempo.`,
    },
  ];

  const quiz: NivelPersonalizado['quiz'] = [
    { q: `En la tabla <strong>${plural}</strong>, ¿qué es cada fila?`, o: [`${un} ${e}`, 'Una columna', 'Una clave pública'], a: 0 },
    { q: `¿Qué método guarda ${un} ${e} nuev${g === 'f' ? 'a' : 'o'} en la tabla?`, o: ['.insert(...)', '.order(...)', '.select(...)'], a: 0 },
    { q: 'Tras una operación en Supabase, ¿qué revisas para saber si algo falló?', o: ['error', 'data', 'console'], a: 0 },
    { q: `¿Qué hace <code>.select('*')</code>?`, o: [`Trae todas las columnas de ${art2} ${plural}`, `Borra ${art2} ${plural}`, `Ordena por fecha`], a: 0 },
  ];

  return {
    intro: `Llega la memoria de verdad: guardas ${art2} <strong>${plural}</strong> de <strong>${app}</strong> en una base de datos con <strong>Supabase</strong>, para que no se pierdan al cerrar. Los fundamentos son los de siempre; la tabla y los datos son los de tu proyecto.`,
    blocks,
    ex,
    quiz,
  };
}
