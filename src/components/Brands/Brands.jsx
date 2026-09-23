import { useState } from "react";
import { Link } from "react-router-dom";

const brandsList = [
  {
    name: "Apple",
    category: "Smartphones & Laptops",
    icon: "fa-apple",
    isBrandIcon: true,
    color: "from-slate-900 to-slate-700",
    description: "Innovators in personal technology with iPhone, MacBook, and iPad ecosystems.",
    verified: true,
    productsCount: "48+ Products",
  },
  {
    name: "Samsung",
    category: "Smart Devices & Displays",
    icon: "fa-mobile-screen-button",
    color: "from-blue-600 to-indigo-700",
    description: "Global pioneer in mobile smartphones, QLED TVs, and smart home appliances.",
    verified: true,
    productsCount: "62+ Products",
  },
  {
    name: "Nike",
    category: "Sportswear & Footwear",
    icon: "fa-person-running",
    color: "from-orange-600 to-red-600",
    description: "World leader in performance athletic wear, lifestyle sneakers, and fitness gear.",
    verified: true,
    productsCount: "85+ Products",
  },
  {
    name: "L'Oréal",
    category: "Cosmetics & Skincare",
    icon: "fa-wand-magic-sparkles",
    color: "from-rose-500 to-pink-600",
    description: "World-renowned French beauty house crafting premium cosmetics and dermatologist care.",
    verified: true,
    productsCount: "35+ Products",
  },
  {
    name: "Sony",
    category: "Audio & Entertainment",
    icon: "fa-headphones",
    color: "from-slate-800 to-zinc-900",
    description: "Industry standard high-resolution wireless audio, noise cancellation, and gaming.",
    verified: true,
    productsCount: "40+ Products",
  },
  {
    name: "Dior",
    category: "Luxury Fragrances",
    icon: "fa-spray-can-sparkles",
    color: "from-purple-600 to-violet-700",
    description: "Iconic haute couture and signature French fragrances celebrated worldwide.",
    verified: true,
    productsCount: "28+ Products",
  },
  {
    name: "Rolex",
    category: "Luxury Watches",
    icon: "fa-crown",
    color: "from-amber-600 to-yellow-600",
    description: "Swiss luxury watchmaker renowned for precision chronometers and timeless elegance.",
    verified: true,
    productsCount: "18+ Products",
  },
  {
    name: "Dell",
    category: "Computers & Monitors",
    icon: "fa-laptop",
    color: "from-sky-600 to-blue-700",
    description: "Reliable business laptops, XPS ultrabooks, and high-definition office displays.",
    verified: true,
    productsCount: "32+ Products",
  },
  {
    name: "Gucci",
    category: "Fashion & Bags",
    icon: "fa-bag-shopping",
    color: "from-emerald-700 to-teal-800",
    description: "Italian luxury fashion house influential in modern leather goods and runway apparel.",
    verified: true,
    productsCount: "22+ Products",
  },
  {
    name: "Asus",
    category: "Gaming & Tech",
    icon: "fa-microchip",
    color: "from-red-600 to-rose-700",
    description: "Creator of ROG Republic of Gamers hardware, motherboards, and gaming rigs.",
    verified: true,
    productsCount: "29+ Products",
  },
  {
    name: "Zara",
    category: "Modern Apparel",
    icon: "fa-shirt",
    color: "from-zinc-800 to-slate-900",
    description: "Contemporary Spanish fashion retailer bringing runway trends to daily life.",
    verified: true,
    productsCount: "54+ Products",
  },
  {
    name: "Dyson",
    category: "Home & Care Tech",
    icon: "fa-wind",
    color: "from-fuchsia-600 to-pink-600",
    description: "Revolutionary engineering in cordless vacuums, supersonic hair care, and purifiers.",
    verified: true,
    productsCount: "16+ Products",
  },
];

export default function Brands() {
  const [search, setSearch] = useState("");

  const filtered = brandsList.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
            Official Partnerships
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Top Global Brands
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Shop directly from our verified brand partners. 100% authentic merchandise backed by official manufacturer warranties and fast shipping.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </div>

      {/* Search Input for brands */}
      <div className="max-w-md mx-auto relative">
        <input
          type="text"
          placeholder="Filter brands (e.g. Apple, Nike, Samsung)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-slate-200 text-sm rounded-2xl py-3 pl-11 pr-4 text-slate-800 shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all"
        />
        <i className="fa-solid fa-magnifying-glass absolute left-4 top-3.5 text-slate-400 text-sm"></i>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((brand) => (
          <div
            key={brand.name}
            className="group bg-white rounded-2xl border border-slate-200/80 p-6 hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${brand.color} text-white flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform duration-300`}
                >
                  <i
                    className={`${
                      brand.isBrandIcon ? "fa-brands" : "fa-solid"
                    } ${brand.icon}`}
                  ></i>
                </div>
                {brand.verified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    <i className="fa-solid fa-circle-check"></i> Verified
                  </span>
                )}
              </div>

              <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors">
                {brand.name}
              </h3>
              <span className="text-xs font-semibold text-emerald-600 block mt-0.5">
                {brand.category}
              </span>
              <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                {brand.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">
                {brand.productsCount}
              </span>
              <Link
                to={`/products?search=${encodeURIComponent(brand.name)}`}
                className="text-xs font-bold text-slate-900 hover:text-emerald-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
              >
                <span>View Products</span>
                <i className="fa-solid fa-arrow-right text-[10px]"></i>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}