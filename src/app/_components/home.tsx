"use client";

import { api } from "~/trpc/react";

export default function Home() {
  const mutation = api.content.create.useMutation();

  return (
    <div className="flex h-full w-full flex-col p-10">
      {/* BOTÃO DE TESTE */}
      <button
        onClick={() =>
          mutation.mutate({
            title: "Fireball",
            description: "Ataque mágico",
            effect: "20 de dano",
            type: "abilities",
          })
        }
        className="mb-6 w-fit rounded bg-red-600 px-4 py-2 text-sm font-bold"
      >
        Criar conteúdo teste
      </button>

      {/* Título */}
      <h1 className="text-3xl font-black tracking-tight text-white">
        Welcome to CodexVault
      </h1>

      {/* Subtítulo */}
      <p className="mt-2 max-w-xl text-sm text-zinc-400">
        A platform for managing and organizing structured content such as
        backgrounds, skills, abilities and items.
      </p>

      {/* Cards */}
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          { title: "Backgrounds", desc: "Manage user profiles and origins" },
          { title: "Skills", desc: "Track and organize abilities" },
          { title: "Abilities", desc: "Advanced actions and powers" },
          { title: "Items", desc: "Equipment and resources" },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 transition hover:border-red-600 hover:bg-zinc-900"
          >
            <h2 className="text-sm font-bold tracking-wide text-white">
              {item.title}
            </h2>
            <p className="mt-2 text-xs text-zinc-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
