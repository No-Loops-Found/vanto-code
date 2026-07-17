/** Nivel 7 · Modelar cosas con objetos. */
import type { Ctx, NivelPersonalizado } from './_shared';
import { objetoLiteral, listaObjetos, claseCode } from './_shared';

export default function n07(ctx: Ctx): NivelPersonalizado {
  const { app, E, e, plural, art, un, art2, campos, c0, acciones, entidad2 } = ctx;
  const listaCampos = campos.map((c) => `<strong>${c.nombre}</strong>`).join(', ');
  const metodosTxt = acciones.map((a) => `<code>${a.nombre}()</code>`).join(', ') || '<code>describir()</code>';

  const blocks: NivelPersonalizado['blocks'] = [
    {
      h: `Un objeto: ${un} ${e} en una sola caja`,
      p: [
        `Hasta ahora cada dato iba por su lado. Un <strong>objeto</strong> junta en una sola variable todo lo que describe a ${un} <strong>${e}</strong> de ${app}: sus campos (${listaCampos}).`,
        'Cada campo tiene un <strong>nombre</strong> y un <strong>valor</strong>, y accedes a él con el punto.',
      ],
      code: { label: `${un} ${e}`, text: objetoLiteral(ctx) },
      note: `Piensa en el objeto como una ficha de <b>${e}</b>: todo lo de ${un} ${mismoDe(ctx)} ${e}, junto y con etiquetas.`,
    },
    {
      h: `${art2 === 'las' ? 'Muchas' : 'Muchos'} ${plural}: una lista de objetos`,
      p: [`${app} no tiene ${un} solo ${e}, sino ${art2 === 'las' ? 'muchas' : 'muchos'}. ${art2 === 'las' ? 'Las' : 'Los'} guardas en una <strong>lista de objetos</strong> (un array donde cada elemento es ${un} ${e}).`],
      code: { label: plural, text: listaObjetos(ctx) },
    },
    {
      h: `Una clase ${E}: el molde de ${art2} ${plural}`,
      p: [
        `Si vas a crear ${plural} a menudo, una <strong>clase</strong> es el <em>molde</em>: defines una vez qué campos tiene ${un} <strong>${E}</strong> y qué sabe hacer, y luego creas ${plural} con <strong>new</strong>.`,
        `El <strong>constructor</strong> recibe los datos y los guarda con <strong>this</strong>. Los <strong>métodos</strong> (${metodosTxt}) son las acciones de cada ${e}.`,
      ],
      code: { label: `class ${E}`, text: claseCode(ctx) },
      note: `<b>this</b> es "este objeto ${E}, el de ahora mismo". <code>this.${c0}</code> es su ${c0}.`,
    },
  ];

  if (entidad2) {
    blocks.push({
      h: `Y también: ${entidad2}`,
      p: [`${app} maneja más de una cosa. <strong>${entidad2}</strong> se modela igual: su propia clase o sus propios objetos, con sus campos. Cada entidad, su molde.`],
    });
  }

  const ex: NivelPersonalizado['ex'] = [
    {
      t: `Crea un objeto <strong>${e}</strong> con sus campos (${campos.map((c) => c.nombre).join(', ')}) y muéstralo por consola.`,
      hint: `Empieza con <code>const ${e} = { ... };</code> y usa <code>console.log(${e});</code>`,
      sol: objetoLiteral(ctx),
    },
    {
      t: `Crea la clase <strong>${E}</strong> con su constructor y el método <code>${ctx.a0}()</code>. Luego crea ${un} ${e} con <code>new</code>.`,
      hint: `El constructor recibe ${ctx.params} y guarda cada uno con <code>this.campo = campo</code>.`,
      sol: claseCode(ctx),
    },
    {
      t: `Reto: crea ${art2 === 'las' ? 'dos' : 'dos'} ${plural} en una lista y recórrela con <code>for...of</code> mostrando el <strong>${c0}</strong> de cada ${e}.`,
      reto: true,
      hint: `for (const ${e} of ${plural}) { console.log(${e}.${c0}); }`,
    },
  ];

  const quiz: NivelPersonalizado['quiz'] = [
    { q: `¿Cómo accedes al campo ${c0} de tu ${e}?`, o: [`${e}.${c0}`, `${e}[${c0}]`, `${c0}(${e})`], a: 0 },
    { q: `¿Qué palabra crea un objeto ${E} nuevo a partir de su clase?`, o: ['new', 'class', 'this'], a: 0 },
    { q: `Dentro del constructor de ${E}, ¿cómo guardas el campo ${c0}?`, o: [`this.${c0} = ${c0}`, `${c0} = this`, `let ${c0} = new`], a: 0 },
    { q: `¿Para qué sirve la clase ${E}?`, o: [`Es el molde para crear ${plural} con la misma forma`, 'Publica tu app en internet', 'Borra los datos guardados'], a: 0 },
  ];

  return {
    intro: `En este nivel modelas <strong>${app}</strong> con objetos. Tu entidad principal es <strong>${E}</strong>, y cada ${e} tiene sus campos (${listaCampos}). Los fundamentos son los de siempre; los ejemplos y ejercicios son los de tu proyecto.`,
    blocks,
    ex,
    quiz,
  };
}

const mismoDe = (ctx: Ctx) => (ctx.g === 'f' ? 'una misma' : 'un mismo');
