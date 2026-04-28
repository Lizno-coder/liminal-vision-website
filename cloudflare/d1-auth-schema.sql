create table if not exists auth_users (
  id text primary key,
  email text not null unique,
  full_name text not null,
  company text,
  phone text,
  role text,
  website text,
  bio text,
  avatar_data_url text,
  password_hash text,
  email_verified_at text,
  verification_code_hash text,
  verification_code_expires_at text,
  verification_attempts integer not null default 0,
  created_at text not null default (datetime('now')),
  updated_at text not null default (datetime('now')),
  last_login_at text
);

create index if not exists auth_users_email_idx on auth_users(email);
