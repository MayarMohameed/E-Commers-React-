import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const categoryMeta = {
  beauty: { icon: "fa-wand-magic-sparkles", bg: "from-pink-500 to-rose-500", desc: "Skincare, cosmetics, and makeup essentials" },
  fragrances: { icon: "fa-spray-can-sparkles", bg: "from-purple-500 to-indigo-600", desc: "Luxury perfumes and eau de parfum" },
  furniture: { icon: "fa-couch", bg: "from-amber-600 to-amber-500", desc: "Modern home, living room, and office furniture" },
  groceries: { icon: "fa-basket-shopping", bg: "from-emerald-500 to-teal-600", desc: "Fresh organic food, snacks, and daily essentials" },
  "home-decoration": { icon: "fa-house-chimney-window", bg: "from-blue-500 to-cyan-600", desc: "Interior design, wall art, and ambient lighting" },
  "kitchen-accessories": { icon: "fa-kitchen-set", bg: "from-orange-500 to-amber-600", desc: "Cookware, dining sets, and smart appliances" },
  laptops: { icon: "fa-laptop", bg: "from-slate-800 to-slate-700", desc: "High performance ultrabooks and gaming laptops" },
  "mens-shirts": { icon: "fa-shirt", bg: "from-sky-600 to-blue-600", desc: "Casual and formal designer menswear" },
  "mens-shoes": { icon: "fa-shoe-prints", bg: "from-indigo-600 to-violet-600", desc: "Sneakers, boots, and classic leather shoes" },
  "mens-watches": { icon: "fa-clock", bg: "from-zinc-800 to-slate-900", desc: "Luxury chronographs and smart watches" },
  "mobile-accessories": { icon: "fa-headphones", bg: "from-violet-600 to-fuchsia-600", desc: "Wireless earbuds, chargers, cases, and cords" },
  motorcycle: { icon: "fa-motorcycle", bg: "from-red-600 to-orange-600", desc: "Bikes, protective helmets, and rider gear" },
  "skin-care": { icon: "fa-spa", bg: "from-teal-500 to-emerald-600", desc: "Dermatologist-approved serums and lotions" },
  smartphones: { icon: "fa-mobile-screen", bg: "from-blue-600 to-indigo-700", desc: "Latest flagship 5G mobile devices" },
  "sports-accessories": { icon: "fa-dumbbell", bg: "from-red-500 to-rose-600", desc: "Fitness equipment, yoga mats, and gym gear" },
  sunglasses: { icon: "fa-glasses", bg: "from-amber-500 to-yellow-500", desc: "UV protection shades and designer eyewear" },
  tablets: { icon: "fa-tablet-screen-button", bg: "from-cyan-600 to-blue-600", desc: "Portable pads for drawing, work, and gaming" },
  tops: { icon: "fa-vest", bg: "from-rose-500 to-pink-500", desc: "Trendy tops, tees, blouses, and knitwear" },
  vehicle: { icon: "fa-car", bg: "from-slate-700 to-zinc-800", desc: "Automotive accessories, parts, and tools" },
  "womens-bags": { icon: "fa-bag-shopping", bg: "from-pink-600 to-rose-600", desc: "Handbags, crossbodies, and designer totes" },
  "womens-dresses": { icon: "fa-person-dress", bg: "from-fuchsia-600 to-pink-600", desc: "Evening gowns, casual summer dresses, and more" },
  "womens-jewellery": { icon: "fa-gem", bg: "from-emerald-600 to-teal-500", desc: "Sterling silver, gold, and crystal accessories" },
  "womens-shoes": { icon: "fa-shoe-prints", bg: "from-rose-500 to-orange-400", desc: "Heels, flats, and comfortable daily footwear" },
  "womens-watches": { icon: "fa-stopwatch", bg: "from-amber-600 to-yellow-500", desc: "Elegant wristwatches and jewelry timepieces" },
};

export default function Catogary() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((res) => {
        const raw = res.data || [];
        const norm = Array.isArray(raw)
          ? raw.map((c) =>
              typeof c === "string"
                ? { slug: c, name: c.replace(/-/g, " ").replace(/\b\w/g, (x) => x.toUpperCase()) }
                : { slug: c.slug || c.name.toLowerCase().replace(/ /g, "-"), name: c.name }
            )
          : [];
        setCategories(norm);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load categories", err);
        setLoading(false);
      });
  }, []);

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
            All Departments
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Browse Product Categories
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Find exactly what you're looking for organized by curated departments. Explore verified brands and unbeatable prices.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </div>

      {/* Search Input for categories */}
      <div className="max-w-md mx-auto relative">
        <input
          type="text"
          placeholder="Filter categories (e.g., Laptops, Beauty, Furniture)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-slate-200 text-sm rounded-2xl py-3 pl-11 pr-4 text-slate-800 shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all"
        />
        <i className="fa-solid fa-magnifying-glass absolute left-4 top-3.5 text-slate-400 text-sm"></i>
      </div>

      {/* Categories Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="h-44 bg-slate-200 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((cat) => {
            const meta = categoryMeta[cat.slug] || {
              icon: "fa-tag",
              bg: "from-emerald-500 to-teal-600",
              desc: "Quality collection curated for high satisfaction",
            };
            return (
              <Link
                key={cat.slug}
                to={`/products?category=${cat.slug}`}
                className="group bg-white rounded-2xl border border-slate-200/80 p-6 hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${meta.bg} text-white flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform duration-300`}
                    >
                      <i className={`fa-solid ${meta.icon}`}></i>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-emerald-50 text-slate-400 group-hover:text-emerald-600 flex items-center justify-center transition-colors">
                      <i className="fa-solid fa-arrow-right text-xs"></i>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-slate-500 text-xs mt-1.5 leading-relaxed line-clamp-2">
                    {meta.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-600 font-bold group-hover:underline">
                    Explore Products
                  </span>
                  <span className="text-slate-400 font-medium">In Stock</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}