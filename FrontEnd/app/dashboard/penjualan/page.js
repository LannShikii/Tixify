// app/dashboard/penjualan/page.js
"use client";

import { useMemo, useState } from "react";
import { Search, CheckCircle2, Clock, XCircle, Wallet } from "lucide-react";

// Ganti dengan hasil fetch dari API, contoh:
// const sales = await apiFetch("/api/penjualan");
const initialSales = [
  { id: "TRX-20231", buyer: "Raka Pratama", concert: "Sheila On 7 - Reuni Tour", category: "VIP", qty: 2, price: 850000, date: "2026-07-28", status: "Lunas", method: "QRIS" },
  { id: "TRX-20232", buyer: "Dinda Ayu", concert: "Tulus - Manusia Tour", category: "Reguler", qty: 1, price: 350000, date: "2026-07-27", status: "Lunas", method: "Transfer Bank" },
  { id: "TRX-20233", buyer: "Bagas Wicaksono", concert: "Coldplay - Music of the Spheres", category: "VIP", qty: 3, price: 1500000, date: "2026-07-26", status: "Belum Bayar", method: "Transfer Bank" },
  { id: "TRX-20234", buyer: "Nadia Salsabila", concert: "NIKI - Nicole Zefanya Live", category: "Reguler", qty: 2, price: 400000, date: "2026-07-25", status: "Lunas", method: "QRIS" },
  { id: "TRX-20235", buyer: "Fajar Ramadhan", concert: "Sheila On 7 - Reuni Tour", category: "Reguler", qty: 1, price: 350000, date: "2026-07-24", status: "Dibatalkan", method: "-" },
  { id: "TRX-20236", buyer: "Putri Wulandari", concert: "Coldplay - Music of the Spheres", category: "Reguler", qty: 4, price: 800000, date: "2026-07-23", status: "Belum Bayar", method: "Transfer Bank" },
];

const STATUS_TABS = ["Semua", "Lunas", "Belum Bayar", "Dibatalkan"];

const STATUS_STYLE = {
  Lunas: "bg-gray-900 text-white",
  "Belum Bayar": "bg-gray-200 text-gray-700",
  Dibatalkan: "bg-gray-100 text-gray-400 line-through",
};

function formatRp(n) {
  return `Rp ${n.toLocaleString("id-ID")}`;
}

export default function PenjualanPage() {
  const [sales, setSales] = useState(initialSales);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("Semua");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sales.filter((s) => {
      const matchTab = tab === "Semua" || s.status === tab;
      const matchQuery =
        !q ||
        s.buyer.toLowerCase().includes(q) ||
        s.concert.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q);
      return matchTab && matchQuery;
    });
  }, [sales, query, tab]);

  const totalTransaksi = sales.length;
  const totalLunas = sales.filter((s) => s.status === "Lunas").length;
  const totalBelumBayar = sales.filter((s) => s.status === "Belum Bayar").length;
  const totalPendapatan = sales
    .filter((s) => s.status === "Lunas")
    .reduce((sum, s) => sum + s.price * s.qty, 0);

  function markPaid(id) {
    // TODO: PATCH /api/penjualan/:id { status: "Lunas" }
    setSales((prev) => prev.map((s) => (s.id === id ? { ...s, status: "Lunas" } : s)));
  }

  return (
    <>
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Penjualan</h1>
        <p className="text-sm text-gray-400">
          Riwayat transaksi pembelian tiket beserta status pembayaran.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Wallet} label="Pendapatan (lunas)" value={formatRp(totalPendapatan)} />
        <StatCard icon={CheckCircle2} label="Transaksi Lunas" value={totalLunas} />
        <StatCard icon={Clock} label="Menunggu Bayar" value={totalBelumBayar} />
        <StatCard icon={XCircle} label="Total Transaksi" value={totalTransaksi} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2 rounded-xl border border-gray-200 bg-white p-1">
          {STATUS_TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                tab === t ? "bg-gray-900 text-white" : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="relative w-full max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari pembeli / konser..."
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm text-gray-700 outline-none focus:border-gray-400"
          />
        </div>
      </div>

      <section className="flex-1 overflow-hidden rounded-3xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[840px] border-collapse text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-gray-400">
                <th className="px-6 py-3 font-medium">Pembeli</th>
                <th className="px-6 py-3 font-medium">Konser</th>
                <th className="px-6 py-3 font-medium">Kategori</th>
                <th className="px-6 py-3 font-medium">Qty</th>
                <th className="px-6 py-3 font-medium">Total</th>
                <th className="px-6 py-3 font-medium">Tanggal</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-t border-gray-100 text-gray-700 hover:bg-gray-50">
                  <td className="px-6 py-3.5">
                    <div className="font-medium text-gray-800">{s.buyer}</div>
                    <div className="text-xs text-gray-400">{s.id}</div>
                  </td>
                  <td className="px-6 py-3.5">{s.concert}</td>
                  <td className="px-6 py-3.5">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        s.category === "VIP" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {s.category}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-gray-500">{s.qty}</td>
                  <td className="px-6 py-3.5 font-medium text-gray-800">{formatRp(s.price * s.qty)}</td>
                  <td className="px-6 py-3.5 text-gray-500">
                    {new Date(s.date).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-3.5">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLE[s.status]}`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    {s.status === "Belum Bayar" ? (
                      <button
                        onClick={() => markPaid(s.id)}
                        className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100"
                      >
                        Tandai Lunas
                      </button>
                    ) : (
                      <span className="text-xs text-gray-300">—</span>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-10 text-center text-sm text-gray-400">
                    Tidak ada transaksi yang cocok.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
        <Icon size={17} />
      </div>
      <div className="min-w-0">
        <p className="truncate text-lg font-semibold text-gray-900">{value}</p>
        <p className="truncate text-xs text-gray-400">{label}</p>
      </div>
    </div>
  );
}