import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Footer() {
  const [email, setEmail] = useState("");

  function handleSubscribe(e) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("Thank you for subscribing! Check your inbox for 10% off.");
    setEmail("");
  }

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                <i className="fa-solid fa-bag-shopping text-lg"></i>
              </div>
              <span className="text-2xl font-black tracking-tight text-white font-sans">
                Memo<span className="text-emerald-400">Store</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Your premier destination for high-quality electronics, trending fashion, beauty products, and home essentials. Designed for maximum conversion, speed, and seamless customer satisfaction.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200"
                aria-label="Twitter"
              >
                <i className="fa-brands fa-x-twitter text-sm"></i>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200"
                aria-label="Facebook"
              >
                <i className="fa-brands fa-facebook-f text-sm"></i>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200"
                aria-label="Instagram"
              >
                <i className="fa-brands fa-instagram text-sm"></i>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200"
                aria-label="LinkedIn"
              >
                <i className="fa-brands fa-linkedin-in text-sm"></i>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200"
                aria-label="GitHub"
              >
                <i className="fa-brands fa-github text-sm"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/catogary" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Featured Categories
                </Link>
              </li>
              <li>
                <Link to="/brands" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Top Brands
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#help" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Help & Support Center
                </a>
              </li>
              <li>
                <a href="#track" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Track Your Order
                </a>
              </li>
              <li>
                <a href="#shipping" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Shipping & Delivery
                </a>
              </li>
              <li>
                <a href="#returns" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  30-Day Easy Returns
                </a>
              </li>
              <li>
                <a href="#terms" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Privacy Policy & Terms
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              Join Our Newsletter
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Subscribe to get special discounts, free giveaway drops, and once-in-a-lifetime deals.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-slate-800 border border-slate-700 text-sm rounded-lg py-2.5 px-3.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-all shadow-md shadow-emerald-600/20 active:scale-[0.98]"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} <span className="text-slate-300 font-semibold">Memo</span>. Crafted for Khamsat Service Showcase. All Rights Reserved.
          </div>
          {/* Payment Badges */}
          <div className="flex items-center gap-3 text-slate-400 text-lg">
            <span className="text-xs text-slate-500 mr-1">Secured Payments:</span>
            <i className="fa-brands fa-cc-visa hover:text-white transition-colors" title="Visa"></i>
            <i className="fa-brands fa-cc-mastercard hover:text-white transition-colors" title="Mastercard"></i>
            <i className="fa-brands fa-cc-paypal hover:text-white transition-colors" title="PayPal"></i>
            <i className="fa-brands fa-cc-apple-pay hover:text-white transition-colors" title="Apple Pay"></i>
            <i className="fa-solid fa-money-bill-wave hover:text-white transition-colors" title="Cash on Delivery"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}
