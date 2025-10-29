import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import BooksList from "./pages/BooksList.jsx";
import Bestsellers from "./pages/Bestsellers.jsx";
import Contact from "./pages/Contact.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import BookDetails from "./pages/BookDetails.jsx";
import Terms from "./pages/Terms.jsx";
import Privacy from "./pages/Privacy.jsx";
import Refunds from "./pages/Refunds.jsx";
import Shipping from "./pages/Shipping.jsx";
import Support from "./pages/Support.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import OrderFailed from "./pages/OrderFailed.jsx";
import Checkout from "./pages/Checkout.jsx";
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />               {/* / */}
      <Route path="books" element={<BooksList />} />   {/* /books */}
      <Route path="bestsellers" element={<Bestsellers />} />
      <Route path="contact" element={<Contact />} />
      <Route path="cart" element={<Cart />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<div style={{ padding: 24 }}>Not Found</div>} />
      <Route path="/book/:id" element={<BookDetails />} />
      <Route path="terms" element={<Terms />} />
      <Route path="privacy" element={<Privacy />} />
      <Route path="refunds" element={<Refunds />} />
      <Route path="shipping" element={<Shipping />} />
      <Route path="support" element={<Support />} />
      <Route path="order-success" element={<OrderSuccess />} />
      <Route path="order-failed" element={<OrderFailed />} />
      <Route path="checkout" element={<Checkout />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
);
