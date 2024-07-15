import { useContext } from "react";
import ShoppingBag from "../../assets/shopping-bag.svg?react";
import { CartContext } from "../../context/cart.context";
import "./cart-icon.styles.scss";

function CartIcon() {
  const { cartToggle, setCartToggle, cartItems } = useContext(CartContext);
  return (
    <div
      className="cart-icon-container"
      onMouseEnter={() => setCartToggle(true)}
    >
      <ShoppingBag className="shopping-icon" />
      <span className="item-count">
        {cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)}
      </span>
    </div>
  );
}

export default CartIcon;
