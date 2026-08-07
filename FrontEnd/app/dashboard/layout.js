// app/dashboard/layout.js
import Sidebar from "@/app/components/dashboard/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen gap-4 bg-gray-100 p-4">
      <Sidebar />
      <main className="flex min-w-0 flex-1 flex-col gap-4 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}