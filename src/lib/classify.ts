/**
 * Clasificador "define tu app": desglosa las funciones que escribe una persona
 * en los fundamentos del curso. Módulo puro, sin dependencias, reutilizable en
 * la landing y en el onboarding del alumno.
 *
 * Base heurística por diccionario de palabras clave (offline, sin modelo).
 */
import { FUNDAMENTOS } from './course-data';

/** Rango de diacríticos combinantes (U+0300–U+036F). */
const DIACRITICS = /[̀-ͯ]/g;

/** minúsculas + sin acentos (NFD + strip de diacríticos combinantes). */
export const norm = (s: string): string =>
  s.toLowerCase().normalize('NFD').replace(DIACRITICS, '');

/**
 * Diccionario de palabras clave por fundamento. Solo los 8 fundamentos NO
 * estructurales reciben cláusulas; los estructurales (entorno, funciones,
 * objetos) forman parte de la base y se enseñan igual.
 * Match por substring salvo claves que acaban en espacio (p.ej. "si "), que
 * van por límite de palabra (\bpalabra\b).
 */
export const KEY: Record<string, string[]> = {
  datos: ['guardar', 'dato', 'nombre', 'fecha', 'precio', 'cantidad', 'numero', 'texto', 'registrar', 'ficha', 'campo', 'con su', 'apunta', 'anotar'],
  calculos: ['calcul', 'media', 'total', 'suma', 'sumar', 'porcentaje', '%', 'iva', 'cuanto', 'cuanta', 'coste', 'importe', 'restar', 'multiplic', 'divid', 'promedio', 'contar', 'cuentas', 'presupuest'],
  decisiones: ['avis', 'comprob', 'cuando', 'segun', 'alerta', 'recordar', 'recordatorio', 'detectar', 'valido', 'permit', 'bloquear', 'clasificar', 'estado', 'pendiente', 'listo', 'si '],
  repeticion: ['cada', 'todos', 'todas', 'recorrer', 'repasar', 'revisar', 'uno por uno', 'jornada', 'del dia'],
  colecciones: ['lista', 'catalogo', 'coleccion', 'conjunto', 'varios', 'varias', 'muchos', 'inventario', 'equipos', 'plantas', 'trabajos', 'productos'],
  pantalla: ['boton', 'tocar', 'mostrar', 'pantalla', 'formulario', 'pulsar', 'seleccionar', 'interfaz', 'toque', 'clic', 'pinchar', 'anadir', 'marcar', 'meter'],
  bd: ['guardar', 'base de datos', 'historic', 'historial', 'no se pierda', 'conservar', 'almacenar', 'persist', 'quede guardado', 'se guarde', 'registro'],
  consultas: ['panel', 'estadistic', 'grafic', 'evolucion', 'resumen', 'informe', 'ranking', 'clasificacion', 'mas vendid', 'goleador', 'filtrar', 'buscar', 'ordenar', 'tendencia', 'comparar', 'ver el', 'ver la', 'ver cuant', 'ver que', 'ingresos'],
};

/**
 * Un único split, sobre el texto ORIGINAL (conservando acentos y mayúsculas para
 * mostrarlo), por signos de puntuación y conectores. Se normaliza después, al
 * clasificar, evitando la desalineación de índices del prototipo.
 */
const SPLIT = /[,;.]|\s+y\s+|\s+e\s+|\s+adem[aá]s\s+|\s+tambi[eé]n\s+/i;

export function splitClauses(line: string): string[] {
  return line
    .split(SPLIT)
    .map((s) => s.trim())
    .filter((s) => s.length > 3);
}

function matchClause(normClause: string): string[] {
  const hits: string[] = [];
  for (const f in KEY) {
    for (const k of KEY[f]) {
      const hit = k.endsWith(' ')
        ? new RegExp('\\b' + k.trim() + '\\b').test(normClause)
        : normClause.includes(k);
      if (hit) {
        hits.push(f);
        break;
      }
    }
  }
  return hits;
}

export interface AnalyzeResult {
  /** fundamentoId -> cláusulas originales que lo tocan (sin duplicados). */
  byFund: Record<string, string[]>;
  /** número de cláusulas/ideas detectadas. */
  ideas: number;
  /** cláusulas que no encajaron en ningún fundamento. */
  sin: string[];
}

/** Analiza líneas de texto (una función por línea) y las reparte en fundamentos. */
export function analyze(lines: string[]): AnalyzeResult {
  const byFund: Record<string, string[]> = {};
  FUNDAMENTOS.forEach((f) => (byFund[f.id] = []));
  let ideas = 0;
  const sin: string[] = [];

  for (const line of lines) {
    for (const original of splitClauses(line)) {
      ideas++;
      const hits = matchClause(norm(original));
      if (hits.length === 0) {
        sin.push(original);
        continue;
      }
      for (const f of hits) {
        if (!byFund[f].some((x) => norm(x) === norm(original))) {
          byFund[f].push(original);
        }
      }
    }
  }
  return { byFund, ideas, sin };
}

/** Firma pura pedida en el brief: features -> {fundamentoId: cláusulas}. */
export function classify(features: string[]): Record<string, string[]> {
  return analyze(features).byFund;
}
