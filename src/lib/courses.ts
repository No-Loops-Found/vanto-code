/**
 * Catálogo de cursos de la academia Vanto Code (modelo course-agnostic).
 * Hoy solo "Web" tiene contenido; el resto se anuncia como próximamente.
 * Añadir un curso = añadir una entrada aquí (+ su contenido/rutas cuando exista).
 */

export interface Curso {
  id: string; // identificador estable ('web', 'datos', …)
  destino: string; // "Web", "Datos", "Móvil", "IA"
  nombre: string; // wordmark: "vanto·code · Web"
  emoji: string;
  tagline: string; // frase corta de venta
  disponible: boolean; // ¿tiene contenido y se puede cursar?
  niveles?: number; // nº de niveles (si disponible)
  primerNivel?: number; // índice del primer nivel (ruta /nivel/[n])
}

export const CURSOS: Curso[] = [
  {
    id: 'web',
    destino: 'Web',
    nombre: 'vanto·code · Web',
    emoji: '🌐',
    tagline: 'Crea y publica tu primera app web con base de datos, desde cero.',
    disponible: true,
    niveles: 12,
    primerNivel: 0,
  },
  {
    id: 'datos',
    destino: 'Datos',
    nombre: 'vanto·code · Datos',
    emoji: '📊',
    tagline: 'Convierte datos en decisiones: consultas, análisis y paneles.',
    disponible: false,
  },
  {
    id: 'movil',
    destino: 'Móvil',
    nombre: 'vanto·code · Móvil',
    emoji: '📱',
    tagline: 'Lleva tu idea al bolsillo con una app para el móvil.',
    disponible: false,
  },
  {
    id: 'ia',
    destino: 'IA',
    nombre: 'vanto·code · IA',
    emoji: '✦',
    tagline: 'Añade inteligencia a tu proyecto con modelos de IA.',
    disponible: false,
  },
];

export const cursoById = (id: string): Curso | undefined => CURSOS.find((c) => c.id === id);

/** El curso disponible hoy (atajo para la ruta actual /nivel/[n]). */
export const CURSO_WEB = CURSOS[0];
