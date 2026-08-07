// components/dashboard/SalesTrendCard.jsx
"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function SalesTrendCard({ data }) {
  return (
    <section className="flex h-full flex-col rounded-3xl border border-gray-200 bg-white">
      <header className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-sm font-semibold text-gray-800">
          Perkembangan Penjualan Tiket
        </h2>
        <p className="text-xs text-gray-400">6 bulan terakhir</p>
      </header>

      <div className="flex-1 px-2 py-4">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="fillTiket" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4b5563" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#4b5563" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#f1f1f2" vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              width={36}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e5e7eb",
                fontSize: 12,
              }}
              labelStyle={{ color: "#374151", fontWeight: 600 }}
            />
            <Area
              type="monotone"
              dataKey="tiketTerjual"
              name="Tiket terjual"
              stroke="#374151"
              strokeWidth={2}
              fill="url(#fillTiket)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}