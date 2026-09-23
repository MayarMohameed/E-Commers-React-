import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Catogary() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
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
        console.error("Failed to load categories from API", err);
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

      {/* Categories Grid from API */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-40 bg-slate-200 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((cat) => (
            <Link
              key={cat.slug}
              to={`/products?category=${cat.slug}`}
              className="group bg-white rounded-2xl border border-slate-200/80 p-6 hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl shadow-xs group-hover:scale-110 transition-transform duration-300">
                    <i className="fa-solid fa-layer-group"></i>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-emerald-50 text-slate-400 group-hover:text-emerald-600 flex items-center justify-center transition-colors">
                    <i className="fa-solid fa-arrow-right text-xs"></i>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  {cat.name}
                </h3>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-emerald-600 font-bold group-hover:underline">
                  Explore Products
                </span>
                <span className="text-slate-400 font-medium">From Store API</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}