// app/dashboard/users/page.js
"use client";

import { useMemo, useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import Modal from "@/app/components/dashboard/Modal";

// Ganti dengan hasil fetch dari API, contoh:
// const users = await apiFetch("/api/users");
const initialUsers = [
  { id: "USR-001", name: "Raka Pratama", email: "raka.pratama@email.com", phone: "0812-3456-7890", role: "User", joinDate: "2026-01-12" },
  { id: "USR-002", name: "Dinda Ayu", email: "dinda.ayu@email.com", phone: "0813-2233-4455", role: "User", joinDate: "2026-02-03" },
  { id: "USR-003", name: "Bagas Wicaksono", email: "bagas.w@email.com", phone: "0821-9988-7766", role: "User", joinDate: "2026-02-20" },
  { id: "USR-004", name: "Nadia Salsabila", email: "nadia.s@email.com", phone: "0857-1122-3344", role: "Admin", joinDate: "2025-11-05" },
];

const emptyForm = { name: "", email: "", phone: "", role: "User" };

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [users, query]);

  function openAdd() {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(user) {
    setEditingId(user.id);
    setForm({ name: user.name, email: user.email, phone: user.phone, role: user.role });
    setModalOpen(true);
  }

  function handleDelete(id) {
    if (!confirm("Hapus user ini? Tindakan tidak bisa dibatalkan.")) return;
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;

    if (editingId) {
      // TODO: PATCH /api/users/:id
      setUsers((prev) => prev.map((u) => (u.id === editingId ? { ...u, ...form } : u)));
    } else {
      // TODO: POST /api/users
      const newId = `USR-${String(users.length + 1).padStart(3, "0")}`;
      setUsers((prev) => [
        ...prev,
        { id: newId, ...form, joinDate: new Date().toISOString().slice(0, 10) },
      ]);
    }
    setModalOpen(false);
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Users</h1>
          <p className="text-sm text-gray-400">Kelola akun users pada aplikasi.</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          <Plus size={16} />
          Tambah User
        </button>
      </div>

      <div className="relative w-full max-w-xs">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari nama atau email..."
          className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm text-gray-700 outline-none focus:border-gray-400"
        />
      </div>

      <section className="flex-1 overflow-hidden rounded-3xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-gray-400">
                <th className="px-6 py-3 font-medium">User</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">No. HP</th>
                <th className="px-6 py-3 font-medium">Role</th>
                <th className="px-6 py-3 font-medium">Bergabung</th>
                <th className="px-6 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-t border-gray-100 text-gray-700 hover:bg-gray-50">
                  <td className="px-6 py-3.5">
                    <div className="font-medium text-gray-800">{u.name}</div>
                    <div className="text-xs text-gray-400">{u.id}</div>
                  </td>
                  <td className="px-6 py-3.5">{u.email}</td>
                  <td className="px-6 py-3.5 text-gray-500">{u.phone}</td>
                  <td className="px-6 py-3.5">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        u.role === "Admin" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-gray-500">
                    {new Date(u.joinDate).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-3.5">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(u)}
                        className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-gray-100"
                        aria-label="Edit"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-red-50 hover:text-red-500"
                        aria-label="Hapus"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-400">
                    Tidak ada user yang cocok.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? "Edit User" : "Tambah User"}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Field label="Nama Lengkap">
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
            />
          </Field>
          <Field label="Email">
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
            />
          </Field>
          <Field label="No. HP">
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
            />
          </Field>
          <Field label="Role">
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
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
              {editingId ? "Simpan Perubahan" : "Tambah User"}
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