import ShoppingBag from "../../assets/shopping-bag.svg?react";
import "./cart-icon.styles.scss";

function CartIcon() {
  return (
    <div className="cart-icon-container">
      <ShoppingBag className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
}

export default CartIcon;
