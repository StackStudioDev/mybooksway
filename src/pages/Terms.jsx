// src/pages/Terms.jsx
import { Link } from "react-router-dom";

export default function Terms() {
  const today = new Date().toLocaleDateString("en-IN");

  return (
    <section className="container">
      <h2>Terms &amp; Conditions</h2>

      <p><strong>Billing / Trading Name:</strong> <span>MyBooksWay</span></p>
      <p className="muted" style={{ marginTop: 4 }}>
        These Terms govern your use of the MyBooksWay website and purchases made on it. By accessing or using our site, you agree to these Terms and our policies referenced below.
      </p>

      <ol style={{ lineHeight: 1.7, paddingLeft: 18 }}>
        <li>
          <strong>Eligibility &amp; Account.</strong> You represent that you are at least 18 years old and legally competent to contract under the laws of India. You are responsible for all activity under your account.
        </li>

        <li>
          <strong>Products, Pricing &amp; Currency.</strong> All prices are displayed in <b>INR</b> and, where applicable, are inclusive of taxes as shown. Product images are illustrative; minor variations may occur. Final payable amount (including shipping, if any) is displayed at checkout.
        </li>

        <li>
          <strong>Orders &amp; Confirmation.</strong> An order is confirmed after successful payment authorization. We may cancel (with full refund) for reasons including stock unavailability, system/pricing error, or suspected fraud.
        </li>

        <li>
          <strong>Payments (via Razorpay).</strong> We accept UPI, cards, and net-banking through <b>Razorpay</b>. Payments are processed by Razorpay Payment Gateway (PCI-DSS compliant). We do not store your complete card or UPI details on our servers. Any chargeback/dispute should be raised with your issuing bank while also notifying us.
        </li>

        <li>
          <strong>Cash on Delivery (COD).</strong> <b>Not available.</b> All orders must be prepaid using the supported online methods.
        </li>

        <li>
          <strong>Shipping &amp; Delivery.</strong> Orders are typically dispatched within <b>24–48 working hours</b>. Usual delivery timelines: Metros 2–4 days, Tier-1/2 cities 3–6 days, and remote locations 5–9 days. For full details, see <Link to="/shipping" className="link">Shipping &amp; Delivery</Link>.
        </li>

        <li>
          <strong>Returns &amp; Refunds.</strong> Unused, undamaged books in original condition are generally eligible for return within <b>7 days</b> of delivery (see exclusions). Approved refunds are issued to the original payment method within <b>5–7 working days</b> after quality check. Full policy: <Link to="/refunds" className="link">Returns &amp; Refunds</Link>.
        </li>

        <li>
          <strong>Use of Content.</strong> All site content (text, graphics, logos, images) is owned/licensed by MyBooksWay. No reproduction, distribution, or derivative use is permitted without prior written consent.
        </li>

        <li>
          <strong>Privacy &amp; Data.</strong> We handle your personal data as described in our <Link to="/privacy" className="link">Privacy Policy</Link>. By using our site, you consent to that collection and use.
        </li>

        <li>
          <strong>Limitation of Liability.</strong> To the maximum extent permitted by law, MyBooksWay shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the site or products.
        </li>

        <li>
          <strong>Fraud &amp; Misuse.</strong> We reserve the right to refuse/cancel orders, block accounts, or seek legal remedy in case of suspected fraud, abuse, or violations of these Terms.
        </li>

        <li>
          <strong>Governing Law &amp; Jurisdiction.</strong> These Terms are governed by the laws of India. Courts at <b>Mumbai</b> shall have exclusive jurisdiction.
        </li>

        <li>
          <strong>Support &amp; Contact.</strong> For order, payment, or policy questions, contact:
          <div style={{ marginTop: 6 }}>
            Email: <a className="link" href="mailto:mybooksway@gmail.com">mybooksway@gmail.com</a> &nbsp;•&nbsp;
            Phone / WhatsApp: <a className="link" href="tel:+918805900597">+91 88059 00597</a> &nbsp;•&nbsp;
            Help: <Link to="/support" className="link">Support</Link>
          </div>
        </li>

        <li>
          <strong>Updates to Terms.</strong> We may modify these Terms from time to time. Continued use of the site constitutes acceptance of the revised Terms.
        </li>
      </ol>

      <p className="muted">Last updated: {today}</p>
    </section>
  );
}
