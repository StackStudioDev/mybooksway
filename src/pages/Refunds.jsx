// src/pages/Refunds.jsx
import { Link } from "react-router-dom";

export default function Refunds() {
  return (
    <section className="container" style={{ paddingTop: 12, paddingBottom: 24 }}>
      <header style={{ marginBottom: 12 }}>
        <h1 style={{ margin: 0 }}>Returns &amp; Refunds</h1>
        <p className="muted" style={{ marginTop: 6 }}>
          Simple, fair, and fast. Please read the guidelines below so we can resolve your request smoothly.
        </p>
      </header>

      {/* Return window */}
      <section style={block}>
        <h2 style={h2}>Return window</h2>
        <p style={{ margin: 0 }}>
          You can request a return within <strong>7 days from delivery</strong> for unused, undamaged books in their
          original condition (including any shrink-wrap, inserts, and free items).
        </p>
      </section>

      {/* Eligible / Not eligible */}
      <section style={block}>
        <h2 style={h2}>Eligibility</h2>
        <div style={twoColWrap}>
          <div style={card}>
            <h3 style={h3}>Eligible</h3>
            <ul style={ul}>
              <li>Wrong item delivered or missing item in the parcel.</li>
              <li>Transit damage or misprint/printing defect (attach clear unboxing &amp; defect photos).</li>
              <li>Unopened book in resaleable condition (return freight may apply).</li>
            </ul>
          </div>
          <div style={card}>
            <h3 style={h3}>Not eligible</h3>
            <ul style={ul}>
              <li>Heavily used, marked, or damaged due to handling after delivery.</li>
              <li>Items without original packaging/freebies, or beyond the 7-day window.</li>
              <li>E-books/digital goods, personalized or specially procured items.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How to request */}
      <section style={block}>
        <h2 style={h2}>How to request a return</h2>
        <ol style={ol}>
          <li>
            Email <a href="mailto:mybooksway@gmail.com">mybooksway@gmail.com</a> or message us on{" "}
            <a href="https://wa.me/918805900597" target="_blank" rel="noreferrer">WhatsApp +91&nbsp;88059&nbsp;00597</a>{" "}
            with your <strong>Order ID</strong>, <strong>reason</strong>, and <strong>photos/video</strong> (for damage/defect).
          </li>
          <li>
            Our team verifies your request within <strong>24–48 working hours</strong> and shares the pickup/return instructions.
          </li>
          <li>
            Once the item is received and inspected at our facility, we initiate the refund (see timelines below).
          </li>
        </ol>
        <p className="muted" style={{ marginTop: 6 }}>
          Tip: For damage/short shipment, please contact us within <strong>48 hours of delivery</strong> with unboxing photos.
        </p>
      </section>

      {/* Packaging & pickup */}
      <section style={block}>
        <h2 style={h2}>Packaging &amp; pickup</h2>
        <ul style={ul}>
          <li>
            Keep the book <strong>securely packed</strong> (preferably in the same outer carton / sleeve) to avoid transit damage.
          </li>
          <li>
            If pickup is available at your pincode, we’ll arrange it and share a pickup attempt window. Otherwise, we’ll provide
            a <strong>return address</strong>—please ship it back and share the receipt for reimbursement (if applicable).
          </li>
          <li>
            If the pickup fails due to unavailability/wrong address, the courier may reattempt on the next working day.
          </li>
        </ul>
      </section>

      {/* Refund / exchange options */}
      <section style={block}>
        <h2 style={h2}>Refund &amp; exchange</h2>
        <ul style={ul}>
          <li>
            <strong>Refund method:</strong> Issued to the original payment method once the return passes quality check.
          </li>
          <li>
            <strong>Timeline:</strong> We typically process within <strong>2–3 working days</strong> after QC; your bank or
            payment provider may take an additional <strong>3–5 working days</strong> to reflect the amount.
          </li>
          <li>
            <strong>Exchange:</strong> If you prefer a replacement of the same title (where available), mention it in your request.
          </li>
          <li>
            <strong>Adjustments:</strong> If any free items/coupons were used, we may adjust the refundable value accordingly.
          </li>
        </ul>
      </section>

      {/* Fees & deductions */}
      <section style={block}>
        <h2 style={h2}>Fees &amp; deductions (when applicable)</h2>
        <ul style={ul}>
          <li>
            For remorse returns (no defect/wrong item) on opened items, a <strong>return shipping fee</strong> and/or{" "}
            <strong>restocking fee</strong> may apply to cover handling if the product is not resaleable as new.
          </li>
          <li>
            If a prepaid order used a limited-time <strong>free shipping</strong> offer, we may deduct the actual forward
            shipping if the entire order is returned without defect.
          </li>
        </ul>
      </section>

      {/* Small FAQ */}
      <section style={block}>
        <h2 style={h2}>FAQs</h2>
        <details style={details}>
          <summary style={summary}>When will I get my refund?</summary>
          <p style={{ margin: "8px 0 0" }}>
            After we receive and verify the returned book, we initiate the refund in <strong>2–3 working days</strong>.
            Banks/UPI gateways can take another <strong>3–5 working days</strong> to credit it.
          </p>
        </details>
        <details style={details}>
          <summary style={summary}>Can I cancel my order before it ships?</summary>
          <p style={{ margin: "8px 0 0" }}>
            If your order hasn’t been dispatched, we can cancel and issue a full refund. If it’s already shipped, please accept
            delivery and request a return as per this policy.
          </p>
        </details>
        <details style={details}>
          <summary style={summary}>What if my parcel is delayed?</summary>
          <p style={{ margin: "8px 0 0" }}>
            Delivery ETAs depend on location and courier load. Check our{" "}
            <Link to="/shipping">Shipping &amp; Delivery</Link> page for typical timelines and tracking help.
          </p>
        </details>
      </section>

      {/* Help */}
      <section style={block}>
        <h2 style={h2}>Need help?</h2>
        <p style={{ margin: 0 }}>
          Email: <a href="mailto:mybooksway@gmail.com">mybooksway@gmail.com</a> &nbsp;·&nbsp; WhatsApp:{" "}
          <a href="https://wa.me/918805900597" target="_blank" rel="noreferrer">+91&nbsp;88059&nbsp;00597</a>
          <br />
          Typical response time: <strong>within 24 hours</strong> on business days (Mon–Sat).
        </p>
      </section>

      <p className="muted" style={{ marginTop: 20, fontSize: 13 }}>
        Last updated:{" "}
        {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
      </p>
    </section>
  );
}

/* ---- local style helpers ---- */
const block = { margin: "16px 0" };
const h2 = { margin: "0 0 8px" };
const h3 = { margin: "0 0 6px", fontSize: 16 };

const ul = { margin: 0, paddingLeft: 18, lineHeight: 1.6 };
const ol = { margin: 0, paddingLeft: 18, lineHeight: 1.7 };

const twoColWrap = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
};
const card = {
  border: "1px solid var(--border)",
  background: "var(--surface)",
  borderRadius: 12,
  padding: 12,
  boxShadow: "var(--shadow-s)",
};

const details = {
  border: "1px solid var(--border)",
  borderRadius: 12,
  padding: "10px 12px",
  background: "var(--surface)",
  marginBottom: 8,
};
const summary = {
  cursor: "pointer",
  fontWeight: 600,
};
