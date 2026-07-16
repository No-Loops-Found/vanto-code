# Vanto Code — Brief de proyecto (handoff a Claude Code)

> Documento de contexto para retomar y construir el proyecto real. Contiene el concepto,
> la identidad de marca con tokens exactos, la spec del curso, el motor de "define tu app",
> los prototipos ya entregados y el plan de construcción. Todo en español (idioma del producto).

---

## 1. Qué es

**Vanto Code** es una escuela de programación **por proyectos**. En lugar de aprender con
ejercicios de usar y tirar, cada persona **elige su propio proyecto** (algo que le resuelve un
problema real) y aprende a programar construyéndolo, de cero hasta publicarlo.

**Concepto pedagógico central (constante en todo el proyecto):**
> **Los fundamentos son fijos; tu proyecto es variable.**
> En cualquier curso de programación aprendes lo mismo por dentro (variables, condiciones,
> bucles, funciones, datos, base de datos…). Lo único que cambia aquí es **con qué** lo practicas:
> con tu app, no con la app del tiempo.

**Tagline:** *"Tu idea, hacia delante."*

**Origen:** el curso base nació de un encargo real (una entrenadora que quería una app para pasar
asistencia, poner notas 1–5 y clasificar faltas). Se usa como **ejemplo**, no como el eje del
marketing. El eje del marketing es "elige tu propio proyecto".

---

## 2. Posicionamiento / diferenciador

El mensaje de venta se construye **por contraste** con los cursos y tutoriales típicos:

- En otros cursos acabas haciendo **la app del tiempo**, **otro clon con la API de Pokémon**,
  **la lista de tareas nº 47** o **un conversor de monedas** → ejercicios que borras y no usarás jamás.
- Aquí eliges **tu proyecto** (huerto, taller, liga del barrio, lo que sea) y aprendes **lo mismo**,
  pero terminas con **algo que se usa**.

Tres pilares del "por qué es distinto":
1. **Eliges tu proyecto** — algo que te resuelve un problema real.
2. **Aprendes lo mismo que en cualquier curso** — los fundamentos no se tocan.
3. **Terminas con algo que se usa** — una app publicada, no un repo muerto.

**Importante:** de cara al alumno **NO se habla de "RAs"** (resultados de aprendizaje). Esa jerga
es interna. De cara al usuario se dice **"los fundamentos"**.

---

## 3. Identidad de marca

**Nombre:** Vanto (inventado, de *avante* = hacia delante). No significa nada en ningún idioma,
lo que lo hace fácil de registrar y "propio". **Descriptor:** `code` → se presenta como **Vanto Code**,
logotipo estilizado **`vanto·code`** (wordmark "vanto" + "code" en monoespaciada).

**Vibe:** techy + minimal + elegante (territorio Vercel/Linear). Casi monocromo + un solo acento.

### Paleta (tokens exactos)
```
--ink:      #16181D   /* tinta: texto y fondos oscuros, la base */
--ink-2:    #1E2027   /* superficies oscuras */
--ink-3:    #2A2D36   /* líneas sobre oscuro */
--indigo:   #4B49F0   /* ACENTO: acción y "lo que avanza". Solo donde toca */
--indigo-l: #7E7DF7   /* índigo claro (texto sobre tinta) */
--indigo-d: #3634C4   /* índigo para texto sobre fondo claro (enlaces, sellos) */
--paper:    #F2F3F6   /* niebla: fondo principal, frío y limpio */
--snow:     #FCFCFE   /* nieve: superficies/tarjetas */
--line:     #E0E1E8   /* líneas */
--line-d:   #D0D2DC   /* líneas más marcadas */
--muted:    #6B6E7A   /* gris de texto secundario */
--verde:    #23A55A   /* funcional (SOLO producto: acierto/superado) */
--rojo:     #E5484D   /* funcional (SOLO producto: error) */
```
Regla de color: casi todo tinta y niebla; el **índigo aparece solo en la acción** (botón, enlace,
segundo chevron). Verde y rojo son funcionales de producto, **no** de marca.

### Tipografía (Google Fonts, licencia libre)
- **Sora** (700/800) — titulares. Geométrica, serena, actual.
- **Inter** (400/500/600) — texto. La sans de producto por excelencia.
- **JetBrains Mono** (400/500/700) — código, etiquetas y el sello `code`.

### Símbolo / logo
Doble chevron **`»`** = avanzar / pasar de nivel / hacia delante (también "V" de Vanto y prompt de
código). Dos chevrones: el primero en tinta, el segundo en índigo (es "el que tira hacia delante").

SVG del símbolo (100×100, `stroke-width:11`, `round` caps/joins):
```html
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" stroke="#16181D" stroke-width="11" stroke-linecap="round" stroke-linejoin="round">
    <path d="M26 26 L50 50 L26 74"/>
  </g>
  <g fill="none" stroke="#4B49F0" stroke-width="11" stroke-linecap="round" stroke-linejoin="round">
    <path d="M50 26 L74 50 L50 74"/>
  </g>
</svg>
```
Variantes: sobre claro (tinta+índigo) · negativo sobre tinta (niebla+índigo) · sobre índigo (tinta+blanco).
Motivos gráficos: `»` como prefijo de "eyebrows"/secciones, `//` para comentarios de código.

### Voz (4 principios)
1. **De tú, siempre** (nada de "el usuario"/"el alumnado deberá").
2. **Claro antes que listo** (si hay que elegir entre sonar experto y que se entienda, se entiende).
3. **El error es parte del código** (fallar y arreglar es programar; se normaliza, no se asusta).
4. **Tu idea manda** (todo se explica al servicio de lo que la persona quiere construir).

### Familia de productos
`vanto·code · [destino]` — mismo método, distinto tipo de app:
- **vanto·code · Web** (curso base, disponible)
- **· Datos**, **· Móvil**, **· IA** (próximamente)

### Pendiente legal (lo hace el cliente, no está verificado)
Antes de publicar el nombre: comprobar **dominio** (vanto.dev / vantocode.com / vanto.school…) y que
la **marca** esté libre en **OEPM** (España) y **EUIPO** (UE) en **clase 41 (formación)**.

---

## 4. El curso (producto base: vanto·code · Web)

### Stack técnico (decidido, todo con capa gratuita y 100% en el navegador)
- **Editor + versionado:** GitHub + Codespaces (alternativa: StackBlitz, ideal en tablet).
- **Base de datos:** Supabase (Postgres con panel web).
- **Publicación:** Vercel (URL en un clic, redeploy en cada commit).
- **Lenguaje:** JavaScript (lo entiende el navegador → cero instalaciones).

### Los 11 fundamentos (esqueleto fijo — orden del curso)
De cara al alumno se llaman "fundamentos", nunca "RAs".

| Nº | id           | Fundamento                                | ¿estructural? |
|----|--------------|-------------------------------------------|---------------|
| 01 | entorno      | Entorno y primer programa                 | sí            |
| 02 | datos        | Guardar datos (variables y tipos)         | —             |
| 03 | calculos     | Hacer cálculos                            | —             |
| 04 | decisiones   | Tomar decisiones (condiciones)            | —             |
| 05 | repeticion   | Repetir sobre muchos (bucles)             | —             |
| 06 | funciones    | Acciones reutilizables (funciones)        | sí            |
| 07 | colecciones  | Listas y colecciones                      | —             |
| 08 | objetos      | Modelar cosas (objetos)                   | sí            |
| 09 | pantalla     | Interfaz y botones                        | —             |
| 10 | bd           | Guardar en base de datos                  | —             |
| 11 | consultas    | Consultas y estadística                   | —             |

("estructural" = se enseña siempre aunque el proyecto del alumno no lo pida explícitamente.)

### Los 12 niveles (la ruta)
| n  | Título                                        | Fundamento / hito | Herramienta            |
|----|-----------------------------------------------|-------------------|------------------------|
| 0  | Preparar el entorno y tu primer programa      | entorno           | GitHub · Codespaces    |
| 1  | Guardar datos: variables y tipos              | datos             | —                      |
| 2  | Hacer cálculos                                | calculos          | —                      |
| 3  | Tomar decisiones                              | decisiones        | —                      |
| 4  | Repetir sobre muchos elementos                | repeticion        | —                      |
| 5  | Acciones reutilizables: funciones             | funciones         | —                      |
| 6  | Listas y colecciones                          | colecciones       | —                      |
| 7  | Modelar cosas con objetos                     | objetos           | —                      |
| 8  | Interfaz y botones                            | pantalla          | —                      |
| 9  | Guardar en base de datos                      | bd                | Supabase               |
| 10 | Consultas y estadística                       | consultas         | Supabase               |
| 11 | Proyecto final: publicar tu app               | integración       | Vercel                 |

### Estructura de cada página de nivel
`intro` → `lección` (bloques: título + párrafos + código + notas) → `paso a paso` (solo niveles
que lo requieren, p.ej. Nivel 0) → `ejercicios` (con pista/solución opcional) → `errores típicos`
(Nivel 0) → `en resumen` (Nivel 0) → `test rápido` (interactivo) → `preguntas frecuentes` →
paginación anterior/siguiente + volver al curso.

**El Nivel 0 es el listón de profundidad** (es nivel 0: hay que explicarlo todo desde qué es
programar). Los niveles 1–11 existen pero con contenido base; falta ampliarlos a esa profundidad.

---

## 5. Motor "Define tu app" (spec del clasificador)

Objetivo: la persona escribe el nombre de su app y sus funciones (una por línea); el sistema
**desglosa cada idea en fundamentos** para dibujar su ruta. **No es secuencial**: una idea puede
tocar varios fundamentos y varios fundamentos pueden quedar vacíos.

### Algoritmo
1. **Normalizar** el texto: minúsculas + quitar acentos (`NFD` + strip diacríticos).
2. **Partir cada línea en cláusulas** por `,` `;` `.` y los conectores ` y `, ` e `, ` además `, ` también `.
3. **Clasificar cada cláusula** por diccionario de palabras clave (abajo). Una cláusula → 0..N fundamentos.
4. **Agregar**: `fundamento → [cláusulas que lo tocan]` (sin duplicados).
5. Cláusulas sin match → "sin clasificar" (se encajan a mano con la persona).
6. Los fundamentos estructurales sin match se muestran como "forma parte de la base"; los no
   estructurales sin match, como "no aparece en tus funciones — lo aprendes igual".

### Diccionario de palabras clave (por fundamento)
> Match por substring salvo claves que acaban en espacio (p.ej. `"si "`), que van por `\bpalabra\b`.
```js
const KEY = {
 datos:      ['guardar','dato','nombre','fecha','precio','cantidad','numero','texto','registrar','ficha','campo','con su','apunta','anotar'],
 calculos:   ['calcul','media','total','suma','sumar','porcentaje','%','iva','cuanto','cuanta','coste','importe','restar','multiplic','divid','promedio','contar','cuentas','presupuest'],
 decisiones: ['avis','comprob','cuando','segun','alerta','recordar','recordatorio','detectar','valido','permit','bloquear','clasificar','estado','pendiente','listo','si '],
 repeticion: ['cada','todos','todas','recorrer','repasar','revisar','uno por uno','jornada','del dia'],
 colecciones:['lista','catalogo','coleccion','conjunto','varios','varias','muchos','inventario','equipos','plantas','trabajos','productos'],
 pantalla:   ['boton','tocar','mostrar','pantalla','formulario','pulsar','seleccionar','interfaz','toque','clic','pinchar','anadir','marcar','meter'],
 bd:         ['guardar','base de datos','historic','historial','no se pierda','conservar','almacenar','persist','quede guardado','se guarde','registro'],
 consultas:  ['panel','estadistic','grafic','evolucion','resumen','informe','ranking','clasificacion','mas vendid','goleador','filtrar','buscar','ordenar','tendencia','comparar','ver el','ver la','ver cuant','ver que','ingresos'],
};
```
Ejemplo verificado: *"Guardar cada planta con su fecha de riego"* → **datos + repeticion + bd**
(una sola idea repartida en tres fundamentos). El clasificador es heurístico; para producción se
puede mejorar (lematización, sinónimos, o un modelo) pero esta base funciona offline sin dependencias.

Proyectos de ejemplo del "motor" (para el grid comparativo): **Mi huerto 🌱**, **El taller 🔧**,
**La liga del barrio ⚽**, más la columna **Tu app ✳** (alimentada por el clasificador).

---

## 6. Prototipos ya entregados (HTML autónomos)

Todos son archivos HTML independientes (sin build), con fuentes desde Google Fonts, el símbolo SVG
inline, y respetan `prefers-reduced-motion`. Sirven como **referencia visual y funcional**, no como
el código de producción final.

| Archivo                          | Qué es                                                                 | Estado |
|----------------------------------|-----------------------------------------------------------------------|--------|
| `vanto-code-manual-de-marca.html`| Manual de marca (logo, paleta, tipografía, voz, familia, aplicaciones) | Completo |
| `vanto-code-web.html`            | Landing del curso (hero de contraste, "por qué", método, herramientas, ruta, motor generalista, "define tu app" funcional, CTA) | Completo |
| `vanto-nivel.html`               | Sistema de página por nivel: `?n=0..11`. Nivel 0 en profundidad; 1–11 con contenido base | Nivel 0 completo; 1–11 base |

Enlaces internos: la landing enlaza cada módulo a `vanto-nivel.html?n=N`; la página de nivel vuelve
a `vanto-code-web.html#ruta`.

### Movimiento definido (para replicar en producción)
Barra de progreso de scroll; topbar que se asienta; reveals por IntersectionObserver (entran
subiendo/desde la izquierda = "avanzar"); contadores animados; **ruta cuyo hilo se rellena de índigo**
al bajar; hover micro-interacciones (la flecha `»` se desliza); rotador del hero que tacha proyectos
genéricos; motor con animación "remark" al cambiar de proyecto; símbolo que "entra avanzando".
Signature de marca: todo el movimiento va **hacia delante**.

---

## 7. Estado y pendientes

**Hecho:** identidad de marca completa · landing con posicionamiento definitivo · motor de desglose
funcional · arquitectura de páginas por nivel · Nivel 0 en profundidad real (modelo).

**Pendiente:**
1. **Ampliar los niveles 1–11** a la profundidad del Nivel 0 (lección detallada, paso a paso,
   ejercicios con solución, errores típicos, resumen). Es el mayor bloque de contenido.
2. **App de muestra real** (proyecto de ejemplo funcional, con esta piel) para enseñar a dónde llega el curso.
3. **Verificación de marca** (dominio + OEPM/EUIPO clase 41). Lo hace el cliente.
4. Posible **sistema de cuentas/progreso** del alumno (guardar avance, marcar niveles superados).

---

## 8. Recomendaciones para el build real (para Claude Code)

Los prototipos son HTML plano a propósito (rápidos de iterar). Para el producto real:

- **Framework sugerido:** Astro desplegado en **Vercel**.
- **Contenido de los niveles como datos** (MDX o JSON/colección), no hardcodeado en el markup, para
  poder ampliar los 12 niveles y, en el futuro, generar cursos de otras familias (Datos/Móvil/IA).
- **Design tokens** en CSS variables o Tailwind theme con los hex de arriba; Sora/Inter/JetBrains Mono.
- **Componentes clave a construir:** `Mark` (SVG chevron), `LevelPage` (plantilla de nivel),
  `Quiz` (test interactivo), `ProjectMotor` (grid comparativo fundamentos × proyecto),
  `AppDefiner` (el clasificador de la sección "define tu app").
- **El clasificador** puede vivir como módulo puro (`classify(features): Record<fundamentoId, string[]>`)
  reutilizable en la landing y, más adelante, en el onboarding del alumno.
- **Accesibilidad y movimiento:** mantener foco visible, responsive a móvil y `prefers-reduced-motion`.
- **Base de datos (cuando haya alumnos):** Supabase (mismo proveedor que se enseña).

### Orden de trabajo propuesto
1. Montar el esqueleto Next.js + tokens + componente `Mark` + tipografías.
2. Portar la **landing** (`vanto-code-web.html`) a componentes, con el `AppDefiner` y el `ProjectMotor`.
3. Portar la **plantilla de nivel** (`vanto-nivel.html`) con el contenido como datos MDX/JSON.
4. Escribir el **Nivel 0** (ya está el texto en el prototipo) y luego **ampliar 1–11**.
5. App de muestra + (más adelante) cuentas y progreso.

---

*Fin del brief. Fuente de verdad visual/funcional: los tres HTML entregados. Fuente de verdad del
concepto y la marca: este documento.*
