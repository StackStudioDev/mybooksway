// src/pages/Cart.jsx
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const rupee = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

export default function Cart() {
  const { items, setQty, removeItem, clearCart, subtotal } = useCart();
  const navigate = useNavigate();

  if (!items.length) {
    return (
      <>
        <header className="section__head"><h2>Your Cart</h2></header>
        <div className="glass" style={{padding:16, borderRadius:14}}>
          <p className="muted" style={{margin:0}}>Your cart is empty.</p>
          <div style={{marginTop:12}}>
            <Link to="/books" className="btn btn--primary">Browse books</Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <header className="section__head">
        <h2>Your Cart</h2>
        <button className="btn btn--ghost" onClick={clearCart}>Clear cart</button>
      </header>

      <section className="cart">
        <div className="cart__list glass">
          {items.map(it => (
            <div className="cart__row" key={it.id}>
              <img src={it.cover} alt={it.title} className="cart__img" />
              <div className="cart__info">
                <div className="cart__title">{it.title}</div>
                <div className="muted">{it.author} • {it.langLabel}</div>
              </div>

              <div className="cart__qty">
                <label className="form__label" style={{display:"block"}}>Qty</label>
                <input
                  type="number"
                  min="1"
                  className="search__input"
                  value={it.qty}
                  onChange={(e)=>setQty(it.id, e.target.value)}
                  style={{width:90}}
                />
              </div>

              <div className="cart__price">
                <div className="price">{rupee(it.price * it.qty)}</div>
                <div className="muted" style={{fontSize:12}}>{rupee(it.price)} each</div>
              </div>

              <button className="btn btn--ghost" onClick={()=>removeItem(it.id)}>Remove</button>
            </div>
          ))}
        </div>

        <aside className="cart__summary glass">
          <h3 style={{marginTop:0}}>Order Summary</h3>
          <div className="cart__line"><span>Subtotal</span><span>{rupee(subtotal)}</span></div>
          <div className="cart__line"><span>Shipping</span><span>₹0</span></div>
          <div className="cart__total"><span>Total</span><span>{rupee(subtotal)}</span></div>

          <div style={{display:"flex", gap:8, margin:"10px 0"}}>
            <input className="search__input" placeholder="Coupon code" />
            <button className="btn btn--ghost" type="button">Apply</button>
          </div>

          {/* 👇 अब Razorpay नहीं, Checkout page */}
          <button
            className="btn btn--primary"
            style={{width:"100%"}}
            onClick={() => navigate("/checkout")}
          >
            Proceed to checkout
          </button>

          <Link to="/books" className="muted" style={{display:"inline-block", marginTop:10}}>
            Continue shopping
          </Link>
        </aside>
      </section>
    </>
  );
}
