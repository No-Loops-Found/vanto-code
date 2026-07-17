/** Nivel 4 · Repetir sobre muchos elementos (bucles). */
import type { Ctx, NivelPersonalizado } from './_shared';
import { filaInline } from './_shared';

export default function n04(ctx: Ctx): NivelPersonalizado {
  const { app, E, e, plural, art2, un, un2, c0, campoNum } = ctx;

  const numField = campoNum?.nombre;
  const fila = filaInline(ctx);
  // Lista con dos ejemplos para que el bucle recorra algo real.
  const listaVar = [
    `const ${plural} = [`,
    `  ${fila},`,
    `  ${fila},`,
    `  // …y así con cada ${e}`,
    '];',
  ].join('\n');

  const codeForOf = [
    listaVar,
    '',
    `// for...of: pasa por cada ${e}, uno a uno`,
    `for (const ${e} of ${plural}) {`,
    `  console.log(${e}.${c0});`,
    '}',
  ].join('\n');

  const codeForClasico = [
    listaVar,
    '',
    `// for clásico: cuando necesitas el número de orden (índice)`,
    `for (let i = 0; i < ${plural}.length; i++) {`,
    `  console.log((i + 1) + ". " + ${plural}[i].${c0});`,
    '}',
  ].join('\n');

  const codeWhile = [
    listaVar,
    '',
    `// while: repite MIENTRAS se cumpla la condición`,
    'let i = 0;',
    `while (i < ${plural}.length) {`,
    `  console.log(${plural}[i].${c0});`,
    '  i++;   // sin esto, el bucle no termina nunca',
    '}',
  ].join('\n');

  const codeAcumular = numField
    ? [
        listaVar,
        '',
        `// Recorrer para sumar: un acumulador que crece en cada vuelta`,
        'let total = 0;',
        `for (const ${e} of ${plural}) {`,
        `  total += ${e}.${numField};`,
        '}',
        `console.log("Total de ${numField}: " + total);`,
      ].join('\n')
    : [
        listaVar,
        '',
        `// Recorrer para contar: un acumulador que crece en cada vuelta`,
        'let cuantos = 0;',
        `for (const ${e} of ${plural}) {`,
        '  cuantos++;',
        '}',
        `console.log("Hay " + cuantos + " ${plural}");`,
      ].join('\n');

  const acumTxt = numField
    ? `sumar ${art2} <strong>${numField}</strong> de ${art2} ${plural}`
    : `contar cuántos ${plural} hay`;

  const blocks: NivelPersonalizado['blocks'] = [
    {
      h: `for...of: pasar por cada ${e}`,
      p: [
        `En ${app} no tienes ${un} solo ${e}, sino ${un2 === 'unas' ? 'unas cuantas' : 'unos cuantos'} ${plural}. Un <strong>bucle</strong> hace lo mismo con cada ${un2 === 'unas' ? 'una' : 'uno'}, sin repetir el código a mano.`,
        `El <strong>for...of</strong> es el más directo: recorre la lista y en cada vuelta te da ${un} ${e} en la variable, listo para usar.`,
      ],
      code: { label: 'for...of', text: codeForOf },
      note: `<code>${plural}.length</code> te dice cuántos ${plural} hay en la lista.`,
    },
    {
      h: 'for clásico: cuando necesitas el índice',
      p: [
        `Si además quieres su <strong>número de orden</strong> (el 1º, el 2º…), el <strong>for clásico</strong> lleva un contador <code>i</code>: empieza en 0, sube de uno en uno y para al llegar al final.`,
        `Accedes a cada elemento con <code>${plural}[i]</code>.`,
      ],
      code: { label: 'for (i)', text: codeForClasico },
    },
    {
      h: 'while: repetir mientras se cumpla algo',
      p: [
        `El <strong>while</strong> repite <em>mientras</em> su condición sea verdadera. Es útil cuando no sabes de antemano cuántas vueltas darás.`,
        `Cuidado: dentro tienes que <strong>avanzar</strong> (por ejemplo <code>i++</code>), o el bucle no acaba nunca.`,
      ],
      code: { label: 'while', text: codeWhile },
      note: `Un bucle sin salida (<em>bucle infinito</em>) cuelga el programa. Asegúrate de que la condición acabe siendo <code>false</code>.`,
    },
    {
      h: 'Recorrer para acumular',
      p: [
        `Los bucles no solo muestran: también <strong>acumulan</strong>. Con una variable que crece en cada vuelta puedes ${acumTxt}.`,
      ],
      code: { label: 'acumular', text: codeAcumular },
    },
  ];

  const ex: NivelPersonalizado['ex'] = [
    {
      t: `Crea una lista de <strong>${plural}</strong> y recórrela con <code>for...of</code> mostrando el <strong>${c0}</strong> de cada ${e}.`,
      hint: `<code>for (const ${e} of ${plural}) { console.log(${e}.${c0}); }</code>`,
      sol: codeForOf,
    },
    {
      t: `Recorre la misma lista con un <code>for</code> clásico y muestra cada ${e} con su número de orden (1., 2., …).`,
      hint: `Usa <code>for (let i = 0; i &lt; ${plural}.length; i++)</code> y accede con <code>${plural}[i]</code>.`,
      sol: codeForClasico,
    },
    {
      t: `Escribe el mismo recorrido con un <code>while</code>. No olvides el <code>i++</code>.`,
      hint: `Empieza con <code>let i = 0;</code> y repite <code>while (i &lt; ${plural}.length)</code>.`,
    },
    {
      t: `Reto: recorre ${art2} ${plural} y ${numField ? `suma ${art2} <strong>${numField}</strong> en una variable <code>total</code>` : `cuenta cuántos hay en una variable <code>cuantos</code>`}. Muéstralo al final.`,
      reto: true,
      hint: numField ? `Crea <code>let total = 0;</code> y dentro del bucle <code>total += ${e}.${numField};</code>` : `Crea <code>let cuantos = 0;</code> y dentro del bucle <code>cuantos++;</code>`,
    },
  ];

  const quiz: NivelPersonalizado['quiz'] = [
    {
      q: `¿Qué bucle recorre directamente cada ${e} de una lista?`,
      o: [`for (const ${e} of ${plural})`, `if (${plural})`, `while (${e})`],
      a: 0,
    },
    {
      q: `¿Para qué sirve la <code>i</code> del <code>for</code> clásico?`,
      o: ['Para saber el número de orden y acceder con ' + plural + '[i]', 'Para borrar la lista', 'Para publicar la app'],
      a: 0,
    },
    {
      q: `En un <code>while</code>, ¿qué pasa si nunca cambias la condición?`,
      o: ['Se queda dando vueltas para siempre (bucle infinito)', 'Se ejecuta una sola vez', 'JavaScript lo corrige solo'],
      a: 0,
    },
    {
      q: `¿Cómo sabes cuántos ${plural} hay en la lista?`,
      o: [`${plural}.length`, `${plural}.count()`, `count(${plural})`],
      a: 0,
    },
  ];

  return {
    intro: `En este nivel haces que <strong>${app}</strong> trabaje con <strong>${art2} ${plural}</strong> a la vez. Con un <strong>bucle</strong> repites la misma acción sobre cada <strong>${E}</strong>: los fundamentos son los de siempre, aplicados a tu lista.`,
    blocks,
    ex,
    quiz,
  };
}
