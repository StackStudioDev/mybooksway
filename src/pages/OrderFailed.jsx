import { useLocation, Link } from "react-router-dom";

export default function OrderFailed() {
  const { state } = useLocation();
  const err = state?.error;

  return (
    <section className="container" style={{ textAlign: "center" }}>
      <h2>Payment Failed ❌</h2>
      <p className="muted">{err?.description || "The payment was not completed."}</p>
      {err?.reason && <p className="muted">Reason: {err.reason}</p>}
      <Link to="/cart" className="btn btn--primary">Try again</Link>
    </section>
  );
}
