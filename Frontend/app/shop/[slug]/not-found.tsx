import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-white px-4 text-center">
      <div>
        <h1 className="text-3xl font-black text-black">Mangga tidak ditemukan</h1>
        <p className="mt-2 text-stone-600">Produk ini mungkin sudah tidak dijual.</p>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-full bg-[#FFA800] px-6 py-2 font-bold text-black"
        >
          Kembali ke Shop
        </Link>
      </div>
    </main>
  );
}
