"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

type ContentType = "background" | "skills" | "abilities" | "items";

export default function ContentList({ type }: { type: ContentType }) {
  const { data, isLoading } = api.content.getByType.useQuery({ type });

  const [filtroTexto, setFiltroTexto] = useState("");
  const [itemAberto, setItemAberto] = useState<number | null>(null);

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [formEdit, setFormEdit] = useState({
    title: "",
    description: "",
    effect: "",
  });

  const utils = api.useUtils();

  // DELETE
  const deleteMutation = api.content.delete.useMutation({
    onSuccess: () => {
      utils.content.getByType.invalidate();
    },
  });

  // UPDATE
  const updateMutation = api.content.update.useMutation({
    onSuccess: () => {
      utils.content.getByType.invalidate();
      setEditandoId(null);
    },
  });

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

      {/* FILTRO */}
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

      {/* LISTA */}
      <div className="space-y-2">
        {dadosFiltrados && dadosFiltrados.length > 0 ? (
          dadosFiltrados.map((item) => {
            const aberto = itemAberto === item.id;
            const editando = editandoId === item.id;

            return (
              <div
                key={item.id}
                className="border border-zinc-900 bg-zinc-900/5"
              >
                {/* HEADER ITEM */}
                <div className="flex items-center justify-between px-6 py-4">
                  {/* ABRIR */}
                  <button
                    onClick={() => setItemAberto(aberto ? null : item.id)}
                    className="flex items-center gap-5 text-left"
                  >
                    <span
                      className={`text-red-700 transition ${
                        aberto ? "rotate-180" : "rotate-90"
                      }`}
                    >
                      ^
                    </span>

                    <h3
                      className={`text-lg font-bold uppercase ${
                        aberto ? "text-white" : "text-zinc-400"
                      }`}
                    >
                      {item.title}
                    </h3>
                  </button>

                  {/* AÇÕES */}
                  <div className="flex gap-3">
                    {/* EDIT */}
                    <button
                      onClick={() => {
                        setEditandoId(item.id);
                        setItemAberto(item.id);

                        setFormEdit({
                          title: item.title,
                          description: item.description,
                          effect: item.effect ?? "",
                        });
                      }}
                      className="text-xs text-blue-400 uppercase hover:text-blue-300"
                    >
                      Edit
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => {
                        const confirmDelete = confirm("Tem certeza?");
                        if (!confirmDelete) return;

                        deleteMutation.mutate({ id: item.id });
                      }}
                      disabled={deleteMutation.isPending}
                      className="text-xs text-red-500 uppercase hover:text-red-400 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* CONTEÚDO */}
                {aberto && (
                  <>
                    {editando ? (
                      <div className="space-y-3 pr-8 pb-6 pl-16">
                        {/* TITLE */}
                        <input
                          value={formEdit.title}
                          onChange={(e) =>
                            setFormEdit({
                              ...formEdit,
                              title: e.target.value,
                            })
                          }
                          className="w-full border border-zinc-800 bg-zinc-950 p-2"
                        />

                        {/* DESCRIPTION */}
                        <textarea
                          value={formEdit.description}
                          onChange={(e) =>
                            setFormEdit({
                              ...formEdit,
                              description: e.target.value,
                            })
                          }
                          className="w-full border border-zinc-800 bg-zinc-950 p-2"
                        />

                        {/* EFFECT */}
                        <input
                          value={formEdit.effect}
                          onChange={(e) =>
                            setFormEdit({
                              ...formEdit,
                              effect: e.target.value,
                            })
                          }
                          className="w-full border border-zinc-800 bg-zinc-950 p-2"
                        />

                        {/* BOTÕES */}
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              updateMutation.mutate({
                                id: item.id,
                                title: formEdit.title,
                                description: formEdit.description,
                                effect: formEdit.effect || undefined,
                                type,
                              })
                            }
                            disabled={updateMutation.isPending}
                            className="bg-green-600 px-3 py-1 text-xs uppercase disabled:opacity-50"
                          >
                            Save
                          </button>

                          <button
                            onClick={() => setEditandoId(null)}
                            className="bg-zinc-700 px-3 py-1 text-xs uppercase"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
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
                  </>
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
