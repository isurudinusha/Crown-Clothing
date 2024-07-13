import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import Button from "../button/button.component";
import "./checkout-item.styles.scss";

function CheckoutItem({ cartItem }) {
  const { updateCartItemQuantity } = useContext(CartContext);
  const decreaseQuantity = () => {
    if (cartItem.quantity > 0)
      updateCartItemQuantity(cartItem.id, cartItem.quantity - 1);
  };

  const increaseQuantity = () => {
    updateCartItemQuantity(cartItem.id, cartItem.quantity + 1);
  };

  const removeItem = () => {
    updateCartItemQuantity(cartItem.id, 0);
  };

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={cartItem.imageUrl} alt={cartItem.name} />
      </div>

      <span type="button" onClick={decreaseQuantity}>
        {"<"}
      </span>
      <span className="quantity">{cartItem.quantity}</span>
      <span type="button" onClick={increaseQuantity}>
        {">"}
      </span>
      <span className="name">{cartItem.name}</span>
      <span className="price">{cartItem.price}</span>
      <span type="button" className="remove-button" onClick={removeItem}>
        &#10005;
      </span>
    </div>
  );
}

export default CheckoutItem;
