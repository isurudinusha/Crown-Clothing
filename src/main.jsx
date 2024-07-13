import React from "react";
import ReactDOM from "react-dom/client";
import { UserProvider } from "./context/user.context.jsx";
import { ProductsProvider } from "./context/product.context.jsx";
import { CartProvider } from "./context/cart.context.jsx";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductsProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
