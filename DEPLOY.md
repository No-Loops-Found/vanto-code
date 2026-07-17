# Desplegar Vanto Code

Stack: **Astro** (adapter Vercel) + **Supabase** (Postgres + Auth) + **Vercel** (hosting).

## 0. Requisitos
- Cuenta en [Supabase](https://supabase.com) y en [Vercel](https://vercel.com) (ambas con capa gratuita).
- Repo en GitHub (recomendado para el deploy automático en cada commit).

## 1. Supabase
1. Crea un proyecto nuevo en Supabase. Apunta la contraseña de la base de datos.
2. En **SQL Editor**, pega y ejecuta el contenido de `supabase/migrations/0001_init.sql`. Crea las tablas `progreso`, `quiz_results`, `app_definitions` con RLS.
3. En **Project Settings → API**, copia:
   - `Project URL` → `PUBLIC_SUPABASE_URL`
   - `anon public` key → `PUBLIC_SUPABASE_ANON_KEY`
4. En **Authentication → Providers → Email**: para una demo sin fricción, desactiva *"Confirm email"* (así el registro entra directo). Si lo dejas activo, el registro pedirá confirmar por correo antes de entrar.
5. En **Authentication → URL Configuration**, añade tu dominio de Vercel a *Site URL* y *Redirect URLs* cuando lo tengas.

## 2. Local
```bash
cp .env.example .env   # y rellena las dos claves
npm install
npm run dev            # http://localhost:4321
```

## 3. Vercel
Opción A — CLI:
```bash
npx vercel            # login + link del proyecto
npx vercel env add PUBLIC_SUPABASE_URL       # pega la URL (Production, Preview, Development)
npx vercel env add PUBLIC_SUPABASE_ANON_KEY  # pega la anon key
npx vercel --prod     # despliegue de producción
```
Opción B — Dashboard: importa el repo de GitHub, framework detectado = Astro, añade las dos variables de entorno y despliega.

## 4. Comprobación end-to-end
- `/` landing: hero, motor comparativo, "define tu app" (desglosa una idea).
- `/nivel/0` … `/nivel/11`: lección, ejercicios, test rápido interactivo, FAQ.
- `/entrar`: crea una cuenta → redirige a `/cuenta`.
- En un nivel, pulsa "Marcar como superado" y responde el test → vuelve a `/cuenta` y comprueba el progreso guardado.

## Variables de entorno
| Variable | Dónde | Ejemplo |
|---|---|---|
| `PUBLIC_SUPABASE_URL` | Supabase → Settings → API | `https://xxxx.supabase.co` |
| `PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API | `eyJhbGciOi...` |
| `GEMINI_API_KEY` | Google AI Studio → API keys (secreto de servidor) | `AQ.Ab8...` |

> `GEMINI_API_KEY` potencia el "define tu app" con IA (endpoint `/api/desglose`). Si falta,
> la sección sigue funcionando con el clasificador heurístico local (degradación limpia).
> El modelo usado es `gemini-flash-latest` (capa gratuita).
