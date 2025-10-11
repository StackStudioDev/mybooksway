import { useLocation } from "react-router-dom";

export default function Login() {
  const loc = useLocation();
  const next = encodeURIComponent(loc.state?.from || "/dashboard");
  const apiBase = import.meta.env.VITE_API_URL || "/api";

  const startGoogle = () => {
     window.location.href = `${apiBase}/auth/google?next=${next}`;
  };

  return (
    <section className="login-page">
      <div className="login-card">
        <div className="login-header">
          <img
            src="/logo192.png"
            alt="Ekart Books"
            className="login-logo"
          />
          <h1>Welcome Back</h1>
          <p>Sign in to continue to MyBooksWay</p>
        </div>

        <button className="google-btn" onClick={startGoogle}>
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google logo"
            className="google-icon"
          />
          Continue with Google
        </button>

        <p className="login-footer">
          By continuing, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </p>
      </div>
    </section>
  );
}