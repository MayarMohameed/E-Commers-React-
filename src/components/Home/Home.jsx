import { Link } from "react-router-dom";
import { CatogarySlider } from "../CatogarySlider/CatogarySlider.jsx";
import RecentPorducts from "../RecentPorducts/RecentPoducts.jsx";
import { useMayar } from "../../Hooks/useMayar.jsx";

export default function Home() {
  const { data, isLoading } = useMayar();
  const products = data?.data?.products || [];
  const featuredProduct = products.length > 0 ? products[0] : null;
  const discount = featuredProduct?.discountPercentage
    ? Math.round(featuredProduct.discountPercentage)
    : 20;
  const originalPrice =
    featuredProduct && discount
      ? (featuredProduct.price / (1 - discount / 100)).toFixed(2)
      : null;

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-900 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 rounded-b-3xl sm:rounded-b-[2.5rem] shadow-xl">
        {/* Background glow effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Discover Quality Products For{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                Every Lifestyle
              </span>
            </h1>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/products"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm transition-all duration-200 shadow-lg shadow-emerald-500/25 flex items-center gap-2 active:scale-95"
              >
                <span>Shop All Products</span>
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </Link>
              <Link
                to="/catogary"
                className="px-8 py-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-white font-bold text-sm border border-slate-700 transition-all duration-200 flex items-center gap-2 active:scale-95"
              >
                <span>Explore Categories</span>
              </Link>
            </div>

          </div>

          {/* Dynamic Hero Visual Card from API */}
          <div className="lg:col-span-5 relative flex justify-center">
            {isLoading || !featuredProduct ? (
              <div className="w-full max-w-md h-96 bg-slate-800/80 rounded-3xl p-6 border border-slate-700 animate-pulse"></div>
            ) : (
              <div className="relative w-full max-w-md bg-gradient-to-tr from-slate-800 to-slate-850 p-6 rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    {featuredProduct.category || "Featured Deal"}
                  </span>
                  {discount && discount > 0 && (
                    <span className="bg-rose-500 text-white text-[11px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      Save {discount}%
                    </span>
                  )}
                </div>

                {/* Product Visual Mockup */}
                <div className="h-64 rounded-2xl bg-gradient-to-b from-slate-700/50 to-slate-900/60 flex items-center justify-center p-6 relative overflow-hidden group">
                  <Link to={`/productdetailes/${featuredProduct.id}`}>
                    <img
                      src={featuredProduct.thumbnail}
                      alt={featuredProduct.title}
                      className="max-h-52 object-contain filter drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                </div>

                <div className="mt-5 space-y-2">
                  <div className="flex justify-between items-center">
                    <Link to={`/productdetailes/${featuredProduct.id}`}>
                      <h3 className="text-lg font-bold text-white hover:text-emerald-400 transition-colors line-clamp-1">
                        {featuredProduct.title}
                      </h3>
                    </Link>
                    <div className="text-right shrink-0 ml-2">
                      <span className="text-xl font-black text-emerald-400">
                        ${featuredProduct.price}
                      </span>
                      {originalPrice && (
                        <span className="text-xs text-slate-500 line-through ml-2">
                          ${originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                    {featuredProduct.description}
                  </p>
                </div>

                {/* Floating trust badges */}
                <div className="mt-5 pt-4 border-t border-slate-700/60 flex justify-between items-center text-xs text-slate-300">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <i className="fa-solid fa-truck-fast"></i> In Stock & Ships Free
                  </span>
                  <Link
                    to={`/productdetailes/${featuredProduct.id}`}
                    className="text-xs font-bold text-white hover:text-emerald-400 transition-colors"
                  >
                    View Details <i className="fa-solid fa-arrow-right text-[10px]"></i>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trust & Value Proposition Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-emerald-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl shrink-0">
              <i className="fa-solid fa-truck-fast"></i>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Free Global Shipping</h4>
              <p className="text-slate-500 text-xs mt-0.5">On all orders over $50</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-emerald-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center text-xl shrink-0">
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Secure Checkout</h4>
              <p className="text-slate-500 text-xs mt-0.5">256-Bit SSL protection</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-emerald-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-xl shrink-0">
              <i className="fa-solid fa-rotate-left"></i>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">30-Day Returns</h4>
              <p className="text-slate-500 text-xs mt-0.5">100% money back policy</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-emerald-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-xl shrink-0">
              <i className="fa-solid fa-headset"></i>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">24/7 Dedicated Care</h4>
              <p className="text-slate-500 text-xs mt-0.5">Instant live chat & help</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CatogarySlider />
      </section>

      {/* Promotional Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-8 sm:p-12 relative overflow-hidden shadow-lg shadow-emerald-700/20">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="max-w-xl relative z-10 space-y-4">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-xs rounded-full text-xs font-black tracking-wider uppercase">
              Special Store Promotion
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Get 20% Off Your Entire Order
            </h2>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
              Use promo coupon code <strong className="bg-slate-900 text-emerald-300 px-2.5 py-1 rounded-md font-mono text-sm ml-1">MEMO20</strong> at checkout to claim your instant savings.
            </p>
            <div className="pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-emerald-900 font-black text-sm shadow-md hover:bg-emerald-50 transition-all active:scale-95"
              >
                <span>Claim Offer Now</span>
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RecentPorducts />
      </section>
    </div>
  );
}