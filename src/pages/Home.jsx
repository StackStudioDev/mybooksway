// src/Home.jsx
import { useMemo } from "react";
import { BOOKS } from "../data/books.mock.js";
import BookCardPremium from "../components/BookCardPremium.jsx";
import Hero from "../components/Hero.jsx";
import { Link } from "react-router-dom";

// stable shuffle so "mixed" look rahe but id-based stable ho
function hashStr(s){ let h=0; for(let i=0;i<s.length;i++) h=(h*31+s.charCodeAt(i))|0; return h; }
function stableShuffle(arr){ return [...arr].sort((a,b)=>hashStr(a.id)-hashStr(b.id)); }

export default function Home(){
  const bestsellers = useMemo(
    () => BOOKS.filter(b => b.badge === "Bestseller").slice(0, 8),
    []
  );

  const featured = useMemo(() => {
    const rest = stableShuffle(BOOKS).filter(b => b.badge !== "Bestseller");
    return [...bestsellers.slice(0,4), ...rest.slice(0,8)];
  }, [bestsellers]);

  const marathi = useMemo(()=> BOOKS.filter(b=>b.lang==="mr").slice(0,8), []);
  const hindi   = useMemo(()=> BOOKS.filter(b=>b.lang==="hi").slice(0,8), []);
  const english = useMemo(()=> BOOKS.filter(b=>b.lang==="en").slice(0,8), []);

  return (
    <>
      <Hero
        title="Your Indie Bookstore"
        subtitle={`Browse ${BOOKS.length}+ hand-picked titles in Marathi, Hindi & English`}
        ctaText="Shop All Books"
        ctaLink="/books?lang=all"
      />

      <Section id="featured" kicker="Explore" title="Featured" sub="Editor’s handpicked mix" moreLink="/books?lang=all">
        <Grid books={featured} />
      </Section>

      {bestsellers.length>0 && (
        <Section id="bestsellers" kicker="Trending" title="Bestsellers" sub="Most-loved by readers" moreLink="/bestsellers">
          <Grid books={bestsellers} />
        </Section>
      )}

      {marathi.length>0 && (
        <Section id="mr" kicker="मराठी" title="Marathi Picks" sub="मराठीतील लोकप्रिय" moreLink="/books?lang=mr">
          <Grid books={marathi} />
        </Section>
      )}

      {hindi.length>0 && (
        <Section id="hi" kicker="हिंदी" title="Hindi Picks" sub="हिंदी की चुनी हुई किताबें" moreLink="/books?lang=hi">
          <Grid books={hindi} />
        </Section>
      )}

      {english.length>0 && (
        <Section id="en" kicker="EN" title="English Picks" sub="Popular in English" moreLink="/books?lang=en">
          <Grid books={english} />
        </Section>
      )}
    </>
  );
}

function Section({ id, kicker, title, sub, moreLink, children }){
  return (
    <section id={id} className="home-sec">
      <header className="home-head">
        <div className="home-left">
          {kicker && <span className="home-kicker">{kicker}</span>}
          <h2 className="home-title">{title}</h2>
          {sub && <p className="home-sub">{sub}</p>}
        </div>
        {moreLink && (
          <div className="home-actions">
            <Link className="home-more" to={moreLink}>See more →</Link>
          </div>
        )}
      </header>

      <div className="home-divider" aria-hidden />
      {children}
    </section>
  );
}

function Grid({ books }){
  return (
    <div className="home-grid">
      {books.map(b => <BookCardPremium key={b.id} book={b} />)}
    </div>
  );
}
