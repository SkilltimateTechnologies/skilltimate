CREATE TABLE IF NOT EXISTS user (
  id text PRIMARY KEY NOT NULL,
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  email_verified integer NOT NULL DEFAULT 0,
  image text,
  created_at integer NOT NULL,
  updated_at integer NOT NULL
);
CREATE TABLE IF NOT EXISTS session (
  id text PRIMARY KEY NOT NULL,
  expires_at integer NOT NULL,
  token text NOT NULL UNIQUE,
  created_at integer NOT NULL,
  updated_at integer NOT NULL,
  ip_address text,
  user_agent text,
  user_id text NOT NULL REFERENCES user(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS account (
  id text PRIMARY KEY NOT NULL,
  account_id text NOT NULL,
  provider_id text NOT NULL,
  user_id text NOT NULL REFERENCES user(id) ON DELETE CASCADE,
  access_token text,
  refresh_token text,
  id_token text,
  access_token_expires_at integer,
  refresh_token_expires_at integer,
  scope text,
  password text,
  created_at integer NOT NULL,
  updated_at integer NOT NULL
);
CREATE TABLE IF NOT EXISTS verification (
  id text PRIMARY KEY NOT NULL,
  identifier text NOT NULL,
  value text NOT NULL,
  expires_at integer NOT NULL,
  created_at integer,
  updated_at integer
);
CREATE TABLE IF NOT EXISTS leads (
  id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  name text,
  email text,
  phone text,
  course text,
  message text,
  source text NOT NULL DEFAULT 'contact',
  status text NOT NULL DEFAULT 'new',
  notes text,
  created_at integer NOT NULL
);
CREATE TABLE IF NOT EXISTS site_settings (
  id integer PRIMARY KEY,
  currency text NOT NULL DEFAULT '₹',
  original_price integer NOT NULL DEFAULT 3691,
  discount_percent integer NOT NULL DEFAULT 15,
  gst_percent integer NOT NULL DEFAULT 18,
  offer_enabled integer NOT NULL DEFAULT 1,
  offer_hours integer NOT NULL DEFAULT 48,
  updated_at integer NOT NULL DEFAULT 0
);
