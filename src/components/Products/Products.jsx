import { useState, useEffect, useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { CartContext } from "../../Context/CartContext.jsx";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");
  const [sortBy, setSortBy] = useState("featured");
  const [addingId, setAddingId] = useState(null);

  const { addToCart, toggleWishlist, isInWishlist } = useContext(CartContext);

  // Sync state if query params change
  useEffect(() => {
    const q = searchParams.get("search");
    const cat = searchParams.get("category");
    if (q !== null) setSearchQuery(q);
    if (cat !== null) setSelectedCategory(cat);
  }, [searchParams]);

  // Fetch all products and categories
  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get("https://dummyjson.com/products?limit=100"),
      axios.get("https://dummyjson.com/products/categories"),
    ])
      .then(([prodRes, catRes]) => {
        setProducts(prodRes.data?.products || []);
        const rawCats = catRes.data || [];
        const normCats = Array.isArray(rawCats)
          ? rawCats.map((c) =>
              typeof c === "string"
                ? { slug: c, name: c.replace(/-/g, " ").replace(/\b\w/g, (x) => x.toUpperCase()) }
                : { slug: c.slug || c.name.toLowerCase().replace(/ /g, "-"), name: c.name }
            )
          : [];
        setCategories(normCats);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load catalog data", err);
        setLoading(false);
      });
  }, []);

  async function handleAddToCart(e, product) {
    e.preventDefault();
    e.stopPropagation();
    setAddingId(product.id);
    try {
      const res = await addToCart(product.id, product);
      if (res?.status === 201 || res?.status === 200) {
        toast.success(`${product.title.slice(0, 20)}... added to cart!`);
      } else {
        toast.error("Failed to add to cart");
      }
    } catch {
      toast.error("Error adding product");
    } finally {
      setAddingId(null);
    }
  }

  function handleWishlistClick(e, productId) {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(productId);
    const added = !isInWishlist(productId);
    if (added) {
      toast.success("Added to wishlist ❤️");
    } else {
      toast("Removed from wishlist", { icon: "💔" });
    }
  }

  function resetFilters() {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("featured");
    setSearchParams({});
  }

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchCat =
        selectedCategory === "all" ||
        product.category?.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch =
        !searchQuery ||
        product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "discount") return (b.discountPercentage || 0) - (a.discountPercentage || 0);
      return 0; // featured default
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
            NovaStore Collection
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Explore All Products
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Browse through our expansive catalog of premium tech, fashion, cosmetics, and lifestyle goods.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <input
              type="text"
              placeholder="Search by title, brand, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl py-2.5 pl-10 pr-4 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all"
            />
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-3.5 text-slate-400 text-sm"></i>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-4">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSearchParams((prev) => {
                  const n = new URLSearchParams(prev);
                  if (e.target.value === "all") n.delete("category");
                  else n.set("category", e.target.value);
                  return n;
                });
              }}
              className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl py-2.5 px-3.5 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all cursor-pointer font-medium"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Selector */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl py-2.5 px-3.5 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all cursor-pointer font-medium"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>
        </div>

        {/* Counter and Active Filters */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
          <div>
            Showing <strong className="text-slate-800">{filteredProducts.length}</strong> of{" "}
            <strong className="text-slate-800">{products.length}</strong> products
          </div>
          {(searchQuery || selectedCategory !== "all" || sortBy !== "featured") && (
            <button
              onClick={resetFilters}
              className="text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 cursor-pointer"
            >
              <i className="fa-solid fa-rotate-left text-xs"></i> Reset All Filters
            </button>
          )}
        </div>
      </div>

      {/* Catalog Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 border border-slate-200 space-y-4 animate-pulse"
            >
              <div className="h-48 bg-slate-200 rounded-xl"></div>
              <div className="h-4 bg-slate-200 rounded w-1/3"></div>
              <div className="h-5 bg-slate-200 rounded w-3/4"></div>
              <div className="h-10 bg-slate-200 rounded-xl"></div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-2xl">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <h3 className="text-xl font-bold text-slate-900">No matching products found</h3>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            We couldn't find any products matching your current filters. Try searching with different keywords or reset your filters.
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs transition-all shadow-sm"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const discount = product.discountPercentage
              ? Math.round(product.discountPercentage)
              : null;
            const originalPrice = discount
              ? (product.price / (1 - discount / 100)).toFixed(2)
              : null;
            const isWishlisted = isInWishlist(product.id);

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
              >
                <div>
                  {/* Image Container with Badges */}
                  <div className="relative h-56 bg-slate-100 overflow-hidden">
                    <Link to={`/productdetailes/${product.id}`} className="block w-full h-full">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        loading="lazy"
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    {discount && discount > 0 && (
                      <span className="absolute top-3 left-3 bg-rose-500 text-white text-[11px] font-black px-2 py-0.5 rounded-lg shadow-xs">
                        -{discount}%
                      </span>
                    )}

                    <button
                      onClick={(e) => handleWishlistClick(e, product.id)}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isWishlisted
                          ? "bg-rose-50 text-rose-500 shadow-sm"
                          : "bg-white/90 backdrop-blur-xs text-slate-400 hover:text-rose-500 shadow-xs"
                      }`}
                      title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                    >
                      <i
                        className={`${
                          isWishlisted ? "fa-solid" : "fa-regular"
                        } fa-heart text-sm`}
                      ></i>
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {product.category || "General"}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-semibold text-slate-700">
                        <i className="fa-solid fa-star text-amber-400 text-xs"></i>
                        <span>{product.rating || "4.5"}</span>
                      </div>
                    </div>

                    <Link to={`/productdetailes/${product.id}`}>
                      <h3 className="font-bold text-slate-800 group-hover:text-emerald-600 transition-colors text-base line-clamp-1">
                        {product.title}
                      </h3>
                    </Link>

                    <p className="text-slate-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Price & Add to Cart */}
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-slate-400 block -mb-0.5 font-medium">Price</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-black text-slate-900">
                        ${product.price}
                      </span>
                      {originalPrice && (
                        <span className="text-xs text-slate-400 line-through">
                          ${originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    disabled={addingId === product.id}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-75"
                  >
                    {addingId === product.id ? (
                      <>
                        <i className="fa-solid fa-circle-notch fa-spin text-xs"></i>
                        <span>Adding...</span>
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-cart-plus text-xs"></i>
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}