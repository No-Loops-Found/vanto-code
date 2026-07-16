-- ============================================================
-- Vanto Code — esquema inicial
-- Tablas: progreso del alumno, resultados de tests, definiciones de app.
-- Seguridad: RLS activado; cada persona solo ve/escribe lo suyo.
-- ============================================================

-- ---------- Progreso por nivel ----------
create table if not exists public.progreso (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  nivel       smallint not null check (nivel between 0 and 11),
  superado    boolean not null default true,
  updated_at  timestamptz not null default now(),
  unique (user_id, nivel)
);

alter table public.progreso enable row level security;

create policy "progreso: leer lo propio"
  on public.progreso for select
  using (auth.uid() = user_id);

create policy "progreso: insertar lo propio"
  on public.progreso for insert
  with check (auth.uid() = user_id);

create policy "progreso: actualizar lo propio"
  on public.progreso for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "progreso: borrar lo propio"
  on public.progreso for delete
  using (auth.uid() = user_id);

-- ---------- Resultados de tests rápidos ----------
create table if not exists public.quiz_results (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  nivel       smallint not null check (nivel between 0 and 11),
  aciertos    smallint not null check (aciertos >= 0),
  total       smallint not null check (total > 0),
  created_at  timestamptz not null default now()
);

alter table public.quiz_results enable row level security;

create policy "quiz: leer lo propio"
  on public.quiz_results for select
  using (auth.uid() = user_id);

create policy "quiz: insertar lo propio"
  on public.quiz_results for insert
  with check (auth.uid() = user_id);

create index if not exists quiz_results_user_nivel_idx
  on public.quiz_results (user_id, nivel);

-- ---------- Definiciones de "define tu app" (leads/onboarding) ----------
-- user_id puede ser NULL (persona no logueada en la landing).
create table if not exists public.app_definitions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users (id) on delete set null,
  nombre      text not null,
  funciones   jsonb not null default '[]'::jsonb,
  resultado   jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now()
);

alter table public.app_definitions enable row level security;

-- Insertar permitido a cualquiera (anónimo o logueado), pero sin poder
-- atribuir la fila a OTRO usuario: user_id debe ser NULL o el propio.
create policy "defs: insertar (anon o propio)"
  on public.app_definitions for insert
  with check (user_id is null or auth.uid() = user_id);

-- Leer: solo el dueño (las anónimas quedan para analítica del proyecto vía service role).
create policy "defs: leer lo propio"
  on public.app_definitions for select
  using (auth.uid() = user_id);
