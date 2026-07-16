/**
 * Datos compartidos del curso Vanto Code.
 * Reutilizados por la landing (motor comparativo + define tu app) y el onboarding.
 */

export interface Fundamento {
  id: string;
  n: string; // "01".."11"
  name: string;
  struct?: boolean; // se enseña siempre, aunque el proyecto no lo pida
}

/** Los 11 fundamentos, en el orden del curso. El índice coincide con feats[] de PROJECTS. */
export const FUNDAMENTOS: Fundamento[] = [
  { id: 'entorno', n: '01', name: 'Entorno y primer programa', struct: true },
  { id: 'datos', n: '02', name: 'Guardar datos' },
  { id: 'calculos', n: '03', name: 'Hacer cálculos' },
  { id: 'decisiones', n: '04', name: 'Tomar decisiones' },
  { id: 'repeticion', n: '05', name: 'Repetir sobre muchos' },
  { id: 'funciones', n: '06', name: 'Acciones reutilizables', struct: true },
  { id: 'colecciones', n: '07', name: 'Listas y colecciones' },
  { id: 'objetos', n: '08', name: 'Modelar cosas', struct: true },
  { id: 'pantalla', n: '09', name: 'Interfaz y botones' },
  { id: 'bd', n: '10', name: 'Guardar en base de datos' },
  { id: 'consultas', n: '11', name: 'Consultas y estadística' },
];

export interface Project {
  label: string;
  em: string;
  head: string;
  /** 11 entradas alineadas posicionalmente con FUNDAMENTOS; null para "tu app". */
  feats: string[] | null;
}

export const PROJECTS: Record<string, Project> = {
  huerto: {
    label: 'Mi huerto',
    em: '🌱',
    head: 'App para cuidar tu huerto',
    feats: [
      'Creas el repo y programas desde el navegador.',
      'Cada planta con su nombre, especie y fecha de riego.',
      'Cuántos días lleva sin regar cada planta.',
      'Avisar si una planta necesita agua ya.',
      'Repasar todas las plantas del huerto de una vez.',
      'regar() y diasSinAgua() reutilizables.',
      'El huerto como lista de plantas.',
      'Clases Planta y Riego.',
      'Marcar “regada hoy” con un toque.',
      'Tablas plantas / riegos en Supabase.',
      'Qué plantas necesitan atención y su histórico.',
    ],
  },
  taller: {
    label: 'El taller',
    em: '🔧',
    head: 'App para un taller mecánico',
    feats: [
      'Creas el repo y lo abres en el navegador.',
      'Cada coche con matrícula, cliente y avería.',
      'Coste total de una reparación con IVA.',
      '¿La reparación está lista o pendiente?',
      'Recorrer todos los trabajos del día.',
      'presupuestar() y marcarEntregado() reutilizables.',
      'Los trabajos como lista de reparaciones.',
      'Clases Coche, Reparación y Cliente.',
      'Cambiar el estado con un botón.',
      'Tablas coches / reparaciones en Supabase.',
      'Reparaciones del mes e ingresos, con consultas.',
    ],
  },
  liga: {
    label: 'La liga del barrio',
    em: '⚽',
    head: 'App para una liga amateur',
    feats: [
      'Creas el repo y programas desde el navegador.',
      'Cada equipo con nombre, puntos y partidos.',
      'Calcular la clasificación por puntos.',
      '¿El partido está jugado o pendiente?',
      'Recorrer todos los partidos de la jornada.',
      'registrarResultado() y clasificacion() reutilizables.',
      'La liga como lista de equipos.',
      'Clases Equipo, Partido y Jornada.',
      'Meter el resultado desde un formulario.',
      'Tablas equipos / partidos en Supabase.',
      'Tabla de clasificación y goleadores, con consultas.',
    ],
  },
  tuapp: {
    label: 'Tu app',
    em: '✳',
    head: 'Tu proyecto',
    feats: null,
  },
};

export interface Module {
  n: number; // índice 0..11 = parámetro de ruta
  label: string; // etiqueta corta mostrada ("00".."10", "★")
  title: string;
  tool?: string;
}

/** Los 12 niveles de la ruta. `n` es el índice de la ruta /nivel/[n]. */
export const MODULES: Module[] = [
  { n: 0, label: '00', title: 'Preparar el entorno y tu primer programa', tool: 'GitHub · Codespaces' },
  { n: 1, label: '01', title: 'Guardar datos: variables y tipos' },
  { n: 2, label: '02', title: 'Hacer cálculos' },
  { n: 3, label: '03', title: 'Tomar decisiones' },
  { n: 4, label: '04', title: 'Repetir sobre muchos elementos' },
  { n: 5, label: '05', title: 'Acciones reutilizables: funciones' },
  { n: 6, label: '06', title: 'Listas y colecciones' },
  { n: 7, label: '07', title: 'Modelar cosas con objetos' },
  { n: 8, label: '08', title: 'Interfaz y botones' },
  { n: 9, label: '09', title: 'Guardar en base de datos', tool: 'Supabase' },
  { n: 10, label: '10', title: 'Consultas y estadística', tool: 'Supabase' },
  { n: 11, label: '★', title: 'Proyecto final: publicar tu app', tool: 'Vercel' },
];

export const TOTAL_NIVELES = MODULES.length; // 12
