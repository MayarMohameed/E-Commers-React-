import { NavLink, useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CounterContext } from "../../Context/CounterContext.jsx";
import { CartContext } from "../../Context/CartContext.jsx";
import { toast } from "react-hot-toast";

export default function Navbar() {
  const navigate = useNavigate();
  const { userLogin, userName, logout, demoLogin } = useContext(CounterContext);
  const { cartCount, wishlistCount } = useContext(CartContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  function handleLogout() {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  }

  function handleQuickDemoLogin() {
    demoLogin();
    toast.success("Welcome! Logged in as Demo Customer");
    navigate("/");
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate(`/products`);
    }
    setMobileMenuOpen(false);
  }

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
      isActive
        ? "text-emerald-700 bg-emerald-50 shadow-xs"
        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
    }`;

  return (
    <header className="sticky top-0 z-50 shadow-xs bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      {/* Top promotional bar */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Khamsat Ready
            </span>
            <span className="hidden sm:inline text-slate-300">
              ⚡ Up to 50% Off Top Brands + Free Worldwide Shipping over $50
            </span>
            <span className="sm:hidden text-slate-300 truncate">
              ⚡ Free Shipping over $50
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-300 text-xs">
            <span className="hidden md:flex items-center gap-1">
              <i className="fa-solid fa-headset text-emerald-400"></i> 24/7 Support
            </span>
            <span className="hidden md:inline">|</span>
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <i className="fa-solid fa-shield-halved"></i> 100% Secure Checkout
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
              <i className="fa-solid fa-bag-shopping text-xl"></i>
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-slate-900 font-sans">
                Nova<span className="text-emerald-600">Store</span>
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1">
                E-Commerce
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            <NavLink to="/" end className={navLinkClass}>
              <i className="fa-solid fa-house text-xs opacity-70"></i> Home
            </NavLink>
            <NavLink to="/products" className={navLinkClass}>
              <i className="fa-solid fa-store text-xs opacity-70"></i> Products
            </NavLink>
            <NavLink to="/catogary" className={navLinkClass}>
              <i className="fa-solid fa-layer-group text-xs opacity-70"></i> Categories
            </NavLink>
            <NavLink to="/brands" className={navLinkClass}>
              <i className="fa-solid fa-award text-xs opacity-70"></i> Brands
            </NavLink>
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center relative flex-1 max-w-xs xl:max-w-sm"
          >
            <input
              type="text"
              placeholder="Search products, brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100/80 border border-slate-200 text-sm rounded-full py-2 pl-10 pr-4 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all duration-200"
            />
            <button
              type="submit"
              className="absolute left-3.5 text-slate-400 hover:text-emerald-600 transition-colors"
            >
              <i className="fa-solid fa-magnifying-glass text-sm"></i>
            </button>
          </form>

          {/* Actions & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wishlist Icon */}
            <Link
              to="/products"
              title="Wishlist"
              className="relative p-2.5 text-slate-600 hover:text-emerald-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <i className="fa-regular fa-heart text-lg"></i>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[11px] font-bold h-5 w-5 rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2.5 text-slate-700 hover:text-emerald-600 hover:bg-slate-100 rounded-full transition-colors flex items-center"
              title="Cart"
            >
              <i className="fa-solid fa-cart-shopping text-lg"></i>
              {cartCount > 0 ? (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[11px] font-bold h-5 w-5 rounded-full flex items-center justify-center shadow-sm animate-pulse-subtle">
                  {cartCount}
                </span>
              ) : (
                <span className="absolute -top-1 -right-1 bg-slate-200 text-slate-600 text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  0
                </span>
              )}
            </Link>

            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

            {/* User Account / Auth buttons */}
            {userLogin ? (
              <div className="flex items-center gap-2">
                <div className="hidden xl:flex flex-col text-right">
                  <span className="text-xs font-semibold text-slate-900 leading-tight">
                    {userName || "Customer"}
                  </span>
                  <span className="text-[11px] text-emerald-600 font-medium">Active User</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-rose-200/60"
                  title="Logout"
                >
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleQuickDemoLogin}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-emerald-700 bg-emerald-100/80 hover:bg-emerald-200 rounded-lg transition-all shadow-xs"
                  title="Quick Demo Login for Preview"
                >
                  <i className="fa-solid fa-bolt text-amber-500"></i> Demo Login
                </button>
                <Link
                  to="/login"
                  className="px-3.5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-emerald-600 rounded-lg transition-all duration-200 shadow-sm"
                >
                  Sign In
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-emerald-600 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              <i className={`fa-solid ${mobileMenuOpen ? "fa-xmark" : "fa-bars"} text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200 space-y-3 animate-fadeIn">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100 border border-slate-200 text-sm rounded-lg py-2.5 pl-10 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="absolute left-3.5 top-3 text-slate-400"
              >
                <i className="fa-solid fa-magnifying-glass text-sm"></i>
              </button>
            </form>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <NavLink
                to="/"
                end
                onClick={() => setMobileMenuOpen(false)}
                className={navLinkClass}
              >
                <i className="fa-solid fa-house"></i> Home
              </NavLink>
              <NavLink
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className={navLinkClass}
              >
                <i className="fa-solid fa-store"></i> Products
              </NavLink>
              <NavLink
                to="/catogary"
                onClick={() => setMobileMenuOpen(false)}
                className={navLinkClass}
              >
                <i className="fa-solid fa-layer-group"></i> Categories
              </NavLink>
              <NavLink
                to="/brands"
                onClick={() => setMobileMenuOpen(false)}
                className={navLinkClass}
              >
                <i className="fa-solid fa-award"></i> Brands
              </NavLink>
              <NavLink
                to="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className={navLinkClass}
              >
                <i className="fa-solid fa-cart-shopping"></i> Cart ({cartCount})
              </NavLink>
            </div>

            {!userLogin && (
              <div className="pt-2 border-t border-slate-100 flex gap-2">
                <button
                  onClick={() => {
                    handleQuickDemoLogin();
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2 text-center text-xs font-bold text-emerald-700 bg-emerald-100 rounded-lg"
                >
                  ⚡ Demo Login
                </button>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2 text-center text-xs font-bold text-slate-700 bg-slate-100 rounded-lg"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
