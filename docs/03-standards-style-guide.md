# My Corner — Standards & Style Guide

> Dokumen ini menjawab **"Gimana standarisasinya?"** — biar konsisten walau dikerjain sendirian dalam jangka waktu lama.

## 1. Naming Conventions

- **Slug file konten**: `kebab-case`, deskriptif, tanpa tanggal di depan. Contoh: `analisis-churn-pelanggan-python.mdx`, bukan `2026-01-project1.mdx`.
- **Komponen**: `PascalCase.astro` / `PascalCase.tsx`. Contoh: `PlotlyChart.tsx`, `ThemeSwitcher.astro`.
- **CSS custom property**: `--kebab-case`, prefix per kategori. Contoh: `--color-bg`, `--color-text-primary`, `--radius-md`, `--shadow-card`.
- **File tema**: nama tema dalam huruf kecil, sesuai key yang dipakai di `data-theme`. Contoh: `flat.css`, `bento.css`, `neo-brutalism.css`.

## 2. Content Writing Guideline

- **Hierarki heading**: `h1` cuma dipakai sekali (judul halaman/otomatis dari frontmatter `title`), isi konten mulai dari `h2`.
- **Math**: selalu pakai sintaks LaTeX standar (`$...$` inline, `$$...$$` block), jangan screenshot rumus.
- **Code block**: selalu kasih label bahasa (` ```python `, ` ```js `, dst) biar syntax highlight jalan.
- **Data viz**: sertakan kode Python di satu blok, lalu embed komponen chart tepat di bawahnya — jangan pisah jauh dari konteks penjelasan.
- **Link ke glossary**: istilah teknis yang pertama kali muncul di satu modul otomatis di-link oleh remark plugin (lihat TDD §5) — penulis cukup pastikan istilahnya sudah terdaftar di collection `glossary`, gak perlu link manual.
- **Panjang summary**: 1–2 kalimat, dipakai di card listing dan meta description.

## 3. Design Tokens Spec (wajib per tema)

Setiap file tema baru **harus** mendefinisikan minimal token berikut, biar komponen manapun otomatis kompatibel:

- `--color-bg`, `--color-surface`, `--color-text-primary`, `--color-text-secondary`
- `--color-accent`, `--color-border`
- `--radius-sm`, `--radius-md`, `--radius-lg`
- `--shadow-card`, `--shadow-hover`
- `--font-heading`, `--font-body`
- `--spacing-unit`

Tema boleh nambah token spesifik miliknya sendiri (misal `--glass-blur` buat Glassmorphism, `--brutalism-border-width` buat Neo Brutalism), tapi token wajib di atas gak boleh dilewatkan.

## 4. Git Commit Convention

Pakai [Conventional Commits](https://www.conventionalcommits.org/):

- `feat: tambah tema bento grid`
- `content: publish modul kalkulus limit`
- `fix: glossary link ga jalan di modul fisika`
- `chore: update dependency astro`
- `docs: update roadmap milestone 2`

## 5. Accessibility Minimum

- Kontras teks-vs-background minimal rasio **4.5:1** (standar AA) di semua tema — termasuk Glassmorphism dan Cyberpunk yang rawan low-contrast. Cek pakai browser devtools atau contrast checker sebelum tema dianggap selesai.
- Semua tombol/link interaktif punya state `:focus-visible` yang kelihatan jelas.
- Gambar/chart punya `alt` text atau deskripsi teks alternatif.

## 6. Definition of Done — per Konten

Checklist sebelum 1 project/module dianggap "publish-ready":

- [ ] Frontmatter lengkap sesuai schema (lihat TDD §4)
- [ ] Math (kalau ada) sudah dicek render dengan benar
- [ ] Data viz (kalau ada) sudah dicek interaktivitas hover/klik jalan
- [ ] Istilah teknis sudah terdaftar di glossary (kalau belum ada, tambahin dulu)
- [ ] Versi ID dan EN sudah lengkap (atau minimal ditandai `translationOf` kalau nyusul)
- [ ] Sudah di-preview di minimal 2 tema berbeda, pastikan gak ada layout yang rusak
