import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

export default function App() {
  return (
    <>
      {/* force page to start at top on every route change */}
      <ScrollToTop />

      <Navbar />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
