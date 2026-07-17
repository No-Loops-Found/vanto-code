/** Nivel 8 · Interfaz y botones (el DOM). */
import type { Ctx, NivelPersonalizado } from './_shared';

export default function n08(ctx: Ctx): NivelPersonalizado {
  const { app, e, plural, un, art2, campos, c0 } = ctx;

  const tipoInput = (t: string): string => (t === 'numero' ? 'number' : t === 'fecha' ? 'date' : 'text');
  const leerValor = (nombre: string, tipo: string): string => {
    const v = `document.querySelector("#campo-${nombre}").value`;
    return tipo === 'numero' ? `Number(${v})` : v;
  };

  // ── HTML: formulario con un input por campo ──
  const codeHTML = [
    `<!-- Un formulario para añadir ${un} ${e} -->`,
    `<form id="form-${e}">`,
    ...campos.map((c) => `  <input id="campo-${c.nombre}" type="${tipoInput(c.tipo)}" placeholder="${c.nombre}">`),
    `  <button type="submit">Añadir ${e}</button>`,
    `</form>`,
    '',
    `<!-- Aquí pintaremos ${art2} ${plural} -->`,
    `<ul id="lista-${plural}"></ul>`,
  ].join('\n');

  // ── JS: enganchar el formulario y leer los valores ──
  const codeLeer = [
    `// Cogemos el formulario y la lista del HTML`,
    `const form = document.querySelector("#form-${e}");`,
    `const lista = document.querySelector("#lista-${plural}");`,
    '',
    `// Aquí guardamos ${art2} ${plural} que se vayan añadiendo`,
    `const ${plural} = [];`,
    '',
    `// Escuchamos el botón: cuando se envía el formulario...`,
    `form.addEventListener("submit", (evento) => {`,
    `  evento.preventDefault(); // evita que la página se recargue`,
    '',
    `  // Leemos lo que ha escrito la persona con .value`,
    `  const nuevo = {`,
    ...campos.map((c, i) => `    ${c.nombre}: ${leerValor(c.nombre, c.tipo)}${i < campos.length - 1 ? ',' : ''}`),
    `  };`,
    '',
    `  ${plural}.push(nuevo);`,
    `  pintar();`,
    `  form.reset(); // deja el formulario en blanco`,
    `});`,
  ].join('\n');

  // ── JS: pintar la lista en pantalla ──
  const codePintar = [
    `// Vuelca ${art2} ${plural} de la lista a la pantalla`,
    `function pintar() {`,
    `  lista.innerHTML = ""; // borramos lo anterior`,
    '',
    `  for (const ${e} of ${plural}) {`,
    `    const li = document.createElement("li");`,
    `    li.textContent = ${e}.${c0}; // texto seguro, sin HTML`,
    `    lista.appendChild(li);`,
    `  }`,
    `}`,
  ].join('\n');

  const blocks: NivelPersonalizado['blocks'] = [
    {
      h: `${app} sale a la pantalla`,
      p: [
        `Hasta ahora todo pasaba en la <strong>consola</strong>, donde solo lo ves tú. En este nivel ${app} se vuelve una app de verdad: con un formulario para añadir ${art2} ${plural} y una zona donde se ven.`,
        `El navegador guarda la página como una estructura de cajas llamada <strong>DOM</strong>. Tu JavaScript lee de esas cajas (lo que escribe la persona) y escribe en ellas (lo que quieres mostrar).`,
      ],
      note: `Cada elemento con <code>id</code> es una caja que puedes coger desde el código con <code>document.querySelector("#id")</code>.`,
    },
    {
      h: `El HTML: un formulario y una lista`,
      p: [
        `Primero, la parte visible. Un <code>&lt;input&gt;</code> por cada campo de ${un} ${e} (${campos.map((c) => `<strong>${c.nombre}</strong>`).join(', ')}), un <code>&lt;button&gt;</code> para enviar, y un <code>&lt;ul&gt;</code> vacío donde aparecerán ${art2} ${plural}.`,
        `Cada elemento lleva un <strong>id</strong>: es su etiqueta para que el JavaScript lo encuentre.`,
      ],
      code: { label: 'index.html', text: codeHTML },
    },
    {
      h: `Escuchar el botón y leer los datos`,
      p: [
        `Con <strong>addEventListener</strong> le dices al formulario: "cuando alguien te envíe, ejecuta esta función". Dentro, <code>evento.preventDefault()</code> evita que la página se recargue.`,
        `Después lees cada input con <strong>.value</strong>, montas ${un} ${e} nuevo y lo metes en la lista con <code>.push()</code>.`,
      ],
      code: { label: 'app.js', text: codeLeer },
      note: `<code>.value</code> siempre da texto. Por eso los campos numéricos se envuelven en <code>Number(...)</code>.`,
    },
    {
      h: `Pintar ${art2} ${plural} en pantalla`,
      p: [
        `Cada vez que se añade ${un} ${e}, repintamos la lista. Vaciamos el <code>&lt;ul&gt;</code> con <code>innerHTML = ""</code> y, por cada ${e}, creamos un <code>&lt;li&gt;</code> y le ponemos su texto con <strong>textContent</strong>.`,
        `Usa <strong>textContent</strong> para texto normal: es seguro y no interpreta HTML. <code>innerHTML</code> sí lo interpreta, así que resérvalo para cuando de verdad quieras insertar etiquetas.`,
      ],
      code: { label: 'app.js', text: codePintar },
    },
  ];

  const ex: NivelPersonalizado['ex'] = [
    {
      t: `Escribe el HTML: un <code>&lt;form&gt;</code> con un <code>&lt;input&gt;</code> por cada campo de ${un} <strong>${e}</strong>, un botón y un <code>&lt;ul&gt;</code> vacío.`,
      hint: `Dale un <code>id</code> a cada input, al form y al <code>&lt;ul&gt;</code> para poder cogerlos luego.`,
      sol: codeHTML,
    },
    {
      t: `Engancha el formulario con <code>addEventListener("submit", ...)</code>, lee los inputs con <code>.value</code> y guarda ${un} ${e} nuevo en la lista.`,
      hint: `No olvides <code>evento.preventDefault()</code> para que la página no se recargue al enviar.`,
      sol: codeLeer,
    },
    {
      t: `Escribe la función <code>pintar()</code> que recorre ${art2} <strong>${plural}</strong> y muestra el <strong>${c0}</strong> de cada uno en un <code>&lt;li&gt;</code>.`,
      hint: `Vacía la lista con <code>lista.innerHTML = ""</code> y usa <code>textContent</code> para el texto de cada <code>&lt;li&gt;</code>.`,
      sol: codePintar,
    },
    {
      t: `Reto: muestra también, encima de la lista, cuánt${art2 === 'las' ? 'as' : 'os'} ${plural} hay en total usando <code>.length</code> y <code>textContent</code>.`,
      reto: true,
      hint: `Añade un <code>&lt;p id="total"&gt;&lt;/p&gt;</code> y dentro de <code>pintar()</code> pon <code>document.querySelector("#total").textContent = ${plural}.length;</code>`,
    },
  ];

  const quiz: NivelPersonalizado['quiz'] = [
    { q: `¿Cómo coges desde el código un elemento con <code>id="form-${e}"</code>?`, o: [`document.querySelector("#form-${e}")`, `document.form-${e}`, `querySelector.form`], a: 0 },
    { q: `¿Para qué sirve <code>evento.preventDefault()</code> al enviar el formulario?`, o: ['Evita que la página se recargue', 'Borra la lista', 'Guarda en la base de datos'], a: 0 },
    { q: `¿Qué propiedad te da lo que ha escrito la persona en un input?`, o: ['.value', '.textContent', '.length'], a: 0 },
    { q: `¿Qué usas para meter texto normal (sin HTML) en un elemento?`, o: ['textContent', 'addEventListener', 'querySelector'], a: 0 },
  ];

  return {
    intro: `En este nivel <strong>${app}</strong> deja la consola y se ve: un formulario para añadir ${art2} ${plural} y una pantalla donde aparecen. Aprendes a leer lo que escribe la persona y a pintarlo. Los fundamentos son los de siempre; los ejemplos son los de tu proyecto.`,
    blocks,
    ex,
    quiz,
  };
}
