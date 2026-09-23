import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { CartContext } from "../../Context/CartContext.jsx";

export default function ProductDetailes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [addingToCart, setAddingToCart] = useState(false);

  const { addToCart, toggleWishlist, isInWishlist } = useContext(CartContext);

  useEffect(() => {
    setLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        const prod = res.data;
        setProduct(prod);
        setSelectedImage(prod.images?.[0] || prod.thumbnail || "");
        setLoading(false);

        // Fetch related products in same category
        if (prod.category) {
          axios
            .get(`https://dummyjson.com/products/category/${prod.category}?limit=4`)
            .then((catRes) => {
              const filtered = (catRes.data?.products || []).filter((p) => p.id !== prod.id);
              setRelatedProducts(filtered.slice(0, 4));
            })
            .catch(() => {});
        }
      })
      .catch((err) => {
        console.error("Error fetching product details", err);
        setLoading(false);
      });
  }, [id]);

  async function handleAddToCart() {
    if (!product) return;
    setAddingToCart(true);
    try {
      for (let i = 0; i < quantity; i++) {
        await addToCart(product.id, product);
      }
      toast.success(`${product.title} (${quantity}) added to cart!`);
    } catch {
      toast.error("Failed to add product to cart");
    } finally {
      setAddingToCart(false);
    }
  }

  async function handleBuyNow() {
    if (!product) return;
    await addToCart(product.id, product);
    navigate("/cart");
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-pulse">
          <div className="h-96 bg-slate-200 rounded-3xl"></div>
          <div className="space-y-4">
            <div className="h-4 bg-slate-200 rounded w-1/4"></div>
            <div className="h-8 bg-slate-200 rounded w-3/4"></div>
            <div className="h-6 bg-slate-200 rounded w-1/3"></div>
            <div className="h-24 bg-slate-200 rounded"></div>
            <div className="h-12 bg-slate-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center mx-auto text-2xl">
          <i className="fa-solid fa-box-open"></i>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Product Not Found</h2>
        <p className="text-slate-500 text-sm">The product you are looking for does not exist or was removed.</p>
        <Link
          to="/products"
          className="inline-block px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const discount = product.discountPercentage ? Math.round(product.discountPercentage) : null;
  const originalPrice = discount ? (product.price / (1 - discount / 100)).toFixed(2) : null;
  const isWishlisted = isInWishlist(product.id);
  const images = product.images && product.images.length > 0 ? product.images : [product.thumbnail];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link to="/" className="hover:text-emerald-600 transition-colors">
          Home
        </Link>
        <i className="fa-solid fa-chevron-right text-[10px] text-slate-300"></i>
        <Link to="/products" className="hover:text-emerald-600 transition-colors">
          Products
        </Link>
        <i className="fa-solid fa-chevron-right text-[10px] text-slate-300"></i>
        <Link
          to={`/products?category=${product.category}`}
          className="capitalize hover:text-emerald-600 transition-colors"
        >
          {product.category}
        </Link>
        <i className="fa-solid fa-chevron-right text-[10px] text-slate-300"></i>
        <span className="text-slate-900 font-semibold truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Gallery Column */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Large Image */}
          <div className="relative h-96 sm:h-[450px] bg-white rounded-3xl border border-slate-200/80 p-8 flex items-center justify-center overflow-hidden shadow-xs">
            <img
              src={selectedImage || product.thumbnail}
              alt={product.title}
              className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-500"
            />
            {discount && (
              <span className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-xs">
                Save {discount}%
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                isWishlisted
                  ? "bg-rose-50 text-rose-500 shadow-sm"
                  : "bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-500"
              }`}
              title="Add to Wishlist"
            >
              <i className={`${isWishlisted ? "fa-solid" : "fa-regular"} fa-heart text-base`}></i>
            </button>
          </div>

          {/* Thumbnail list */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl bg-white border-2 p-2 shrink-0 transition-all ${
                    selectedImage === img
                      ? "border-emerald-500 shadow-md ring-2 ring-emerald-500/20"
                      : "border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Info Column */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                {product.category}
              </span>
              {product.brand && (
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  Brand: {product.brand}
                </span>
              )}
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-snug">
              {product.title}
            </h1>

            {/* Rating & Stock */}
            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
              <div className="flex items-center gap-1.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`fa-solid fa-star ${
                      i < Math.floor(product.rating || 5) ? "text-amber-400" : "text-slate-200"
                    }`}
                  ></i>
                ))}
                <span className="text-slate-800 font-bold ml-1">{product.rating}</span>
              </div>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500">
                {product.reviews?.length || 24} Verified Customer Reviews
              </span>
              <span className="text-slate-300">|</span>
              <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-xs">
                <i className="fa-solid fa-circle-check"></i>
                {product.stock > 0 ? `In Stock (${product.stock} units)` : "Available"}
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-5 rounded-2xl bg-slate-100/80 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block font-medium">Total Price</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900">${product.price}</span>
                {originalPrice && (
                  <span className="text-sm text-slate-400 line-through">${originalPrice}</span>
                )}
              </div>
            </div>
            {discount && (
              <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                Save ${((originalPrice - product.price) || 0).toFixed(2)}
              </span>
            )}
          </div>

          {/* Short Description */}
          <p className="text-slate-600 text-sm leading-relaxed">{product.description}</p>

          {/* Quantity and Actions */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Quantity:
              </span>
              <div className="flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden shadow-xs">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <i className="fa-solid fa-minus text-xs"></i>
                </button>
                <span className="w-12 text-center text-sm font-bold text-slate-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <i className="fa-solid fa-plus text-xs"></i>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={addingToCart}
                className="flex-1 py-4 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 disabled:opacity-75"
              >
                {addingToCart ? (
                  <>
                    <i className="fa-solid fa-circle-notch fa-spin"></i>
                    <span>Adding to Cart...</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-cart-shopping"></i>
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 active:scale-95"
              >
                <i className="fa-solid fa-bolt"></i>
                <span>Buy Now</span>
              </button>
            </div>
          </div>

          {/* Perks Guarantee Strip */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200 text-center">
            <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-xs">
              <i className="fa-solid fa-truck-fast text-emerald-600 text-base mb-1 block"></i>
              <span className="text-[11px] font-bold text-slate-800 block">Free Shipping</span>
              <span className="text-[10px] text-slate-400">On this product</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-xs">
              <i className="fa-solid fa-rotate-left text-teal-600 text-base mb-1 block"></i>
              <span className="text-[11px] font-bold text-slate-800 block">30 Days Returns</span>
              <span className="text-[10px] text-slate-400">Hassle-free guarantee</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-xs">
              <i className="fa-solid fa-shield-halved text-indigo-600 text-base mb-1 block"></i>
              <span className="text-[11px] font-bold text-slate-800 block">100% Authentic</span>
              <span className="text-[10px] text-slate-400">Verified by NovaStore</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Description, Specifications, Reviews */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
        {/* Tab Headers */}
        <div className="flex border-b border-slate-200 gap-6">
          <button
            onClick={() => setActiveTab("description")}
            className={`pb-4 text-sm font-bold transition-all relative ${
              activeTab === "description"
                ? "text-emerald-600 border-b-2 border-emerald-600"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Description & Highlights
          </button>
          <button
            onClick={() => setActiveTab("specs")}
            className={`pb-4 text-sm font-bold transition-all relative ${
              activeTab === "specs"
                ? "text-emerald-600 border-b-2 border-emerald-600"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-4 text-sm font-bold transition-all relative ${
              activeTab === "reviews"
                ? "text-emerald-600 border-b-2 border-emerald-600"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Customer Reviews ({product.reviews?.length || 0})
          </button>
        </div>

        {/* Tab Content */}
        <div className="pt-6">
          {activeTab === "description" && (
            <div className="space-y-4 max-w-3xl text-sm text-slate-600 leading-relaxed">
              <p>{product.description}</p>
              <h4 className="font-bold text-slate-800 text-base pt-2">Key Highlights:</h4>
              <ul className="space-y-2 list-disc list-inside text-slate-600">
                <li>Engineered with premium materials for maximum durability and performance.</li>
                <li>Designed in accordance with global quality standards.</li>
                <li>Comes in official manufacturer packaging with full security seals.</li>
                <li>Backed by manufacturer warranty and 30-day money-back satisfaction guarantee.</li>
              </ul>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl text-sm">
              <div className="p-3 bg-slate-50 rounded-xl flex justify-between">
                <span className="text-slate-500 font-medium">SKU:</span>
                <span className="font-bold text-slate-800">{product.sku || `NOVA-${product.id}`}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl flex justify-between">
                <span className="text-slate-500 font-medium">Brand:</span>
                <span className="font-bold text-slate-800">{product.brand || "Nova Signature"}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl flex justify-between">
                <span className="text-slate-500 font-medium">Weight:</span>
                <span className="font-bold text-slate-800">{product.weight ? `${product.weight} kg` : "0.5 kg"}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl flex justify-between">
                <span className="text-slate-500 font-medium">Warranty:</span>
                <span className="font-bold text-slate-800">{product.warrantyInformation || "1 Year Official Warranty"}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl flex justify-between">
                <span className="text-slate-500 font-medium">Shipping Info:</span>
                <span className="font-bold text-slate-800">{product.shippingInformation || "Ships in 1-2 business days"}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl flex justify-between">
                <span className="text-slate-500 font-medium">Return Policy:</span>
                <span className="font-bold text-slate-800">{product.returnPolicy || "30-day return policy"}</span>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4 max-w-3xl">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((rev, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                          {rev.reviewerName?.slice(0, 1) || "U"}
                        </div>
                        <span className="font-bold text-sm text-slate-800">{rev.reviewerName}</span>
                      </div>
                      <div className="flex items-center text-amber-400 text-xs gap-1">
                        {[...Array(5)].map((_, s) => (
                          <i
                            key={s}
                            className={`fa-solid fa-star ${
                              s < rev.rating ? "text-amber-400" : "text-slate-200"
                            }`}
                          ></i>
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">{rev.comment}</p>
                    <span className="text-[10px] text-slate-400 block">
                      {new Date(rev.date).toLocaleDateString()} • Verified Buyer
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-sm">No reviews yet for this product. Be the first to leave one!</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                Related Items
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                You May Also Like
              </h2>
            </div>
            <Link
              to={`/products?category=${product.category}`}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
            >
              See More <i className="fa-solid fa-arrow-right text-[10px]"></i>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-4 hover:shadow-lg hover:border-emerald-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <Link to={`/productdetailes/${rel.id}`} className="block h-40 bg-slate-50 rounded-xl overflow-hidden mb-3">
                    <img
                      src={rel.thumbnail}
                      alt={rel.title}
                      className="w-full h-full object-contain p-2 hover:scale-105 transition-transform"
                    />
                  </Link>
                  <Link to={`/productdetailes/${rel.id}`}>
                    <h4 className="font-bold text-sm text-slate-800 hover:text-emerald-600 line-clamp-1">
                      {rel.title}
                    </h4>
                  </Link>
                  <span className="text-xs font-bold text-slate-900 block mt-1">${rel.price}</span>
                </div>
                <button
                  onClick={async () => {
                    await addToCart(rel.id, rel);
                    toast.success("Added to cart!");
                  }}
                  className="mt-3 w-full py-2 bg-slate-100 hover:bg-emerald-600 hover:text-white rounded-lg text-xs font-bold text-slate-700 transition-colors"
                >
                  Quick Add
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}