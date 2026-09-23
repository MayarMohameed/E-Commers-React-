import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const categoryIconMap = {
  beauty: { icon: "fa-wand-magic-sparkles", color: "from-pink-500 to-rose-400" },
  fragrances: { icon: "fa-spray-can-sparkles", color: "from-purple-500 to-indigo-400" },
  furniture: { icon: "fa-couch", color: "from-amber-600 to-amber-400" },
  groceries: { icon: "fa-basket-shopping", color: "from-emerald-500 to-teal-400" },
  "home-decoration": { icon: "fa-house-chimney-window", color: "from-blue-500 to-cyan-400" },
  "kitchen-accessories": { icon: "fa-kitchen-set", color: "from-orange-500 to-amber-400" },
  laptops: { icon: "fa-laptop", color: "from-slate-700 to-slate-500" },
  "mens-shirts": { icon: "fa-shirt", color: "from-sky-600 to-blue-400" },
  "mens-shoes": { icon: "fa-shoe-prints", color: "from-indigo-600 to-violet-400" },
  "mens-watches": { icon: "fa-clock", color: "from-slate-800 to-zinc-600" },
  "mobile-accessories": { icon: "fa-headphones", color: "from-violet-600 to-fuchsia-400" },
  smartphones: { icon: "fa-mobile-screen", color: "from-blue-600 to-teal-400" },
  "sports-accessories": { icon: "fa-dumbbell", color: "from-red-500 to-orange-400" },
  sunglasses: { icon: "fa-glasses", color: "from-amber-500 to-yellow-400" },
  tablets: { icon: "fa-tablet-screen-button", color: "from-cyan-600 to-blue-500" },
  "womens-bags": { icon: "fa-bag-shopping", color: "from-rose-500 to-pink-400" },
  "womens-dresses": { icon: "fa-person-dress", color: "from-fuchsia-500 to-pink-400" },
  "womens-jewellery": { icon: "fa-gem", color: "from-emerald-600 to-cyan-400" },
  "womens-shoes": { icon: "fa-shoe-prints", color: "from-rose-400 to-orange-300" },
  "womens-watches": { icon: "fa-stopwatch", color: "from-amber-600 to-yellow-400" },
};

export function CatogarySlider() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((res) => {
        // DummyJSON returns array of objects or strings
        const raw = res.data;
        const normalized = Array.isArray(raw)
          ? raw.map((item) => {
              if (typeof item === "string") {
                return {
                  slug: item,
                  name: item.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
                };
              }
              return {
                slug: item.slug || item.name.toLowerCase().replace(/ /g, "-"),
                name: item.name,
              };
            })
          : [];
        setCategories(normalized.slice(0, 16));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load categories", err);
        setLoading(false);
      });
  }, []);

  function scroll(direction) {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth / 1.5 : clientWidth / 1.5;
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  }

  if (loading) {
    return (
      <div className="py-6 flex gap-4 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="w-36 h-28 bg-slate-200 animate-pulse rounded-2xl shrink-0"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-bold text-emerald-600 tracking-wider uppercase">
            Browse By Category
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Explore Popular Departments
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-9 h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-all shadow-xs active:scale-95"
            aria-label="Scroll left"
          >
            <i className="fa-solid fa-chevron-left text-xs"></i>
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-9 h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-all shadow-xs active:scale-95"
            aria-label="Scroll right"
          >
            <i className="fa-solid fa-chevron-right text-xs"></i>
          </button>
          <Link
            to="/catogary"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 ml-2"
          >
            View All <i className="fa-solid fa-arrow-right text-[10px]"></i>
          </Link>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div
        ref={scrollRef}
        className="flex items-center gap-4 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((cat) => {
          const config = categoryIconMap[cat.slug] || {
            icon: "fa-tag",
            color: "from-emerald-500 to-teal-400",
          };
          return (
            <Link
              key={cat.slug}
              to={`/products?category=${cat.slug}`}
              className="group shrink-0 flex flex-col items-center justify-center w-36 sm:w-40 p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-300 text-center"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${config.color} text-white flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform duration-300`}
              >
                <i className={`fa-solid ${config.icon}`}></i>
              </div>
              <h3 className="mt-3 text-xs sm:text-sm font-bold text-slate-800 group-hover:text-emerald-600 transition-colors line-clamp-1">
                {cat.name}
              </h3>
              <span className="text-[11px] text-slate-400 font-medium mt-0.5">
                Explore items
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}