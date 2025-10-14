// src/pages/Shipping.jsx
import { Link } from "react-router-dom";

export default function Shipping() {
  return (
    <section className="container" style={{ paddingTop: 12, paddingBottom: 24 }}>
      <header style={{ marginBottom: 12 }}>
        <h1 style={{ margin: 0 }}>Shipping &amp; Delivery</h1>
        <p className="muted" style={{ marginTop: 6 }}>
          We pack quickly and ship via trusted courier partners across India.
          Working hours: Mon–Sat, 9:00 AM – 6:00 PM IST.
        </p>
      </header>

      {/* Dispatch */}
      <section style={{ margin: "16px 0" }}>
        <h2 style={{ margin: "0 0 8px" }}>Dispatch time</h2>
        <p style={{ margin: 0 }}>
          Orders are usually dispatched within <strong>24–48 working hours</strong> after payment confirmation.
          You’ll receive an email/SMS as soon as we hand over the parcel to the courier.
        </p>
      </section>

      {/* Delivery timelines */}
      <section style={{ margin: "16px 0" }}>
        <h2 style={{ margin: "0 0 8px" }}>Estimated delivery timelines (India)</h2>
        <div
          style={{
            overflowX: "auto",
            border: "1px solid var(--border)",
            borderRadius: 12,
            background: "var(--surface)",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
            <thead>
              <tr style={{ background: "rgba(15,18,34,0.03)" }}>
                <th style={th}>Region</th>
                <th style={th}>ETA (working days)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={td}>Metros (e.g., Mumbai, Delhi, Bengaluru, Pune)</td>
                <td style={td}><strong>2–4</strong></td>
              </tr>
              <tr>
                <td style={td}>Tier-1 / Tier-2 cities</td>
                <td style={td}><strong>3–6</strong></td>
              </tr>
              <tr>
                <td style={td}>Remote / difficult-to-reach locations</td>
                <td style={td}><strong>5–9</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="muted" style={{ marginTop: 8 }}>
          ETAs exclude Sundays and public holidays. Weather, strikes, or seasonal load (festivals/sales)
          can add 1–2 days.
        </p>
      </section>

      {/* Fees & carriers */}
      <section style={{ margin: "16px 0" }}>
        <h2 style={{ margin: "0 0 8px" }}>Shipping fees &amp; carriers</h2>
        <ul style={ul}>
          <li>
            <strong>Fees:</strong> Shown transparently at checkout. Free shipping may apply during promotions.
          </li>
          <li>
            <strong>Carriers:</strong> We ship with leading partners such as Delhivery, Blue Dart, Xpressbees,
            and India Post depending on your pincode.
          </li>
          <li>
            <strong>Packaging:</strong> All books are packed with moisture-resistant sleeves and protective
            outer cartons to minimize transit damage.
          </li>
        </ul>
      </section>

      {/* Tracking */}
      <section style={{ margin: "16px 0" }}>
        <h2 style={{ margin: "0 0 8px" }}>Order tracking</h2>
        <ul style={ul}>
          <li>
            A <strong>tracking link</strong> is shared by email/SMS once your order ships.
          </li>
          <li>
            If the link shows “<em>label created</em>” for over 24 hours, give it one more business day—then contact us.
          </li>
          <li>
            Missed delivery? The courier will usually reattempt the next business day. You can also contact the
            courier using your tracking ID for scheduling assistance.
          </li>
        </ul>
      </section>

      {/* Address & changes */}
      <section style={{ margin: "16px 0" }}>
        <h2 style={{ margin: "0 0 8px" }}>Address accuracy &amp; changes</h2>
        <ul style={ul}>
          <li>
            Please ensure your <strong>full address</strong>, landmark, and <strong>active phone number</strong> are correct.
          </li>
          <li>
            Need to edit the address <em>before dispatch</em>? Email us immediately at{" "}
            <a href="mailto:mybooksway@gmail.com">mybooksway@gmail.com</a> with your order ID.
          </li>
          <li>
            After dispatch, address changes are subject to courier policies and may not always be possible.
          </li>
        </ul>
      </section>

      {/* What we don't offer */}
      <section style={{ margin: "16px 0" }}>
        <h2 style={{ margin: "0 0 8px" }}>Not available currently</h2>
        <ul style={ul}>
          <li><strong>Cash on Delivery (COD):</strong> Not supported at the moment.</li>
          <li><strong>International shipping:</strong> Not available yet.</li>
        </ul>
      </section>

      {/* Damages / Returns pointer */}
      <section style={{ margin: "16px 0" }}>
        <h2 style={{ margin: "0 0 8px" }}>Damaged or wrong items</h2>
        <p style={{ margin: 0 }}>
          If your parcel arrives damaged or you receive an incorrect item, please raise a request within{" "}
          <strong>48 hours of delivery</strong> with clear photos of the parcel and book. Refer to our{" "}
          <Link to="/returns">Returns &amp; Refunds Policy</Link> for the exact steps.
        </p>
      </section>

      {/* Help */}
      <section style={{ margin: "16px 0" }}>
        <h2 style={{ margin: "0 0 8px" }}>Need help?</h2>
        <p style={{ margin: 0 }}>
          Email: <a href="mailto:support@mybooksaway.com">support@mybooksaway.com</a> &nbsp;·&nbsp; Phone:{" "}
          <a href="tel:+918805900597">+91 8805900597</a>
          <br />
          We typically reply within 24 hours on business days.
        </p>
      </section>

      <p className="muted" style={{ marginTop: 20, fontSize: 13 }}>
        Last updated: {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
      </p>
    </section>
  );
}

/* ---------- small style helpers ---------- */
const th = {
  textAlign: "left",
  padding: "10px 12px",
  borderBottom: "1px solid var(--border)",
  fontWeight: 700,
  fontSize: 14,
};

const td = {
  padding: "10px 12px",
  borderBottom: "1px solid var(--border)",
  verticalAlign: "top",
  fontSize: 14,
};

const ul = {
  margin: 0,
  paddingLeft: "18px",
  lineHeight: 1.6,
};
