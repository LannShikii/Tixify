// Data contoh untuk halaman Dashboard. Ganti dengan hasil fetch dari API
// (mis. GET /api/dashboard/summary) saat backend sudah tersedia.

export const purchaseRows = [
  {
    id: "TRX-10231",
    userName: "Raka Pratama",
    concertName: "Sheila On 7 - Reuni Tour",
    purchaseDate: "2026-07-28",
    concertDate: "2026-09-14",
    status: "Lunas",
  },
  {
    id: "TRX-10230",
    userName: "Dinda Ayu",
    concertName: "Tulus - Manusia Tour",
    purchaseDate: "2026-07-27",
    concertDate: "2026-08-30",
    status: "Lunas",
  },
  {
    id: "TRX-10229",
    userName: "Bagas Wicaksono",
    concertName: "Coldplay - Music of the Spheres",
    purchaseDate: "2026-07-26",
    concertDate: "2026-11-02",
    status: "Menunggu",
  },
  {
    id: "TRX-10228",
    userName: "Nadia Salsabila",
    concertName: "NIKI - Nicole Zefanya Live",
    purchaseDate: "2026-07-25",
    concertDate: "2026-09-20",
    status: "Lunas",
  },
  {
    id: "TRX-10227",
    userName: "Fajar Ramadhan",
    concertName: "Sheila On 7 - Reuni Tour",
    purchaseDate: "2026-07-24",
    concertDate: "2026-09-14",
    status: "Dibatalkan",
  },
];

export const salesTrend = [
  { month: "Feb", tiketTerjual: 320 },
  { month: "Mar", tiketTerjual: 410 },
  { month: "Apr", tiketTerjual: 380 },
  { month: "Mei", tiketTerjual: 520 },
  { month: "Jun", tiketTerjual: 610 },
  { month: "Jul", tiketTerjual: 705 },
];

export const topConcerts = [
  { name: "Sheila On 7 - Reuni Tour", ticketsSold: 842 },
  { name: "Coldplay - Music of the Spheres", ticketsSold: 715 },
  { name: "Tulus - Manusia Tour", ticketsSold: 588 },
  { name: "NIKI - Nicole Zefanya Live", ticketsSold: 401 },
];

export const summary = {
  totalUsers: 4820,
  totalPenjualan: 2546,
  totalKonser: 12,
  pendapatan: 1284500000,
};