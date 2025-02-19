-- Enable Row Level Security
alter table auth.users enable row level security;

-- Create user_profiles table
create table public.user_profiles (
  id uuid references auth.users on delete cascade primary key,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  
  -- Basic Info
  gender text,
  birth_date date,
  height numeric(5,2),
  weight numeric(5,2),
  
  -- Goals & Preferences
  goal_type text,
  target_weight numeric(5,2),
  goal_timeline text,
  workout_frequency integer,
  dietary_preference text,
  
  -- Experience & Obstacles
  has_tracking_experience boolean,
  obstacles text[],
  motivations text[],
  
  -- Marketing & Engagement
  discovery_source text,
  referral_code text,
  notifications_enabled boolean default false,
  trial_started_at timestamptz,
  
  constraint gender_values check (gender in ('male', 'female', 'other')),
  constraint goal_type_values check (goal_type in ('lose', 'maintain', 'gain')),
  constraint goal_timeline_values check (goal_timeline in ('slow', 'moderate', 'fast')),
  constraint workout_frequency_range check (workout_frequency between 0 and 7),
  constraint dietary_preference_values check (dietary_preference in ('classic', 'pescatarian', 'vegetarian', 'vegan'))
);

-- Create RLS policies
create policy "Users can view own profile"
  on public.user_profiles for select
  using ( auth.uid() = id );

create policy "Users can update own profile"
  on public.user_profiles for update
  using ( auth.uid() = id );

create policy "Users can insert own profile"
  on public.user_profiles for insert
  with check ( auth.uid() = id );

-- Create function to handle profile updates
create or replace function public.handle_profile_update()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for updated_at
create trigger on_profile_update
  before update on public.user_profiles
  for each row
  execute procedure public.handle_profile_update();

-- Create function to automatically create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_profiles (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute procedure public.handle_new_user(); 