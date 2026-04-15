"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Sidebar() {
  const pathname = usePathname();

  const MENU = [
    { id: "home", label: "Home", path: "/" },
    { id: "background", label: "Background", path: "/background" },
    { id: "skills", label: "Skills", path: "/skills" },
    { id: "abilities", label: "Abilities", path: "/abilities" },
    { id: "items", label: "Items", path: "/items" },
  ];

  return (
    <aside className="flex w-64 flex-col gap-10 border-r border-zinc-900 bg-zinc-950 p-8">
      {/* HEADER */}
      <div className="group">
        <h1 className="text-2xl leading-none font-black tracking-tighter text-red-700 italic">
          CodexVault
        </h1>
        <p className="mt-2 text-[7px] font-bold tracking-[0.5em] text-zinc-600 uppercase">
          Content Management System
        </p>
      </div>

      {/* MENU */}
      <nav className="flex flex-col gap-1">
        {MENU.map((item) => {
          const ativo = pathname === item.path;

          return (
            <Link
              key={item.id}
              href={item.path}
              className={`border-l-2 px-4 py-3 text-left text-[10px] font-bold tracking-[0.2em] uppercase transition-all ${
                ativo
                  ? "border-red-600 bg-red-900/10 text-white"
                  : "border-transparent text-zinc-600 hover:bg-zinc-900/30 hover:text-zinc-300"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="mt-auto border-t border-zinc-900 pt-6 text-[7px] leading-loose tracking-widest text-zinc-800 uppercase">
        SYSTEM STATUS: ONLINE
        <br />
        READY FOR OPERATIONS
      </div>
    </aside>
  );
}
