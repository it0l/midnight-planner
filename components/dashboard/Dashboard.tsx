"use client";

import { FormEvent, useMemo, useState } from "react";
import { LogOut, Moon, Pencil, Plus, Save, Trash2, X } from "lucide-react";

type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  email: string;
  initialNotes: Note[];
};

export default function Dashboard({ email, initialNotes }: Props) {
  const [notes, setNotes] = useState(initialNotes);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const lastUpdated = useMemo(() => {
    if (!notes.length) return "No notes yet";
    return `Last update ${new Date(notes[0].updatedAt).toLocaleDateString()}`;
  }, [notes]);

  async function createNote(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");

    const response = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    const data = await response.json();

    if (response.ok) {
      setNotes((current) => [data.note, ...current]);
      setTitle("");
      setContent("");
    } else {
      setMessage(data.error ?? "Unable to create note.");
    }
    setBusy(false);
  }

  function beginEdit(note: Note) {
    setEditingId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
    setMessage("");
  }

  async function saveEdit(id: string) {
    setBusy(true);
    const response = await fetch(`/api/notes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editTitle, content: editContent }),
    });
    const data = await response.json();

    if (response.ok) {
      setNotes((current) => [
        data.note,
        ...current.filter((note) => note.id !== id),
      ]);
      setEditingId(null);
    } else {
      setMessage(data.error ?? "Unable to update note.");
    }
    setBusy(false);
  }

  async function deleteNote(id: string) {
    setBusy(true);
    const response = await fetch(`/api/notes/${id}`, { method: "DELETE" });
    if (response.ok) {
      setNotes((current) => current.filter((note) => note.id !== id));
      if (editingId === id) setEditingId(null);
    } else {
      setMessage("Unable to delete note.");
    }
    setBusy(false);
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  }

  return (
    <main className="min-h-screen bg-[#070707] text-zinc-100">
      <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">
        <header className="mb-10 flex flex-col gap-5 border-b border-zinc-800 pb-7 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-amber-200">
              <Moon size={18} />
              <span className="text-xs font-semibold uppercase tracking-[0.25em]">Midnight Planner</span>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Your quiet workspace.</h1>
            <p className="mt-2 text-sm text-zinc-500">{email} · {lastUpdated}</p>
          </div>
          <button
            onClick={logout}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 px-4 py-2.5 text-sm text-zinc-300 transition hover:border-zinc-600 hover:bg-zinc-900"
          >
            <LogOut size={16} /> Sign out
          </button>
        </header>

        <section className="grid gap-8 lg:grid-cols-[360px_1fr]">
          <form onSubmit={createNote} className="h-fit rounded-2xl border border-zinc-800 bg-zinc-950 p-5 lg:sticky lg:top-8">
            <div className="mb-5 flex items-center gap-2">
              <Plus size={17} className="text-amber-200" />
              <h2 className="font-medium">New note</h2>
            </div>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              maxLength={100}
              placeholder="Title"
              className="mb-3 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
              required
            />
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              maxLength={5000}
              rows={8}
              placeholder="Write what matters tonight..."
              className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
            />
            <button
              disabled={busy}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-100 px-4 py-3 text-sm font-medium text-zinc-950 transition hover:bg-white disabled:opacity-50"
            >
              <Plus size={16} /> Add note
            </button>
            {message && <p className="mt-3 text-sm text-rose-300">{message}</p>}
          </form>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-medium">Notes</h2>
              <span className="text-xs text-zinc-600">{notes.length} saved</span>
            </div>

            {!notes.length ? (
              <div className="rounded-2xl border border-dashed border-zinc-800 px-6 py-16 text-center text-sm text-zinc-600">
                Your workspace is empty. Create the first note when you are ready.
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {notes.map((note) => {
                  const editing = editingId === note.id;
                  return (
                    <article key={note.id} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 shadow-[0_12px_45px_rgba(0,0,0,0.22)]">
                      {editing ? (
                        <>
                          <input
                            value={editTitle}
                            onChange={(event) => setEditTitle(event.target.value)}
                            className="mb-3 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm outline-none"
                          />
                          <textarea
                            value={editContent}
                            onChange={(event) => setEditContent(event.target.value)}
                            rows={7}
                            className="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm leading-6 outline-none"
                          />
                          <div className="mt-4 flex gap-2">
                            <button onClick={() => saveEdit(note.id)} disabled={busy} className="inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-3 py-2 text-xs font-medium text-zinc-950">
                              <Save size={14} /> Save
                            </button>
                            <button onClick={() => setEditingId(null)} className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 px-3 py-2 text-xs text-zinc-400">
                              <X size={14} /> Cancel
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="font-medium text-zinc-100">{note.title}</h3>
                            <span className="whitespace-nowrap text-[11px] text-zinc-600">{new Date(note.updatedAt).toLocaleDateString()}</span>
                          </div>
                          <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-zinc-400">{note.content || "No additional text."}</p>
                          <div className="mt-5 flex gap-2 border-t border-zinc-900 pt-4">
                            <button onClick={() => beginEdit(note)} className="inline-flex items-center gap-1.5 text-xs text-zinc-500 transition hover:text-zinc-200">
                              <Pencil size={13} /> Edit
                            </button>
                            <button onClick={() => deleteNote(note.id)} disabled={busy} className="inline-flex items-center gap-1.5 text-xs text-zinc-600 transition hover:text-rose-300">
                              <Trash2 size={13} /> Delete
                            </button>
                          </div>
                        </>
                      )}
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
