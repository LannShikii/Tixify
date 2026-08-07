// components/dashboard/SummaryStats.jsx
import { Users, Ticket, Mic2, Wallet } from "lucide-react";
import { summary } from "@/app/lib/dummy-data";

const STATS = [
  {
    label: "Total Users",
    value: summary.totalUsers.toLocaleString("id-ID"),
    icon: Users,
  },
  {
    label: "Total Penjualan",
    value: summary.totalPenjualan.toLocaleString("id-ID"),
    icon: Ticket,
  },
  {
    label: "Konser Aktif",
    value: summary.totalKonser.toLocaleString("id-ID"),
    icon: Mic2,
  },
  {
    label: "Pendapatan",
    value: `Rp ${(summary.pendapatan / 1_000_000).toLocaleString("id-ID")} jt`,
    icon: Wallet,
  },
];

export default function SummaryStats() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {STATS.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3.5"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
            <Icon size={17} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold text-gray-900">{value}</p>
            <p className="truncate text-xs text-gray-400">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}