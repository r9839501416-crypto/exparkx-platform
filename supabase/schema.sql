create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'Founder' check (role in ('Founder', 'Investor')),
  current_phase int check (current_phase between 1 and 4),
  onboarding_completed boolean not null default false,
  idea_summary text,
  industry text,
  stage text,
  founder_type text,
  founder_role text,
  time_commitment text,
  priority text,
  location text,
  open_to_team boolean default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ideas (
  id uuid primary key default gen_random_uuid(),
  founder_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  one_liner text,
  problem text,
  target_user text,
  proposed_solution text,
  market text,
  industry text,
  stage text,
  ask_size text,
  location text,
  visible_to_investors boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.validation_reports (
  id uuid primary key default gen_random_uuid(),
  founder_id uuid not null references public.profiles(id) on delete cascade,
  idea_id uuid references public.ideas(id) on delete set null,
  problem text,
  target_user text,
  solution text,
  market text,
  overall_score int not null check (overall_score between 0 and 100),
  strengths text[] not null default '{}',
  risks text[] not null default '{}',
  next_actions text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.milestones (
  id uuid primary key default gen_random_uuid(),
  founder_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  phase int not null check (phase between 1 and 4),
  status text not null default 'not_started' check (status in ('not_started', 'in_progress', 'done')),
  proof_note text,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.pitches (
  id uuid primary key default gen_random_uuid(),
  founder_id uuid not null references public.profiles(id) on delete cascade,
  script text,
  media_url text,
  score int check (score between 0 and 100),
  feedback jsonb default '{}'::jsonb,
  visible_to_investors boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  founder_id uuid not null references public.profiles(id) on delete cascade,
  group_name text,
  body text not null,
  role_needed text,
  created_at timestamptz not null default now()
);

create table if not exists public.connections (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid not null references public.profiles(id) on delete cascade,
  recipient_id uuid not null references public.profiles(id) on delete cascade,
  role_context text,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'declined')),
  created_at timestamptz not null default now(),
  unique (requester_id, recipient_id)
);

create table if not exists public.investor_interests (
  id uuid primary key default gen_random_uuid(),
  investor_id uuid not null references public.profiles(id) on delete cascade,
  idea_id uuid not null references public.ideas(id) on delete cascade,
  stage text not null default 'review' check (stage in ('review', 'questions', 'interested', 'term_sheet', 'connected')),
  diligence_questions jsonb default '[]'::jsonb,
  created_at timestamptz not null default now(),
  unique (investor_id, idea_id)
);

create table if not exists public.marketing_assets (
  id uuid primary key default gen_random_uuid(),
  founder_id uuid not null references public.profiles(id) on delete cascade,
  idea_id uuid references public.ideas(id) on delete set null,
  channel text not null,
  content text not null,
  copied_at timestamptz,
  campaign_started boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.ideas enable row level security;
alter table public.validation_reports enable row level security;
alter table public.milestones enable row level security;
alter table public.pitches enable row level security;
alter table public.community_posts enable row level security;
alter table public.connections enable row level security;
alter table public.investor_interests enable row level security;
alter table public.marketing_assets enable row level security;

create policy "profiles owner read" on public.profiles for select using (auth.uid() = id);
create policy "profiles owner write" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "founder profile directory" on public.profiles for select using (role = 'Founder' and onboarding_completed = true);

create policy "ideas founder access" on public.ideas for all using (auth.uid() = founder_id) with check (auth.uid() = founder_id);
create policy "investors read visible ideas" on public.ideas for select using (
  visible_to_investors = true
  and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'Investor')
);

create policy "validation owner access" on public.validation_reports for all using (auth.uid() = founder_id) with check (auth.uid() = founder_id);
create policy "milestone owner access" on public.milestones for all using (auth.uid() = founder_id) with check (auth.uid() = founder_id);
create policy "pitch owner access" on public.pitches for all using (auth.uid() = founder_id) with check (auth.uid() = founder_id);
create policy "investors read visible pitches" on public.pitches for select using (
  visible_to_investors = true
  and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'Investor')
);

create policy "community visible to founders" on public.community_posts for select using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'Founder')
);
create policy "community owner write" on public.community_posts for all using (auth.uid() = founder_id) with check (auth.uid() = founder_id);

create policy "connections participant read" on public.connections for select using (auth.uid() in (requester_id, recipient_id));
create policy "connections requester insert" on public.connections for insert with check (auth.uid() = requester_id);
create policy "connections participant update" on public.connections for update using (auth.uid() in (requester_id, recipient_id));

create policy "investor interests owner access" on public.investor_interests for all using (auth.uid() = investor_id) with check (auth.uid() = investor_id);
create policy "marketing owner access" on public.marketing_assets for all using (auth.uid() = founder_id) with check (auth.uid() = founder_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'full_name'),
    coalesce(new.raw_user_meta_data->>'role', 'Founder')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
