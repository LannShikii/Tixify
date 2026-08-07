import SummaryStats from "@/app/components/dashboard/SummaryStats";
import PurchaseTable from "@/app/components/dashboard/PurchaseTable";
import SalesTrendCard from "@/app/components/dashboard/SalesTrendCard";
import TopTicketsCard from "@/app/components/dashboard/TopTicketsCard";
import { purchaseRows, salesTrend, topConcerts } from "../lib/dummy-data";

// Ganti data dummy di lib/dummy-data.js dengan fetch dari API, contoh:
// const rows = await apiFetch("/api/dashboard/purchases");

export default function DashboardPage() {
  return (
    <>
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-400">
          Ringkasan penjualan tiket dan aktivitas users hari ini.
        </p>
      </div>

      <SummaryStats />

      <PurchaseTable rows={purchaseRows} />

      <div className="grid grid-cols-1 gap-4 pb-4 lg:grid-cols-2">
        <SalesTrendCard data={salesTrend} />
        <TopTicketsCard data={topConcerts} />
      </div>
    </>
  );
}