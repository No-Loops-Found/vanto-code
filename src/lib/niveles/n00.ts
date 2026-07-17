/** Nivel 0 · Entorno y primer programa. */
import type { Ctx, NivelPersonalizado } from './_shared';
import { valJS } from './_shared';

export default function n00(ctx: Ctx): NivelPersonalizado {
  const { app, E, e, un, art, campos, c0 } = ctx;
  const c0val = valJS(campos[0]);

  const helloCode = [
    '// La orden más básica: mostrar un texto por la consola',
    `console.log("Hola, ${app}");`,
  ].join('\n');

  const nombreAppCode = [
    '// Muestra el nombre de tu app por consola',
    `console.log("${app}");`,
  ].join('\n');

  const primerDatoCode = [
    `// Tu primer dato de verdad: el ${c0} de ${un} ${e}`,
    `const ${c0} = ${c0val};`,
    `console.log(${c0});`,
  ].join('\n');

  const blocks: NivelPersonalizado['blocks'] = [
    {
      h: 'Qué es programar',
      p: [
        `Programar es escribir <strong>instrucciones</strong> que el ordenador cumple una a una, en orden y al pie de la letra. No hay magia: tú mandas, él obedece.`,
        `En este curso esas instrucciones construyen algo tuyo: <strong>${app}</strong>. Los fundamentos que aprendes son los de siempre; lo que cambia es que los practicas con tu proyecto, no con la app del tiempo.`,
      ],
      note: 'Si algo falla, tranquilo: equivocarse y arreglarlo <b>es</b> programar. El error forma parte del código.',
    },
    {
      h: 'Tu primer programa',
      p: [
        `La orden más usada es <code>console.log(...)</code>: muestra por la <strong>consola</strong> lo que pongas dentro. La consola es la ventanita donde el ordenador te responde.`,
        `Empecemos por lo mínimo: que salude a <strong>${app}</strong>.`,
      ],
      code: { label: 'console.log', text: helloCode },
      note: `Todo lo que va entre comillas es <b>texto</b> (una cadena). El ordenador lo muestra tal cual, sin interpretarlo.`,
    },
    {
      h: 'Muestra el nombre de tu app',
      p: [
        `Cambia el texto por el nombre de tu proyecto. Cada vez que ejecutas, la consola escribe <strong>${app}</strong>.`,
      ],
      code: { label: 'el nombre', text: nombreAppCode },
    },
    {
      h: `Tu primer dato: el ${c0} de ${un} ${e}`,
      p: [
        `Un texto suelto no sirve de mucho. Para <strong>reutilizar</strong> un dato lo guardas en una <strong>variable</strong>: le pones un nombre y dentro metes el valor.`,
        `Aquí guardas el <strong>${c0}</strong> de ${un} <strong>${e}</strong> de ${app}. <code>const</code> significa "esto no va a cambiar".`,
      ],
      code: { label: `${un} ${e}`, text: primerDatoCode },
      note: `<code>const ${c0} = ...</code> crea la caja; <code>console.log(${c0})</code> mira qué hay dentro.`,
    },
  ];

  const ex: NivelPersonalizado['ex'] = [
    {
      t: `Muestra por consola el nombre de tu app, <strong>${app}</strong>.`,
      hint: `Usa <code>console.log("...")</code> con el nombre entre comillas.`,
      sol: `console.log("${app}");`,
    },
    {
      t: `Guarda el <strong>${c0}</strong> de ${un} <strong>${e}</strong> en una variable y muéstralo.`,
      hint: `Primero <code>const ${c0} = ${c0val};</code>, luego <code>console.log(${c0});</code>`,
      sol: primerDatoCode,
    },
    {
      t: `Reto: en una sola línea, muestra un saludo que junte texto y tu dato, por ejemplo <code>"El ${c0} es: " + ${c0}</code>.`,
      reto: true,
      hint: `Con <code>+</code> puedes pegar texto y variables: <code>console.log("El ${c0} es: " + ${c0});</code>`,
    },
  ];

  const quiz: NivelPersonalizado['quiz'] = [
    { q: '¿Qué hace console.log(...)?', o: ['Muestra por la consola lo que pones dentro', 'Borra la consola', 'Publica tu app en internet'], a: 0 },
    { q: 'Programar es, sobre todo…', o: ['Dar instrucciones que el ordenador cumple en orden', 'Adivinar lo que quiere el ordenador', 'Instalar programas'], a: 0 },
    { q: `¿Para qué sirve una variable como ${c0}?`, o: [`Guardar un dato con un nombre para reutilizarlo`, 'Mostrar un mensaje de error', 'Conectarse a internet'], a: 0 },
    { q: 'Si tu programa falla la primera vez…', o: ['Es normal: se corrige y a seguir', 'Está roto para siempre', 'Hay que reinstalar todo'], a: 0 },
  ];

  return {
    intro: `Aquí escribes tus primeras líneas de código y muestras algo por pantalla. El objetivo no es <strong>${E}</strong> todavía, sino que <strong>${app}</strong> cobre vida con un <code>console.log</code>.`,
    blocks,
    ex,
    quiz,
  };
}
