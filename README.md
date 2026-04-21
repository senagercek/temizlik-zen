# Aqualux e-ticaret projesi

Bu proje Vite + React + TypeScript ile geliştirilmiştir.

## Admin panel

- URL: `/admin`
- Giriş ekranı: `/admin/giris`

Admin paneli şifre ile korunur. Local geliştirme için `.env.example` dosyasını `.env.local` olarak kopyalayıp değerleri doldurun:

- `ADMIN_PASSWORD`
- `ADMIN_JWT_SECRET`

Not: Admin girişinin çalışması için `/api/admin/*` endpointleri gerekir. Localde bunu en rahat şu komutla test edebilirsiniz:

- `npm run dev:vercel`
