/** Nivel 3 · Tomar decisiones (condiciones). */
import type { Ctx, NivelPersonalizado } from './_shared';
import { valJS, filaInline } from './_shared';

export default function n03(ctx: Ctx): NivelPersonalizado {
  const { app, E, e, un, art, este, c0, campoNum, a0 } = ctx;

  // Campo y umbral sobre los que decidir. Si no hay campo numérico, decidimos por texto.
  const numField = campoNum?.nombre;
  const numVal = campoNum ? valJS(campoNum) : '0';
  const cond = numField ? `${e}.${numField} >= ${numVal}` : `${e}.${c0} !== ""`;
  const objLine = `const ${e} = ${filaInline(ctx)};`;

  const codeIf = [
    objLine,
    '',
    `if (${cond}) {`,
    `  console.log(${e}.${c0} + " está por encima del límite");`,
    '} else {',
    `  console.log(${e}.${c0} + " está dentro de lo normal");`,
    '}',
  ].join('\n');

  const condY = numField
    ? `${e}.${numField} >= ${numVal} && ${e}.${c0} !== ""`
    : `${e}.${c0} !== "" && ${e}.${c0}.length > 2`;
  const condO = numField
    ? `${e}.${numField} === 0 || ${e}.${c0} === ""`
    : `${e}.${c0} === "" || ${e}.${c0} === "?"`;
  const codeYO = [
    objLine,
    '',
    `// && : TODO tiene que cumplirse`,
    `if (${condY}) {`,
    `  console.log("Aviso: revisa " + ${e}.${c0});`,
    '}',
    '',
    `// || : basta con que se cumpla UNA cosa`,
    `if (${condO}) {`,
    `  console.log("Faltan datos en ${este} ${e}");`,
    '}',
  ].join('\n');

  const codeTernario = [
    objLine,
    '',
    `// Decidir en una sola línea: condición ? siValor : siNoValor`,
    `const estado = ${cond} ? "pendiente" : "al dia";`,
    `console.log(${e}.${c0} + ": " + estado);`,
  ].join('\n');

  const codeAccion = [
    `function ${a0}(${e}) {`,
    `  console.log(${e}.${c0} + " → ${a0} hecho");`,
    '}',
    '',
    objLine,
    '',
    `if (${cond}) {`,
    `  ${a0}(${e});          // se cumple: actuamos`,
    '} else {',
    `  console.log(${e}.${c0} + " no necesita nada");`,
    '}',
  ].join('\n');

  const condTxt = numField
    ? `su <strong>${numField}</strong> llega al límite`
    : `${art} <strong>${e}</strong> tiene ${c0}`;

  const blocks: NivelPersonalizado['blocks'] = [
    {
      h: `if / else: ${un} decisión sobre ${un} ${e}`,
      p: [
        `Programar es, sobre todo, <strong>decidir</strong>. En ${app} quieres que el programa reaccione distinto según ${condTxt}.`,
        `Un <strong>if</strong> comprueba una condición: si es <code>true</code>, ejecuta su bloque; si no, ejecuta el <strong>else</strong>. La condición se lee con operadores de comparación: <code>===</code> (igual), <code>!==</code> (distinto), <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>.`,
      ],
      code: { label: 'if / else', text: codeIf },
      note: `Ojo: para comparar se usa <code>===</code> (tres iguales). Un solo <code>=</code> no compara, <strong>asigna</strong> un valor.`,
    },
    {
      h: 'Combinar condiciones: && y ||',
      p: [
        `A veces una sola condición no basta. Con <strong>&&</strong> (y) exiges que se cumplan <em>todas</em>; con <strong>||</strong> (o) basta con que se cumpla <em>una</em>.`,
        `Así puedes avisar solo cuando de verdad toca, o detectar ${un} ${e} con datos incompletos.`,
      ],
      code: { label: '&& y ||', text: codeYO },
    },
    {
      h: 'El ternario: decidir en una línea',
      p: [
        `Cuando solo quieres elegir <strong>entre dos valores</strong>, el operador <strong>ternario</strong> lo resuelve en una línea: <code>condición ? esto : lo_otro</code>.`,
        `Es un <code>if/else</code> comprimido, ideal para asignar el <strong>estado</strong> de ${un} ${e}.`,
      ],
      code: { label: 'ternario', text: codeTernario },
      note: `El ternario <em>devuelve un valor</em>; el <code>if</code> normal <em>ejecuta bloques</em>. Usa el ternario solo cuando eliges entre dos valores.`,
    },
    {
      h: 'Decidir y actuar: llamar a una acción',
      p: [
        `Lo interesante es que dentro de un <code>if</code> no solo muestras texto: puedes <strong>llamar a una acción</strong>. Si la condición se cumple, ejecutas <code>${a0}()</code>; si no, haces otra cosa.`,
      ],
      code: { label: `if → ${a0}()`, text: codeAccion },
    },
  ];

  const ex: NivelPersonalizado['ex'] = [
    {
      t: `Crea ${un} <strong>${e}</strong> y escribe un <code>if/else</code> que muestre un mensaje distinto según ${numField ? `su <strong>${numField}</strong>` : `su <strong>${c0}</strong>`}.`,
      hint: `Recuerda: <code>if (${cond}) { ... } else { ... }</code>`,
      sol: codeIf,
    },
    {
      t: `Usa un <strong>ternario</strong> para guardar en una variable <code>estado</code> si ${art} ${e} está <em>pendiente</em> o <em>al día</em>, y muéstralo.`,
      hint: `<code>const estado = ${cond} ? "pendiente" : "al dia";</code>`,
      sol: codeTernario,
    },
    {
      t: `Combina dos condiciones con <strong>&&</strong> para mostrar un aviso solo cuando se cumplan las dos.`,
      hint: `Une las condiciones con <code>&&</code> dentro del mismo <code>if</code>.`,
    },
    {
      t: `Reto: escribe un <code>if</code> que, si se cumple la condición, llame a <code>${a0}(${e})</code>, y si no, muestre un aviso por consola.`,
      reto: true,
      hint: `Define primero <code>function ${a0}(${e}) { ... }</code> y luego decídelo con <code>if/else</code>.`,
    },
  ];

  const quiz: NivelPersonalizado['quiz'] = [
    {
      q: `¿Qué operador compara si dos valores son iguales?`,
      o: ['===', '=', '=>'],
      a: 0,
    },
    {
      q: `Con <code>&&</code>, ¿cuándo entra el bloque del <code>if</code>?`,
      o: ['Solo si se cumplen TODAS las condiciones', 'Si se cumple al menos una', 'Nunca, es solo decorativo'],
      a: 0,
    },
    {
      q: `¿Qué hace <code>${cond} ? "pendiente" : "al dia"</code>?`,
      o: ['Devuelve un valor según la condición', 'Crea una función llamada pendiente', 'Borra los datos guardados'],
      a: 0,
    },
    {
      q: `Dentro de un <code>if</code> que se cumple, ¿puedes llamar a <code>${a0}(${e})</code>?`,
      o: ['Sí, se ejecuta la acción cuando la condición es verdadera', 'No, dentro de un if solo se escribe texto', 'Solo si ' + art + ' ' + e + ' es un número'],
      a: 0,
    },
  ];

  return {
    intro: `En este nivel enseñas a <strong>${app}</strong> a decidir. A partir de los datos de ${un} <strong>${E}</strong> tomas caminos distintos con <code>if/else</code>: los fundamentos son los de siempre, pero decides sobre tu proyecto.`,
    blocks,
    ex,
    quiz,
  };
}
