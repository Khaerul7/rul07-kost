# RUL07KOST

Aplikasi pencarian kost berbasis web dengan desain clean white dan palet Navy Blue + Gold.

## Tech Stack
- **React 18** + TypeScript
- **Tailwind CSS v3**
- **Zustand** (state management filter)
- **Framer Motion** (animasi card & modal)
- **Lucide React** (icons)
- **MockAPI** (REST API, opsional)

## Cara Menjalankan

```bash
# Install dependencies
npm install

# Jalankan dev server
npm run dev

# Build production
npm run build
```

Jika `VITE_MOCKAPI_URL` tidak diisi, app otomatis pakai data lokal di `src/data/mockData.ts`.

## Fitur
- ✅ Filter real-time (Gender, Harga, Ketersediaan)
- ✅ Tombol Hapus Semua Filter
- ✅ Load More (+4 per klik)
- ✅ Tombol WhatsApp dengan pesan pre-filled
- ✅ Modal Tambah Kost
- ✅ Skeleton loading
- ✅ Empty state
- ✅ Responsive grid (1 → 2 → 3 → 4 kolom)
- ✅ Animasi Framer Motion
