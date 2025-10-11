import { useMemo, useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    orderId: "",
    language: "en",
    message: "",
    consent: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState("");

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

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);

    // simulate API success
    await new Promise((r) => setTimeout(r, 500));
    const ref = "MB-" + Date.now().toString(36).toUpperCase();
    setSubmittedRef(ref);

    // keep name/email for convenience, clear the rest
    setForm((f) => ({
      ...f,
      subject: "",
      orderId: "",
      message: "",
    }));
    setSubmitting(false);
  }

  // ---- Dummy company info (edit later) ----
  const COMPANY = {
    brand: "mybooksaway",
    email: "support@mybooksaway.com",
    phone: "+91 98765 43210",
    whatsapp: "+91 91234 56789",
    address: "123, MG Road, Andheri West, Mumbai, MH 400053",
    hours: "Mon–Sat, 9:00 AM – 6:00 PM IST",
  };

  return (
    <>
      <header className="section__head" style={{ marginTop: 8 }}>
        <h2>Contact us</h2>
        <span className="muted">We typically reply within 24 hours.</span>
      </header>

      {/* Success banner */}
      {submittedRef && (
        <div className="alert alert--success" role="status">
          <strong>Thanks!</strong> We’ve received your message.
          <span className="muted"> Ticket ref: <code>{submittedRef}</code></span>
        </div>
      )}

      <section className="contact-grid">
        {/* Left: Form */}
        <form className="form glass" onSubmit={handleSubmit} noValidate>
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
              <label className="form__label">Phone (optional)</label>
              <input
                type="tel"
                className="search__input"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
            <div className="form__group">
              <label className="form__label">Preferred language</label>
              <select
                className="search__input"
                value={form.language}
                onChange={(e) => update("language", e.target.value)}
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="mr">मराठी</option>
              </select>
            </div>
          </div>

          <div className="form__row">
            <div className="form__group">
              <label className="form__label">Subject</label>
              <input
                className="search__input"
                value={form.subject}
                onChange={(e) => update("subject", e.target.value)}
                placeholder="How can we help?"
              />
            </div>
            <div className="form__group">
              <label className="form__label">Order ID (optional)</label>
              <input
                className="search__input"
                value={form.orderId}
                onChange={(e) => update("orderId", e.target.value)}
                placeholder="e.g., ORD-123456"
              />
            </div>
          </div>

          <div className="form__group">
            <label className="form__label">Message*</label>
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
            <span> You can contact me via email/WhatsApp about this request.</span>
          </label>

          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn--primary" disabled={!canSubmit}>
              {submitting ? "Sending…" : "Send message"}
            </button>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() =>
                setForm({
                  name: "",
                  email: "",
                  phone: "",
                  subject: "",
                  orderId: "",
                  language: "en",
                  message: "",
                  consent: true,
                })
              }
            >
              Reset
            </button>
          </div>
        </form>

        {/* Right: Info cards + map + FAQs */}
        <aside className="contact-aside">
          <div className="contact-cards">
            <div className="contact-card">
              <h4>Support Email</h4>
              <p><a className="link" href="mailto:support@mybooksaway.com">{COMPANY.email}</a></p>
            </div>
            <div className="contact-card">
              <h4>Phone</h4>
              <p><a className="link" href="tel:+919876543210">{COMPANY.phone}</a></p>
              <p>WhatsApp: {COMPANY.whatsapp}</p>
            </div>
            <div className="contact-card">
              <h4>Address</h4>
              <p>{COMPANY.address}</p>
            </div>
            <div className="contact-card">
              <h4>Hours</h4>
              <p>{COMPANY.hours}</p>
            </div>
          </div>

          <div className="map glass">
            <img
              src="https://placehold.co/800x360?text=Map+Placeholder"
              alt="Map placeholder — replace with embed later"
            />
          </div>

          <div className="faq glass">
            <h4 style={{ margin: "6px 0 8px" }}>Quick FAQs</h4>
            <details>
              <summary>How long does delivery take?</summary>
              <p className="muted">Usually 2–5 business days depending on your city/pincode.</p>
            </details>
            <details>
              <summary>Can I return a book?</summary>
              <p className="muted">Yes, within 7 days if the book is unused and in original condition.</p>
            </details>
            <details>
              <summary>Do you offer COD?</summary>
              <p className="muted">Yes, Cash on Delivery is available on eligible pincodes.</p>
            </details>
          </div>
        </aside>
      </section>
    </>
  );
}
