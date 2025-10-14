// src/components/Footer.jsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        {/* Top: brand + org info */}
        <div className="site-footer__brandwrap">
          <h3 className="site-footer__brand">MyBooksWay</h3>
          <ul className="site-footer__org">
            <li><b>Billing name:</b> MyBooksWay</li>
            <li><b>Currency:</b> INR (₹)</li>
            <li>
              <b>Support:</b>{" "}
              <a className="site-footer__link" href="mailto:support@mybooksaway.com">
                support@mybooksaway.com
              </a>{" "}
              · <b>Phone:</b>{" "}
              <a className="site-footer__link" href="tel:+918805900597">
                +91 8805900597
              </a>
            </li>
            <li>
              <b>Address:</b>  Vaijinath Nagar, Chikhali Road, Buldhana
Maharashra - 443001
            </li>
          </ul>
        </div>

        {/* Middle: 3 columns */}
        <div className="site-footer__grid">
          <div>
            <h4 className="site-footer__head">Shop</h4>
            <ul className="site-footer__links">
              <li><Link className="site-footer__link" to="/books">All Books</Link></li>
              <li><Link className="site-footer__link" to="/bestsellers">Bestsellers</Link></li>
              <li><Link className="site-footer__link" to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="site-footer__head">Help</h4>
            <ul className="site-footer__links">
              <li><Link className="site-footer__link" to="/shipping">Shipping &amp; Delivery</Link></li>
              <li><Link className="site-footer__link" to="/refunds">Returns &amp; Refunds</Link></li>
              <li><Link className="site-footer__link" to="/support">Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="site-footer__head">Legal</h4>
            <ul className="site-footer__links">
              <li><Link className="site-footer__link" to="/terms">Terms &amp; Conditions</Link></li>
              <li><Link className="site-footer__link" to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="site-footer__bottom">
          © {new Date().getFullYear()} MyBooksWay · All rights reserved
        </div>
      </div>
    </footer>
  );
}
