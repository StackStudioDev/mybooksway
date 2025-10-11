// src/pages/Support.jsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function Support() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    orderId: "",
    topic: "order",
    message: "",
    consent: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [refId, setRefId] = useState("");

  const canSubmit = useMemo(() => {
    return (
      form.name.trim().length > 1 &&
      /\S+@\S+\.\S+/.test(form.email) &&
      form.message.trim().length >= 10 &&
      !submitting
    );
  }, [form, submitting]);

  function update(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600)); // simulate API
    const ref = "SUP-" + Date.now().toString(36).toUpperCase();
    setRefId(ref);
    // keep name/email for convenience
    setForm((f) => ({ ...f, orderId: "", message: "" }));
    setSubmitting(false);
  }

  const COMPANY = {
    email: "support@mybooksaway.com",
    phone: "+91 98765 43210",
    whatsapp: "+91 91234 56789",
    hours: "Mon–Sat, 9:00 AM – 6:00 PM IST",
  };

  return (
    <>
      <header className="section__head" style={{ marginTop: 8 }}>
        <h2>Support</h2>
        <span className="muted">We’re here to help — typically replies within 24 hours.</span>
      </header>

      {/* success */}
      {refId && (
        <div className="alert alert--success" role="status">
          <strong>Ticket created.</strong> Ref: <code>{refId}</code>. We’ll email you shortly.
        </div>
      )}

      {/* quick actions */}
      <div className="glass" style={{ padding: 12, borderRadius: 14, marginBottom: 14 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link to="/shipping" className="btn btn--ghost">Shipping &amp; Delivery</Link>
          <Link to="/refunds" className="btn btn--ghost">Returns &amp; Refunds</Link>
          <a href="mailto:support@mybooksaway.com" className="btn btn--primary">Email support</a>
          <a href="tel:+919876543210" className="btn btn--ghost">Call us</a>
          <a
            className="btn btn--ghost"
            href={`https://wa.me/919123456789?text=Hi%20MyBooksWay%20Support%2C%20I%20need%20help%20with%20my%20order.`}
            target="_blank" rel="noreferrer"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <section className="contact-grid">
        {/* left: form */}
        <form className="form glass" onSubmit={onSubmit} noValidate>
          <div className="form__row">
            <div className="form__group">
              <label className="form__label">Full name*</label>
              <input
                className="search__input"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="e.g., Rahul Sharma"
                required
              />
            </div>
            <div className="form__group">
              <label className="form__label">Email*</label>
              <input
                type="email"
                className="search__input"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="form__row">
            <div className="form__group">
              <label className="form__label">Order ID (optional)</label>
              <input
                className="search__input"
                value={form.orderId}
                onChange={(e) => update("orderId", e.target.value)}
                placeholder="e.g., ORD-123456"
              />
            </div>
            <div className="form__group">
              <label className="form__label">Topic</label>
              <select
                className="search__input"
                value={form.topic}
                onChange={(e) => update("topic", e.target.value)}
              >
                <option value="order">Order / Delivery</option>
                <option value="returns">Returns & Refunds</option>
                <option value="payment">Payment / Billing</option>
                <option value="catalog">Catalog / Book info</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="form__group">
            <label className="form__label">Describe the issue*</label>
            <textarea
              className="search__input textarea"
              rows={6}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="Write your message (min 10 characters)…"
              required
            />
          </div>

          <label className="checkbox">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => update("consent", e.target.checked)}
            />
            <span> You can contact me via email/phone about this request.</span>
          </label>

          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn--primary" disabled={!canSubmit}>
              {submitting ? "Submitting…" : "Create ticket"}
            </button>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() =>
                setForm({
                  name: "",
                  email: "",
                  orderId: "",
                  topic: "order",
                  message: "",
                  consent: true,
                })
              }
            >
              Reset
            </button>
          </div>
        </form>

        {/* right: contact + faqs */}
        <aside className="contact-aside">
          <div className="contact-cards">
            <div className="contact-card">
              <h4>Support Hours</h4>
              <p className="muted">{COMPANY.hours}</p>
            </div>
            <div className="contact-card">
              <h4>Email</h4>
              <p><a className="link" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></p>
            </div>
            <div className="contact-card">
              <h4>Phone</h4>
              <p><a className="link" href="tel:+919876543210">{COMPANY.phone}</a></p>
              <p>WhatsApp: {COMPANY.whatsapp}</p>
            </div>
          </div>

          <div className="faq glass">
            <h4 style={{ margin: "6px 0 8px" }}>FAQs</h4>
            <details open>
              <summary>Where is my order?</summary>
              <p className="muted">
                Orders usually dispatch within 24h and deliver in 2–5 business days depending
                on your pincode. Track status via the “Shipping &amp; Delivery” page or reply to
                the confirmation email.
              </p>
            </details>
            <details>
              <summary>How do I request a return/refund?</summary>
              <p className="muted">
                Unused books in original condition are eligible within 7 days of delivery.
                See “Returns &amp; Refunds” for steps, then open a ticket here with your order ID.
              </p>
            </details>
            <details>
              <summary>Payment issues (UPI/NetBanking/Card) failed?</summary>
              <p className="muted">
                If an amount was debited but the order wasn’t created, most banks auto-reverse
                in 3–5 business days. Share the reference on this page so we can expedite it.
              </p>
            </details>
          </div>
        </aside>
      </section>
    </>
  );
}
