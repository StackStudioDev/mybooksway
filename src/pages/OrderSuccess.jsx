import { useSearchParams, Link } from "react-router-dom";

export default function OrderSuccess() {
  const [sp] = useSearchParams();
  const pid = sp.get("payment_id");
  const oid = sp.get("order_id");

  return (
    <section className="container" style={{ textAlign: "center" }}>
      <h2>Payment Successful ✅</h2>
      <p>Thanks! Your payment was received.</p>
      <p className="muted">
        Payment ID: <code>{pid}</code><br />
        Order ID: <code>{oid}</code>
      </p>
      <Link to="/books" className="btn btn--primary">Continue shopping</Link>
    </section>
  );
}
