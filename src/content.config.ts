import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const code = z.object({
  label: z.string(),
  text: z.string(),
});

const block = z.object({
  h: z.string().optional(),
  p: z.array(z.string()).optional(),
  code: code.optional(),
  note: z.string().optional(),
});

const step = z.object({ t: z.string(), p: z.string() });

const exercise = z.object({
  t: z.string(),
  hint: z.string().optional(),
  sol: z.string().optional(),
  reto: z.boolean().optional(),
});

const pitfall = z.object({ t: z.string(), p: z.string() });

const question = z.object({
  q: z.string(),
  o: z.array(z.string()),
  a: z.number().int().min(0), // índice 0-based de la opción correcta
});

const faq = z.object({ q: z.string(), a: z.string() });

/**
 * Colección de niveles. Schema superset (soporta la profundidad del Nivel 0).
 * Campos opcionales: tool, code2, steps, pitfalls, recap.
 */
const niveles = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/niveles' }),
  schema: z.object({
    n: z.number().int().min(0).max(11), // índice de ruta /nivel/[n]
    title: z.string(),
    sub: z.string(),
    tool: z.string().optional(),
    intro: z.string(),
    blocks: z.array(block),
    code2: code.optional(),
    steps: z.array(step).optional(),
    ex: z.array(exercise),
    pitfalls: z.array(pitfall).optional(),
    recap: z.array(z.string()).optional(),
    quiz: z.array(question),
    faq: z.array(faq),
  }),
});

export const collections = { niveles };
