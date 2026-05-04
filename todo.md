
## immigration
- [ ] supabase setting
- [ ] page transition loaders

- [ ] remove firebase related files, code

10. **Remove Firebase Last**
11. **Verify End-to-End**

- [ ] favicon
- [ ] admin page update
- [ ] main page animation
- [ ] ui refine
- [ ] loaders refine


**Migration Plan**

1. **Set Up Supabase**
   - Create Supabase project.
   - Add env vars to `.env.local`:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - later, server-only: `SUPABASE_SERVICE_ROLE_KEY`
   - Keep Firebase running during this phase.

2. **Create Supabase Database Schema**
   Create an `updates` table:

   ```sql
   create table updates (
     id uuid primary key default gen_random_uuid(),
     title text not null,
     date date not null,
     description text not null,
     image_url text not null,
     image_path text,
     created_at timestamptz default now()
   );
   ```

   I recommend adding `image_path`; Firebase deletion currently extracts the path from URL, but Supabase deletion is cleaner if we store the storage path directly.

3. **Create Storage Buckets**
   - `updates`: for admin-uploaded update images
   - `projects`: for project gallery images

   Suggested paths:
   - `updates/1720000000000-image.jpg`
   - `projects/project1/image.jpg`
   - `projects/project2/image.jpg`

4. **Set Security Rules / RLS**
   - Public users can read `updates`.
   - Public users can read public storage images.
   - Only authenticated admin users can insert/delete update rows and upload/delete update images.
   - This means we should add Supabase Auth before enabling admin writes from the browser.

5. **Migrate Existing Data**
   - Export Firestore `updates`.
   - Copy fields into Supabase:
     - `title`
     - `date`
     - `description`
     - `imageUrl` → `image_url`
     - `createdAt` → `created_at`
   - Download Firebase Storage images and re-upload to Supabase Storage.
   - Update migrated `image_url` values to Supabase public URLs.

6. **Replace Firebase Client Code**
   Replace these files gradually:
   - [src/app/(content)/updates/page.tsx](/Volumes/Macintosh%20HD/Users/daeunpark/Documents/Work/OddOffice%20%7C%20SWM/odd-web-app/src/app/(content)/updates/page.tsx): Firestore read → `supabase.from("updates").select("*").order("date")`
   - [AdminEditor.tsx](/Volumes/Macintosh%20HD/Users/daeunpark/Documents/Work/OddOffice%20%7C%20SWM/odd-web-app/src/app/(admin)/admin/_component/AdminEditor.tsx): Firebase upload/addDoc → Supabase storage upload + database insert
   - [AdminBoard.tsx](/Volumes/Macintosh%20HD/Users/daeunpark/Documents/Work/OddOffice%20%7C%20SWM/odd-web-app/src/app/(admin)/admin/_component/AdminBoard.tsx): Firestore delete + Firebase storage delete → Supabase row delete + storage remove
   - [ProjectsList.tsx](/Volumes/Macintosh%20HD/Users/daeunpark/Documents/Work/OddOffice%20%7C%20SWM/odd-web-app/src/app/(content)/projects/_components/ProjectsList.tsx): Firebase `listAll/getDownloadURL` → Supabase `list/getPublicUrl`

7. **Add Admin Authentication**
   - Add Supabase login page or protect `/admin`.
   - Use Supabase email/password auth for the admin user.
   - Hide upload/delete UI unless authenticated.
   - This should happen before removing Firebase fully.

8. **Migrate Contact Email Server**
   Current contact form posts to Firebase Cloud Functions.

   Best practical option: move it to a Next.js route:
   - Create `src/app/api/send/route.ts`
   - Move nodemailer logic there
   - Change contact form fetch URL to `/api/send`

   Alternative if you want “server also Supabase”: create a Supabase Edge Function for email sending. Slightly more setup, but also valid.

9. **Update Config and Legal Text**
   - Replace Firebase image domain in [next.config.ts](/Volumes/Macintosh%20HD/Users/daeunpark/Documents/Work/OddOffice%20%7C%20SWM/odd-web-app/next.config.ts)
   - Update privacy policy text in English/Korean locale files.
   - Remove stale Firebase comments.

10. **Remove Firebase Last**
   Only after everything works:
   - Remove [firebase-config.js](/Volumes/Macintosh%20HD/Users/daeunpark/Documents/Work/OddOffice%20%7C%20SWM/odd-web-app/src/services/firebase-config.js)
   - Remove `firebase`, `firebase-tools`
   - Remove `functions/`, `firebase.json`, `firestore.indexes.json` if no longer needed
   - Run `npm install` to refresh lockfile


11. **Verify End-to-End**
   - `npm run build`
   - Admin login works
   - Upload update works
   - Delete update also deletes image
   - Updates page loads
   - Projects page loads gallery images
   - Contact form sends email
   - Privacy page no longer references Firebase

My recommended first implementation step: migrate the contact endpoint to a Next.js API route, then migrate `updates`, then migrate project storage, then add/admin-protect Supabase Auth. That keeps the risky data/storage pieces controlled instead of trying to flip the whole app in one jump.