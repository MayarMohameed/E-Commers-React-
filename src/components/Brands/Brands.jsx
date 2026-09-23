import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://dummyjson.com/products?limit=100")
      .then((res) => {
        const products = res.data?.products || [];
        const brandsMap = {};

        products.forEach((p) => {
          // Some products have empty brand, fallback to brand or capitalized category
          const brandName = p.brand ? p.brand.trim() : null;
          if (brandName) {
            if (!brandsMap[brandName]) {
              brandsMap[brandName] = {
                name: brandName,
                categories: new Set(),
                productsCount: 0,
                sampleProduct: p,
                ratings: [],
              };
            }
            if (p.category) brandsMap[brandName].categories.add(p.category);
            brandsMap[brandName].productsCount += 1;
            if (p.rating) brandsMap[brandName].ratings.push(p.rating);
          }
        });

        const list = Object.values(brandsMap).map((b) => {
          const avgRating =
            b.ratings.length > 0
              ? (b.ratings.reduce((acc, r) => acc + r, 0) / b.ratings.length).toFixed(1)
              : "4.8";
          return {
            name: b.name,
            categories: Array.from(b.categories).slice(0, 2).join(" • "),
            productsCount: `${b.productsCount} ${b.productsCount === 1 ? "Product" : "Products"}`,
            sampleProduct: b.sampleProduct,
            avgRating,
          };
        });

        // Sort by product count
        list.sort((a, b) => parseInt(b.productsCount) - parseInt(a.productsCount));
        setBrands(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load brands from API", err);
        setLoading(false);
      });
  }, []);

  const filtered = brands.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.categories.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
            API Verified Catalog
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Top Brands in Store
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Directly sourced brands and manufacturers from our global API catalog. Explore verified merchandise with full authenticity guarantee.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </div>

      {/* Search Input for brands */}
      <div className="max-w-md mx-auto relative">
        <input
          type="text"
          placeholder="Filter brands (e.g. Apple, Essence, Calvin Klein)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-slate-200 text-sm rounded-2xl py-3 pl-11 pr-4 text-slate-800 shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all"
        />
        <i className="fa-solid fa-magnifying-glass absolute left-4 top-3.5 text-slate-400 text-sm"></i>
      </div>

      {/* Brands Grid from API */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-56 bg-slate-200 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-2xl">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <h3 className="text-xl font-bold text-slate-900">No brands found</h3>
          <p className="text-slate-500 text-sm">Try searching with a different brand name.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((brand) => (
            <div
              key={brand.name}
              className="group bg-white rounded-2xl border border-slate-200/80 p-5 hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Brand Preview Image from API Product */}
                <div className="relative h-36 bg-slate-50 rounded-xl overflow-hidden mb-4 p-3 flex items-center justify-center border border-slate-100">
                  <img
                    src={brand.sampleProduct?.thumbnail}
                    alt={brand.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full shadow-2xs">
                    <i className="fa-solid fa-star text-amber-400 text-[9px]"></i>
                    {brand.avgRating}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-black text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
                      {brand.name}
                    </h3>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      Verified
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 block capitalize truncate">
                    {brand.categories || "Multiple Departments"}
                  </span>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
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
      )}
    </div>
  );
}