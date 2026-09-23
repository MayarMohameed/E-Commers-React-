import { Link } from "react-router-dom";
import { CatogarySlider } from "../CatogarySlider/CatogarySlider.jsx";
import RecentPorducts from "../RecentPorducts/RecentPoducts.jsx";

export default function Home() {
  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section with Photo Background */}
      <section className="relative overflow-hidden min-h-[500px] lg:min-h-[560px] flex items-center text-white rounded-b-3xl sm:rounded-b-[2.5rem] shadow-2xl">
        {/* Full Hero Background Photo */}
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&auto=format&fit=crop&q=95"
          alt="Happy woman with shopping bags background"
          className="absolute inset-0 w-full h-full object-cover object-right md:object-center"
          loading="eager"
        />

        {/* Ambient Dark Gradient Overlays for Readability & Photo Clarity */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-slate-950/30 lg:bg-gradient-to-r lg:from-slate-950 lg:via-slate-950/75 lg:to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Hero Content */}
        <div className="relative max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-2xl space-y-6 text-center lg:text-left">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-xs font-bold shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>New Season Collection 2026</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white drop-shadow-md">
              Discover Quality Products For{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
                Every Lifestyle
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-200 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed drop-shadow-sm">
              Explore authentic products from top international brands. Fast shipping, guaranteed quality, and best prices at Memo.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/products"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm transition-all duration-200 shadow-xl shadow-emerald-500/30 flex items-center gap-2 active:scale-95"
              >
                <span>Shop All Products</span>
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </Link>
              <Link
                to="/catogary"
                className="px-8 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 text-white font-bold text-sm border border-slate-700/80 backdrop-blur-md transition-all duration-200 flex items-center gap-2 active:scale-95 shadow-lg"
              >
                <span>Explore Categories</span>
              </Link>
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