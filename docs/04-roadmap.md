# My Corner — Roadmap

> Struktur: **Milestone → Epic → Task**. Tiap task punya Description + Acceptance Criteria, format checklist biar bisa langsung dicentang. Kalau nanti dipindah ke GitHub Projects/Issues, tiap Task di sini = 1 Issue, tiap Epic = 1 label/milestone group.

---

## Milestone 0 — Foundation Setup

### Epic: Project Scaffolding

**Task: Init project Astro**
- Description: Setup project Astro baru, konfigurasi dasar, integrasi Tailwind.
- Acceptance Criteria:
  - [ x ] `astro build` jalan tanpa error
  - [ x ] Tailwind terpasang dan bisa dipakai di komponen
  - [ x ] Repo GitHub dibuat, `.gitignore` sesuai (node_modules, dist, dll)

**Task: Setup deployment ke Cloudflare Pages**
- Description: Sambungkan repo ke Cloudflare Pages, pastikan auto-deploy jalan tiap push.
- Acceptance Criteria:
  - [ x ] Push ke branch utama trigger build otomatis
  - [ x ] Site bisa diakses lewat URL `*.pages.dev`
  - [ x ] Build command & output directory sudah benar di setting Cloudflare

### Epic: Content Model Setup

**Task: Definisikan Content Collections schema**
- Description: Bikin Zod schema untuk collection `projects`, `modules`, `glossary`, `certifications` sesuai TDD §4.
- Acceptance Criteria:
  - [ x ] `src/content/config.ts` berisi 4 schema di atas
  - [ x ] Field wajib vs opsional sudah sesuai dokumen TDD
  - [ x ] Astro gak error saat build walau collection masih kosong

**Task: Buat dummy entry tiap collection**
- Description: Isi 1 contoh entry per collection buat testing schema & rendering.
- Acceptance Criteria:
  - [ x ] Minimal 1 file `.mdx` di tiap collection, ke-render tanpa error
  - [ x ] Frontmatter dummy sudah lolos validasi Zod

---

## Milestone 1 — Core Content Engine + Flat Theme (Recruiter MVP)

### Epic: Theme System Foundation

**Task: Bangun token CSS variable dasar (Flat Design)**
- Description: Implementasi file `flat.css` sesuai token wajib di Standards & Style Guide §3.
- Acceptance Criteria:
  - [ x ] Semua token wajib terisi
  - [ x ] `data-theme="flat"` di root mengubah tampilan sesuai token
  - [ x ] Jadi default theme saat pertama kali load

**Task: Bangun mekanisme theme switcher**
- Description: Komponen island buat switch tema, simpan pilihan di `theme-store.ts` + localStorage.
- Acceptance Criteria:
  - [ x ] Ganti tema gak reload halaman
  - [ x ] Pilihan tema persist setelah refresh
  - [ x ] State tema bisa dibaca komponen lain (buat locking di recruiter path)

### Epic: Recruiter Landing

**Task: Hero landing "What are you?"**
- Description: Halaman `/` dengan pertanyaan hero dan 3 tombol persona.
- Acceptance Criteria:
  - [ x ] 3 tombol persona tampil dan bisa diklik
  - [ x ] Klik tombol nge-set persona state dan redirect ke path yang sesuai

**Task: Halaman utama recruiter**
- Description: Susun halaman `/recruiter` — foto, intro singkat, pendidikan ringkas + View More, 3 project teratas + View More, 3 cert teratas + View More, contact.
- Acceptance Criteria:
  - [ x ] Semua section tampil sesuai urutan di PRD §6
  - [ x ] "3 teratas" difilter otomatis dari field `featured`/`rank`
  - [ x ] Tombol View More mengarah ke halaman list lengkap

**Task: Nav khusus recruiter**
- Description: Nav bar cuma tampilkan Educations, Projects, Certifications saat persona = recruiter.
- Acceptance Criteria:
  - [ x ] Nav item lain (Modules, Glossarium) gak muncul di path ini
  - [ x ] Nav tetap konsisten di semua sub-halaman recruiter

### Epic: Content Rendering Engine

**Task: Pipeline render MDX (heading, paragraf)**
- Description: Pastikan heading, paragraf, list, dst ter-render clean dengan font yang nyaman baca.
- Acceptance Criteria:
  - [ ] Hierarki heading rapi (lihat Style Guide §2)
  - [ ] Font body & heading sesuai token tema aktif

**Task: Math rendering (KaTeX)**
- Description: Integrasi remark-math + rehype-katex.
- Acceptance Criteria:
  - [ ] Inline math (`$...$`) render benar
  - [ ] Block math (`$$...$$`) render benar
  - [ ] Gak ada error console saat ada rumus kompleks (pecahan, integral, dll)

**Task: Embed data viz interaktif**
- Description: Komponen `PlotlyChart` yang baca file JSON hasil export Python.
- Acceptance Criteria:
  - [ ] Chart tampil dari file JSON statis
  - [ ] Hover nunjukin detail data point
  - [ ] Klik (kalau ada legend/filter) berfungsi tanpa perlu backend

---

## Milestone 2 — Student Path (Modules + Glossarium)

### Epic: Module Dashboard

**Task: UI grouping subject x level**
- Description: Dashboard `/student` menampilkan modul dikelompokkan per subject dan level.
- Acceptance Criteria:
  - [ ] Grouping tampil sesuai field `subject` dan `level`
  - [ ] Gampang nambah kategori subject baru tanpa ubah kode (data-driven dari isi collection)

**Task: Halaman detail modul**
- Description: Reuse rendering engine dari Milestone 1, tambah bagian khusus modul.
- Acceptance Criteria:
  - [ ] Konten modul render sama bagusnya dengan project
  - [ ] Nav modul (Modules, Glossarium) muncul benar di persona student

### Epic: Glossarium

**Task: Halaman list & detail glossary**
- Description: `/glossary` list semua term, `/glossary/[term]` detail definisi.
- Acceptance Criteria:
  - [ ] Semua entry collection `glossary` muncul di list
  - [ ] Halaman detail nampilin definisi + (kalau ada) backlink ke modul yang menyebutnya

**Task: Remark plugin auto-link istilah**
- Description: Plugin custom yang scan teks MDX, cocokkan ke daftar glossary, auto-link.
- Acceptance Criteria:
  - [ ] Istilah yang cocok otomatis jadi link ke `/glossary/[term]`
  - [ ] Alias/variasi penulisan (field `aliases`) ikut ke-detect
  - [ ] Satu istilah cuma di-link sekali per halaman (gak spam link tiap kemunculan)

---

## Milestone 3 — Persona Morph + "Don't Mind Me"

### Epic: Morph State Engine

**Task: Persistensi persona state**
- Description: `persona-store.ts` (nanostores) + localStorage biar pilihan persona nempel antar sesi.
- Acceptance Criteria:
  - [ ] Refresh halaman gak reset pilihan persona
  - [ ] Ada cara buat user reset/ganti persona (misal tombol di nav)

**Task: Conditional nav rendering**
- Description: Nav bar baca persona state dan render item sesuai tabel di PRD §5.
- Acceptance Criteria:
  - [ ] 3 kombinasi nav (recruiter/student/explore) sudah benar sesuai spec
  - [ ] Gak ada flicker nav salah sebelum state ke-load

### Epic: Don't Mind Me Path

**Task: Halaman full-access tanpa bio**
- Description: `/explore` — semua konten kebuka, tapi section pendidikan & intro personal disembunyikan.
- Acceptance Criteria:
  - [ ] Semua project & module bisa diakses dari sini
  - [ ] Section Educations & bio personal tidak muncul di nav maupun konten

---

## Milestone 4 — Multi-theme Expansion

### Epic: Tema Tambahan

**Task: Implementasi tema Bento Grid**
- Description: Token + layout khusus buat opsi tema recruiter.
- Acceptance Criteria:
  - [ ] Semua token wajib terisi
  - [ ] Kontras lolos standar AA (Style Guide §5)

**Task: Implementasi tema Glassmorphism**
- Description: sda, dengan efek blur/transparansi.
- Acceptance Criteria:
  - [ ] Semua token wajib terisi
  - [ ] Kontras teks di atas efek glass tetap lolos AA

**Task: Implementasi tema Skeuomorphism**
- Acceptance Criteria:
  - [ ] Semua token wajib terisi
  - [ ] Konsisten di semua halaman, gak cuma landing

**Task: Implementasi tema Neo Brutalism**
- Acceptance Criteria:
  - [ ] Semua token wajib terisi
  - [ ] Border/shadow khas brutalism konsisten di semua komponen

**Task: Implementasi tema Cyberpunk**
- Acceptance Criteria:
  - [ ] Semua token wajib terisi
  - [ ] Kontras teks neon-on-dark tetap lolos AA

### Epic: Theme Switcher UX

**Task: UI picker tema di pojok**
- Description: Dropdown/selector kecil buat ganti tema manual.
- Acceptance Criteria:
  - [ ] Semua tema yang sudah jadi muncul di list
  - [ ] Nambah tema baru otomatis muncul di picker tanpa ubah komponen picker

**Task: Handle theme-lock di recruiter path**
- Description: Pastikan lock/unlock tema di path recruiter berfungsi sesuai PRD §5.
- Acceptance Criteria:
  - [ ] Default recruiter = Flat Design, terkunci
  - [ ] User tetap bisa override manual ke Bento Grid via picker pojok

---

## Milestone 5 — Internationalization (ID/EN)

### Epic: Dictionary Setup

**Task: Extract semua string UI ke dictionary**
- Description: Pindahin semua teks hardcoded (nav, tombol, label) ke `id.json`/`en.json`.
- Acceptance Criteria:
  - [ ] Gak ada teks UI yang hardcoded di komponen
  - [ ] Key dictionary konsisten antara file ID dan EN

**Task: Language switcher**
- Description: Komponen kecil buat ganti bahasa, redirect ke path `/id/...` atau `/en/...`.
- Acceptance Criteria:
  - [ ] Ganti bahasa gak reset persona/tema yang sudah dipilih
  - [ ] URL berubah sesuai locale

---

## Milestone 6 — Polish, QA & Launch

### Epic: QA & Accessibility

**Task: Contrast check semua tema**
- Acceptance Criteria:
  - [ ] Semua tema lolos rasio kontras 4.5:1 di teks utama
  - [ ] Dicatat kalau ada exception dan alasannya

**Task: Cross-browser/device test**
- Acceptance Criteria:
  - [ ] Dites di Chrome & Safari, desktop & mobile
  - [ ] Semua 3 persona path jalan normal di kedua browser

### Epic: Content Population

**Task: Publish konten real (bukan dummy)**
- Description: Isi minimal beberapa project & module asli buat launch.
- Acceptance Criteria:
  - [ ] Minimal 3 project dan 3 module publish-ready (checklist Style Guide §6)
  - [ ] Minimal 3 certification terisi

### Epic: Launch

**Task: Final deploy check**
- Acceptance Criteria:
  - [ ] Domain custom (kalau ada) sudah tersambung dan HTTPS aktif
  - [ ] Semua link internal gak ada yang 404

**Task: Share ke LinkedIn**
- Acceptance Criteria:
  - [ ] Link portofolio (path recruiter) siap di-share
  - [ ] Preview link (OG image/meta) sudah dicek tampil benar
