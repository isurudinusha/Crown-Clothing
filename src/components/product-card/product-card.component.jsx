import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import Button from "../button/button.component";
import "./product-card.styles.scss";

function ProductCart({ product }) {
  const { addItemToCart } = useContext(CartContext);

  return (
    <div className="product-card-container">
      <img src={product.imageUrl} alt={product.name} />
      <div className="footer">
        <span className="name">{product.name}</span>
        <span className="price">{product.price}</span>
      </div>
      <Button
        buttonType="inverted"
        onClick={() => addItemToCart({ ...product })}
      >
        Add to cart
      </Button>
    </div>
  );
}

export default ProductCart;
