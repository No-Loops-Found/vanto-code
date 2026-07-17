/** Nivel 2 · Hacer cálculos. */
import type { Ctx, NivelPersonalizado } from './_shared';
import { valJS } from './_shared';

export default function n02(ctx: Ctx): NivelPersonalizado {
  const { app, E, e, un, art, plural, campos, campoNum, campoFecha } = ctx;

  const operadoresCode = [
    'console.log(2 + 3);   // 5   suma',
    'console.log(10 - 4);  // 6   resta',
    'console.log(6 * 7);   // 42  multiplicación',
    'console.log(20 / 5);  // 4   división',
    'console.log(17 % 5);  // 2   resto (lo que sobra)',
  ].join('\n');

  // Cálculo principal de la app: número > fecha > cuenta de plurales.
  let calcTitulo: string;
  let calcIntro: string;
  let calcCode: string;

  if (campoNum) {
    const n = campoNum.nombre;
    calcTitulo = `Un cálculo real: con el ${n}`;
    calcIntro = `Tu ${e} tiene un campo numérico, <strong>${n}</strong>. Con él puedes calcular de verdad: doblarlo, sacar un porcentaje o sumarle un recargo.`;
    calcCode = [
      `const ${n} = ${valJS(campoNum)};   // un campo numérico de tu ${e}`,
      `const doble = ${n} * 2;`,
      `const conIva = ${n} * 1.21;   // le sumas el 21% de IVA`,
      '',
      `console.log("Doble: " + doble);`,
      `console.log("Con IVA: " + Math.round(conIva * 100) / 100);`,
    ].join('\n');
  } else if (campoFecha) {
    const f = campoFecha.nombre;
    calcTitulo = `Un cálculo real: días desde ${f}`;
    calcIntro = `Tu ${e} guarda una fecha, <strong>${f}</strong>. Restando fechas sabes cuántos días han pasado hasta hoy.`;
    calcCode = [
      `const ${f} = new Date(${valJS(campoFecha)});`,
      'const hoy = new Date();',
      `const dias = Math.floor((hoy - ${f}) / 86400000); // ms que tiene un día`,
      '',
      `console.log("Han pasado " + dias + " días");`,
    ].join('\n');
  } else {
    calcTitulo = `Un cálculo real: cuántos ${plural}`;
    calcIntro = `Aún sin campos numéricos puedes calcular: por ejemplo, cuántos <strong>${plural}</strong> tienes en una lista.`;
    calcCode = [
      `const ${plural} = ["uno", "dos", "tres"];`,
      `const cuantos = ${plural}.length;`,
      '',
      `console.log("Tienes " + cuantos + " ${plural}");`,
    ].join('\n');
  }

  const mostrarCode = [
    '// Concatenas texto y números con +, y redondeas con Math.round',
    'const cantidad = 3;',
    'const precio = 5;',
    'const total = cantidad * precio;',
    '',
    'console.log("Total: " + total + " €");',
  ].join('\n');

  const blocks: NivelPersonalizado['blocks'] = [
    {
      h: 'Los operadores',
      p: [
        `Para calcular usas los <strong>operadores</strong>: <code>+</code> suma, <code>-</code> resta, <code>*</code> multiplica, <code>/</code> divide y <code>%</code> te da el <strong>resto</strong> de una división.`,
        `Cada cuenta la puedes mostrar con <code>console.log</code> para ver el resultado.`,
      ],
      code: { label: 'operadores', text: operadoresCode },
      note: `El orden es el de las matemáticas: primero <code>*</code> y <code>/</code>, luego <code>+</code> y <code>-</code>. Usa paréntesis si dudas.`,
    },
    {
      h: calcTitulo,
      p: [calcIntro, `Guardas el resultado en una variable y lo enseñas por consola.`],
      code: { label: 'cálculo', text: calcCode },
      note: campoNum
        ? `<code>Math.round(x * 100) / 100</code> redondea a dos decimales: útil para dinero.`
        : campoFecha
          ? `Al restar dos <code>Date</code>, JavaScript te da milisegundos; por eso divides entre <code>86400000</code>.`
          : `<code>.length</code> te dice cuántos elementos hay en la lista.`,
    },
    {
      h: 'Mostrar el resultado con texto',
      p: [
        `Un número solo no dice mucho. Con <code>+</code> juntas texto y números para que el resultado se entienda.`,
        `Y con <code>Math.round(...)</code> lo dejas en un número limpio, sin decimales interminables.`,
      ],
      code: { label: 'mostrar', text: mostrarCode },
    },
  ];

  const ex: NivelPersonalizado['ex'] = [
    {
      t: `Calcula y muestra por consola el resultado de una operación con los datos de <strong>${app}</strong>.`,
      hint: `Guarda el resultado en una variable: <code>const total = ...; console.log(total);</code>`,
      sol: calcCode,
    },
    {
      t: `Muestra un mensaje que junte texto y un número, por ejemplo <code>"Total: " + total</code>.`,
      hint: `Usa <code>+</code> para pegar el texto y el número dentro de <code>console.log</code>.`,
      sol: mostrarCode,
    },
    {
      t: `Reto: usa el operador <code>%</code> para averiguar si un número es par (si <code>n % 2</code> vale <code>0</code>, es par).`,
      reto: true,
      hint: `<code>const n = 8; console.log(n % 2);</code> — si sale <code>0</code>, es par.`,
    },
  ];

  const quiz: NivelPersonalizado['quiz'] = [
    { q: '¿Qué operador multiplica?', o: ['*', 'x', '·'], a: 0 },
    { q: '¿Qué hace el operador % ?', o: ['Da el resto de una división', 'Calcula un porcentaje siempre', 'Redondea el número'], a: 0 },
    { q: '¿Cómo juntas texto y un número al mostrarlo?', o: ['Con + : "Total: " + total', 'Con - : "Total: " - total', 'No se puede juntar'], a: 0 },
    { q: '¿Para qué sirve Math.round(x)?', o: ['Redondear el número', 'Multiplicar por 2', 'Convertirlo en texto'], a: 0 },
  ];

  return {
    intro: `Aquí haces que <strong>${app}</strong> calcule. Con los operadores y <code>console.log</code> sacas totales, cuentas y resultados a partir de los datos de tus <strong>${plural}</strong>.`,
    blocks,
    ex,
    quiz,
  };
}
