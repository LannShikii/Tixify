import Link from 'next/link'
import Navbar from './components/navbar'
import AdCarousel from './components/AdCarousel'

const events = [
  {
    id: 1,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMCOUlWo14XA4YHyQXO0fWXojhdBPJ_R0wo8ZQwasWfw&s=10',
    title: 'Laufey Concert 2026',
    date: '25 – 27 Oktober 2026',
    location: 'Jakarta Convention Center',
    category: 'Concert',
    prices: [
      { tier: 'Regular', price: 'Rp 350.000' },
      { tier: 'VIP', price: 'Rp 1.500.000' },
      { tier: 'VVIP', price: 'Rp 2.500.000' },
    ],
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600',
    title: 'Jakarta Music Festival',
    date: '10 – 12 November 2026',
    location: 'Gelora Bung Karno',
    category: 'Festival',
    prices: [
      { tier: 'Regular', price: 'Rp 200.000' },
      { tier: 'VIP', price: 'Rp 800.000' },
      { tier: 'VVIP', price: 'Rp 1.500.000' },
    ],
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600',
    title: 'EDM Night 2026',
    date: '31 Desember 2026',
    location: 'Ancol Beach City',
    category: 'Electronic',
    prices: [
      { tier: 'Regular', price: 'Rp 450.000' },
      { tier: 'VIP', price: 'Rp 1.200.000' },
      { tier: 'VVIP', price: 'Rp 2.000.000' },
    ],
  },
]

const values = [
  {
    n: '01',
    title: 'Aman',
    desc: 'Setiap transaksi dilindungi verifikasi berlapis, tiket kamu dijamin asli.',
  },
  {
    n: '02',
    title: 'Cepat',
    desc: 'Checkout dalam hitungan detik, e-tiket langsung masuk ke akun kamu.',
  },
  {
    n: '03',
    title: 'Terpercaya',
    desc: 'Ratusan penyelenggara event resmi sudah menggunakan Tixify.',
  },
]

export default function Page() {
  return (
    <div className="sora min-h-screen bg-white text-black">
      <Navbar />

      <main className="pt-20 px-6 md:px-16 max-w-5xl mx-auto">

        {/* ── Hero ── */}
        <section className="py-10 px-6 md:px-10 mt-5 bg-black rounded-2xl">
          <p className="text-xs tracking-widest text-gray-300 uppercase mb-3 font-medium">Platform Tiket Event Indonesia</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white mb-4">
            Temukan event<br />yang kamu suka.
          </h1>
          <p className="text-gray-300 text-sm max-w-sm mb-8">
            Beli tiket konser, festival, dan acara seru lainnya dengan mudah dan aman.
          </p>
          <div className="flex gap-3">
            <Link href="/events" className="bg-white text-black text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-100 transition">
              Jelajahi Event
            </Link>
            <Link href="/auth/register" className="border border-white/40 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-white hover:text-black transition">
              Daftar Gratis
            </Link>
          </div>
        </section>

        {/* ── Carousel ── */}
        <section className="py-10 border-b border-gray-100">
          <p className="text-xs tracking-widest text-gray-500 uppercase mb-4 font-medium">Promo & Highlight</p>
          <AdCarousel />
        </section>

        {/* ── Stats ── */}
        <section className="py-10 my-10 border border-gray-200 rounded-2xl grid grid-cols-3 divide-x divide-gray-100">
          {[
            { value: '500+', label: 'Event Aktif' },
            { value: '1 Juta+', label: 'Tiket Terjual' },
            { value: '200+', label: 'Kota' },
          ].map((s) => (
            <div key={s.label} className="text-center px-4 first:pl-0 last:pr-0">
              <p className="text-2xl font-bold text-black">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </section>

        {/* ── Event Terbaru ── */}
        <section className="py-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-black">Event Terbaru</h2>
            <Link href="/events" className="text-xs text-gray-500 hover:text-black transition font-medium">Lihat semua →</Link>
          </div>

          <div className="flex flex-col gap-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex gap-4 p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition group"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">{event.category}</span>
                      <h3 className="text-sm font-bold text-black leading-tight">{event.title}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{event.date} · {event.location}</p>
                    </div>
                    <button className="flex-shrink-0 bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-800 transition">
                      Beli
                    </button>
                  </div>

                  {/* Prices */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {event.prices.map((p) => (
                      <span key={p.tier} className="text-[10px] border border-gray-300 rounded-md px-2 py-0.5 text-gray-600">
                        {p.tier} · {p.price}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── About Us ── */}
        <section className="py-10 border-t border-gray-100">
          <p className="text-xs tracking-widest text-gray-500 uppercase mb-3 font-medium">Tentang Kami</p>
          <h2 className="text-2xl font-bold text-black mb-3 max-w-md">
            Kami bikin cari & beli tiket event jadi nggak ribet.
          </h2>
          <p className="text-gray-600 text-sm max-w-lg mb-10">
            Tixify menghubungkan kamu langsung dengan penyelenggara event terpercaya
            di seluruh Indonesia, tanpa calo, tanpa drama.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.n} className="border-t border-gray-200 pt-4">
                <span className="text-xs text-gray-400 font-semibold">{v.n}</span>
                <h3 className="text-sm font-bold text-black mt-1 mb-1">{v.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-10 mb-10 border-t border-gray-100 text-center">
          <p className="text-xs tracking-widest text-gray-500 uppercase mb-3 font-medium">Mulai Sekarang</p>
          <h2 className="text-2xl font-bold text-black mb-2">Jangan sampai ketinggalan.</h2>
          <p className="text-gray-600 text-sm mb-6">Daftar dan dapatkan notifikasi event favoritmu.</p>
          <Link href="/auth/register" className="bg-black text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-gray-800 transition inline-block">
            Buat Akun Gratis
          </Link>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 mt-10">
        <div className="max-w-5xl mx-auto px-6 md:px-16 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">

          <div className="col-span-2 md:col-span-1">
            <p className="text-lg font-bold text-black mb-2">Tixify</p>
            <p className="text-xs text-gray-500 leading-relaxed max-w-[200px]">
              Platform tiket event terpercaya di Indonesia.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-black uppercase tracking-wide mb-3">Jelajah</p>
            <ul className="flex flex-col gap-2">
              <li><Link href="/events" className="text-xs text-gray-500 hover:text-black transition">Semua Event</Link></li>
              <li><Link href="/events?category=Concert" className="text-xs text-gray-500 hover:text-black transition">Konser</Link></li>
              <li><Link href="/events?category=Festival" className="text-xs text-gray-500 hover:text-black transition">Festival</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-black uppercase tracking-wide mb-3">Perusahaan</p>
            <ul className="flex flex-col gap-2">
              <li><Link href="/about" className="text-xs text-gray-500 hover:text-black transition">Tentang Kami</Link></li>
              <li><Link href="/contact" className="text-xs text-gray-500 hover:text-black transition">Kontak</Link></li>
              <li><Link href="/faq" className="text-xs text-gray-500 hover:text-black transition">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-black uppercase tracking-wide mb-3">Ikuti Kami</p>
            <ul className="flex flex-col gap-2">
              <li><a href="#" className="text-xs text-gray-500 hover:text-black transition">Instagram</a></li>
              <li><a href="#" className="text-xs text-gray-500 hover:text-black transition">Twitter / X</a></li>
              <li><a href="#" className="text-xs text-gray-500 hover:text-black transition">TikTok</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-6 md:px-16 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
            <p className="text-xs text-gray-500">© 2026 Tixify. All rights reserved.</p>
            <p className="text-xs text-gray-500">Dibuat untuk proyek sekolah</p>
          </div>
        </div>
      </footer>
    </div>
  )
}