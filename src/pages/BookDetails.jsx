// src/pages/BookDetails.jsx
import React, { useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { BOOKS } from "../data/books.mock.js";
import { useCart } from "../context/CartContext.jsx";

const inr = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(n ?? 0);

export default function BookDetails() {
  const { id } = useParams();           // /book/:id
  const navigate = useNavigate();
  const { addItem } = useCart();

  const book = useMemo(() => BOOKS.find((b) => b.id === id), [id]);

  if (!book) {
    return (
      <div className="bd-wrap">
        <div className="bd-card">
          <h2 style={{ marginTop: 0 }}>Book not found</h2>
          <p className="bd-dim">This book is unavailable or the link is invalid.</p>
          <div style={{ marginTop: 10 }}>
            <button className="bd-btn" onClick={() => navigate(-1)}>‹ Go back</button>
            <Link to="/books" className="bd-btn ghost" style={{ marginLeft: 8 }}>
              Browse All Books →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const {
    title, author, cover, price, mrp, rating, lang, badge = "", category = "", desc
  } = book;

  const discount = mrp && price ? Math.max(0, Math.round(((mrp - price) / mrp) * 100)) : 0;

  const langLabel =
    lang === "en" ? "EN" : lang === "hi" ? "हि" : lang === "mr" ? "मरा" : (lang || "—");

  const fallbackDesc =
    desc ||
    `${title} by ${author}. A ${category || "book"} in ${langLabel} with a customer rating of ${rating || "—"}★.`;

  const addToCart = () => addItem(book, 1);

  return (
    <div className="bd-wrap">
      <div className="bd-grid">
        {/* Cover */}
        <div className="bd-cover">
          <img src={cover} alt={title} onError={(e)=>{e.currentTarget.src="/images/placeholder.jpg"}} />
          {badge ? <span className="bd-badge">{badge}</span> : null}
          <span className="bd-lang">{langLabel}</span>
        </div>

        {/* Info */}
        <div className="bd-info">
          <Link to="/books" className="bd-back">‹ Back to All Books</Link>
          <h1 className="bd-title">{title}</h1>
          <p className="bd-author">{author}</p>

          <div className="bd-row">
            <div className="bd-price">
              <span className="bd-price-now">{inr(price)}</span>
              {mrp ? <span className="bd-price-mrp">{inr(mrp)}</span> : null}
              {discount ? <span className="bd-off">{discount}% off</span> : null}
            </div>
            {rating ? <div className="bd-rating">★ {rating}</div> : null}
          </div>

          <p className="bd-desc">{fallbackDesc}</p>

          <div className="bd-cta">
            <button className="bd-btn" onClick={addToCart}>Add to cart</button>
            <Link to="/cart" className="bd-btn ghost">Go to cart →</Link>
          </div>

          {/* tiny meta */}
          <ul className="bd-meta">
            {category ? <li><b>Category:</b> {category}</li> : null}
            <li><b>Language:</b> {langLabel}</li>
            <li><b>ID:</b> {id}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
