import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/cart.context";
import "./checkout.styles.scss";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

function Checkout() {
  const { cartItems } = useContext(CartContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      cartItems.reduce(
        (total, cartItem) => total + cartItem.quantity * cartItem.price,
        0
      )
    );
  }, [cartItems]);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => {
        return <CheckoutItem key={cartItem.id} cartItem={cartItem} />;
      })}
      <span className="total">Total: ${total}</span>
    </div>
  );
}

export default Checkout;
