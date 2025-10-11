// src/components/Navbar.jsx
import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import wordmark from "/mbw-wordmark-way.svg";
import icon from "/mbw-logo-mark.svg";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // close the mobile menu on route change (auto-close after navigation)
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // header shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    let ticking = false;
    const handler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          onScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // if user rotates/expands to desktop, close the mobile menu
  useEffect(() => {
    const onResize = () => window.innerWidth > 980 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <header className={`nav nav--fixed nav--tint ${scrolled ? "is-scrolled" : ""}`}>
        <div className="nav__wrap">
          <Link
            to="/"
            className="brand"
            aria-label="mybooksaway home"
            onClick={() => setOpen(false)}
            style={{ display: "flex", alignItems: "center", gap: 10 }}
          >
            {/* <img src={icon} alt="" style={{ height: 32, width: 32, borderRadius: 10 }} /> */}
            <img src={wordmark} alt="mybooksaway" style={{ height: 40 }} />
          </Link>

          <nav className={`nav__links ${open ? "is-open" : ""}`} aria-label="Primary">
            <NavLink className="nav__link" to="/" onClick={() => setOpen(false)}>
              Home
            </NavLink>
            <NavLink className="nav__link" to="/books" onClick={() => setOpen(false)}>
              All Books
            </NavLink>
            <NavLink className="nav__link" to="/bestsellers" onClick={() => setOpen(false)}>
              Bestsellers
            </NavLink>
            <NavLink className="nav__link" to="/contact" onClick={() => setOpen(false)}>
              Contact
            </NavLink>
          </nav>

          <div className="nav__actions">
            <input
              className="search__input"
              placeholder="Search books, authors…"
              aria-label="Search"
            />

            <Link
              to="/cart"
              className="btn btn--ghost cart-btn"
              aria-label="Open cart"
              onClick={() => setOpen(false)}
              style={{ position: "relative" }}
            >
              Cart
              {count > 0 && (
                <span className="cart-badge" aria-label={`${count} items in cart`}>
                  {count}
                </span>
              )}
            </Link>

            <button className="btn btn--primary" onClick={() => navigate("/login")}>
              Sign in
            </button>

            <button
              className="burger"
              aria-label="Toggle menu"
              aria-expanded={open ? "true" : "false"}
              onClick={() => setOpen(v => !v)}
              type="button"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <div className="nav__spacer" aria-hidden="true" />
    </>
  );
}
