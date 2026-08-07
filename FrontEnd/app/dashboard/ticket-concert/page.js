// app/dashboard/ticket-concert/page.js
"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import Modal from "@/app/components/dashboard/Modal";
import { api } from "@/app/lib/api";

// Idealnya daftar ini datang dari page Concert (lewat API), disamakan manual dulu di sini.
const CONCERTS = [
  "Sheila On 7 - Reuni Tour",
  "Tulus - Manusia Tour",
  "Coldplay - Music of the Spheres",
  "NIKI - Nicole Zefanya Live",
];

// Ganti dengan hasil fetch dari API, contoh:
// const tickets = await apiFetch("/api/ticket-concert");
const initialTickets = [
  { id: "TIX-001", concert: "Sheila On 7 - Reuni Tour", category: "VIP", price: 850000, quota: 200, sold: 180, active: true },
  { id: "TIX-002", concert: "Sheila On 7 - Reuni Tour", category: "Reguler", price: 350000, quota: 500, sold: 500, active: true },
  { id: "TIX-003", concert: "Coldplay - Music of the Spheres", category: "VIP", price: 1500000, quota: 100, sold: 40, active: true },
  { id: "TIX-004", concert: "Coldplay - Music of the Spheres", category: "Reguler", price: 800000, quota: 300, sold: 120, active: true },
  { id: "TIX-005", concert: "Tulus - Manusia Tour", category: "Reguler", price: 300000, quota: 400, sold: 210, active: true },
];

const emptyForm = { concert: CONCERTS[0], category: "Reguler", price: "", quota: "", sold: "0", active: true };

const STATUS_STYLE = {
  Tersedia: "bg-gray-900 text-white",
  Habis: "bg-gray-200 text-gray-500 line-through",
  Dinonaktifkan: "bg-gray-100 text-gray-400",
  "VIP Nonaktif": "bg-gray-100 text-gray-400",
};

function formatRp(n) {
  return `Rp ${Number(n).toLocaleString("id-ID")}`;
}

export default function TicketConcertPage() {
  const [tickets, setTickets] = useState([]);
  const [vipEnabled, setVipEnabled] = useState(
    Object.fromEntries(CONCERTS.map((c) => [c, true]))
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    fetchTickets();
  }, []);

  async function fetchTickets() {
    try {
      const res = await api.get("/tickets");
      if (res.success) {
        // Map backend data to frontend structure
        const formattedTickets = res.data.map(t => ({
          id: t.id,
          concert: t.concert_name,
          artist: t.artist || "Unknown Artist",
          venue: t.venue || "Unknown Venue",
          concert_date: t.concert_date || "",
          category: t.ticket_type,
          price: t.price,
          quota: t.stock,
          sold: 0, // Not provided by tickets table natively
          active: true,
        }));
        setTickets(formattedTickets);
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  }

  // Sold-out selalu menang: kalau kuota habis, penjualan otomatis mati
  // walau tombol "active" dan VIP toggle-nya menyala.
  function statusOf(t) {
    if (t.sold >= t.quota) return "Habis";
    if (!t.active) return "Dinonaktifkan";
    if (t.category === "VIP" && !vipEnabled[t.concert]) return "VIP Nonaktif";
    return "Tersedia";
  }

  function openAdd() {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(t) {
    setEditingId(t.id);
    setForm({
      concert: t.concert,
      category: t.category,
      price: String(t.price),
      quota: String(t.quota),
      sold: String(t.sold),
      active: t.active,
    });
    setModalOpen(true);
  }

  async function handleDelete(id) {
    if (!confirm("Hapus tipe tiket ini?")) return;
    try {
      const res = await api.delete(`/tickets/${id}`);
      if (res.success) {
        fetchTickets();
      }
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  }

  function toggleActive(id) {
    // TODO: PATCH /api/ticket-concert/:id { active }
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, active: !t.active } : t)));
  }

  function toggleVip(concert) {
    setVipEnabled((prev) => ({ ...prev, [concert]: !prev[concert] }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      concert_name: form.concert,
      artist: form.concert, // using concert name as artist temporarily
      venue: "TBD", // default placeholder since UI doesn't have it
      concert_date: new Date().toISOString().split("T")[0],
      ticket_type: form.category,
      price: Number(form.price) || 0,
      stock: Number(form.quota) || 0,
    };
    try {
      if (editingId) {
        await api.put(`/tickets/${editingId}`, payload);
      } else {
        await api.post("/tickets", payload);
      }
      fetchTickets();
      setModalOpen(false);
    } catch (error) {
      console.error("Error saving ticket:", error);
    }
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Ticket Concert</h1>
          <p className="text-sm text-gray-400">Kelola tipe & stok tiket untuk setiap konser.</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          <Plus size={16} />
          Tambah Tiket
        </button>
      </div>

      <section className="rounded-3xl border border-gray-200 bg-white">
        <header className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-sm font-semibold text-gray-800">Pengaturan Kategori VIP per Konser</h2>
          <p className="text-xs text-gray-400">Matikan VIP kalau konser ini tidak menjual tiket VIP.</p>
        </header>
        <div className="grid grid-cols-1 gap-3 px-6 py-4 sm:grid-cols-2 lg:grid-cols-4">
          {CONCERTS.map((c) => (
            <button
              key={c}
              onClick={() => toggleVip(c)}
              className="flex items-center justify-between gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-left hover:bg-gray-50"
            >
              <span className="truncate text-xs font-medium text-gray-700">{c}</span>
              {vipEnabled[c] ? (
                <ToggleRight size={22} className="shrink-0 text-gray-900" />
              ) : (
                <ToggleLeft size={22} className="shrink-0 text-gray-300" />
              )}
            </button>
          ))}
        </div>
      </section>

      <section className="flex-1 overflow-hidden rounded-3xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] border-collapse text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-gray-400">
                <th className="px-6 py-3 font-medium">Konser</th>
                <th className="px-6 py-3 font-medium">Kategori</th>
                <th className="px-6 py-3 font-medium">Harga</th>
                <th className="px-6 py-3 font-medium">Terjual / Kuota</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => {
                const status = statusOf(t);
                const pct = Math.min(100, Math.round((t.sold / t.quota) * 100));
                return (
                  <tr key={t.id} className="border-t border-gray-100 text-gray-700 hover:bg-gray-50">
                    <td className="px-6 py-3.5">
                      <div className="font-medium text-gray-800">{t.concert}</div>
                      <div className="text-xs text-gray-400">{t.id}</div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                          t.category === "VIP" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {t.category}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 font-medium text-gray-800">{formatRp(t.price)}</td>
                    <td className="px-6 py-3.5">
                      <div className="mb-1 text-xs text-gray-500">
                        {t.sold} / {t.quota}
                      </div>
                      <div className="h-1.5 w-32 overflow-hidden rounded-full bg-gray-100">
                        <div className="h-full rounded-full bg-gray-700" style={{ width: `${pct}%` }} />
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLE[status]}`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => toggleActive(t.id)}
                          disabled={t.sold >= t.quota}
                          className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          {t.active ? "Nonaktifkan" : "Aktifkan"}
                        </button>
                        <button
                          onClick={() => openEdit(t)}
                          className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-gray-100"
                          aria-label="Edit"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(t.id)}
                          className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-red-50 hover:text-red-500"
                          aria-label="Hapus"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? "Edit Tiket" : "Tambah Tiket"}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Field label="Konser">
            <select
              value={form.concert}
              onChange={(e) => setForm({ ...form, concert: e.target.value })}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
            >
              {CONCERTS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Kategori">
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
            >
              <option value="Reguler">Reguler</option>
              <option value="VIP" disabled={!vipEnabled[form.concert]}>
                VIP {!vipEnabled[form.concert] ? "(dinonaktifkan untuk konser ini)" : ""}
              </option>
            </select>
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Harga (Rp)">
              <input
                required
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
              />
            </Field>
            <Field label="Kuota">
              <input
                required
                type="number"
                min="0"
                value={form.quota}
                onChange={(e) => setForm({ ...form, quota: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
              />
            </Field>
          </div>
          <Field label="Terjual saat ini">
            <input
              type="number"
              min="0"
              value={form.sold}
              onChange={(e) => setForm({ ...form, sold: e.target.value })}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
            />
          </Field>
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300"
            />
            Aktifkan penjualan tiket ini
          </label>

          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
            >
              {editingId ? "Simpan Perubahan" : "Tambah Tiket"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-gray-500">{label}</span>
      {children}
    </label>
  );
}