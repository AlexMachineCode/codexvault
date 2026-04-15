"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

type ContentType = "background" | "skills" | "abilities" | "items";

export default function ContentList({ type }: { type: ContentType }) {
  const { data, isLoading } = api.content.getByType.useQuery({ type });

  const [filtroTexto, setFiltroTexto] = useState("");
  const [itemAberto, setItemAberto] = useState<number | null>(null);

  if (isLoading) {
    return <div className="p-10 text-zinc-500">Loading...</div>;
  }

  const dadosFiltrados = data?.filter((item) =>
    item.title.toLowerCase().includes(filtroTexto.toLowerCase()),
  );

  return (
    <div className="animate-in fade-in p-10 text-white duration-500">
      {/* HEADER */}
      <header className="mb-10 border-b border-zinc-900 pb-6">
        <h2 className="text-3xl font-black tracking-tighter uppercase italic">
          {type}
        </h2>
      </header>

      {/* 🔍 FILTRO */}
      <div className="mb-8">
        <input
          type="text"
          placeholder={`Buscar ${type}...`}
          value={filtroTexto}
          onChange={(e) => {
            setFiltroTexto(e.target.value);
            setItemAberto(null);
          }}
          className="w-full border border-zinc-800 bg-zinc-950 px-4 py-3 text-white outline-none placeholder:text-zinc-600 focus:border-red-700"
        />
      </div>

      {/* 📋 LISTA */}
      <div className="space-y-2">
        {dadosFiltrados && dadosFiltrados.length > 0 ? (
          dadosFiltrados.map((item) => {
            const aberto = itemAberto === item.id;

            return (
              <div
                key={item.id}
                className="border border-zinc-900 bg-zinc-900/5"
              >
                <button
                  onClick={() => setItemAberto(aberto ? null : item.id)}
                  className="flex w-full items-center gap-5 px-6 py-4 text-left"
                >
                  {/* SETA */}
                  <span
                    className={`text-red-700 transition ${
                      aberto ? "rotate-180" : "rotate-90"
                    }`}
                  >
                    ^
                  </span>

                  {/* TITULO */}
                  <div>
                    <h3
                      className={`text-lg font-bold uppercase ${
                        aberto ? "text-white" : "text-zinc-400"
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>
                </button>

                {/* CONTEÚDO */}
                {aberto && (
                  <div className="space-y-2 pr-8 pb-6 pl-16">
                    <p className="whitespace-pre-line text-zinc-400">
                      {item.description}
                    </p>

                    {item.effect && (
                      <p className="text-red-400">
                        <b>Effect:</b> {item.effect}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="py-20 text-center text-zinc-700">
            Nenhum registro encontrado.
          </div>
        )}
      </div>
    </div>
  );
}
