-- ============================================================
-- Vanto Code — inscripciones a cursos
-- Cada persona ve/gestiona solo sus propias inscripciones (RLS).
-- ============================================================

create table if not exists public.inscripciones (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  curso       text not null,
  created_at  timestamptz not null default now(),
  unique (user_id, curso)
);

alter table public.inscripciones enable row level security;

create policy "inscripciones: leer lo propio"
  on public.inscripciones for select
  using (auth.uid() = user_id);

create policy "inscripciones: insertar lo propio"
  on public.inscripciones for insert
  with check (auth.uid() = user_id);

create policy "inscripciones: borrar lo propio"
  on public.inscripciones for delete
  using (auth.uid() = user_id);
