-- ============================================================
-- Vanto Code — proyecto activo del alumno
-- Guarda el modelo estructurado de su app (extraído 1 vez con IA).
-- Los niveles se personalizan por plantilla a partir de este modelo (sin más IA).
-- ============================================================

create table if not exists public.proyecto (
  user_id     uuid primary key references auth.users (id) on delete cascade,
  app         text not null,
  funciones   jsonb not null default '[]'::jsonb,
  modelo      jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now()
);

alter table public.proyecto enable row level security;

create policy "proyecto: leer lo propio"
  on public.proyecto for select
  using (auth.uid() = user_id);

create policy "proyecto: insertar lo propio"
  on public.proyecto for insert
  with check (auth.uid() = user_id);

create policy "proyecto: actualizar lo propio"
  on public.proyecto for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "proyecto: borrar lo propio"
  on public.proyecto for delete
  using (auth.uid() = user_id);
