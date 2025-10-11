// src/pages/Bestsellers.jsx
import React, { useMemo, useState } from "react";
import { BOOKS } from "../data/books.mock.js";
import BookCardPremium from "../components/BookCardPremium.jsx";
import "../App.css";

export default function Bestsellers() {
  // filters
  const [q, setQ] = useState("");
  const [lang, setLang] = useState("all");       // all|en|hi|mr
  const [sort, setSort] = useState("featured");  // featured | rating | price-asc | price-desc

  const LIMIT = 20;

  // Build list: Bestsellers first, then top-rated fillers to reach LIMIT
  const list = useMemo(() => {
    // 1) pool by language + query
    let pool = BOOKS;
    if (lang !== "all") pool = pool.filter(b => b.lang === lang);

    const s = q.trim().toLowerCase();
    if (s) {
      pool = pool.filter(
        b =>
          (b.title || "").toLowerCase().includes(s) ||
          (b.author || "").toLowerCase().includes(s)
      );
    }

    // 2) split by badge
    const starred = pool.filter(b => b.badge === "Bestseller");
    const others = pool
      .filter(b => b.badge !== "Bestseller")
      .sort((a, b) => b.rating - a.rating || a.price - b.price);

    // 3) merge bestsellers first, then top-rated fillers
    let merged = [...starred, ...others];

    // 4) default "featured" keeps bestsellers on top; other sorts reorder fully
    if (sort === "rating") merged = [...merged].sort((a, b) => b.rating - a.rating);
    if (sort === "price-asc") merged = [...merged].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") merged = [...merged].sort((a, b) => b.price - a.price);

    // 5) cap to LIMIT for a nice dense grid
    return merged.slice(0, LIMIT);
  }, [q, lang, sort]);

  const clear = () => { setQ(""); setLang("all"); setSort("featured"); };

  return (
    <div style={{ padding: "14px 12px" }}>
      <header style={{ display: "flex", alignItems: "baseline", gap: 10, justifyContent: "space-between" }}>
        <h1 style={{ margin: 0 }}>Bestsellers</h1>
        <div style={{ opacity: .7, fontSize: 14 }}>{list.length} top books</div>
      </header>

      {/* toolbar (same dark style as All Books) */}
      <div className="tb-bar theme-dark" style={{ marginTop: 10 }}>
        <form
          className="tb-search"
          onSubmit={(e) => e.preventDefault()}
          role="search"
          aria-label="Search bestsellers"
        >
          <span className="tb-icon" aria-hidden>🔎</span>
          <input
            className="tb-input"
            placeholder="Search in bestsellers…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </form>

        <div className="tb-controls">
          {/* language segmented buttons */}
          <div style={{
            display: "inline-flex", padding: 6, borderRadius: 999,
            background: "#0b1422", border: "1px solid #1e293b"
          }}>
            {[
              ["all", "All"],
              ["en", "English"],
              ["hi", "हिंदी"],
              ["mr", "मराठी"],
            ].map(([val, label]) => (
              <button
                key={val}
                type="button"
                onClick={() => setLang(val)}
                className="tb-btn"
                style={{
                  height: 36, padding: "0 12px",
                  background: lang === val ? "linear-gradient(180deg,#3b82f6,#1e40af)" : "transparent",
                  borderColor: lang === val ? "#3b82f6" : "#334155",
                  color: lang === val ? "#fff" : "#93c5fd",
                  boxShadow: lang === val ? "0 6px 16px rgba(59,130,246,.28)" : "none"
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <select
            className="tb-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            title="Sort"
          >
            <option value="featured">Sort: Featured</option>
            <option value="rating">Sort: Rating</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>

          <button type="button" onClick={clear} className="tb-btn ghost">Clear</button>
        </div>
      </div>

      {/* GRID — same component & classes so UI matches */}
      {list.length === 0 ? (
        <EmptyState q={q} />
      ) : (
        <div className="home-grid" style={{ marginTop: 8 }}>
          {list.map(b => (
            <BookCardPremium key={b.id} book={b} />
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyState({ q }) {
  return (
    <div
      style={{
        padding: "2rem",
        textAlign: "center",
        border: "1px dashed #2b3545",
        borderRadius: 12,
        marginTop: 12
      }}
    >
      <h3 style={{ margin: 0 }}>No bestsellers found</h3>
      <p style={{ marginTop: 8, opacity: .7 }}>
        {q ? `Try different keywords than “${q}”.` : "Try changing filters."}
      </p>
    </div>
  );
}
