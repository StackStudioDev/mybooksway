// src/pages/Checkout.jsx
import { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { loadRazorpayScript, createOrderOnServer } from "../lib/razorpay.js";

const rupee = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const key = import.meta.env.VITE_RAZORPAY_KEY_ID;
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const canPay = useMemo(() => {
    if (!items.length || subtotal <= 0 || !key) return false;
    const { name, email, phone, address, city, state, pincode } = form;
    return (
      name.trim().length > 1 &&
      /\S+@\S+\.\S+/.test(email) &&
      /^\+?\d[\d\s-]{8,}$/.test(phone) &&
      address.trim().length >= 5 &&
      city.trim().length >= 2 &&
      state.trim().length >= 2 &&
      /^\d{6}$/.test(pincode)
    );
  }, [form, items, subtotal, key]);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  async function payNow(e) {
    e?.preventDefault?.();
    if (!canPay || busy) return;

    setBusy(true);
    try {
      await loadRazorpayScript();

      // ---- 1) Create Razorpay order on your server WITH NOTES ----
      const amountPaise = Math.round(subtotal * 100);
      const receipt = "MBW-" + Date.now();

      const notes = {
        receipt,
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`,
        // lightweight cart snapshot:
        items: JSON.stringify(
          items.map((it) => ({
            id: it.id,
            title: it.title,
            qty: it.qty,
            price: it.price,
          }))
        ),
      };

      const order = await createOrderOnServer({
        amount: amountPaise,
        currency: "INR",
        receipt,
        notes, // <— IMPORTANT: send details to server/Razorpay
      });

      // ---- 2) Open Razorpay checkout ----
      const rzp = new window.Razorpay({
        key,
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        name: "MyBooksWay",
        description: "Book purchase",
        prefill: { name: form.name, email: form.email, contact: form.phone },
        notes, // optional duplication (shows in Razorpay dashboard)
        theme: { color: "#3b82f6" },
        handler: async function (resp) {
          try {
            // ---- 3) Confirm + persist (sheet/DB) on your server ----
            const res = await fetch(`${API_BASE}/api/payments/confirm`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({
                razorpay_payment_id: resp.razorpay_payment_id,
                razorpay_order_id: resp.razorpay_order_id,
                razorpay_signature: resp.razorpay_signature,
                customer: form,
                items,
                subtotal,
              }),
            });
            if (!res.ok) throw new Error("Confirm failed");
            clearCart();
            navigate(
              `/order-success?payment_id=${resp.razorpay_payment_id}&order_id=${resp.razorpay_order_id}`
            );
          } catch (err) {
            console.error(err);
            navigate("/order-failed", {
              state: { error: { description: "Could not confirm order on server." } },
            });
          }
        },
        modal: { ondismiss: () => setBusy(false) },
      });

      rzp.on("payment.failed", function (err) {
        navigate("/order-failed", { state: { error: err.error } });
        setBusy(false);
      });

      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Unable to start checkout. Please try again.");
      setBusy(false);
    }
  }

  if (!items.length) {
    return (
      <section className="container">
        <h2>Checkout</h2>
        <p className="muted">Your cart is empty.</p>
        <Link to="/books" className="btn btn--primary">Browse books</Link>
      </section>
    );
  }

  return (
    <>
      <header className="section__head"><h2>Checkout</h2></header>
      <section className="cart" style={{ gridTemplateColumns: "1fr 0.9fr" }}>
        {/* Left: Address form (UI unchanged) */}
        <form className="form glass" onSubmit={payNow}>
          <div className="form__row">
            <div className="form__group">
              <label className="form__label">Full name*</label>
              <input className="search__input" value={form.name} onChange={(e) => update("name", e.target.value)} />
            </div>
            <div className="form__group">
              <label className="form__label">Phone*</label>
              <input className="search__input" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
            </div>
          </div>
          <div className="form__row">
            <div className="form__group">
              <label className="form__label">Email*</label>
              <input className="search__input" value={form.email} onChange={(e) => update("email", e.target.value)} />
            </div>
            <div className="form__group">
              <label className="form__label">Pincode*</label>
              <input className="search__input" value={form.pincode} onChange={(e) => update("pincode", e.target.value)} />
            </div>
          </div>
          <div className="form__group">
            <label className="form__label">Address*</label>
            <textarea
              className="search__input textarea"
              rows={3}
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
            />
          </div>
          <div className="form__row">
            <div className="form__group">
              <label className="form__label">City*</label>
              <input className="search__input" value={form.city} onChange={(e) => update("city", e.target.value)} />
            </div>
            <div className="form__group">
              <label className="form__label">State*</label>
              <input className="search__input" value={form.state} onChange={(e) => update("state", e.target.value)} />
            </div>
          </div>
        </form>

        {/* Right: Summary + Pay (UI unchanged) */}
        <aside className="cart__summary glass">
          <h3 style={{ marginTop: 0 }}>Order Summary</h3>
          {items.map((it) => (
            <div key={it.id} className="cart__line">
              <span>
                {it.title} × {it.qty}
              </span>
              <span>{rupee(it.price * it.qty)}</span>
            </div>
          ))}
          <div className="cart__line">
            <span>Shipping</span>
            <span>₹0</span>
          </div>
          <div className="cart__total">
            <span>Total</span>
            <span>{rupee(subtotal)}</span>
          </div>

          <button
            className="btn btn--primary"
            style={{ width: "100%" }}
            onClick={payNow}
            disabled={!canPay || busy}
            title={!key ? "Missing VITE_RAZORPAY_KEY_ID" : ""}
          >
            {busy ? "Opening checkout…" : "Pay now"}
          </button>

          {!key && (
            <p className="muted" style={{ marginTop: 8, fontSize: 12 }}>
              Add <code>VITE_RAZORPAY_KEY_ID</code> in .env
            </p>
          )}
        </aside>
      </section>
    </>
  );
}
