# Pinnacle Newspaper — Deployment Guide

## Stack
- Next.js 15 + React 19 + Tailwind v4
- Supabase (Postgres + Storage)
- Hostinger Node.js Web Apps
- Cookie-based admin auth

---

## Step 1 — Supabase setup (15 minutes)

1. Create a free project at **supabase.com**
2. Go to **SQL Editor → New query**
3. Paste the entire contents of `schema.sql` and click **Run**
4. Go to **Storage → New bucket**
   - Name: `article-images`
   - Public: **ON**
   - Max file size: `5242880` (5 MB)
   - Allowed MIME types: `image/jpeg, image/png, image/webp, image/avif`
5. Go to **Settings → API** and copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY`

---

## Step 2 — Push to GitHub

```bash
cd pinnacle
git init
git add .
git commit -m "Initial commit — Pinnacle Newspaper"
git remote add origin https://github.com/YOUR_USERNAME/pinnacle-newspaper.git
git push -u origin main
```

---

## Step 3 — Deploy on Hostinger

1. Log in to **hPanel → Websites → Add Website**
2. Choose **Node.js Apps**
3. Choose **Import Git Repository**
4. Authorize GitHub and select your repo
5. Hostinger auto-detects Next.js. Confirm these settings:
   - Build command: `npm run build`
   - Start command: `npm run start`
   - Node.js version: **20 LTS**
6. Add environment variables (one by one in the Hostinger panel):
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   SUPABASE_SERVICE_ROLE_KEY
   NEXT_PUBLIC_SITE_URL        ← your actual domain e.g. https://pinnaclenewspaper.com
   ADMIN_SECRET                ← run: openssl rand -base64 24
   ```
7. Click **Deploy**
8. In Hostinger DNS, point your domain's A record to the Hostinger IP shown

---

## Step 4 — First login

1. Go to `yourdomain.com/admin/login`
2. Enter your `ADMIN_SECRET` password
3. Go to `/admin/authors` and create at least one author
4. Go to `/admin/new` and write your first article

---

## Redeploying after changes

With Hostinger Node.js Web Apps, every push to your main branch auto-redeploys.
With VPS, run on the server:
```bash
cd ~/pinnacle
git pull origin main
npm install
npm run build
pm2 restart pinnacle
```

---

## Adding more shadcn components

The `components.json` is configured. Run from inside the `pinnacle` folder:
```bash
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add table
npx shadcn@latest add select
```

---

## Post-launch checklist

- [ ] DNS propagated — check at dnschecker.org
- [ ] HTTPS working — padlock shows in browser
- [ ] `/sitemap.xml` loads with your articles
- [ ] `/api/og?title=Test` returns a 1200×630 image
- [ ] Admin login works at `/admin/login`
- [ ] Can create author, write and publish article end to end
- [ ] Article page shows disclosure + republish CTA
- [ ] Submit site to Google Search Console → add sitemap URL
