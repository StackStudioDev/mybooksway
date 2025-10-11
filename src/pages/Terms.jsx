// src/pages/Terms.jsx
export default function Terms() {
  return (
    <section className="container">
      <h2>Terms & Conditions</h2>
      <p><strong>Billing name:</strong> MyBooksWay</p>
      <ol style={{lineHeight:1.7}}>
        <li><strong>Account & Eligibility:</strong> You affirm that you are at least 18 and will use the website in compliance with Indian laws.</li>
        <li><strong>Products & Pricing:</strong> Prices are shown in INR and inclusive of applicable taxes where mentioned. Final price is displayed at checkout.</li>
        <li><strong>Orders:</strong> Orders are confirmed once payment is authorized. We may cancel/refund in case of stock or pricing errors.</li>
        <li><strong>Shipping:</strong> Orders are dispatched within 24–48 working hours. Delivery timelines are listed on the Shipping page.</li>
        <li><strong>Returns & Refunds:</strong> See our Returns & Refunds policy for eligibility and timelines.</li>
        <li><strong>Use of Content:</strong> All content is owned/licensed by MyBooksWay; no reproduction without consent.</li>
        <li><strong>Limitation of Liability:</strong> To the maximum extent permitted by law, we are not liable for indirect or consequential damages.</li>
        <li><strong>Governing Law:</strong> These terms are governed by the laws of India, courts at Mumbai shall have jurisdiction.</li>
        <li><strong>Contact:</strong> support@mybooksaway.com • +91 98765 43210</li>
      </ol>
      <p className="muted">Last updated: {new Date().toLocaleDateString("en-IN")}</p>
    </section>
  );
}
