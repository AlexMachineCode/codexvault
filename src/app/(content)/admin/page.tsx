"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export default function AdminPage() {
  const utils = api.useUtils();

  const createMutation = api.content.create.useMutation({
    onSuccess: () => {
      utils.content.getByType.invalidate();
      alert("Criado com sucesso");
    },
  });

  const [form, setForm] = useState({
    title: "",
    description: "",
    effect: "",
    type: "abilities",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    createMutation.mutate({
      title: form.title,
      description: form.description,
      effect: form.effect || undefined,
      type: form.type as "background" | "skills" | "abilities" | "items",
    });
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-10 text-white">
      <h1 className="py-10 text-3xl font-black uppercase">Admin</h1>

      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        {/* TITLE */}
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border border-zinc-800 bg-zinc-950 p-3"
        />

        {/* DESCRIPTION */}
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border border-zinc-800 bg-zinc-950 p-3"
        />

        {/* EFFECT */}
        <input
          placeholder="Effect (optional)"
          value={form.effect}
          onChange={(e) => setForm({ ...form, effect: e.target.value })}
          className="w-full border border-zinc-800 bg-zinc-950 p-3"
        />

        {/* TYPE */}
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="w-full border border-zinc-800 bg-zinc-950 p-3"
        >
          <option value="abilities">Abilities</option>
          <option value="skills">Skills</option>
          <option value="background">Background</option>
          <option value="items">Items</option>
        </select>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-red-700 p-3 font-bold uppercase hover:bg-red-600"
        >
          Create
        </button>
      </form>
    </div>
  );
}
