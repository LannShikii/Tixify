"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-100 bg-[#3b3b3b] text-white shadow-lg">
      <div className="mx-auto flex h-20 items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="text-4xl italic font-bold tracking-wide">
          Tixify
        </Link>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="flex md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="white"
            viewBox="0 0 256 256"
          >
            <path d="M228,128a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,128ZM40,76H216a12,12,0,0,0,0-24H40a12,12,0,0,0,0,24ZM216,180H40a12,12,0,0,0,0,24H216a12,12,0,0,0,0-24Z" />
          </svg>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-7 font-semibold md:flex">

          <li>
            <Link
              href="/" className="transition hover:text-blue-100">
              Dashboard
            </Link>
          </li>
          {/* Dropdown */}
          <li className="group relative">

            <button className="py-2">
              About Us
            </button>

            <ul className="invisible absolute left-0 top-full mt-2 w-48 rounded-xl bg-[#262626] py-2 opacity-0 shadow-xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <li>
                <Link
                  href="/why-us" className="block px-4 py-3 hover:bg-white hover:text-[#262626]">
                  Detail  
                </Link>
              </li>

              <li>
                <Link
                  href="/collaboration" className="block px-4 py-3 hover:bg-white hover:text-[#262626]">
                  Collaboration
                </Link>
              </li>

              <li>
                <Link
                  href="/contact" className="block px-4 py-3 hover:bg-white hover:text-[#262626]">
                  Contact Us
                </Link>
              </li>
            </ul>

          </li>
          <li>
            <Link
              href="/download" className="transition hover:text-blue-100">
              Download
            </Link>
          </li>

          {/* Login */}
          <li className="flex gap-3">

            <Link href="../auth/login" className="rounded-md border-2 border-white bg-[#262626] px-5 py-2 font-bold transition hover:bg-white hover:text-[#262626]">
              Login
            </Link>

            <Link href="../auth/register" className="rounded-md border-2 border-white bg-[white] px-5 py-2 font-bold text-[#262626] transition hover:bg-[#262626] hover:text-white">
              Register
            </Link>

          </li>
        </ul>
      </div>

      {/* ================= MOBILE MENU ================= */}

      <div className={`overflow-hidden transition-all duration-300 md:hidden ${menuOpen ? "max-h-[700px]" : "max-h-0"}`}>
        <ul className="flex flex-col items-center gap-4 pb-6">

          <li>
            <Link href="/" className="text-lg font-semibold">
              Dashboard
            </Link>
          </li>

          <li>
            <Link href="/store" className="text-lg font-semibold">
              Store
            </Link>
          </li>
          <details className="w-full text-center">
            <summary className="cursor-pointer list-none text-lg font-semibold">
              About Us
            </summary>

            <div className="mt-4 flex flex-col gap-3">
              <Link href="/why-us">
                Why Us
              </Link>
              <Link href="/collaboration">
                Collaboration
              </Link>
              <Link href="/contact">
                Contact Us
              </Link>

            </div>
          </details>

          <div className="mt-5 flex flex-col gap-3">
            <Link href="../auth/login" className="rounded-md border-2 border-white px-6 py-2 text-center font-bold">
              Login
            </Link>

            <Link href="./auth/register" className="rounded-md bg-white px-6 py-2 text-center font-bold text-sky-400">
              Register
            </Link>
          </div>

        </ul>
      </div>
    </nav>
  );
}