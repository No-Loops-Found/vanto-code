/** Nivel 11 · Proyecto final: publicar tu app (Vercel). */
import type { Ctx, NivelPersonalizado } from './_shared';

export default function n11(ctx: Ctx): NivelPersonalizado {
  const { app, E, e, plural, art2, campos } = ctx;
  const listaCampos = campos.map((c) => `<strong>${c.nombre}</strong>`).join(', ');

  const envTxt = [
    `# .env.local  —  NUNCA subas este archivo a GitHub`,
    `NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co`,
    `NEXT_PUBLIC_SUPABASE_ANON_KEY=TU-CLAVE-PUBLICA`,
  ].join('\n');

  const clienteEnvTxt = [
    `// En el código lees las claves desde las variables de entorno,`,
    `// nunca escritas a mano dentro del archivo`,
    `const supabase = createClient(`,
    `  process.env.NEXT_PUBLIC_SUPABASE_URL,`,
    `  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY`,
    `);`,
  ].join('\n');

  const deployTxt = [
    `# Pasos para publicar en Vercel (desde vercel.com)`,
    `1. Sube tu proyecto a un repositorio de GitHub`,
    `2. En Vercel: "Add New… → Project" e importa ese repo`,
    `3. Añade las variables de entorno (las mismas de .env.local)`,
    `4. Pulsa "Deploy" y espera a que termine`,
    `5. Vercel te da una URL pública: ${plural}-${e}.vercel.app`,
  ].join('\n');

  const blocks: NivelPersonalizado['blocks'] = [
    {
      h: 'Mira lo que has construido',
      p: [
        `Antes de publicar, para y mira atrás. Empezaste en el Nivel 0 sin saber qué era programar. Ahora <strong>${app}</strong> existe: tienes tu entidad <strong>${E}</strong>, con sus campos (${listaCampos}), guardas ${art2} <strong>${plural}</strong> en una base de datos y los consultas.`,
        `Esto ya no es un ejercicio que se borra. Es tu app. Solo falta lo mejor: <strong>ponerla en internet</strong> para que cualquiera pueda usarla.`,
      ],
      note: `Cierra el círculo: lo que en el Nivel 0 era "¿y esto para qué?" hoy es ${art2} <b>${plural}</b> guardad${ctx.g === 'f' ? 'a' : 'o'}s de verdad.`,
    },
    {
      h: 'Preparar el repositorio',
      p: [
        `Tu código vive en <strong>GitHub</strong> desde el Nivel 0. Publicar es, en el fondo, decirle a un servidor: "coge ese repositorio y sírvelo en internet". El servidor será <strong>Vercel</strong>.`,
        `Antes revisa que todo esté <strong>commiteado</strong> y subido. Lo que no esté en GitHub, Vercel no lo verá.`,
      ],
    },
    {
      h: 'Variables de entorno: tus claves a salvo',
      p: [
        `Tu clave de Supabase no puede ir escrita a la vista en el código: si subes eso a GitHub, queda expuesta. Se guardan en <strong>variables de entorno</strong>, en un archivo <code>.env.local</code> que <strong>no se sube</strong>.`,
        `En el código las lees con <strong>process.env</strong>. En Vercel las vuelves a meter desde su panel, para que la app publicada también las tenga.`,
      ],
      code: { label: '.env.local', text: envTxt },
      note: `Añade <code>.env.local</code> a tu <code>.gitignore</code>. Las claves se configuran en Vercel aparte, no viajan en el repo.`,
    },
    {
      h: 'Desplegar en Vercel',
      p: [
        `Entras en <strong>vercel.com</strong>, eliges <strong>importar tu repositorio de GitHub</strong>, añades las variables de entorno y pulsas <strong>Deploy</strong>. En un par de minutos, Vercel te da una <strong>URL pública</strong>.`,
        `Esa URL es <strong>${app}</strong> viva. Puedes mandársela a quien quieras y la abrirá en su móvil o su ordenador.`,
      ],
      code: { label: 'process.env', text: clienteEnvTxt },
    },
    {
      h: 'Y a partir de ahora: redeploy en cada commit',
      p: [
        `Lo mejor viene después: Vercel se queda mirando tu repositorio. Cada vez que hagas un <strong>commit</strong> y lo subas, <strong>republica sola</strong>. Cambias algo, lo subes, y la versión de internet se actualiza.`,
        `<strong>${app}</strong> ya no es un proyecto de curso: es tu app, publicada y viva, y sabes cómo seguir mejorándola. Tu idea, hacia delante.`,
      ],
      code: { label: 'publicar', text: deployTxt },
    },
  ];

  const ex: NivelPersonalizado['ex'] = [
    {
      t: `Repasa <strong>${app}</strong>: escribe en una frase qué hace tu app y qué guardas de cada <strong>${e}</strong>.`,
      hint: `Nombra tu entidad <strong>${E}</strong> y sus campos: ${campos.map((c) => c.nombre).join(', ')}.`,
    },
    {
      t: `Saca tus claves de Supabase del código y ponlas en <code>.env.local</code>; léelas con <code>process.env</code>.`,
      hint: `Y añade <code>.env.local</code> al <code>.gitignore</code> para no subirlo.`,
      sol: clienteEnvTxt,
    },
    {
      t: `Importa tu repositorio en Vercel, añade las variables de entorno y despliega hasta obtener tu <strong>URL pública</strong>.`,
      hint: `En vercel.com: "Add New… → Project", importas el repo de GitHub, metes las env vars y pulsas Deploy.`,
      sol: deployTxt,
    },
    {
      t: `Reto: haz un cambio pequeño en <strong>${app}</strong>, súbelo con un commit y comprueba que Vercel <strong>republica sola</strong> y tu URL se actualiza.`,
      reto: true,
      hint: `No hace falta volver a desplegar a mano: cada commit al repo dispara un nuevo deploy.`,
    },
  ];

  const quiz: NivelPersonalizado['quiz'] = [
    { q: `¿Dónde publicas <strong>${app}</strong> para que tenga una URL pública?`, o: ['Vercel', 'Supabase', 'GitHub Codespaces'], a: 0 },
    { q: '¿Dónde guardas tu clave de Supabase al publicar?', o: ['En variables de entorno, no en el código', 'Escrita en el código y subida a GitHub', 'En un comentario'], a: 0 },
    { q: 'Tras publicar, ¿qué pasa cuando haces un commit nuevo?', o: ['Vercel republica la app sola', 'Se borra la app', 'Hay que crear otro proyecto'], a: 0 },
    { q: `¿Qué es <strong>${app}</strong> al terminar el curso?`, o: ['Una app publicada y viva que se usa de verdad', 'Un ejercicio que se borra', 'Una copia de la app del tiempo'], a: 0 },
  ];

  return {
    intro: `El cierre. Coges todo lo que construiste — tu <strong>${E}</strong>, ${art2} <strong>${plural}</strong>, la base de datos — y publicas <strong>${app}</strong> en internet con <strong>Vercel</strong>. Terminas con algo que se usa, no con un repo muerto.`,
    blocks,
    ex,
    quiz,
  };
}
