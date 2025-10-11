import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero hero--gradient">
      <div className="hero__glow" />
      <div className="hero__content">
        <p className="eyebrow">YOUR READING, YOUR WAY</p>
        <h1 className="hero__title">
          Discover premium reads on <span className="txt-gradient">mybooksway</span>
        </h1>
        <p className="hero__sub">
          English • हिंदी • मराठी — curated shelves, best prices and lightning-fast delivery.
        </p>

        {/* ⬇️ yahin par button ko Link se replace kiya hai */}
        <div className="hero__cta">
          <input
            className="search__input search__input--xl"
            placeholder="Search by title, author or ISBN…"
          />
          <Link to="/books" className="btn btn--primary">Explore</Link>
        </div>

        <ul className="hero__stats">
          <li><strong>10k+</strong><span>Titles</span></li>
          <li><strong>4.8★</strong><span>Avg Rating</span></li>
          <li><strong>24h</strong><span>Dispatch</span></li>
        </ul>
      </div>

      <div className="hero__art">
        <div className="card-hero glass">
          <img
            src="https://placehold.co/520x360?text=Curated+Books"
            alt="Curated books preview"
          />
        </div>
      </div>
    </section>
  );
}
