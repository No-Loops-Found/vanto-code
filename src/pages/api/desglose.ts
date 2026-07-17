import type { APIRoute } from 'astro';
import { serverClient, json } from '../../lib/supabase';
import { FUNDAMENTOS } from '../../lib/course-data';

export const prerender = false;

const MODEL = 'gemini-flash-latest';
// Secreto de servidor. En Vercel se define como env var (process.env); en local, vía .env exportada.
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Qué enseña cada fundamento (contexto para el modelo).
const TEACHES: Record<string, string> = {
  entorno: 'preparar el entorno y el primer programa',
  datos: 'variables y tipos para guardar información',
  calculos: 'operaciones y cálculos (totales, medias, porcentajes)',
  decisiones: 'condiciones (if/else) para que la app reaccione',
  repeticion: 'bucles para recorrer muchos elementos',
  funciones: 'funciones reutilizables',
  colecciones: 'listas y colecciones (arrays)',
  objetos: 'modelar cosas con objetos y clases',
  pantalla: 'interfaz, botones y formularios (el DOM)',
  bd: 'guardar en base de datos (Supabase)',
  consultas: 'consultas y estadística (paneles, rankings)',
};

const IDS = FUNDAMENTOS.map((f) => f.id);

const systemInstruction =
  'Eres el clasificador pedagógico de Vanto Code, una academia de programación por proyectos. ' +
  'Dada la idea de app de una persona, desglosas sus funciones en los fundamentos del curso y ' +
  'adaptas la explicación y los ejemplos a SU proyecto concreto. Principios de voz: háblale de tú, ' +
  'claro antes que listo, el error es parte del código, su idea manda. Nunca digas "RA" ni ' +
  '"resultado de aprendizaje": di "fundamento". Español de España. ' +
  'El curso se programa en JavaScript ejecutado EN EL NAVEGADOR (editor online: GitHub Codespaces o ' +
  'StackBlitz), con Supabase para la base de datos y Vercel para publicar. No menciones instalar ' +
  'programas de escritorio (nada de VS Code de escritorio, Node local, etc.). Ejemplos de código ' +
  'en JavaScript, cortos y realistas.';

const responseSchema = {
  type: 'object',
  properties: {
    resumen: { type: 'string' },
    fundamentos: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', enum: IDS },
          aplica: { type: 'boolean' },
          como: { type: 'string' },
          ejemplo: { type: 'string' },
        },
        required: ['id', 'aplica', 'como'],
      },
    },
    // Modelo estructurado del proyecto: permite personalizar los niveles por
    // plantilla (sin más IA). La IA solo extrae los datos; el código lo genera el curso.
    modelo: {
      type: 'object',
      properties: {
        entidad: { type: 'string' }, // singular, PascalCase (Planta)
        plural: { type: 'string' }, // minúscula (plantas)
        campos: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              nombre: { type: 'string' }, // camelCase (fechaRiego)
              tipo: { type: 'string', enum: ['texto', 'numero', 'fecha', 'booleano'] },
              ejemplo: { type: 'string' },
            },
            required: ['nombre', 'tipo'],
          },
        },
        acciones: {
          type: 'array',
          items: {
            type: 'object',
            properties: { nombre: { type: 'string' }, desc: { type: 'string' } },
            required: ['nombre'],
          },
        },
        entidades2: { type: 'array', items: { type: 'string' } },
      },
      required: ['entidad', 'plural', 'campos'],
    },
  },
  required: ['resumen', 'fundamentos', 'modelo'],
};

export const POST: APIRoute = async ({ request, cookies }) => {
  // Requiere sesión (la sección "define tu app" está detrás de login).
  const supabase = serverClient(request, cookies);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return json({ error: 'no-session' }, 401);

  if (!GEMINI_API_KEY) return json({ error: 'no-gemini-key' }, 503);

  const body = await request.json().catch(() => null);
  const nombre = typeof body?.nombre === 'string' ? body.nombre.trim().slice(0, 200) : 'Tu app';
  const funciones = Array.isArray(body?.funciones)
    ? body.funciones.filter((x: unknown) => typeof x === 'string' && x.trim()).slice(0, 60)
    : [];
  if (funciones.length === 0) return json({ error: 'sin-funciones' }, 400);

  const fundamentosDesc = FUNDAMENTOS.map((f) => `${f.id} — ${TEACHES[f.id]}`).join('\n');
  const prompt =
    `App: ${nombre || 'Tu app'}.\n\nFunciones que quiere:\n` +
    funciones.map((f: string) => `- ${f}`).join('\n') +
    `\n\nFundamentos del curso (id — qué enseña):\n${fundamentosDesc}\n\n` +
    'Para CADA uno de los 11 fundamentos, indica si aplica a esta app (aplica), explica en 1-2 frases ' +
    'cómo se usa EN ESTA app (como) y, cuando aplique, un ejemplo de código JavaScript muy corto adaptado ' +
    '(ejemplo). Los fundamentos entorno, funciones y objetos casi siempre aplican (son la base). ' +
    'Escribe un resumen motivador de 1-2 frases.\n\n' +
    'Además, extrae un MODELO ESTRUCTURADO de la app (campo "modelo") para poder generar código luego:\n' +
    '- entidad: la cosa principal que gestiona la app, en singular y PascalCase (Planta, Coche, Equipo).\n' +
    '- plural: su plural en minúscula (plantas, coches, equipos).\n' +
    '- campos: 3-5 propiedades de esa entidad. nombre en camelCase (nombre, especie, fechaRiego), tipo ' +
    'entre texto/numero/fecha/booleano, y un valor de ejemplo realista.\n' +
    '- acciones: 2-4 acciones principales como nombres de función en camelCase (regar, diasSinAgua).\n' +
    '- entidades2: otras entidades secundarias en PascalCase si las hay (Riego), o lista vacía.';

  const payload = {
    systemInstruction: { parts: [{ text: systemInstruction }] },
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.4,
      thinkingConfig: { thinkingBudget: 0 },
      responseMimeType: 'application/json',
      responseSchema,
    },
  };

  let result: unknown;
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );
    if (!res.ok) {
      const t = await res.text().catch(() => '');
      return json({ error: 'gemini-http', status: res.status, detail: t.slice(0, 300) }, 502);
    }
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return json({ error: 'gemini-empty' }, 502);
    result = JSON.parse(text);
  } catch (e) {
    return json({ error: 'gemini-fail', detail: String(e).slice(0, 200) }, 502);
  }

  // Persistir la definición (histórico) y fijar el PROYECTO ACTIVO del alumno
  // (1 fila por usuario) — es lo que personaliza los niveles.
  const modelo = (result as { modelo?: unknown }).modelo ?? {};
  await Promise.all([
    supabase
      .from('app_definitions')
      .insert({ user_id: user.id, nombre: nombre || 'Tu app', funciones, resultado: result as object })
      .then(() => {}, () => {}),
    supabase
      .from('proyecto')
      .upsert(
        { user_id: user.id, app: nombre || 'Tu app', funciones, modelo, updated_at: new Date().toISOString() },
        { onConflict: 'user_id' }
      )
      .then(() => {}, () => {}),
  ]);

  return json(result);
};
