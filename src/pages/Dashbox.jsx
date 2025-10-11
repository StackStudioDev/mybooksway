import { api } from "../api.js";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [me, setMe] = useState(null);

  useEffect(() => {
    api.get("/me").then(r => setMe(r.data.user)).catch(() => setMe(null));
  }, []);

  const logout = async () => {
    await api.post("/auth/logout");
    window.location.href = "/login";
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(me, null, 2)}</pre>
      <button onClick={logout}>Logout</button>
    </div>
  );
}