// src/pages/BooksList.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { BOOKS } from "../data/books.mock.js";
import BookCardPremium from "../components/BookCardPremium.jsx";
import "../App.css";

// --- helpers: stable "mixed" order so All doesn't cluster by language ---
function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}
function stableShuffle(arr) {
  // sort by hashed id => deterministic interleaving across refreshes
  return [...arr].sort((a, b) => hashStr(a.id) - hashStr(b.id));
}

export default function BooksList() {
  const [sp, setSp] = useSearchParams();
  const lang = sp.get("lang") || "all"; // all|mr|hi|en
  const q = sp.get("q") || "";
  const sort = sp.get("sort") || ""; // "", "price-asc", "price-desc", "rating"
  const pageFromUrl = Number(sp.get("page") || 1);

  // search input local state
  const [searchText, setSearchText] = useState(q);
  useEffect(() => setSearchText(q), [q]);

  // ---------- FILTER + SORT + MIXED ----------
  const filtered = useMemo(() => {
    let base = BOOKS;

    if (lang !== "all") base = base.filter((b) => b.lang === lang);

    const s = (q || "").trim().toLowerCase();
    if (s) {
      base = base.filter(
        (b) =>
          (b.title || "").toLowerCase().includes(s) ||
          (b.author || "").toLowerCase().includes(s)
      );
    }

    if (lang === "all") base = stableShuffle(base);

    if (sort === "price-asc") base = [...base].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") base = [...base].sort((a, b) => b.price - a.price);
    if (sort === "rating") base = [...base].sort((a, b) => b.rating - a.rating);

    return base;
  }, [lang, q, sort]);

  // ---------- Pagination ----------
  const PAGE_SIZE = 12;
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(Math.max(1, pageFromUrl), pageCount);
  const paged = useMemo(
    () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filtered, page]
  );

  // ---------- Handlers ----------
  const updateParam = (key, value) => {
    const next = new URLSearchParams(sp);
    if (value === "" || value === "all") next.delete(key);
    else next.set(key, value);
    if (key !== "page") next.delete("page");
    setSp(next, { replace: true });
  };

  const onSubmitSearch = (e) => {
    e.preventDefault();
    updateParam("q", searchText.trim());
  };

  const clearFilters = () => setSp(new URLSearchParams(), { replace: true });

  // ---------- UI ----------
  return (
    <div className="page-wrap">

      {/* --- TOP CONTROLS (styled by tb-* CSS) --- */}
      <div className="tb-bar theme-dark">
        <form onSubmit={onSubmitSearch} className="tb-search" role="search">
          <span className="tb-icon" aria-hidden>
            🔎
          </span>
          <input
            className="tb-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search title or author..."
            aria-label="Search books"
          />
          <button type="submit" className="tb-btn">
            Search
          </button>
        </form>

        <div className="tb-controls">
          <select
            className="tb-select"
            value={lang}
            onChange={(e) => updateParam("lang", e.target.value)}
            title="Language"
          >
            <option value="all">All languages</option>
            <option value="hi">Hindi (हि)</option>
            <option value="mr">Marathi (मरा)</option>
            <option value="en">English (EN)</option>
          </select>

          <select
            className="tb-select"
            value={sort}
            onChange={(e) => updateParam("sort", e.target.value)}
            title="Sort by"
          >
            <option value="">Featured</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Rating</option>
          </select>

          <button onClick={clearFilters} className="tb-btn ghost">
            Reset
          </button>
          <Link to="/bestsellers" className="tb-btn link">
            Bestsellers →
          </Link>
        </div>
      </div>

      {/* Meta */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px 4px",
          opacity: 0.8,
          fontSize: 14,
        }}
      >
        <div>
          Showing <b>{paged.length}</b> of <b>{filtered.length}</b>{" "}
          {lang === "all" ? "books" : `${lang.toUpperCase()} books`}
          {q ? <> for “<i>{q}</i>”</> : null}
        </div>
        <div />
      </div>

      {/* Grid */}
      {paged.length === 0 ? (
        <EmptyState q={q} />
      ) : (
        // ⬇️ responsive class (no inline grid styles)
        <div className="books-grid">
          {paged.map((b) => (
            <BookCardPremium key={b.id} book={b} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {pageCount > 1 && (
        <Pagination
          page={page}
          pageCount={pageCount}
          onPage={(p) => updateParam("page", String(p))}
        />
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
        border: "1px dashed #ddd",
        borderRadius: 12,
        marginTop: "1rem",
      }}
    >
      <h3 style={{ margin: 0 }}>No books found</h3>
      <p style={{ marginTop: 8, opacity: 0.7 }}>
        {q ? `Try different keywords than “${q}”.` : "Try changing filters."}
      </p>
    </div>
  );
}

function Pagination({ page, pageCount, onPage }) {
  const go = (p) => onPage(Math.min(Math.max(1, p), pageCount));
  const btn = (label, p, disabled = false) => (
    <button
      key={label + p}
      onClick={() => go(p)}
      disabled={disabled}
      style={{ minWidth: 40 }}
    >
      {label}
    </button>
  );
  const pages = [];
  for (let i = 1; i <= pageCount; i++) {
    if (i === 1 || i === pageCount || Math.abs(i - page) <= 1) {
      pages.push(
        <button
          key={i}
          onClick={() => go(i)}
          aria-current={i === page ? "page" : undefined}
          style={{
            fontWeight: i === page ? 700 : 400,
            minWidth: 40,
          }}
        >
          {i}
        </button>
      );
    } else if (
      (i === page - 2 && page - 3 > 1) ||
      (i === page + 2 && page + 3 < pageCount)
    ) {
      pages.push(
        <span key={`gap-${i}`} style={{ padding: "0 6px" }}>
          …
        </span>
      );
    }
  }

  return (
    <nav
      aria-label="Pagination"
      style={{
        display: "flex",
        gap: 8,
        justifyContent: "center",
        margin: "16px 0",
        alignItems: "center",
      }}
    >
      {btn("«", 1, page === 1)}
      {btn("‹", page - 1, page === 1)}
      {pages}
      {btn("›", page + 1, page === pageCount)}
      {btn("»", pageCount, page === pageCount)}
    </nav>
  );
}
