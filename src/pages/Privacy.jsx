// src/pages/Privacy.jsx
export default function Privacy() {
  return (
    <section className="container">
      <h2>Privacy Policy</h2>
      <p><strong>Who we are:</strong> MyBooksWay (“we”, “us”).</p>
      <h4>Data we collect</h4>
      <ul>
        <li>Contact info (name, email, phone), order details, and delivery address.</li>
        <li>Payment instrument details are processed by the payment gateway (e.g., Razorpay); we do not store full card data.</li>
        <li>Technical data like IP, device/browser info, and cookies for analytics & fraud prevention.</li>
      </ul>
      <h4>How we use data</h4>
      <ul>
        <li>To process orders, payments, shipping and support.</li>
        <li>To improve our catalog, UX and detect misuse/fraud.</li>
        <li>With consent, to send updates and offers (you can opt out).</li>
      </ul>
      <h4>Sharing</h4>
      <p>We share data with service providers strictly to fulfill orders: payment gateways, couriers, email/SMS providers, analytics.</p>
      <h4>Your rights</h4>
      <p>Write to <a href="mailto:support@mybooksaway.com">support@mybooksaway.com</a> to access, correct, or delete your data as per applicable law.</p>
      <p className="muted">Last updated: {new Date().toLocaleDateString("en-IN")}</p>
    </section>
  );
}
