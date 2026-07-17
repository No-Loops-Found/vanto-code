/** Nivel 5 · Acciones reutilizables (funciones). */
import type { Ctx, NivelPersonalizado } from './_shared';
import { valJS, filaInline } from './_shared';

export default function n05(ctx: Ctx): NivelPersonalizado {
  const { app, E, e, plural, un, art, art2, c0, campoNum, acciones, a0 } = ctx;

  const numField = campoNum?.nombre;
  const numVal = campoNum ? valJS(campoNum) : '0';
  const fila = filaInline(ctx);
  const objLine = `const ${e} = ${fila};`;

  // Función principal: la primera acción del proyecto.
  const codeFuncion = [
    `// Una función: una acción con nombre, lista para usar cuando quieras`,
    `function ${a0}(${e}) {`,
    `  console.log(${e}.${c0} + " → ${a0}");`,
    '}',
    '',
    objLine,
    `${a0}(${e});   // la "llamas" y hace su trabajo`,
  ].join('\n');

  // Función con return: devuelve un valor en vez de mostrarlo.
  const returnName = numField ? 'estaEnLimite' : 'tieneNombre';
  const returnBody = numField
    ? `  return ${e}.${numField} >= ${numVal};`
    : `  return ${e}.${c0} !== "";`;
  const codeReturn = [
    `// return: la función DEVUELVE un valor para que tú decidas qué hacer con él`,
    `function ${returnName}(${e}) {`,
    returnBody,
    '}',
    '',
    objLine,
    `const resultado = ${returnName}(${e});`,
    'console.log(resultado);   // true o false',
  ].join('\n');

  const codeReturnVsLog = [
    `// console.log: MUESTRA por pantalla (y ya está)`,
    `function mostrar(${e}) {`,
    `  console.log(${e}.${c0});`,
    '}',
    '',
    `// return: ENTREGA un valor que puedes seguir usando`,
    `function etiqueta(${e}) {`,
    `  return ${e}.${c0}${numField ? ` + " (" + ${e}.${numField} + ")"` : ''};`,
    '}',
    '',
    objLine,
    `mostrar(${e});                       // efecto: escribe en consola`,
    `const texto = etiqueta(${e});        // valor: lo guardas en una variable`,
    'console.log("Guardado: " + texto);',
  ].join('\n');

  // DRY: reutilizar la función en un bucle sin repetir código.
  const codeDRY = [
    `function etiqueta(${e}) {`,
    `  return ${e}.${c0}${numField ? ` + " (" + ${e}.${numField} + ")"` : ''};`,
    '}',
    '',
    `const ${plural} = [`,
    `  ${fila},`,
    `  ${fila},`,
    '];',
    '',
    `// La misma función, sin copiar y pegar: la usas con cada ${e}`,
    `for (const ${e} of ${plural}) {`,
    `  console.log(etiqueta(${e}));`,
    '}',
  ].join('\n');

  const accionesTxt = acciones.length > 0
    ? acciones.map((a) => `<code>${a.nombre}()</code>`).join(', ')
    : `<code>${a0}()</code>`;

  const blocks: NivelPersonalizado['blocks'] = [
    {
      h: `Una función: ${un} acción con nombre`,
      p: [
        `En ${app} hay acciones que repites: ${accionesTxt}. Una <strong>función</strong> las empaqueta bajo un nombre, y la ejecutas cuando quieras solo con <strong>llamarla</strong>.`,
        `Recibe datos entre paréntesis (los <strong>parámetros</strong>) y hace su trabajo con ellos. Aquí le pasas ${un} <strong>${e}</strong>.`,
      ],
      code: { label: `function ${a0}()`, text: codeFuncion },
      note: `Definir la función no la ejecuta. Solo corre cuando la <em>llamas</em>: <code>${a0}(${e})</code>.`,
    },
    {
      h: 'Devolver un valor con return',
      p: [
        `Muchas funciones no solo actúan: <strong>calculan y devuelven</strong> un resultado con <strong>return</strong>. Ese valor lo puedes guardar, comparar o mostrar.`,
        `En cuanto se ejecuta <code>return</code>, la función termina y entrega su valor.`,
      ],
      code: { label: 'return', text: codeReturn },
      note: `Una función con <code>return</code> se comporta como un <em>valor</em>: puedes escribir <code>const x = ${returnName}(${e});</code>.`,
    },
    {
      h: 'return vs console.log',
      p: [
        `Es fácil confundirlos. <strong>console.log</strong> <em>muestra</em> algo por pantalla y no devuelve nada útil. <strong>return</strong> <em>entrega</em> un valor para seguir trabajando con él.`,
        `Regla práctica: si vas a <strong>reutilizar</strong> el resultado, usa <code>return</code>; si solo quieres <strong>verlo</strong>, usa <code>console.log</code>.`,
      ],
      code: { label: 'return vs log', text: codeReturnVsLog },
    },
    {
      h: 'No repetirse: una función, muchos usos',
      p: [
        `La gran ventaja: escribes la lógica <strong>una vez</strong> y la reutilizas con ${art} ${e} que quieras. Nada de copiar y pegar.`,
        `Combinada con un bucle, la misma función se aplica a ${art2} ${plural} de golpe.`,
      ],
      code: { label: 'DRY', text: codeDRY },
      note: `A esto se le llama <strong>DRY</strong> (Don't Repeat Yourself): si te ves copiando código, casi siempre toca una función.`,
    },
  ];

  const ex: NivelPersonalizado['ex'] = [
    {
      t: `Escribe la función <code>${a0}(${e})</code> que reciba ${un} ${e} y muestre su <strong>${c0}</strong> por consola. Luego llámala.`,
      hint: `<code>function ${a0}(${e}) { console.log(${e}.${c0}); }</code> y después <code>${a0}(${e});</code>`,
      sol: codeFuncion,
    },
    {
      t: `Crea una función <code>${returnName}(${e})</code> que <strong>devuelva</strong> (con <code>return</code>) ${numField ? `si su ${numField} llega al límite` : `si tiene ${c0}`}. Guarda el resultado y muéstralo.`,
      hint: `Usa <code>return</code> con una comparación; el resultado será <code>true</code> o <code>false</code>.`,
      sol: codeReturn,
    },
    {
      t: `Escribe dos funciones: una que use <code>console.log</code> y otra que use <code>return</code>. Explica en un comentario en qué se diferencian.`,
      hint: `Una <em>muestra</em>, la otra <em>entrega</em> un valor que guardas en una variable.`,
    },
    {
      t: `Reto: crea una función <code>etiqueta(${e})</code> y úsala dentro de un bucle sobre ${art2} <strong>${plural}</strong> para no repetir código.`,
      reto: true,
      hint: `Define la función una vez y llámala dentro de <code>for (const ${e} of ${plural}) { ... }</code>.`,
    },
  ];

  const quiz: NivelPersonalizado['quiz'] = [
    {
      q: `¿Cómo se ejecuta la función <code>${a0}</code>?`,
      o: [`Llamándola: ${a0}(${e})`, `Escribiendo function ${a0}`, `Con new ${a0}`],
      a: 0,
    },
    {
      q: `¿Qué hace <code>return</code> dentro de una función?`,
      o: ['Devuelve un valor y termina la función', 'Lo muestra por pantalla', 'Repite la función'],
      a: 0,
    },
    {
      q: `Si quieres <strong>reutilizar</strong> el resultado de una función, usas…`,
      o: ['return', 'console.log', 'un bucle while'],
      a: 0,
    },
    {
      q: `¿Qué evitas al meter una acción en una función y llamarla varias veces?`,
      o: ['Repetir el mismo código (DRY)', 'Que la app se publique', 'Usar variables'],
      a: 0,
    },
  ];

  return {
    intro: `En este nivel conviertes las acciones de <strong>${app}</strong> en <strong>funciones</strong> reutilizables. Cada acción sobre ${un} <strong>${E}</strong> se escribe una vez y se usa las veces que haga falta: los fundamentos son los de siempre, con las acciones de tu proyecto.`,
    blocks,
    ex,
    quiz,
  };
}
