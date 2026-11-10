"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Montserrat,
  Cormorant_Garamond,
  Chakra_Petch,
} from "next/font/google";
import anim from "./Animation.module.css";
import ScrollFx from "./ScrollFx";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "800", "900"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
});

const chakra = Chakra_Petch({
  subsets: ["latin"],
  weight: ["600", "700"],
});

type Product = {
  name: string;
  price: number;
  supplier: string;
  address: string;
  image: string;
};

const PER_PAGE = 4;

/* Jeda animasi (stagger) lewat CSS variable */
const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/* Posisi tiap kartu di desktop (persen dari panel oranye, sesuai desain) */
const CARD_POS = [
  "md:left-[6.1%] md:top-[4.3%]",
  "md:left-[43.8%] md:top-[4.3%]",
  "md:left-[6.1%] md:top-[52.2%]",
  "md:left-[43.8%] md:top-[52.2%]",
];

/* ---------- Kartu produk ---------- */
function ShopCard({
  product,
  pos,
  index,
}: {
  product: Product;
  pos: string;
  index: number;
}) {
  const price = `Rp.${product.price.toLocaleString("id-ID")}/Kg`;

  return (
    /* Pembungkus: posisi + animasi scroll */
    <div
      data-fx="zoom"
      className={`${anim.fx} h-32 md:absolute md:h-[44.6%] md:w-[34%] ${pos}`}
      style={d(index * 110)}
    >
      <Link
        href="/shop"
        aria-label={`${product.name}, ${price}, ${product.supplier}, ${product.address}`}
        className="flex h-full w-full items-center overflow-hidden rounded-[4rem] border-[6px] border-[#E39200] p-[2px] transition hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-black md:rounded-[6vw] md:border-[0.55vw] md:p-[0.15vw]"
        style={{
          background: "#FFA800",
          boxShadow:
            "inset 0 0 0.9vw rgba(150,80,0,0.5), 0 0.3vw 0.6vw rgba(150,80,0,0.2)",
        }}
      >
        {/* Kotak gambar */}
        <div className="relative h-full w-[40.5%] shrink-0 overflow-hidden rounded-[2.4rem] bg-white md:rounded-[2.8vw]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 768px) 14vw, 140px"
            className="object-cover"
          />
        </div>

        {/* Teks */}
        <div className="min-w-0 flex-1 pl-2.5 md:pl-[0.6vw]">
          <p className="text-[11px] font-extrabold uppercase leading-tight tracking-[0.05em] text-white md:whitespace-nowrap md:text-[1.05vw]">
            {product.name}
          </p>

          <p
            className={`${chakra.className} text-[20px] font-bold leading-[1.15] text-black md:whitespace-nowrap md:text-[2.5vw]`}
          >
            {price}
          </p>

          <p className="text-[10px] font-medium uppercase leading-snug tracking-[0.06em] text-white md:whitespace-nowrap md:text-[1.15vw] md:leading-[1.5]">
            {product.supplier}
          </p>

          <p className="text-[10px] font-medium uppercase leading-snug tracking-[0.06em] text-white md:whitespace-nowrap md:text-[1.15vw] md:leading-[1.5]">
            {product.address}
          </p>
        </div>
      </Link>
    </div>
  );
}

/* ---------- Tombol panah ---------- */
function Arrow({
  dir,
  onClick,
  disabled,
  className = "",
}: {
  dir: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
  className?: string;
}) {
  return (
    /* div luar: posisi | span: animasi fade | button: hover */
    <div className={className}>
      <span data-fx="fade" className={`${anim.fx} block`} style={d(250)}>
        <button
          type="button"
          onClick={onClick}
          disabled={disabled}
          aria-label={dir === "prev" ? "Produk sebelumnya" : "Produk berikutnya"}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white shadow-[0_4px_10px_rgba(0,0,0,0.25)] transition hover:scale-110 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-black disabled:opacity-40 disabled:hover:scale-100 md:h-[3.8vw] md:w-[3.8vw]"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-1/2 w-1/2"
            fill="none"
            stroke="#000"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {dir === "prev" ? (
              <path d="M20 12H4m6-6-6 6 6 6" />
            ) : (
              <path d="M4 12h16m-6-6 6 6-6 6" />
            )}
          </svg>
        </button>
      </span>
    </div>
  );
}

/* ---------- Section utama ---------- */
export default function ShopBeranda({ products }: { products: Product[] }) {
  const pages = Math.max(1, Math.ceil(products.length / PER_PAGE));
  const [page, setPage] = useState(0);

  const visible = products.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);
  const prev = () => setPage((p) => (p - 1 + pages) % pages);
  const next = () => setPage((p) => (p + 1) % pages);

  return (
    <section
      id="shop"
      aria-label="Shop beranda"
      className={`${montserrat.className} relative overflow-hidden bg-white`}
    >
      {/* Mangga potong di kanan: di atas panel, di bawah kolom pencarian */}
      <Image
        src="/images/manggaElement.png"
        alt=""
        aria-hidden="true"
        width={388}
        height={388}
        data-fx="right"
        className={`${anim.fx} pointer-events-none absolute right-[-13.3vw] top-[8.1vw] z-20 hidden h-auto w-[43.7vw] max-w-none md:block`}
        style={{
          ...d(300),
          filter: "drop-shadow(0 1.2vw 1.6vw rgba(120,60,0,0.3))",
        }}
      />

      {/* ===== Bagian atas: judul, pencarian, tagline ===== */}
      <div className="relative z-30 flex flex-col items-center gap-4 px-4 pb-4 pt-6 md:block md:h-[31vw] md:p-0">
        {/* Mangga utama kiri */}
        <Image
          src="/images/manggaLandingP.png"
          alt="Mangga Gedong Gincu dan potongan mangga segar"
          width={512}
          height={512}
          data-fx="left"
          className={`${anim.fx} h-auto w-[60vw] max-w-[260px] md:absolute md:left-[1.5vw] md:top-[1vw] md:w-[29vw] md:max-w-none`}
          style={{ filter: "drop-shadow(0 1vw 1.2vw rgba(80,40,0,0.2))" }}
        />

        {/* JURAGAN MANGGA REANG | SHOP BERANDA */}
        <div className="flex flex-col items-center gap-3 md:absolute md:left-[31vw] md:top-[5.6vw] md:flex-row md:gap-0">
          <svg
            viewBox="0 0 500 200"
            data-fx="left"
            className={`${anim.fx} block h-auto w-[85vw] max-w-[420px] overflow-visible md:w-[34.5vw] md:max-w-none`}
            style={d(100)}
            role="img"
            aria-label="Juragan Mangga Reang"
          >
            <defs>
              <filter
                id="shopReangShadow"
                x="-10%"
                y="-10%"
                width="120%"
                height="130%"
              >
                <feDropShadow
                  dx="0"
                  dy="4"
                  stdDeviation="4"
                  floodColor="#000"
                  floodOpacity="0.22"
                />
              </filter>
            </defs>

            <text
              x="0"
              y="64"
              fill="#000"
              fontSize="54"
              fontWeight="500"
              textLength="500"
              lengthAdjust="spacing"
              style={{ fontFamily: cormorant.style.fontFamily }}
            >
              JURAGAN MANGGA
            </text>

            <text
              x="0"
              y="168"
              fill="#FFA800"
              fontSize="112"
              fontWeight="900"
              textLength="496"
              lengthAdjust="spacing"
              filter="url(#shopReangShadow)"
              style={{ fontFamily: montserrat.style.fontFamily }}
            >
              REANG
            </text>

            <rect x="0" y="184" width="500" height="7" fill="#FFA800" />
          </svg>

          <div
            data-fx="fade"
            className={`${anim.fx} mx-[0.6vw] hidden h-[7.4vw] w-[0.25vw] bg-black md:block`}
            style={d(250)}
            aria-hidden="true"
          />

          <svg
            viewBox="0 0 430 200"
            data-fx="right"
            className={`${anim.fx} block h-auto w-[70vw] max-w-[340px] overflow-visible md:w-[29.8vw] md:max-w-none`}
            style={d(250)}
            role="img"
            aria-label="Shop Beranda"
          >
            <text
              x="0"
              y="135"
              fill="#000"
              fontSize="148"
              fontWeight="900"
              textLength="425"
              lengthAdjust="spacing"
              style={{
                fontFamily: montserrat.style.fontFamily,
                filter: "drop-shadow(0 4px 5px rgba(0,0,0,0.22))",
              }}
            >
              SHOP
            </text>

            <text
              x="12"
              y="190"
              fill="#111"
              fontSize="48"
              fontWeight="500"
              textLength="400"
              lengthAdjust="spacing"
              style={{ fontFamily: montserrat.style.fontFamily }}
            >
              BERANDA
            </text>
          </svg>
        </div>

        {/* Pencarian: dikirim ke halaman katalog /shop?q=... */}
        <form
          action="/shop"
          method="get"
          role="search"
          data-fx="up"
          className={`${anim.fx} z-30 flex h-11 w-full max-w-md items-center rounded-full border-[3px] border-black bg-white pl-5 pr-3 md:absolute md:left-[30.7vw] md:top-[20.8vw] md:h-[3.2vw] md:w-[64vw] md:max-w-none md:border-[0.25vw] md:pl-[2vw] md:pr-[1.2vw]`}
          style={d(150)}
        >
          <input
            type="search"
            name="q"
            aria-label="Cari mangga"
            placeholder="EKSPLORE RASA MANGGA DI BERBAGAI DAERAH"
            className="min-w-0 flex-1 bg-transparent text-xs uppercase tracking-wide text-black outline-none placeholder:text-neutral-400 md:text-[1.3vw]"
          />

          <button
            type="submit"
            aria-label="Cari"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full transition hover:scale-110 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-black md:h-[2.6vw] md:w-[2.6vw]"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-full w-full"
              fill="none"
              stroke="#000"
              strokeWidth="2.6"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="10" cy="10" r="6.5" fill="#111" />
              <path d="m15 15 6 6" />
            </svg>
          </button>
        </form>

        <p
          data-fx="up"
          className={`${anim.fx} text-center text-xs font-semibold uppercase tracking-wider text-black md:absolute md:left-[26.3vw] md:top-[25.3vw] md:w-[55vw] md:text-[1.7vw] md:leading-[1.25] md:tracking-[0.06em]`}
          style={d(300)}
        >
          Platform berbagai supplier buah mangga dengan
          <br className="hidden md:inline" /> cita rasa mangga dari seluruh
          nusantara
        </p>
      </div>

      {/* ===== Panel oranye ===== */}
      <div
        className="relative px-4 pb-8 pt-8 md:px-[2.5vw] md:pb-[3.8vw] md:pt-[2.5vw]"
        style={{
          background:
            "linear-gradient(180deg, #FFFFFF 0%, #FFB62E 9%, #FFA800 14%, #FFA800 100%)",
        }}
      >
        <div
          data-fx="up"
          className={`${anim.fx} relative rounded-[28px] p-4 md:h-[27.4vw] md:rounded-[4.8vw] md:p-0`}
          style={{
            background: "#FFA800",
            boxShadow:
              "inset 0 0 2.4vw 0.6vw #FFD84A, 0 1.4vw 3vw rgba(255,140,0,0.3)",
          }}
        >
          {/* Kartu produk (2 x 2 di desktop) */}
          <div className="grid grid-cols-1 gap-3 md:contents" aria-live="polite">
            {visible.map((product, i) => (
              <ShopCard
                key={product.name}
                product={product}
                pos={CARD_POS[i]}
                index={i}
              />
            ))}
          </div>

          {/* Panah kiri dan kanan */}
          <div className="mt-4 flex justify-center gap-4 md:contents">
            <Arrow
              dir="prev"
              onClick={prev}
              disabled={pages <= 1}
              className="md:absolute md:left-[3.2%] md:top-[52%] md:-translate-x-1/2 md:-translate-y-1/2"
            />

            <Arrow
              dir="next"
              onClick={next}
              disabled={pages <= 1}
              className="md:absolute md:left-[80.8%] md:top-[52%] md:-translate-x-1/2 md:-translate-y-1/2"
            />
          </div>

          {/* Tombol produk lainnya */}
          <div
            data-fx="up"
            className={`${anim.fx} mt-4 flex justify-center md:absolute md:left-[84%] md:top-[72%] md:mt-0 md:w-[13.7%]`}
            style={d(400)}
          >
            <Link
              href="/shop"
              className={`${chakra.className} whitespace-nowrap rounded-full bg-black px-5 py-2 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-neutral-800 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-white md:w-full md:px-0 md:py-[0.3vw] md:text-center md:text-[1.25vw]`}
            >
              Produk lainnya
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}