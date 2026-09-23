import { Link } from "react-router-dom";
import { CatogarySlider } from "../CatogarySlider/CatogarySlider.jsx";
import RecentPorducts from "../RecentPorducts/RecentPoducts.jsx";

export default function Home() {
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              New Collection 2026 Live
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Discover Quality Products For{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                Every Lifestyle
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Explore thousands of hand-selected products from the world's best brands. Enjoy guaranteed authenticity, lightning-fast delivery, and premium 24/7 service.
            </p>

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

            {/* Trust customer review snippet */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-6 border-t border-slate-800">
              <div className="flex -space-x-2">
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-slate-900 object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Customer"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-slate-900 object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Customer"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-slate-900 object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                  alt="Customer"
                />
                <div className="h-9 w-9 rounded-full bg-emerald-500/20 text-emerald-300 ring-2 ring-slate-900 flex items-center justify-center text-xs font-bold">
                  +12k
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400 text-xs">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <span className="text-white font-bold ml-1">4.9 / 5.0</span>
                </div>
                <p className="text-slate-400 text-xs mt-0.5">
                  Over 12,000+ satisfied customers worldwide
                </p>
              </div>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md bg-gradient-to-tr from-slate-800 to-slate-850 p-6 rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Featured Deal
                </span>
                <span className="bg-rose-500 text-white text-[11px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Save 40%
                </span>
              </div>

              {/* Product Visual Mockup */}
              <div className="h-64 rounded-2xl bg-gradient-to-b from-slate-700/50 to-slate-900/60 flex items-center justify-center p-6 relative overflow-hidden group">
                <img
                  src="https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png"
                  alt="Hero Product"
                  className="max-h-52 object-contain filter drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="mt-5 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white">Essence Lash Princess</h3>
                  <div className="text-right">
                    <span className="text-xl font-black text-emerald-400">$9.99</span>
                    <span className="text-xs text-slate-500 line-through ml-2">$16.99</span>
                  </div>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Cruelty-free cosmetics featuring dramatic volume and sculpted length.
                </p>
              </div>

              {/* Floating trust badges */}
              <div className="mt-5 pt-4 border-t border-slate-700/60 flex justify-between items-center text-xs text-slate-300">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <i className="fa-solid fa-truck-fast"></i> In Stock & Ships Free
                </span>
                <Link
                  to="/products"
                  className="text-xs font-bold text-white hover:text-emerald-400 transition-colors"
                >
                  Quick View <i className="fa-solid fa-arrow-right text-[10px]"></i>
                </Link>
              </div>
            </div>
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
              Exclusive Khamsat Promotion
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Get 20% Off Your Entire Order
            </h2>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
              Use promo coupon code <strong className="bg-slate-900 text-emerald-300 px-2.5 py-1 rounded-md font-mono text-sm ml-1">NOVA20</strong> at checkout to claim your instant savings.
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