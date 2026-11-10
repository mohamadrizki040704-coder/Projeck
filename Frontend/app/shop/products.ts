export type Product = {
  slug: string;
  name: string;
  price: number;
  supplier: string;
  address: string;
  image: string;
};

type RawProduct = Omit<Product, "slug">;

const raw: RawProduct[] = [
  { name: "Mangga Harum Manis", price: 20000, supplier: "Supplier Mangga A", address: "Indramayu, Jawa Barat", image: "/images/manggaHarumManis.png" },
  { name: "Mangga Manalagi", price: 22000, supplier: "Supplier Mangga B", address: "Majalengka, Jawa Barat", image: "/images/manggaManalagi.png" },
  { name: "Mangga Gedong Gincu", price: 52000, supplier: "Supplier Mangga C", address: "Cirebon, Jawa Barat", image: "/images/manggaGedongGincu.png" },
  { name: "Mangga Madu", price: 17000, supplier: "Supplier Mangga D", address: "Indramayu, Jawa Barat", image: "/images/manggaMadu.png" },
  { name: "Mangga Harum Manis", price: 21000, supplier: "Supplier Mangga E", address: "Majalengka, Jawa Barat", image: "/images/manggaHarumManis.png" },
  { name: "Mangga Manalagi", price: 23500, supplier: "Supplier Mangga F", address: "Cirebon, Jawa Barat", image: "/images/manggaManalagi.png" },
  { name: "Mangga Gedong Gincu", price: 48000, supplier: "Supplier Mangga G", address: "Subang, Jawa Barat", image: "/images/manggaGedongGincu.png" },
  { name: "Mangga Madu", price: 18500, supplier: "Supplier Mangga H", address: "Kuningan, Jawa Barat", image: "/images/manggaMadu.png" },
  { name: "Mangga Arumanis", price: 19000, supplier: "Supplier Mangga I", address: "Indramayu, Jawa Barat", image: "/images/manggaHarumManis.png" },
  { name: "Mangga Golek", price: 25000, supplier: "Supplier Mangga J", address: "Majalengka, Jawa Barat", image: "/images/manggaManalagi.png" },
  { name: "Mangga Arumanis", price: 20500, supplier: "Supplier Mangga K", address: "Subang, Jawa Barat", image: "/images/manggaHarumManis.png" },
  { name: "Mangga Golek", price: 26000, supplier: "Supplier Mangga L", address: "Kuningan, Jawa Barat", image: "/images/manggaManalagi.png" },
];

// Slug dibuat dari nama supplier (unik per produk), mis. "supplier-mangga-a"
const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const products: Product[] = raw.map((p) => ({
  ...p,
  slug: slugify(p.supplier),
}));

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

export const formatRupiah = (n: number) =>
  "Rp." + n.toLocaleString("id-ID") + "/Kg";

export const formatTotal = (n: number) =>
  "Rp." + Math.round(n).toLocaleString("id-ID");
