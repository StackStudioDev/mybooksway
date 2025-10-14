// src/pages/Privacy.jsx
import { Link } from "react-router-dom";

export default function Privacy() {
  const today = new Date().toLocaleDateString("en-IN");

  return (
    <section className="container">
      <h2>Privacy Policy</h2>
      <p className="muted" style={{ marginTop: 4 }}>
        This Privacy Policy explains how <b>MyBooksWay</b> (“we”, “us”, “our”) collects, uses,
        shares and protects your information when you browse or purchase from our website.
      </p>

      <h4>1. Information we collect</h4>
      <ul>
        <li>
          <b>Identity &amp; contact:</b> name, email, phone, billing/shipping address.
        </li>
        <li>
          <b>Order &amp; support:</b> items purchased, order IDs, messages you send to our
          Support (<Link to="/support" className="link">Support</Link>).
        </li>
        <li>
          <b>Payments:</b> Processed by our payment gateway (e.g., <b>Razorpay</b>). We <b>do not store</b>
          your full card, UPI, or net-banking credentials on our servers.
        </li>
        <li>
          <b>Technical data:</b> IP address, device/browser info, pages viewed, and cookies or
          similar technologies for session management, analytics and fraud prevention.
        </li>
        <li>
          <b>Marketing preferences:</b> your opt-ins for updates and offers (you may opt out anytime).
        </li>
      </ul>

      <h4>2. Why we use your information (lawful bases)</h4>
      <ul>
        <li><b>To fulfil your order</b> (contract): checkout, payment, shipping, returns.</li>
        <li><b>To communicate with you</b> (contract/legitimate interests): order updates, support.</li>
        <li><b>To improve safety &amp; quality</b> (legitimate interests): troubleshooting, analytics, fraud checks.</li>
        <li><b>To comply with law</b> (legal obligation): tax, accounting, regulatory requests.</li>
        <li><b>With your consent</b>: newsletters, offers; you can withdraw consent anytime.</li>
      </ul>

      <h4>3. Sharing &amp; processors</h4>
      <p>
        We share data with trusted service providers strictly for the purposes above, including:
        payment gateways (<b>Razorpay</b>), logistics/couriers (for delivery), customer
        communications (email/SMS/WhatsApp), and analytics/fraud-prevention tools. They process
        data under contracts that require appropriate confidentiality and security.
      </p>

      <h4>4. Data retention</h4>
      <p>
        We retain order and invoice information as required by law (e.g., tax and accounting).
        Support tickets and operational logs are kept for a reasonable period to resolve issues and
        improve services, then securely deleted or anonymized.
      </p>

      <h4>5. Security</h4>
      <p>
        We implement reasonable technical and organizational measures to protect your data.
        Payments are handled by PCI-DSS compliant gateways (e.g., Razorpay). Still, no method of
        transmission over the Internet is 100% secure, so we cannot guarantee absolute security.
      </p>

      <h4>6. Cookies &amp; similar technologies</h4>
      <p>
        Cookies help us keep you signed in, remember preferences, and understand site usage.
        You can control cookies via your browser settings; disabling some may affect site features.
      </p>

      <h4>7. Your rights</h4>
      <ul>
        <li>Access, correct, or delete certain personal data.</li>
        <li>Withdraw consent (where processing is based on consent).</li>
        <li>Opt out of marketing communications anytime.</li>
        <li>File a complaint with a supervisory authority where applicable.</li>
      </ul>

      <h4>8. Children</h4>
      <p>
        Our website is intended for adults. If you believe a minor has provided us personal data,
        please contact us and we will take appropriate steps to remove it.
      </p>

      <h4>9. International transfers</h4>
      <p>
        Some providers may process data outside India. Where applicable, we take reasonable steps
        to ensure adequate protection consistent with this Policy.
      </p>

      <h4>10. Updates to this Policy</h4>
      <p>
        We may update this Policy from time to time. Material changes will be indicated on this page.
        Continued use of the site after updates constitutes acceptance.
      </p>

      <h4>11. Contact &amp; Grievance</h4>
      <p>
        For privacy requests (access/correction/deletion) or questions, write to{" "}
        <a className="link" href="mailto:mybooksway@gmail.com">mybooksway@gmail.com</a>. You can
        also reach us on WhatsApp/Phone:{" "}
        <a className="link" href="tel:+918805900597">+91 88059 00597</a>.
      </p>
      <p className="muted">
        Related: <Link to="/shipping" className="link">Shipping &amp; Delivery</Link> •{" "}
        <Link to="/refunds" className="link">Returns &amp; Refunds</Link> •{" "}
        <Link to="/terms" className="link">Terms &amp; Conditions</Link>
      </p>

      <p className="muted">Last updated: {today}</p>
    </section>
  );
}
