import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext(null);

export function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("nova_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("nova_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Keep localStorage synced
  useEffect(() => {
    try {
      localStorage.setItem("nova_cart", JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem("nova_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error("Failed to save wishlist to localStorage", e);
    }
  }, [wishlist]);

  // Initial load from DummyJSON if local cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      axios
        .get("https://dummyjson.com/carts/1")
        .then((res) => {
          if (res.data?.products && Array.isArray(res.data.products)) {
            const mapped = res.data.products.map((p) => ({
              id: p.id,
              title: p.title,
              price: p.price,
              quantity: p.quantity || 1,
              thumbnail: p.thumbnail,
              total: p.total || p.price * (p.quantity || 1),
            }));
            setCartItems(mapped);
          }
        })
        .catch((err) => {
          console.warn("Could not prefill cart from DummyJSON:", err);
        });
    }
  }, []);

  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  );

  // Add product to cart
  async function addToCart(productid, productData = null) {
    try {
      // Send mock request to DummyJSON
      let apiPromise = axios
        .post(
          "https://dummyjson.com/carts/add",
          {
            userId: 1,
            products: [{ id: productid, quantity: 1 }],
          }
        )
        .catch(() => null);

      let itemToAdd = productData;
      if (!itemToAdd) {
        try {
          const detailRes = await axios.get(`https://dummyjson.com/products/${productid}`);
          itemToAdd = detailRes.data;
        } catch {
          itemToAdd = {
            id: productid,
            title: `Product #${productid}`,
            price: 29.99,
            thumbnail: "https://via.placeholder.com/150",
          };
        }
      }

      setCartItems((prev) => {
        const existingIndex = prev.findIndex((item) => item.id === productid);
        if (existingIndex > -1) {
          const updated = [...prev];
          const curr = updated[existingIndex];
          const newQty = (curr.quantity || 1) + 1;
          updated[existingIndex] = {
            ...curr,
            quantity: newQty,
            total: curr.price * newQty,
          };
          return updated;
        } else {
          return [
            ...prev,
            {
              id: productid,
              title: itemToAdd.title || `Product #${productid}`,
              price: itemToAdd.price || 19.99,
              thumbnail: itemToAdd.thumbnail || (itemToAdd.images && itemToAdd.images[0]) || "",
              quantity: 1,
              total: itemToAdd.price || 19.99,
            },
          ];
        }
      });

      await apiPromise;
      return { status: 201, data: { message: "Added successfully" } };
    } catch (err) {
      return { status: 201, data: { message: "Added locally" } };
    }
  }

  // Get cart items compatible with existing components
  async function gitCartItems() {
    return {
      status: 200,
      data: {
        id: 1,
        products: cartItems,
        total: cartSubtotal,
        discountedTotal: cartSubtotal * 0.9,
        totalProducts: cartItems.length,
        totalQuantity: cartCount,
      },
    };
  }

  // Remove product from cart
  async function removeFromCart(productid) {
    const updated = cartItems.filter((item) => item.id !== productid);
    setCartItems(updated);
    const subtotal = updated.reduce(
      (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
      0
    );
    return {
      status: 200,
      data: {
        products: updated,
        total: subtotal,
      },
    };
  }

  // Update product quantity in cart
  async function updateFromCart(productid, quantity) {
    if (quantity <= 0) {
      return removeFromCart(productid);
    }
    const updated = cartItems.map((item) => {
      if (item.id === productid) {
        return {
          ...item,
          quantity: quantity,
          total: item.price * quantity,
        };
      }
      return item;
    });
    setCartItems(updated);
    const subtotal = updated.reduce(
      (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
      0
    );
    return {
      status: 200,
      data: {
        products: updated,
        total: subtotal,
      },
    };
  }

  // Clear cart
  function clearCart() {
    setCartItems([]);
  }

  // Wishlist toggle
  function toggleWishlist(productId) {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  }

  function isInWishlist(productId) {
    return wishlist.includes(productId);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartSubtotal,
        addToCart,
        gitCartItems,
        removeFromCart,
        updateFromCart,
        clearCart,
        wishlist,
        wishlistCount: wishlist.length,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
