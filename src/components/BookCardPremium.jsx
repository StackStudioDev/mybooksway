import { useCart } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";

const inr = (n)=> `₹${Number(n ?? 0).toLocaleString("en-IN")}`;

export default function BookCardPremium({ book }) {
  const { addItem } = useCart();

  const cover = book.coverUrl || book.cover || "https://placehold.co/600x800?text=Book";
  const langLower = String(book.lang || "").toLowerCase();
  const tagClass =
    langLower === "en" ? "tag--en" :
    langLower === "hi" ? "tag--hi" : "tag--mr";
  const langLabel =
    book.langLabel ?? (langLower === "en" ? "EN" : langLower === "hi" ? "हि" : "मरा");
  const rating = typeof book.rating === "number" ? book.rating.toFixed(1) : "4.5";

  return (
    <div className="card-premium">
      <div className="card-premium__media">
        <img src={cover} alt={book.title} />
        <span className={`tag ${tagClass}`}>{langLabel}</span>
        {book.badge && <span className="badge">{book.badge}</span>}
      </div>

      <div className="card-premium__body">
        <h3 className="card-premium__title" title={book.title}>{book.title}</h3>
        <p className="card-premium__meta">{book.author}</p>

        <div className="card-premium__row">
          <div className="price">{inr(book.price)}</div>
          {book.mrp && book.mrp > book.price && <del className="mrp">{inr(book.mrp)}</del>}
          <div className="rating">★ {rating}</div>
        </div>

        {/* Actions: no wishlist, just two clean buttons */}
        <div className="card-actions">
          <Link to={`/book/${book.id}`} className="btn btn--ghost">View details</Link>
          <button
            className="btn btn--primary"
            onClick={(e)=>{ e.preventDefault(); addItem(book, 1); }}
            aria-label={`Add ${book.title} to cart`}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
