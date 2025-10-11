import { useMemo, useState } from "react";
import BookCardPremium from "../components/BookCardPremium.jsx";
import { BOOKS } from "../data/books.mock";

export default function Bestsellers() {
  const [q, setQ] = useState("");
  const [lang, setLang] = useState("");          // "", "en", "hi", "mr"
  const [sort, setSort] = useState("rating");    // rating | priceLow | priceHigh
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const filtered = useMemo(() => {
    // base: items marked Bestseller OR high-rated (>= 4.5)
    let arr = BOOKS.filter(
      b => (b.badge && /best/i.test(b.badge)) || (b.rating ?? 0) >= 4.5
    );

    if (q.trim()) {
      const s = q.toLowerCase();
      arr = arr.filter(b =>
        b.title.toLowerCase().includes(s) ||
        b.author.toLowerCase().includes(s)
      );
    }
    if (lang) arr = arr.filter(b => (b.lang || "").toLowerCase() === lang);

    switch (sort) {
      case "priceLow":  arr.sort((a,b)=>a.price-b.price); break;
      case "priceHigh": arr.sort((a,b)=>b.price-a.price); break;
      default:          arr.sort((a,b)=>(b.rating??0)-(a.rating??0));
    }
    return arr;
  }, [q, lang, sort]);

  const total = filtered.length;
  const paged = filtered.slice(0, page*pageSize);
  const canLoadMore = total > paged.length;

  return (
    <>
      <header className="section__head">
        <h2>Bestsellers</h2>
        <span className="muted">{total} top books</span>
      </header>

      {/* Filters (compact) */}
      <div className="filters glass" style={{
        display:"grid", gridTemplateColumns:"1.2fr .8fr .6fr .6fr", gap:10,
        padding:12, borderRadius:14, marginBottom:16
      }}>
        <input
          className="search__input"
          placeholder="Search in bestsellers…"
          value={q}
          onChange={(e)=>{ setQ(e.target.value); setPage(1); }}
        />

        <div className="seg" role="tablist" aria-label="Filter by language">
          {["","en","hi","mr"].map(code=>(
            <button
              key={code || "all"}
              className={`seg__btn ${lang===code ? "is-active":""}`}
              onClick={()=>{ setLang(code); setPage(1); }}
            >
              {code==="" ? "All" : code==="en" ? "English" : code==="hi" ? "हिंदी" : "मराठी" }
            </button>
          ))}
        </div>

        <select className="search__input" value={sort} onChange={e=>setSort(e.target.value)}>
          <option value="rating">Sort: Rating</option>
          <option value="priceLow">Price: Low → High</option>
          <option value="priceHigh">Price: High → Low</option>
        </select>

        <button className="btn btn--ghost" onClick={()=>{
          setQ(""); setLang(""); setSort("rating"); setPage(1);
        }}>Clear</button>
      </div>

      {/* Grid */}
      <section className="grid grid--auto">
        {paged.map(b => <BookCardPremium key={b.id} book={b} />)}
      </section>

      {/* Load more */}
      <div style={{display:"flex", justifyContent:"center", padding:"18px 0"}}>
        {canLoadMore ? (
          <button className="btn btn--primary" onClick={()=>setPage(p=>p+1)}>Load more</button>
        ) : (
          <span className="muted">You’ve reached the end.</span>
        )}
      </div>
    </>
  );
}
