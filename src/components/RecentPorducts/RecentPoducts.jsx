import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { CartContext } from "../../Context/CartContext.jsx";
import { useMayar } from "../../Hooks/useMayar.jsx";

export default function RecentPorducts() {
  const { addToCart, toggleWishlist, isInWishlist } = useContext(CartContext);
  const [addingId, setAddingId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const { data, error, isError, isLoading } = useMayar();

  async function handleAddToCart(e, product) {
    e.preventDefault();
    e.stopPropagation();
    setAddingId(product.id);
    try {
      const response = await addToCart(product.id, product);
      if (response?.status === 201 || response?.status === 200) {
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

  if (isLoading) {
    return (
      <div className="py-12">
        <div className="flex justify-between items-center mb-8">
          <div className="h-8 w-48 bg-slate-200 animate-pulse rounded-lg"></div>
          <div className="h-8 w-32 bg-slate-200 animate-pulse rounded-lg"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 border border-slate-200 space-y-4 animate-pulse"
            >
              <div className="h-48 bg-slate-200 rounded-xl"></div>
              <div className="h-4 bg-slate-200 rounded w-1/3"></div>
              <div className="h-5 bg-slate-200 rounded w-3/4"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              <div className="h-10 bg-slate-200 rounded-xl"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center mx-auto mb-4 text-2xl">
          <i className="fa-solid fa-triangle-exclamation"></i>
        </div>
        <h3 className="text-lg font-bold text-slate-900">Failed to load products</h3>
        <p className="text-slate-500 text-sm mt-1">{error?.message || "Please check your network connection."}</p>
      </div>
    );
  }

  const products = data?.data?.products || [];

  // Filter products by selected category pill
  const filteredProducts =
    activeFilter === "all"
      ? products
      : products.filter((p) => p.category?.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section className="py-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-100 text-emerald-800">
            <i className="fa-solid fa-fire text-amber-500"></i> Hot Trends
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-2">
            Trending Products
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Top rated picks from our verified suppliers at unbeatable prices.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {[
            { id: "all", label: "All Items" },
            { id: "beauty", label: "Beauty" },
            { id: "fragrances", label: "Fragrances" },
            { id: "furniture", label: "Furniture" },
            { id: "groceries", label: "Groceries" },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setActiveFilter(pill.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeFilter === pill.id
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
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

                  {/* Discount Badge */}
                  {discount && discount > 0 && (
                    <span className="absolute top-3 left-3 bg-rose-500 text-white text-[11px] font-black px-2 py-0.5 rounded-lg shadow-xs">
                      -{discount}%
                    </span>
                  )}

                  {/* Wishlist Button */}
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
                  {/* Category & Rating */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {product.category || "General"}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-semibold text-slate-700">
                      <i className="fa-solid fa-star text-amber-400 text-xs"></i>
                      <span>{product.rating || "4.5"}</span>
                    </div>
                  </div>

                  {/* Product Title */}
                  <Link to={`/productdetailes/${product.id}`}>
                    <h3 className="font-bold text-slate-800 group-hover:text-emerald-600 transition-colors text-base line-clamp-1">
                      {product.title}
                    </h3>
                  </Link>

                  {/* Description snippet */}
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

      {/* Bottom CTA to view all */}
      <div className="text-center mt-12">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white border border-slate-300 hover:border-emerald-600 text-slate-800 hover:text-emerald-700 font-bold text-sm shadow-xs hover:shadow-md transition-all duration-200"
        >
          <span>View All 100+ Products</span>
          <i className="fa-solid fa-arrow-right text-xs"></i>
        </Link>
      </div>
    </section>
  );
}