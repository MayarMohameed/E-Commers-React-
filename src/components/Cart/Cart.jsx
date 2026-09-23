import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { CartContext } from "../../Context/CartContext.jsx";

export default function Cart() {
  const {
    gitCartItems,
    removeFromCart,
    updateFromCart,
    clearCart,
    cartItems,
    cartSubtotal,
  } = useContext(CartContext);

  const [cartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [checkingOut, setCheckingOut] = useState(false);

  async function loadCart() {
    setLoading(true);
    const response = await gitCartItems();
    setCartDetails(response?.data || null);
    setLoading(false);
  }

  useEffect(() => {
    loadCart();
  }, [cartItems]);

  async function handleRemove(productId, title) {
    const res = await removeFromCart(productId);
    setCartDetails(res?.data || null);
    toast.success(`${title ? title.slice(0, 15) : "Item"} removed from cart`);
  }

  async function handleUpdateQty(productId, newQty) {
    if (newQty < 1) {
      handleRemove(productId);
      return;
    }
    const res = await updateFromCart(productId, newQty);
    setCartDetails(res?.data || null);
  }

  function handleApplyCoupon(e) {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (clean === "MEMO20" || clean === "NOVA20" || clean === "KHAMSAT20") {
      setDiscountPercent(20);
      setAppliedCoupon(clean);
      toast.success("Coupon applied! 20% discount activated 🎉");
    } else if (clean === "SAVE10") {
      setDiscountPercent(10);
      setAppliedCoupon(clean);
      toast.success("Coupon applied! 10% discount activated 🎉");
    } else {
      toast.error("Invalid coupon code. Try 'MEMO20' for 20% off!");
    }
  }

  function handleRemoveCoupon() {
    setDiscountPercent(0);
    setAppliedCoupon("");
    setCouponCode("");
    toast("Coupon removed", { icon: "ℹ️" });
  }

  function handleCheckout() {
    setCheckingOut(true);
    setTimeout(() => {
      setCheckingOut(false);
      clearCart();
      toast.success("Order placed successfully! Thank you for your purchase.", {
        duration: 4000,
      });
    }, 1500);
  }

  const items = cartDetails?.products || cartItems || [];
  const subtotal = cartSubtotal || items.reduce((acc, i) => acc + (i.price || 0) * (i.quantity || 1), 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingThreshold = 50;
  const isFreeShipping = subtotal >= shippingThreshold || items.length === 0;
  const shippingFee = isFreeShipping ? 0 : 9.99;
  const estimatedTax = (subtotal - discountAmount) * 0.05;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee + estimatedTax);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-4 animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-1/4"></div>
          <div className="h-64 bg-slate-200 rounded-3xl"></div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-4xl shadow-inner">
          <i className="fa-solid fa-cart-shopping"></i>
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-slate-900">Your Cart is Empty</h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Looks like you haven't added anything to your cart yet. Explore our curated collections and grab amazing deals today!
          </p>
        </div>
        <div className="pt-2">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-sm shadow-md transition-all active:scale-95"
          >
            <i className="fa-solid fa-bag-shopping"></i>
            <span>Start Shopping Now</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            You have <strong className="text-slate-800">{items.length}</strong> unique product{items.length > 1 ? "s" : ""} in your cart
          </p>
        </div>
        <Link
          to="/products"
          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5"
        >
          <i className="fa-solid fa-arrow-left text-[10px]"></i> Continue Shopping
        </Link>
      </div>

      {/* Main 2-Column Checkout Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {/* Free Shipping Alert Bar */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-1.5 text-slate-800">
                <i className="fa-solid fa-truck-fast text-emerald-600"></i>
                {isFreeShipping ? (
                  <span className="text-emerald-700">Congratulations! You unlocked FREE shipping!</span>
                ) : (
                  <span>
                    Add ${(shippingThreshold - subtotal).toFixed(2)} more to unlock{" "}
                    <strong className="text-emerald-600">FREE Shipping</strong>
                  </span>
                )}
              </span>
              <span className="text-slate-400">
                ${Math.min(subtotal, shippingThreshold).toFixed(0)} / ${shippingThreshold}
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
                style={{
                  width: `${Math.min(100, (subtotal / shippingThreshold) * 100)}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Items Container */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
            {items.map((item) => {
              const itemTotal = (item.price || 0) * (item.quantity || 1);
              const imgSrc =
                item.thumbnail ||
                (item.images && item.images[0]) ||
                item.image ||
                "https://via.placeholder.com/150";

              return (
                <div
                  key={item.id}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5 justify-between hover:bg-slate-50/50 transition-colors"
                >
                  {/* Thumbnail & Title */}
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <Link
                      to={`/productdetailes/${item.id}`}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-100 p-2 shrink-0 flex items-center justify-center overflow-hidden border border-slate-200/60"
                    >
                      <img
                        src={imgSrc}
                        alt={item.title}
                        className="max-h-full max-w-full object-contain hover:scale-105 transition-transform"
                      />
                    </Link>
                    <div className="space-y-1">
                      <Link
                        to={`/productdetailes/${item.id}`}
                        className="font-bold text-sm sm:text-base text-slate-800 hover:text-emerald-600 transition-colors line-clamp-1"
                      >
                        {item.title}
                      </Link>
                      <span className="text-xs text-slate-400 block">
                        Unit Price: <strong className="text-slate-700">${item.price}</strong>
                      </span>
                      <button
                        onClick={() => handleRemove(item.id, item.title)}
                        className="text-xs text-rose-500 hover:text-rose-700 font-semibold flex items-center gap-1 cursor-pointer pt-1"
                      >
                        <i className="fa-regular fa-trash-can text-[11px]"></i> Remove
                      </button>
                    </div>
                  </div>

                  {/* Quantity Stepper & Line Total */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                    {/* Stepper */}
                    <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden shadow-2xs">
                      <button
                        onClick={() => handleUpdateQty(item.id, (item.quantity || 1) - 1)}
                        className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <i className="fa-solid fa-minus text-[10px]"></i>
                      </button>
                      <span className="w-10 text-center text-xs font-bold text-slate-800">
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() => handleUpdateQty(item.id, (item.quantity || 1) + 1)}
                        className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <i className="fa-solid fa-plus text-[10px]"></i>
                      </button>
                    </div>

                    {/* Subtotal for line */}
                    <div className="text-right min-w-20">
                      <span className="text-base font-black text-slate-900">
                        ${itemTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Clear Cart Button */}
          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => {
                clearCart();
                toast("Cart cleared", { icon: "🗑️" });
              }}
              className="text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <i className="fa-regular fa-trash-can"></i> Clear All Cart Items
            </button>
          </div>
        </div>

        {/* Right Column: Order Summary Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-sm sticky top-28 space-y-6">
            <h3 className="text-lg font-black text-slate-900 pb-3 border-b border-slate-100">
              Order Summary
            </h3>

            {/* Calculations Breakdown */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({items.length} items)</span>
                <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount ({appliedCoupon} -{discountPercent}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span>
                  {isFreeShipping ? (
                    <span className="text-emerald-600 font-bold uppercase text-xs">FREE</span>
                  ) : (
                    `$${shippingFee.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Estimated Tax (5%)</span>
                <span>${estimatedTax.toFixed(2)}</span>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between items-baseline">
                <div>
                  <span className="text-base font-black text-slate-900 block">Total Due</span>
                  <span className="text-[11px] text-slate-400">Including all taxes & discounts</span>
                </div>
                <span className="text-2xl font-black text-slate-900">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Coupon Code Section */}
            <div className="pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700 block mb-2">
                Have a Promo Code?
              </span>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold">
                    <i className="fa-solid fa-tag text-emerald-600"></i>
                    <span>{appliedCoupon} ({discountPercent}% OFF)</span>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-slate-400 hover:text-rose-600"
                    title="Remove coupon"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter MEMO20"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs uppercase font-mono text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={checkingOut}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm transition-all duration-200 shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-75"
            >
              {checkingOut ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin"></i>
                  <span>Processing Checkout...</span>
                </>
              ) : (
                <>
                  <i className="fa-solid fa-lock text-xs"></i>
                  <span>Proceed to Checkout</span>
                </>
              )}
            </button>

            {/* Trust Badges */}
            <div className="pt-2 text-center space-y-2">
              <span className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5 font-medium">
                <i className="fa-solid fa-shield-halved text-emerald-600"></i> Guaranteed Safe & Encrypted Checkout
              </span>
              <div className="flex items-center justify-center gap-3 text-slate-400 text-base">
                <i className="fa-brands fa-cc-visa" title="Visa"></i>
                <i className="fa-brands fa-cc-mastercard" title="Mastercard"></i>
                <i className="fa-brands fa-cc-paypal" title="PayPal"></i>
                <i className="fa-brands fa-cc-apple-pay" title="Apple Pay"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}