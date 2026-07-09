# My Corner — PRD Lite

> Dokumen ini menjawab **"Apa ini?"**. Untuk jawaban "Pake stack apa?" lihat `02-technical-design-doc.md`, untuk "Gimana standarisasinya?" lihat `03-standards-style-guide.md`.

## 1. Overview

**My Corner** adalah website pribadi dua-wajah:

- **Portofolio profesional** — buat di-share ke LinkedIn dan dicek recruiter.
- **Platform catatan belajar** — kumpulan catatan sekolah/kursus, disusun seperti course, untuk pelajar lain.

Satu website, satu domain, tapi pengalaman yang disuguhkan berbeda tergantung siapa yang berkunjung.

## 2. Goals & Non-Goals

### Goals (v1 / MVP)

- [ ] Landing page dengan hero **"What are you?"** yang mem-branch ke 3 pengalaman berbeda.
- [ ] Sistem konten berbasis file (project, module, glossary, certification) — nambah entry baru = nambah file, tanpa sentuh kode.
- [ ] Math rendering (LaTeX) berfungsi di project & module.
- [ ] Data visualization dari Python bisa dilihat dengan interaktivitas hover/klik walau datanya statis.
- [ ] Sistem tema yang bisa di-switch, dan gampang ditambah tema baru di kemudian hari tanpa ubah struktur inti.
- [ ] Dukungan 2 bahasa (ID/EN), struktur gampang ditambah bahasa baru.
- [ ] Glossarium yang otomatis ke-link dari istilah teknis di dalam modul.
- [ ] 100% gratis untuk dibangun dan gratis untuk diakses siapa pun.

### Non-Goals (v1)

- Sistem komentar / diskusi.
- Autentikasi / akun user (semua publik, tanpa login — termasuk halaman modul student).
- CMS dengan UI editor (masih edit file `.mdx` langsung di repo).
- Semua 6 tema selesai sekaligus (boleh incremental — minimal Flat Design harus jadi duluan sebagai default).
- Search engine internal.
- Analytics dashboard custom (kalau butuh, pakai Cloudflare Web Analytics bawaan nanti).

## 3. Target Users / Persona

| Persona | Tujuan kunjungan | Yang pertama dilihat | Navigasi yang tampil |
|---|---|---|---|
| **Recruiter** | Evaluasi kandidat kerja | Foto + intro singkat + pendidikan (ringkas) + 3 project teratas + 3 cert teratas + kontak | Educations, Projects, Certifications |
| **Student** | Cari catatan belajar | Langsung ke dashboard Modules (tanpa landing page tambahan) | Modules, Glossarium |
| **Don't mind me** | Eksplorasi bebas, gak butuh basa-basi | Semua konten kebuka | Full nav, minus Educations & intro personal |

## 4. Site Map

```
/                            Landing "What are you?"
/recruiter                   Curated view (locked/semi-locked theme)
  /recruiter/educations      Riwayat pendidikan lengkap
  /recruiter/projects        3 teratas di landing, halaman ini = semua project
  /recruiter/certifications  3 teratas di landing, halaman ini = semua cert
/student                     Dashboard modules (tanpa landing)
/explore                     "Don't mind me" — semua terbuka minus bio personal
/projects                    List semua project (dipakai juga di path lain)
/projects/[slug]             Detail 1 project
/modules                     Dashboard, dikelompokkan subject x level
/modules/[slug]               Detail 1 modul
/glossary                    List semua term
/glossary/[term]             Detail 1 term
/certifications              List semua sertifikat
```

## 5. User Flow — Landing Morph

Hero pertanyaan "What are you?" dengan 3 tombol. Pilihan user mengubah **navigasi yang tampil** dan **ketersediaan tema** (locked vs bebas), disimpan di client state supaya persist selama sesi berikutnya.

| Pilihan | Efek tema | Efek navigasi |
|---|---|---|
| I'm a recruiter | Locked ke Flat Design, atau user bisa pilih manual Bento Grid di pojok | Cuma: Educations, Projects, Certifications |
| I'm a student | Semua tema terbuka, user bebas pilih | Cuma: Modules, Glossarium |
| Don't mind me | Semua tema terbuka | Full nav, tanpa Educations & intro personal |

## 6. Fitur per Halaman

**Landing (`/`)**
- Hero question + 3 tombol CTA persona

**Recruiter path**
- Foto + perkenalan singkat
- Pendidikan (ringkas) + tombol "View More" → halaman Educations penuh
- 3 Project teratas + tombol "View More" → semua project
- 3 Certification teratas + tombol "View More" → semua cert
- Contact section di penutup halaman

**Student path**
- Dashboard modul, dikelompokkan per subject (math/phy/chem/dst) x level (elementary/junior/senior/college)
- Halaman Glossarium

**Project detail**
- Render MDX: heading & paragraf clean, math via LaTeX, code block, embed data viz interaktif (hover/klik titik data)

**Module detail**
- Sama seperti project, plus auto-link ke Glossarium untuk istilah teknis yang muncul di teks

**Glossary detail**
- Definisi term + daftar modul/project yang menyebut term ini (backlink, kalau memungkinkan)

## 7. Definition of Done (v1)

- [ ] 3 persona path bisa diakses dan morph sesuai spec di atas
- [ ] Minimal Flat Design + 1 tema lain selesai dan bisa di-switch
- [ ] Minimal 1 project & 1 module contoh sudah publish, lengkap dengan math + data viz + glossary link
- [ ] ID + EN tersedia di semua halaman statis (nav, label, UI text)
- [ ] Deploy otomatis dari git push ke Cloudflare Pages berhasil
- [ ] Sudah di-test di mobile & desktop, minimal Chrome + Safari

## 8. Out of Scope (v1)

- Tema Skeuomorphism, Neo Brutalism, Cyberpunk (nyusul di milestone berikutnya, lihat `04-roadmap.md`)
- Comment system
- Bahasa selain ID/EN
- Search bar internal
