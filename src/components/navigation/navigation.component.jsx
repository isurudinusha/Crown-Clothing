import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import CrownLogo from "../../assets/crown.svg?react";
import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import "./navigation.styles.scss";

function Navigation() {
  const { currentUser } = useContext(UserContext);
  const { cartToggle, setCartToggle } = useContext(CartContext);

  // const signOutHandler = async () => {
  //   await signOutUser();
  //   setCurrentUser(null);
  // };

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrownLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {cartToggle ? <CartDropdown /> : null}
      </div>
      <Outlet />
    </>
  );
}

export default Navigation;
