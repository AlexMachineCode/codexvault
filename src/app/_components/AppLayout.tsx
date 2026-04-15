"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import Home from "./home";

export default function AppLayout() {
  const [abaAtiva, setAbaAtiva] = useState("home");

  return (
    <main className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar abaAtiva={abaAtiva} setAbaAtiva={setAbaAtiva} />

      <div className="flex-1">
        {abaAtiva === "home" && <Home />}
        {abaAtiva === "background" && <h1>Backgrounds</h1>}
        {abaAtiva === "skills" && <h1>Skills</h1>}
        {abaAtiva === "abilities" && <h1>Abilities</h1>}
        {abaAtiva === "items" && <h1>Items</h1>}
      </div>
    </main>
  );
}
