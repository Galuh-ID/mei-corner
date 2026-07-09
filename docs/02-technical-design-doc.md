# My Corner — Technical Design Doc (Lite)

> Dokumen ini menjawab **"Pake stack apa?"** dan **"kenapa"**. Untuk "apa"-nya lihat `01-prd-lite.md`.

## 1. Stack Summary

| Layer | Pilihan |
|---|---|
| Framework | Astro |
| UI Islands (bagian interaktif) | React (minimal, cuma di titik yang butuh) |
| Styling | Tailwind CSS (layout) + CSS Custom Properties (theming) |
| Konten | Astro Content Collections (MDX + Zod schema) |
| Math | remark-math + rehype-katex |
| Syntax highlight kode | Shiki (bawaan Astro) |
| Data visualization | Plotly.js, render dari JSON hasil export Python |
| State lintas komponen (persona/tema/bahasa) | nanostores + localStorage |
| i18n | Astro i18n routing + JSON dictionary per bahasa |
| Glossary auto-link | Custom remark plugin |
| Hosting | Cloudflare Pages |
| Version control | GitHub |

## 2. Architecture Decisions

**ADR-01 — Astro, bukan Next.js**
Islands architecture Astro cocok buat web yang isinya ~90% konten statis dengan sedikit titik interaktif (theme switcher, chart, morph state). Hasilnya JS yang dikirim ke browser jauh lebih sedikit dibanding default Next.js, dan build-nya bisa full statis.

**ADR-02 — Content-as-code, bukan database**
Semua konten (project/module/glossary/cert) ditulis sendiri oleh owner, bukan user-generated. Nambah entry baru = commit file `.mdx` baru. Gak butuh backend/DB yang harus di-maintain atau bisa kena biaya.

**ADR-03 — Data viz pakai Plotly JSON export, bukan live Python**
Chart tetap interaktif (hover/klik titik data) tanpa perlu server Python yang jalan terus-menerus. Python cuma dipakai sekali di lokal buat `fig.to_json()`, hasilnya disimpan sebagai file statis.

**ADR-04 — Theming pakai CSS custom properties + `data-theme`, bukan Tailwind theme config**
Tema seperti Glassmorphism vs Neo Brutalism butuh token dan style rule yang fundamental berbeda (blur, inset-shadow, border tebal, dst) — gak cukup diwakili satu set utility class Tailwind. CSS variable per tema lebih fleksibel buat nambah tema baru nanti.

**ADR-05 — Hosting Cloudflare Pages**
Free tier dengan bandwidth unlimited, gak butuh kartu kredit, dan boleh dipakai komersial — cocok buat web yang ditarget bakal banyak dikunjungi pelajar.

## 3. Folder / Repo Structure

```
src/
  content/
    projects/         *.mdx per project
    modules/           *.mdx per modul
    glossary/          *.mdx atau *.yaml per term
    certifications/    *.mdx per sertifikat
    config.ts          Zod schema semua collection
  components/
    islands/           Komponen interaktif (ThemeSwitcher, LangSwitcher, PlotlyChart, dll)
    ui/                 Komponen statis reusable
  layouts/
    RecruiterLayout.astro
    StudentLayout.astro
    ExploreLayout.astro
  pages/
    index.astro
    recruiter/
    student/
    explore/
    projects/
    modules/
    glossary/
    certifications/
  styles/
    tokens/
      flat.css
      bento.css
      glass.css        (nyusul)
      brutalism.css     (nyusul)
      cyberpunk.css     (nyusul)
    base.css
  i18n/
    id.json
    en.json
  lib/
    remark-glossary-link.ts
    state/
      persona-store.ts
      theme-store.ts
      lang-store.ts
docs/                   Dokumen SDLC (file-file ini)
```

## 4. Content Model

Skema tiap collection didefinisikan pakai Zod di `src/content/config.ts`. Ini berfungsi sebagai "skema database" versi file.

```ts
// project
{
  title: string
  slug: string
  summary: string
  tags: string[]
  featured: boolean        // true = masuk "3 project teratas"
  rank: number | null      // urutan tampil kalau featured
  coverImage: string | null
  hasDataViz: boolean
  language: "id" | "en"
  translationOf: string | null   // slug versi bahasa lain, kalau ada
}

// module
{
  title: string
  slug: string
  subject: "math" | "physics" | "chemistry" | string  // extensible
  level: "elementary" | "junior" | "senior" | "college"
  summary: string
  glossaryTerms: string[]   // optional, buat cross-check manual
  language: "id" | "en"
  translationOf: string | null
}

// glossary
{
  term: string
  slug: string
  aliases: string[]         // variasi penulisan/istilah lain buat auto-link
  definition: string
  language: "id" | "en"
}

// certification
{
  title: string
  issuer: string
  slug: string
  date: string
  featured: boolean
  rank: number | null
  credentialUrl: string | null
}
```

## 5. Theming Architecture

- Tiap tema = 1 file CSS berisi custom properties, diaktifkan lewat atribut `data-theme="flat" | "bento" | "glass" | ...` di elemen root.
- Token wajib yang **harus** ada di tiap file tema (detail lengkap di `03-standards-style-guide.md`): warna dasar, radius, shadow, spacing scale, font pairing.
- Komponen UI cuma nge-reference variable (`var(--color-bg)`, dst), gak pernah hardcode warna — jadi nambah tema baru gak perlu ubah komponen sama sekali.
- Cara nambah tema baru: (1) bikin file `src/styles/tokens/[nama].css` isi semua token wajib, (2) daftarin di `theme-store.ts` array daftar tema, (3) selesai.

## 6. i18n Architecture

- Routing native Astro i18n: `/id/...` dan `/en/...`.
- Dictionary flat JSON per bahasa (`src/i18n/id.json`, `en.json`), key konsisten di semua file.
- Konten project/module ditulis sebagai entry terpisah per bahasa (field `language` + `translationOf` di frontmatter), bukan satu file dengan dua bahasa dicampur.
- Cara nambah bahasa baru: bikin file dictionary baru + daftarin kode bahasanya di config i18n Astro.

## 7. Build & Deploy Pipeline

1. Tulis/edit konten atau kode secara lokal.
2. `git push` ke branch utama.
3. Cloudflare Pages otomatis detect push, jalanin `astro build`.
4. Hasil build (statis) di-deploy ke edge network Cloudflare.
5. Live di domain custom (kalau sudah disambungkan) atau subdomain `*.pages.dev`.

## 8. Known Constraints

- Cloudflare Pages free tier: maksimal ~20.000 file per situs, 500 build per bulan, ukuran maksimal 1 file 25 MiB.
- Data viz harus di-generate manual dari Python lalu diimpor sebagai file JSON — bukan proses otomatis/live.
- Karena tanpa backend, gak ada validasi konten saat runtime — validasi cuma terjadi saat build time lewat Zod schema.
