"use client";

import { useEffect } from "react";

export default function ScrollFx() {
  useEffect(() => {
    const root = document.documentElement;

    const targets = () =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-fx]"));

    // Browser lama: biarkan semuanya terlihat (tanpa animasi)
    if (!("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            el.setAttribute("data-in", "1");
          } else {
            el.setAttribute(
              "data-in",
              entry.boundingClientRect.top < 0 ? "above" : "below"
            );
          }
        });
      },
      { rootMargin: "-6% 0px -6% 0px", threshold: 0 }
    );

    targets().forEach((el) => io.observe(el));

    // Elemen yang muncul belakangan (misalnya kartu produk saat ganti halaman)
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) =>
        m.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches("[data-fx]")) io.observe(node);
          node
            .querySelectorAll<HTMLElement>("[data-fx]")
            .forEach((child) => io.observe(child));
        })
      );
    });

    mo.observe(document.body, { childList: true, subtree: true });

    // Aktifkan mode animasi SETELAH observer terpasang
    root.setAttribute("data-fx-ready", "");

    return () => {
      io.disconnect();
      mo.disconnect();
      root.removeAttribute("data-fx-ready");
    };
  }, []);

  return null;
}