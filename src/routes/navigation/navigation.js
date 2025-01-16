import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import {ReactComponent as CrwnLogo} from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user-context";
import { CartContext } from "../../contexts/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { CartIcon } from "../../componnets/cart-icon/cart-icon";
import { CartDropdown } from "../../componnets/cart-dropdown/cart-dropdown";
import {NavigationContainer, NavLinks, NavLink, LogoContainer} from './navigation.styles.js';

const Navigation = ()=>{
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);
    // console.log(currentUser);
   
    return(
      <Fragment>
        <NavigationContainer>
            <LogoContainer to='/'>
                <CrwnLogo className="logo" />
            </LogoContainer>
            <NavLinks>
                <NavLink to='/shop'>SHOP</NavLink>
                {
                    currentUser ? (
                        <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
                       ): (
                         <NavLink to='/auth'>SIGN IN</NavLink>
                    )
                }
                <CartIcon />
            </NavLinks>
            {isCartOpen && <CartDropdown />}
        </NavigationContainer>
        <Outlet />
      </Fragment>
    )
}

export {Navigation}