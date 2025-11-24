import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const loc = useLocation();

  const menu = [
    { label: "Dashboard", to: "/" },
    { label: "Semua Tugas", to: "/tasks" },
    { label: "Tugas Hari ini", to: "/tasks/today" },
    { label: "Prioritas Tinggi", to: "/tasks/high" }
  ];

  return (
    <aside className="w-52 h-screen bg-[#9EB6D2] 
    p-4 flex flex-col fixed left-0 top-0 border-r border-gray-300">
      <div className="w-full flex justify-center mb-6">
        <img
          src="/logo.png"
          className="rounded-lg border-0 outline-none"
          alt="logo"
        />
      </div>

      <Link
        to="/tasks/add"
        className="w-full bg-white flex items-center justify-center gap-2 py-3 
        rounded shadow font-medium hover:bg-gray-100"
      >
        <span className="text-xl">+</span> Tambah Tugas
      </Link>

      <nav className="mt-6 flex flex-col gap-3">
        {menu.map((m) => (
          <Link
            key={m.to}
            to={m.to}
            className={`w-full py-2 rounded text-center text-sm font-medium ${
              loc.pathname === m.to
                ? "bg-white text-black shadow"
                : "bg-[#d6c6bd] text-black hover:bg-[#e6d8cf]"
            }`}
          >
            {m.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}