import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  // Check if the cartItems array already contains the productToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    // If the product exists, increment its quantity
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  // If the product does not exist, add it to the cart with a quantity of 1
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  cartToggle: false,
  setCartToggle: () => {},
  cartItems: [],
  addItemToCart: () => {},
  updateCartItemQuantity: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartToggle, setCartToggle] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const updateCartItemQuantity = (itemID, quantity) => {
    if (quantity === 0) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== itemID));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === itemID
            ? { ...cartItem, quantity: quantity }
            : cartItem
        )
      );
    }
  };

  const value = {
    cartToggle,
    setCartToggle,
    cartItems,
    addItemToCart,
    updateCartItemQuantity,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
