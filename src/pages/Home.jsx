// src/Home.jsx
import { useMemo } from "react";
import { BOOKS } from "../data/books.mock.js";
import BookCardPremium from "../components/BookCardPremium.jsx";
import Hero from "../components/Hero.jsx";
import { Link } from "react-router-dom";

// stable shuffle so "mixed" look rahe but har refresh pe id-based stable ho
function hashStr(s) { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return h; }
function stableShuffle(arr) { return [...arr].sort((a, b) => hashStr(a.id) - hashStr(b.id)); }

export default function Home() {
  const bestsellers = useMemo(() => BOOKS.filter(b => b.badge === "Bestseller").slice(0, 8), []);
  const featured = useMemo(() => {
    // thoda sa mix: 4 bestsellers + 8 random-ish from all
    const rest = stableShuffle(BOOKS).filter(b => b.badge !== "Bestseller");
    return [...bestsellers.slice(0, 4), ...rest.slice(0, 8)];
  }, [bestsellers]);

  const marathi = useMemo(() => BOOKS.filter(b => b.lang === "mr").slice(0, 8), []);
  const hindi   = useMemo(() => BOOKS.filter(b => b.lang === "hi").slice(0, 8), []);
  const english = useMemo(() => BOOKS.filter(b => b.lang === "en").slice(0, 8), []);

  return (
    <>
      <Hero
        title="Your Indie Bookstore"
        subtitle={`Browse ${BOOKS.length}+ hand-picked titles in Marathi, Hindi & English`}
        ctaText="Shop All Books"
        ctaLink="/books?lang=all"
      />

      <Section title="Featured">
        <Grid books={featured} />
        <More link="/books?lang=all" />
      </Section>

      {bestsellers.length > 0 && (
        <Section title="Bestsellers">
          <Grid books={bestsellers} />
          <More link="/bestsellers" />
        </Section>
      )}

      {marathi.length > 0 && (
        <Section title="Marathi Picks">
          <Grid books={marathi} />
          <More link="/books?lang=mr" />
        </Section>
      )}

      {hindi.length > 0 && (
        <Section title="Hindi Picks">
          <Grid books={hindi} />
          <More link="/books?lang=hi" />
        </Section>
      )}

      {english.length > 0 && (
        <Section title="English Picks">
          <Grid books={english} />
          <More link="/books?lang=en" />
        </Section>
      )}
    </>
  );
}

function Section({ title, children }) {
  return (
    <section style={{ padding: "2rem 1rem", maxWidth: 1200, margin: "0 auto" }}>
      <h2 style={{ marginBottom: "1rem" }}>{title}</h2>
      {children}
    </section>
  );
}

function Grid({ books }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: "14px",
      }}
    >
      {books.map((b) => (
        <BookCardPremium key={b.id} book={b} />
      ))}
    </div>
  );
}

function More({ link }) {
  return (
    <div style={{ textAlign: "right", marginTop: "0.75rem" }}>
      <Link to={link} className="btn">See more →</Link>
    </div>
  );
}
