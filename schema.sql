-- ============================================================
-- Pinnacle Newspaper — Supabase Schema
-- Paste into Supabase → SQL Editor → New query → Run
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- AUTHORS
CREATE TABLE IF NOT EXISTS authors (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  title       TEXT NOT NULL,        -- "Professor of Political Economy"
  institution TEXT NOT NULL,        -- "University of Lagos"
  bio         TEXT,
  avatar_url  TEXT,
  expertise   TEXT[] DEFAULT '{}',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX ON authors(slug);

-- CATEGORIES
CREATE TABLE IF NOT EXISTS categories (
  id   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE
);
INSERT INTO categories(name, slug) VALUES
  ('Politics','politics'), ('Business','business'), ('Africa','africa'),
  ('Global','global'), ('Technology','technology'), ('Health','health'),
  ('Environment','environment'), ('Education','education'), ('Opinion','opinion')
ON CONFLICT DO NOTHING;

-- ARTICLES
DO $$ BEGIN
  CREATE TYPE article_status AS ENUM ('draft','published');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS articles (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title          TEXT NOT NULL,
  slug           TEXT NOT NULL UNIQUE,
  excerpt        TEXT NOT NULL,
  body           JSONB NOT NULL DEFAULT '{}',
  cover_image    TEXT,
  author_id      UUID NOT NULL REFERENCES authors(id) ON DELETE RESTRICT,
  category_id    UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  status         article_status NOT NULL DEFAULT 'draft',
  published_at   TIMESTAMPTZ,
  read_time_mins INT NOT NULL DEFAULT 5,
  disclosure     TEXT,
  is_breaking    BOOLEAN NOT NULL DEFAULT FALSE,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX ON articles(slug);
CREATE INDEX ON articles(status, published_at DESC);
CREATE INDEX ON articles(category_id);
CREATE INDEX ON articles(author_id);
CREATE INDEX ON articles(is_breaking) WHERE is_breaking = TRUE;
CREATE INDEX ON articles USING GIN(to_tsvector('english', title || ' ' || excerpt));

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS articles_updated_at ON articles;
CREATE TRIGGER articles_updated_at
  BEFORE UPDATE ON articles FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ROW LEVEL SECURITY
ALTER TABLE articles   ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors    ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Public reads published articles
DROP POLICY IF EXISTS "public read published" ON articles;
CREATE POLICY "public read published" ON articles FOR SELECT USING (status = 'published');

-- Service role (your SUPABASE_SERVICE_ROLE_KEY) can do everything
DROP POLICY IF EXISTS "service role all articles" ON articles;
CREATE POLICY "service role all articles" ON articles FOR ALL USING (auth.role() = 'service_role') WITH CHECK (TRUE);

DROP POLICY IF EXISTS "public read authors" ON authors;
CREATE POLICY "public read authors" ON authors FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "service role all authors" ON authors;
CREATE POLICY "service role all authors" ON authors FOR ALL USING (auth.role() = 'service_role') WITH CHECK (TRUE);

DROP POLICY IF EXISTS "public read categories" ON categories;
CREATE POLICY "public read categories" ON categories FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "service role all categories" ON categories;
CREATE POLICY "service role all categories" ON categories FOR ALL USING (auth.role() = 'service_role') WITH CHECK (TRUE);

-- ============================================================
-- STORAGE: go to Supabase Dashboard → Storage → New bucket
--   Name:  article-images
--   Public: ON
--   Max size: 5242880 (5MB)
--   Allowed MIME types: image/jpeg, image/png, image/webp, image/avif
-- ============================================================
