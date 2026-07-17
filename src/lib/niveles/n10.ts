/** Nivel 10 · Consultas y estadística (Supabase). */
import type { Ctx, NivelPersonalizado } from './_shared';
import { valJS } from './_shared';

export default function n10(ctx: Ctx): NivelPersonalizado {
  const { app, e, plural, art, art2, campos, c0, campoNum, campoFecha, g } = ctx;
  const tieneNum = !!campoNum;
  const cn = campoNum?.nombre || c0;
  const cf = campoFecha?.nombre;
  const valNum = campoNum ? valJS(campoNum) : '3';

  // Ordenar + filtrar
  const ordenTxt = [
    `// Traer ${art2} ${plural} ordenad${g === 'f' ? 'a' : 'o'}s por ${cn}, de mayor a menor`,
    `const { data, error } = await supabase`,
    `  .from('${plural}')`,
    `  .select('*')`,
    `  .order('${cn}', { ascending: false });`,
    '',
    `console.log(data);`,
  ].join('\n');

  const filtroTxt = tieneNum
    ? [
        `// Solo ${art2} ${plural} con ${cn} mayor que ${valNum}`,
        `const { data } = await supabase`,
        `  .from('${plural}')`,
        `  .select('*')`,
        `  .gt('${cn}', ${valNum});`,
        '',
        `// Y ${art2} que valen exactamente ese ${cn}`,
        `const iguales = await supabase`,
        `  .from('${plural}')`,
        `  .select('*')`,
        `  .eq('${cn}', ${valNum});`,
      ].join('\n')
    : [
        `// Solo ${art2} ${plural} cuyo ${c0} es exactamente este`,
        `const { data } = await supabase`,
        `  .from('${plural}')`,
        `  .select('*')`,
        `  .eq('${c0}', ${valJS(campos[0])});`,
      ].join('\n');

  // Contar
  const contarTxt = [
    `// Contar cuánt${g === 'f' ? 'as' : 'os'} ${plural} hay, sin traértel${g === 'f' ? 'a' : 'o'}s tod${g === 'f' ? 'a' : 'o'}s`,
    `const { count } = await supabase`,
    `  .from('${plural}')`,
    `  .select('*', { count: 'exact', head: true });`,
    '',
    `console.log("Hay " + count + " ${plural}");`,
  ].join('\n');

  // Estadística: ranking (si hay campoNum) o conteo por JS
  const statTxt = tieneNum
    ? [
        `// Ranking + media de ${cn}`,
        `const { data } = await supabase`,
        `  .from('${plural}')`,
        `  .select('*')`,
        `  .order('${cn}', { ascending: false });`,
        '',
        `// El primero de la lista es ${art} ${e} con más ${cn}`,
        `const lider = data[0];`,
        `console.log("Lidera: " + lider.${c0});`,
        '',
        `// Total y media, con guarda contra dividir por cero`,
        `let total = 0;`,
        `for (const ${e} of data) {`,
        `  total = total + ${e}.${cn};`,
        `}`,
        `const media = data.length > 0 ? total / data.length : 0;`,
        `console.log("Media de ${cn}: " + media);`,
      ].join('\n')
    : [
        `// Sin campo numérico: contamos y agrupamos en JS`,
        `const { data } = await supabase`,
        `  .from('${plural}')`,
        `  .select('*');`,
        '',
        `// Cuánt${g === 'f' ? 'as' : 'os'} ${plural} distint${g === 'f' ? 'as' : 'os'} hay por ${c0}`,
        `const conteo = {};`,
        `for (const ${e} of data) {`,
        `  conteo[${e}.${c0}] = (conteo[${e}.${c0}] || 0) + 1;`,
        `}`,
        `const cuantos = data.length;`,
        `const media = cuantos > 0 ? cuantos / Object.keys(conteo).length : 0;`,
        `console.log(conteo);`,
      ].join('\n');

  const blocks: NivelPersonalizado['blocks'] = [
    {
      h: 'Ordenar y filtrar',
      p: [
        `Ya guardas ${art2} <strong>${plural}</strong> de <strong>${app}</strong>. Ahora toca <strong>preguntarle</strong> cosas a la base de datos, que es rapidísima haciéndolo.`,
        `Con <strong>.order('${cn}', { ascending: false })</strong> ${art2} pides ordenad${g === 'f' ? 'a' : 'o'}s de mayor a menor. Con <strong>.eq()</strong> filtras por igual y con <strong>.gt()</strong> por "mayor que". Puedes encadenarlos.`,
      ],
      code: { label: '.order()', text: ordenTxt },
      note: `<code>ascending: false</code> es de mayor a menor; <code>true</code> (o sin poner nada) es de menor a mayor.`,
    },
    {
      h: `Filtrar: .eq() y .gt()`,
      p: [
        tieneNum
          ? `<strong>.eq('${cn}', valor)</strong> te trae ${art2} ${plural} donde ${cn} es <em>igual</em> a ese valor; <strong>.gt('${cn}', valor)</strong>, ${art2} donde es <em>mayor</em>. Así respondes preguntas concretas sin recorrer nada a mano.`
          : `<strong>.eq('${c0}', valor)</strong> te trae solo ${art2} ${plural} cuyo ${c0} coincide con ese valor. Filtras en la base de datos, que es mucho más rápida que hacerlo tú en una lista.`,
      ],
      code: { label: tieneNum ? '.gt() / .eq()' : '.eq()', text: filtroTxt },
    },
    {
      h: `Contar sin traértel${g === 'f' ? 'a' : 'o'}s`,
      p: [
        `Muchas veces no quieres ${art2} ${plural}, solo <strong>cuánt${g === 'f' ? 'as' : 'os'}</strong> hay. Para eso está <strong>{ count: 'exact', head: true }</strong>: te devuelve el número sin descargar los datos.`,
      ],
      code: { label: 'count', text: contarTxt },
    },
    {
      h: tieneNum ? `Estadística: ranking y media de ${cn}` : 'Estadística: contar por grupos',
      p: tieneNum
        ? [
            `Ordenando por <strong>${cn}</strong> tienes un <strong>ranking</strong> gratis: el primero de la lista es ${art} ${e} con más ${cn}.`,
            `Para la <strong>media</strong> sumas ${cn} en JS y divides por cuántos hay. Ojo con el caso peligroso: si no hay ningún ${e}, dividir por cero da un resultado roto. Por eso pones la <strong>guarda</strong> <code>data.length > 0 ? ... : 0</code>.`,
          ]
        : [
            `Como ${art2} ${plural} no tienen un campo numérico, la estadística la montas <strong>contando</strong>: recorres los datos y cuentas cuánt${g === 'f' ? 'as' : 'os'} hay de cada <strong>${c0}</strong>.`,
            `Aun así, cuida el caso peligroso: si la lista está vacía, dividir por cero rompe el cálculo. La <strong>guarda</strong> <code>cuantos > 0 ? ... : 0</code> lo evita.`,
          ],
      code: { label: tieneNum ? 'ranking + media' : 'conteo', text: statTxt },
      note: `Dividir entre cero es uno de los errores clásicos. Una guarda <b>${tieneNum ? 'data.length > 0' : 'cuantos > 0'}</b> te ahorra el susto.`,
    },
  ];

  if (cf) {
    blocks[0].p!.push(`Como tienes una <strong>fecha</strong> (<code>${cf}</code>), también puedes ordenar por ella para ver ${art2} ${plural} más recientes primero.`);
  }

  const ex: NivelPersonalizado['ex'] = [
    {
      t: `Trae ${art2} <strong>${plural}</strong> ordenad${g === 'f' ? 'a' : 'o'}s por <strong>${cn}</strong> de mayor a menor y muestra el primero.`,
      hint: `Usa <code>.order('${cn}', { ascending: false })</code>; el primero es <code>data[0]</code>.`,
      sol: ordenTxt,
    },
    {
      t: tieneNum
        ? `Filtra ${art2} <strong>${plural}</strong> con <strong>${cn}</strong> mayor que ${valNum} usando <code>.gt()</code>.`
        : `Filtra ${art2} <strong>${plural}</strong> cuyo <strong>${c0}</strong> sea un valor concreto usando <code>.eq()</code>.`,
      hint: tieneNum ? `<code>.gt('${cn}', ${valNum})</code>` : `<code>.eq('${c0}', valor)</code>`,
      sol: filtroTxt,
    },
    {
      t: tieneNum
        ? `Calcula la <strong>media</strong> de <strong>${cn}</strong> en JS, con guarda contra dividir por cero.`
        : `Cuenta cuánt${g === 'f' ? 'as' : 'os'} <strong>${plural}</strong> hay por <strong>${c0}</strong> en un objeto de conteo.`,
      hint: tieneNum
        ? `Suma en un bucle y divide: <code>data.length > 0 ? total / data.length : 0</code>.`
        : `Un objeto <code>{}</code> donde sumas 1 por cada ${e}: <code>conteo[clave] = (conteo[clave] || 0) + 1</code>.`,
      sol: statTxt,
    },
    {
      t: `Reto: usa <code>count</code> para mostrar cuánt${g === 'f' ? 'as' : 'os'} <strong>${plural}</strong> hay en total, sin descargarl${g === 'f' ? 'a' : 'o'}s.`,
      reto: true,
      hint: `<code>.select('*', { count: 'exact', head: true })</code> te devuelve <code>count</code>.`,
    },
  ];

  const quiz: NivelPersonalizado['quiz'] = [
    { q: `¿Cómo ordenas ${art2} ${plural} de mayor a menor por ${cn}?`, o: [`.order('${cn}', { ascending: false })`, `.gt('${cn}')`, `.select('${cn}')`], a: 0 },
    { q: 'Para traer solo filas donde un campo es igual a un valor, usas…', o: ['.eq()', '.order()', '.insert()'], a: 0 },
    { q: `Antes de calcular una media, ¿qué compruebas?`, o: ['Que la lista no esté vacía (no dividir por cero)', 'Que haya conexión a internet', 'Que la tabla tenga id'], a: 0 },
    { q: `¿Para qué sirve <code>{ count: 'exact', head: true }</code>?`, o: [`Saber cuánt${g === 'f' ? 'as' : 'os'} ${plural} hay sin traértel${g === 'f' ? 'a' : 'o'}s`, `Borrar ${art2} ${plural}`, 'Ordenar por fecha'], a: 0 },
  ];

  return {
    intro: `Ahora le <strong>preguntas</strong> a tus datos: ordenas, filtras, cuentas y sacas estadística de ${art2} <strong>${plural}</strong> de <strong>${app}</strong>. Los fundamentos son los de siempre; las preguntas son las de tu proyecto.`,
    blocks,
    ex,
    quiz,
  };
}
