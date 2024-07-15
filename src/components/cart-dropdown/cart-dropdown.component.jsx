import { useContext } from "react";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.compnent";
import { CartContext } from "../../context/cart.context";
import { useNavigate } from "react-router-dom";
import "./cart-dropdown.styles.scss";

function CartDropdown() {
  const navigate = useNavigate();
  const { cartItems, cartToggle, setCartToggle } = useContext(CartContext);

  const handleClickGoToCheckout = () => {
    navigate("/checkout");
    setCartToggle(false);
  };

  return (
    <div
      className="cart-dropdown-container"
      onMouseLeave={() => setCartToggle(false)}
    >
      <div className="cart-items">
        {[...cartItems].reverse().map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </div>

      <Button onClick={handleClickGoToCheckout}>GO TO CHECKOUT</Button>
    </div>
  );
}

export default CartDropdown;
