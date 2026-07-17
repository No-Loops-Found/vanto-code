/** Nivel 6 · Listas y colecciones (arrays). */
import type { Ctx, NivelPersonalizado } from './_shared';
import { filaInline, valJS } from './_shared';

export default function n06(ctx: Ctx): NivelPersonalizado {
  const { app, e, plural, un, art, art2, g, campos, c0 } = ctx;
  const Muchos = art2 === 'las' ? 'Muchas' : 'Muchos';
  const muchos = art2 === 'las' ? 'muchas' : 'muchos';
  const unico = g === 'f' ? 'única' : 'único';
  const primero = g === 'f' ? 'primera' : 'primero';

  // Campo y condición para filter/find (numérico si lo hay, si no el primero).
  const campoF = campos.find((c) => c.tipo === 'numero') || campos[0];
  const valF = valJS(campoF);
  const condF = campoF.tipo === 'numero' ? `${e}.${campoF.nombre} > ${valF}` : `${e}.${campoF.nombre} === ${valF}`;
  const explicaF =
    campoF.tipo === 'numero'
      ? `${art2} ${plural} con <strong>${campoF.nombre}</strong> mayor que ${valF}`
      : `${art2} ${plural} cuyo <strong>${campoF.nombre}</strong> es ${valF}`;

  // ── código de los bloques ──
  const codeLista = [
    `// Empezamos con una lista vacía: aún no hay ${plural}`,
    `const ${plural} = [];`,
    '',
    `// .push() añade ${un} ${e} al final de la lista`,
    `${plural}.push(${filaInline(ctx)});`,
    `${plural}.push(${filaInline(ctx)});`,
    '',
    `console.log(${plural}.length + " ${plural} guardad${art2 === 'las' ? 'as' : 'os'}");`,
  ].join('\n');

  const codeAcceso = [
    `// .length dice cuánt${art2 === 'las' ? 'as' : 'os'} ${plural} hay`,
    `console.log(${plural}.length);`,
    '',
    `// El primero está en la posición 0 (se empieza a contar en 0)`,
    `const primero = ${plural}[0];`,
    `console.log(primero.${c0});`,
    '',
    `// Y el último, con length - 1`,
    `console.log(${plural}[${plural}.length - 1].${c0});`,
  ].join('\n');

  const codeFiltrar = [
    `// .filter() se queda con ${art2} ${plural} que cumplen una condición`,
    `const seleccion = ${plural}.filter(${e} => ${condF});`,
    `console.log(seleccion.length + " coinciden");`,
    '',
    `// .find() devuelve solo ${un} ${e} (${art} primer${g === 'f' ? 'a' : 'o'} que encaje)`,
    `const encontrado = ${plural}.find(${e} => ${condF});`,
    `console.log(encontrado);`,
  ].join('\n');

  const codeMap = [
    `// .map() transforma cada ${e} en otra cosa: aquí, solo su ${c0}`,
    `const nombres = ${plural}.map(${e} => ${e}.${c0});`,
    `console.log(nombres);`,
  ].join('\n');

  const blocks: NivelPersonalizado['blocks'] = [
    {
      h: `Una lista: ${muchos} ${plural} en una variable`,
      p: [
        `Una variable normal guarda un dato. Pero ${app} no tiene ${un} solo ${e}, sino ${muchos}. Para eso está el <strong>array</strong> (una lista): una única variable que guarda ${muchos} ${plural} en orden.`,
        `Se crea con corchetes <code>[]</code> y crece con <strong>.push()</strong>, que añade ${un} ${e} al final.`,
      ],
      code: { label: plural, text: codeLista },
      note: `Un array vacío <code>[]</code> es válido: es una lista a la que aún no has añadido nada.`,
    },
    {
      h: `¿Cuántos hay? .length y las posiciones`,
      p: [
        `Cada ${e} ocupa una <strong>posición</strong> (un índice). Se empieza a contar en <strong>0</strong>: el primero es <code>${plural}[0]</code>, el segundo <code>${plural}[1]</code>, y así.`,
        `<strong>.length</strong> te dice cuánt${art2 === 'las' ? 'as' : 'os'} hay. Como el último índice es uno menos, el último ${e} es <code>${plural}[${plural}.length - 1]</code>.`,
      ],
      code: { label: `${plural}[i]`, text: codeAcceso },
    },
    {
      h: `Buscar dentro: .filter() y .find()`,
      p: [
        `Casi nunca quieres toda la lista de golpe. <strong>.filter()</strong> te devuelve una lista nueva solo con ${art2} ${plural} que cumplen tu condición; en el ejemplo, ${explicaF}.`,
        `<strong>.find()</strong> es parecido, pero devuelve ${un} ${unico} ${e}: ${art} <em>${primero}</em> que encaje (o <code>undefined</code> si no hay ninguno).`,
      ],
      code: { label: '.filter · .find', text: codeFiltrar },
      note: `${Muchos} de estos métodos reciben una función: por cada ${e} de la lista, decides qué hacer con él.`,
    },
    {
      h: `Transformar cada uno: .map()`,
      p: [
        `<strong>.map()</strong> recorre la lista y crea una <strong>nueva</strong> a partir de cada ${e}. Aquí sacamos solo el <strong>${c0}</strong> de cada uno para tener una lista de nombres.`,
        `La lista original no se toca: <code>.map()</code> siempre devuelve una lista distinta.`,
      ],
      code: { label: '.map', text: codeMap },
    },
  ];

  const ex: NivelPersonalizado['ex'] = [
    {
      t: `Crea una lista vacía de <strong>${plural}</strong> y añade dos con <code>.push()</code>. Luego muestra cuántos hay con <code>.length</code>.`,
      hint: `Empieza con <code>const ${plural} = [];</code> y usa <code>${plural}.push({ ... })</code> dos veces.`,
      sol: codeLista,
    },
    {
      t: `Muestra por consola el <strong>${c0}</strong> del primer ${e} de la lista (el de la posición 0).`,
      hint: `El primero es <code>${plural}[0]</code>; su ${c0} es <code>${plural}[0].${c0}</code>.`,
      sol: codeAcceso,
    },
    {
      t: `Usa <code>.filter()</code> para quedarte con ${explicaF} y muestra cuántos son.`,
      hint: `<code>${plural}.filter(${e} => ${condF})</code> te devuelve una lista nueva; su <code>.length</code> es cuántos coinciden.`,
      sol: codeFiltrar,
    },
    {
      t: `Reto: con <code>.map()</code> crea una lista solo con ${art2} <strong>${c0}</strong> de tod${art2 === 'las' ? 'as' : 'os'} tus ${plural} y muéstrala.`,
      reto: true,
      hint: `<code>${plural}.map(${e} => ${e}.${c0})</code>`,
    },
  ];

  const quiz: NivelPersonalizado['quiz'] = [
    { q: `¿Qué método añade ${un} ${e} al final de la lista?`, o: [`${plural}.push(...)`, `${plural}.length`, `${plural}.find(...)`], a: 0 },
    { q: `¿En qué posición está el primer ${e} de un array?`, o: ['En la 0', 'En la 1', 'En la última'], a: 0 },
    { q: `¿Qué devuelve <code>${plural}.filter(...)</code>?`, o: [`Una lista nueva con los que cumplen la condición`, `Solo un número`, `El primer ${e} que encaje`], a: 0 },
    { q: `¿Para qué sirve <code>.map()</code>?`, o: [`Crear una lista nueva transformando cada ${e}`, `Borrar la lista`, `Contar cuántos hay`], a: 0 },
  ];

  return {
    intro: `En este nivel ${app} pasa de guardar ${un} ${e} a guardar <strong>${muchos} ${plural}</strong> en una lista. Aprendes a añadirlos, contarlos, buscarlos y transformarlos. Los fundamentos son los de siempre; los ejemplos son los de tu proyecto.`,
    blocks,
    ex,
    quiz,
  };
}
