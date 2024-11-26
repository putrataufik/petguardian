# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

**Pet Guardian**
- PWA VITE React JS
- Database = Firebase
- API = ├── FirebaseAuth
        ├── 
        ├──
        ├──

- Struktur Folder dan kegunaan
  src/
  ├── api/                  # Untuk file API seperti koneksi AI dan Firebase
  ├── assets/               # Untuk file statis (gambar, ikon, dll.)
  ├── components/           # Komponen UI yang dapat digunakan kembali
  ├── context/              # Context API untuk state management global
  ├── hooks/                # Custom hooks untuk logika reuseable
  ├── layouts/              # Layout umum seperti navbar, sidebar, dll.
  ├── pages/                # Halaman utama aplikasi
  ├── services/             # Layanan untuk Firebase atau utilitas lainnya
  ├── styles/               # File CSS/Tailwind tambahan (opsional)
  ├── utils/                # Helper functions atau utilities
  └── main.jsx              # Entry point aplikasi
      app.jsx        	      # Routes
      index.css             # Tailwind
  Struktur di atas supaya bisa Clean Code ya teman-teman.

- Kalau baru mulai Silahkan **"npm install"** dulu hehe.

- Cara run "npm run dev" run di pc/laptop
         "npm run dev -- --host" untuk buka di HP (Harus 1 jaringan wifi dengan pc/laptop) **fase development pakai ini saja**
         "npm run build" ini untuk production
         "npm run preview -- --host" untuk install aplikasi ke hp (Harus 1 jaringan wifi dengan pc/laptop)
