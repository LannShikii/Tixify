// components/dashboard/Sidebar.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Ticket,
  Mic2,
  LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Users", href: "/dashboard/users", icon: Users },
  { label: "Penjualan", href: "/dashboard/penjualan", icon: ShoppingCart },
  { label: "Ticket Concert", href: "/dashboard/ticket-concert", icon: Ticket },
  { label: "Concert", href: "/dashboard/concert", icon: Mic2 },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col justify-between rounded-3xl border border-gray-200 bg-white p-4">
      <div>
        <div className="mb-6 px-2 pt-1">
          <p className="text-lg font-semibold tracking-tight text-gray-900">
            Konser<span className="text-gray-400">Admin</span>
          </p>
        </div>

        <nav className="flex flex-col gap-2">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const active =
              href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname?.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={[
                  "flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-colors",
                  active
                    ? "border-gray-300 bg-gray-100 text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-200 hover:bg-gray-50 hover:text-gray-800",
                ].join(" ")}
              >
                <Icon size={18} strokeWidth={2} />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-2.5">
        <div className="h-8 w-8 shrink-0 rounded-full bg-gray-200" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-800">Admin</p>
          <p className="truncate text-xs text-gray-400">admin@konser.id</p>
        </div>
        <button
          type="button"
          onClick={() => {
            // TODO: sambungkan ke logic logout (hapus token, redirect ke /login, dst.)
            console.log("logout");
          }}
          className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100"
          aria-label="Log out"
        >
          <LogOut size={14} />
          Log out
        </button>
      </div>
    </aside>
  );
}