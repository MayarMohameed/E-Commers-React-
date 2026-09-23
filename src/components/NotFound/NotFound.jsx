import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Visual Badge */}
        <div className="relative inline-block">
          <span className="text-8xl sm:text-9xl font-black text-slate-200 select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 border border-rose-200 flex items-center justify-center text-3xl shadow-sm">
              <i className="fa-solid fa-compass-drafting"></i>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Oops! Page Not Found
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            The page you are looking for might have been moved, renamed, or no longer exists.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-house text-xs"></i>
            <span>Back to Home</span>
          </Link>
          <Link
            to="/products"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs transition-all flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-store text-xs"></i>
            <span>Browse Products</span>
          </Link>
        </div>
      </div>
    </div>
  );
}