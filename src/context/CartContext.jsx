import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "mbw_cart_v1";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{id,title,price,cover,author,langLabel,qty}]

  // load from storage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {}
  }, []);

  // save to storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  // helpers
  const addItem = (book, qty = 1) => {
    const cover = book.coverUrl || book.cover || "https://placehold.co/320x460?text=Book";
    const langRaw = (book.lang || "").toString();
    const langLabel =
      book.langLabel ??
      (langRaw.toLowerCase() === "en" ? "EN" : langRaw.toLowerCase() === "hi" ? "हि" : "मरा");

    setItems(prev => {
      const i = prev.findIndex(it => it.id === book.id);
      if (i >= 0) {
        const clone = [...prev];
        clone[i] = { ...clone[i], qty: clone[i].qty + qty };
        return clone;
      }
      return [...prev, {
        id: book.id,
        title: book.title,
        author: book.author,
        price: Number(book.price || 0),
        cover,
        langLabel,
        qty: qty || 1,
      }];
    });
  };

  const removeItem = (id) => setItems(prev => prev.filter(it => it.id !== id));

  const setQty = (id, qty) => {
    qty = Math.max(1, Number(qty || 1));
    setItems(prev => prev.map(it => it.id === id ? { ...it, qty } : it));
  };

  const clearCart = () => setItems([]);

  const count = useMemo(() => items.reduce((n, it) => n + it.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((n, it) => n + it.price * it.qty, 0), [items]);

  const value = { items, addItem, removeItem, setQty, clearCart, count, subtotal };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
