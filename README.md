## Backend API – Web Resep UMKM Nusantara

- **Nama** : Zulfikar Hasan  
- **NIM** : 2410501016  

---

Backend dari aplikasi Resep Makanan Nusantara untuk UMKM yang dibangun menggunakan Node.js, Express.js, dan PostgreSQL.
Backend ini bertanggung jawab dalam mengelola data resep, bahan, dan langkah secara terstruktur serta menyediakan API untuk frontend.

---

## Deskripsi
Backend ini dikembangkan menggunakan konsep RESTful API dengan endpoint seperti GET /api/resepUMKM, POST /api/resepUMKM, dan DELETE /api/resepUMKM/:id untuk mengelola data resep secara terstandarisasi.

Dalam implementasinya, backend telah menerapkan:

- Middleware validasi untuk memastikan setiap resep yang ditambahkan memiliki minimal 1 bahan dan 1 langkah
- Arsitektur modular dengan pemisahan yang jelas antara routes, controllers, models, dan middlewares
- Koneksi langsung ke database PostgreSQL untuk penyimpanan data secara persisten
- Pengelolaan data relasional antara tabel resep, bahan, dan langkah

---

## Tech Stack
- Node.js → Runtime JavaScript
- Express.js → Framework backend
- PostgreSQL → Database relasional
- node-postgres → Koneksi ke database
- dotenv → Manajemen environment variable
- nodemon → Development server auto-restart

---

## Cara Menjalankan

### 1. Clone Repository
```bash
git clone <URL_REPOSITORY>
```

### 2. Ganti Directory
```bash
cd resep-backend
```

### 3. Install Npm
```bash
npm install
```

### 4. Jalankan Aplikasi
```bash
npm run dev
```

---

Server Akan berjalan di
```bash
http://localhost:3000
```
