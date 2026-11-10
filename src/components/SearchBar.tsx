"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const keyword = query.trim();

    if (!keyword) {
      return;
    }

    router.push(`/shop?q=${encodeURIComponent(keyword)}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      role="search"
      className="flex w-full max-w-2xl gap-2"
    >
      <div className="relative flex-1">
        <span
          className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
          aria-hidden="true"
        >
          🔍
        </span>

        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Cari mangga favoritmu..."
          aria-label="Cari produk mangga"
          className="w-full rounded-full border border-orange-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-stone-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
        />
      </div>

      <button
        type="submit"
        disabled={!query.trim()}
        className="rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Cari
      </button>
    </form>
  );
}
