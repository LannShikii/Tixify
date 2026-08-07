// app/dashboard/concert/page.js
"use client";

import { useRef, useState } from "react";
import { Plus, Pencil, Trash2, MapPin, CalendarDays, ImagePlus } from "lucide-react";
import Modal from "@/app/components/dashboard/Modal";

// Ganti dengan hasil fetch dari API, contoh:
// const concerts = await apiFetch("/api/concert");
const initialConcerts = [
  {
    id: "CNC-001",
    name: "Sheila On 7 - Reuni Tour",
    venue: "GBK Senayan, Jakarta",
    date: "2026-09-14",
    time: "19:00",
    status: "Akan Datang",
    description: "Konser reuni Sheila On 7 merayakan 25 tahun perjalanan band.",
    photo: null,
  },
  {
    id: "CNC-002",
    name: "Tulus - Manusia Tour",
    venue: "ICE BSD, Tangerang",
    date: "2026-08-30",
    time: "20:00",
    status: "Akan Datang",
    description: "Rangkaian tur album Manusia bersama orkestra.",
    photo: null,
  },
  {
    id: "CNC-003",
    name: "Coldplay - Music of the Spheres",
    venue: "GBK Senayan, Jakarta",
    date: "2026-11-02",
    time: "19:30",
    status: "Akan Datang",
    description: "Konser dunia Coldplay singgah di Jakarta.",
    photo: null,
  },
];

const STATUS_OPTIONS = ["Akan Datang", "Berlangsung", "Selesai"];

const STATUS_STYLE = {
  "Akan Datang": "bg-gray-100 text-gray-600",
  Berlangsung: "bg-gray-900 text-white",
  Selesai: "bg-gray-200 text-gray-400",
};

const emptyForm = {
  name: "",
  venue: "",
  date: "",
  time: "",
  status: "Akan Datang",
  description: "",
  photo: null,
};

export default function ConcertPage() {
  const [concerts, setConcerts] = useState(initialConcerts);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const fileInputRef = useRef(null);

  function openAdd() {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(c) {
    setEditingId(c.id);
    setForm({
      name: c.name,
      venue: c.venue,
      date: c.date,
      time: c.time,
      status: c.status,
      description: c.description,
      photo: c.photo,
    });
    setModalOpen(true);
  }

  function handleDelete(id) {
    if (!confirm("Hapus konser ini? Tiket yang terhubung sebaiknya dihapus juga secara manual.")) return;
    setConcerts((prev) => prev.filter((c) => c.id !== id));
  }

  function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    // Preview sisi klien pakai data URL. Saat backend siap, upload file-nya
    // ke server/storage lalu simpan URL hasil upload, bukan data URL ini.
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, photo: reader.result }));
    reader.readAsDataURL(file);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (editingId) {
      // TODO: PATCH /api/concert/:id (pakai FormData kalau foto ikut diupload)
      setConcerts((prev) => prev.map((c) => (c.id === editingId ? { ...c, ...form } : c)));
    } else {
      // TODO: POST /api/concert
      const newId = `CNC-${String(concerts.length + 1).padStart(3, "0")}`;
      setConcerts((prev) => [...prev, { id: newId, ...form }]);
    }
    setModalOpen(false);
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Concert</h1>
          <p className="text-sm text-gray-400">Kelola daftar konser beserta poster & jadwalnya.</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          <Plus size={16} />
          Tambah Konser
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 pb-4 sm:grid-cols-2 lg:grid-cols-3">
        {concerts.map((c) => (
          <div key={c.id} className="flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white">
            <div className="flex h-36 items-center justify-center bg-gray-100">
              {c.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.photo} alt={c.name} className="h-full w-full object-cover" />
              ) : (
                <ImagePlus size={28} className="text-gray-300" />
              )}
            </div>
            <div className="flex flex-1 flex-col gap-2 p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold text-gray-800">{c.name}</h3>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLE[c.status]}`}>
                  {c.status}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <MapPin size={13} />
                {c.venue}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <CalendarDays size={13} />
                {new Date(c.date).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}{" "}
                · {c.time} WIB
              </div>
              {c.description && <p className="line-clamp-2 text-xs text-gray-500">{c.description}</p>}

              <div className="mt-auto flex gap-2 pt-2">
                <button
                  onClick={() => openEdit(c)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50"
                >
                  <Pencil size={13} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="flex items-center justify-center rounded-xl border border-gray-200 px-3 py-2 text-xs font-medium text-gray-500 hover:bg-red-50 hover:text-red-500"
                  aria-label="Hapus"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? "Edit Konser" : "Tambah Konser"}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Field label="Foto Konser">
            <div className="flex items-center gap-3">
              <div className="flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                {form.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={form.photo} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <ImagePlus size={18} className="text-gray-300" />
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-xl border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50"
              >
                {form.photo ? "Ganti Foto" : "Unggah Foto"}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </div>
          </Field>
          <Field label="Nama Konser">
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
            />
          </Field>
          <Field label="Venue">
            <input
              required
              value={form.venue}
              onChange={(e) => setForm({ ...form, venue: e.target.value })}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Tanggal">
              <input
                required
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
              />
            </Field>
            <Field label="Jam">
              <input
                required
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
              />
            </Field>
          </div>
          <Field label="Status">
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Deskripsi">
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full resize-none rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
            />
          </Field>

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
              {editingId ? "Simpan Perubahan" : "Tambah Konser"}
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