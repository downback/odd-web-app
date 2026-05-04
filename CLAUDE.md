# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
# Development
npm run dev          # Start Next.js dev server (localhost:3000)
npm run build        # Build for production
npm run lint         # Run ESLint

# Firebase Functions (run from /functions directory) - TO BE MIGRATED
cd functions
npm run build        # Compile TypeScript
npm run serve        # Build and start Firebase emulator
npm run deploy       # Deploy functions to Firebase
```

## Architecture Overview

This is an **Odd Office** company website built with Next.js 15 (App Router) + TailwindCSS 4.

### Frontend Structure (`/src`)

- **App Router**: Uses Next.js route groups for different layouts:
  - `(content)/` - Main pages (landing, projects, contact, consulting, aboutUs, updates) with shared Header/Footer via `Layout.tsx`
  - `(legal)/` - Legal pages (privacy, imprint) with minimal layout
  - `(admin)/` - Admin dashboard for content management

- **Context Providers** (`/context`):
  - `LanguageContext` - Korean/English i18n with JSON translations (`/locales/ko/ko.json`, `/locales/en/en.json`)
  - `ScrollTriggerContext` - Shared scroll trigger refs for GSAP animations
  - `ContextWrapper` - Combines all providers, used in content layout

- **Animation Stack**: GSAP with @gsap/react and flubber for SVG morphing (custom type definitions in `/types/flubber.d.ts`)

### Key Configuration

- **Path aliases**: `@/*` maps to `./src/*`
- **Fonts**: Nunito Sans (Latin) and Noto Sans KR (Korean) via next/font

---

## Firebase to Supabase Migration

### Current Firebase Usage Summary

| Service | Location | Usage |
|---------|----------|-------|
| **Firestore** | `src/app/(content)/updates/page.tsx` | Read `updates` collection (getDocs, orderBy, query) |
| **Firestore** | `src/app/(admin)/admin/_component/AdminBoard.tsx` | Read/Delete from `updates` collection |
| **Firestore** | `src/app/(admin)/admin/_component/AdminEditor.tsx` | Write to `updates` collection (addDoc, Timestamp) |
| **Storage** | `src/app/(content)/projects/_components/ProjectsList.tsx` | Fetch project images from `projects/project{n}/` folders |
| **Storage** | `src/app/(admin)/admin/_component/AdminEditor.tsx` | Upload images to `uploads/` folder |
| **Storage** | `src/app/(admin)/admin/_component/AdminBoard.tsx` | Delete images |
| **Auth** | `src/services/firebase-config.js` | Exported but currently unused |
| **Functions** | `functions/src/index.ts` | Express API `/send` endpoint for contact form emails |

### Files Requiring Migration

1. **`src/services/firebase-config.js`** → Replace with `supabase-config.ts`
   - Initialize Supabase client instead of Firebase app

2. **`src/app/(content)/updates/page.tsx`**
   - Replace Firestore queries with Supabase PostgreSQL queries
   - `collection(db, "updates")` → `supabase.from('updates').select()`

3. **`src/app/(admin)/admin/_component/AdminBoard.tsx`**
   - Replace Firestore getDocs/deleteDoc with Supabase queries
   - Replace Storage deleteObject with Supabase Storage remove

4. **`src/app/(admin)/admin/_component/AdminEditor.tsx`**
   - Replace Firestore addDoc with Supabase insert
   - Replace Storage uploadBytes with Supabase Storage upload

5. **`src/app/(content)/projects/_components/ProjectsList.tsx`**
   - Replace Storage listAll/getDownloadURL with Supabase Storage list/getPublicUrl

6. **`functions/src/index.ts`** → Migrate to Supabase Edge Functions or Next.js API Routes
   - Contact form email endpoint

7. **`next.config.ts`**
   - Update images.domains from `firebasestorage.googleapis.com` to Supabase storage domain

### Migration Mapping

| Firebase | Supabase Equivalent |
|----------|---------------------|
| `initializeApp(config)` | `createClient(url, anonKey)` |
| `getFirestore(app)` | `supabase` client (built-in) |
| `getStorage(app)` | `supabase.storage` |
| `getAuth(app)` | `supabase.auth` |
| `collection(db, 'x')` | `supabase.from('x')` |
| `getDocs(query)` | `.select()` |
| `addDoc(collection, data)` | `.insert(data)` |
| `deleteDoc(doc)` | `.delete().eq('id', id)` |
| `orderBy('field', 'desc')` | `.order('field', { ascending: false })` |
| `ref(storage, path)` | `supabase.storage.from('bucket')` |
| `uploadBytes(ref, file)` | `.upload(path, file)` |
| `getDownloadURL(ref)` | `.getPublicUrl(path)` |
| `listAll(ref)` | `.list(folder)` |
| `deleteObject(ref)` | `.remove([path])` |
| `Timestamp.now()` | `new Date().toISOString()` |

### Supabase Database Schema Required

```sql
-- updates table (replaces Firestore 'updates' collection)
CREATE TABLE updates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE updates ENABLE ROW LEVEL SECURITY;

-- Policy for public read access
CREATE POLICY "Allow public read" ON updates FOR SELECT USING (true);

-- Policy for authenticated insert/delete (for admin)
CREATE POLICY "Allow authenticated insert" ON updates FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON updates FOR DELETE USING (auth.role() = 'authenticated');
```

### Supabase Storage Buckets Required

1. **`projects`** - Public bucket for project images (organized in `project1/`, `project2/`, etc.)
2. **`uploads`** - Public bucket for update images

### Environment Variables (Supabase)

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key  # For server-side operations
```

### Dependencies to Update

```bash
# Remove Firebase
npm uninstall firebase

# Add Supabase
npm install @supabase/supabase-js

# For functions migration (if using Edge Functions)
# Use Supabase CLI: npx supabase functions new send-email
```

### Migration Order (Recommended)

1. Set up Supabase project and create storage buckets
2. Create database schema (updates table)
3. Migrate existing data from Firestore to Supabase
4. Create `src/services/supabase-config.ts`
5. Migrate Storage usage (projects images, uploads)
6. Migrate Firestore usage (updates CRUD)
7. Migrate Functions to Next.js API Routes or Supabase Edge Functions
8. Update `next.config.ts` image domains
9. Remove Firebase dependencies
