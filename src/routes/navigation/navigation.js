import { Outlet, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Fragment, useContext } from "react";
import {ReactComponent as CrwnLogo} from "../../assets/crown.svg";
// import { UserContext } from "../../contexts/user-context";
// import { CartContext } from "../../contexts/cart.context";
import { selectIsCartOpen } from "../../store/cart/cart.selector.js";
import { selectCurrentUser } from "../../store/user/user.selector.js";
import { CartIcon } from "../../componnets/cart-icon/cart-icon";
import { CartDropdown } from "../../componnets/cart-dropdown/cart-dropdown";
import { signOutStart } from "../../store/user/user.action.js";
import {NavigationContainer, NavLinks, NavLink, LogoContainer} from './navigation.styles.js';

const Navigation = ()=>{
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);
    // const {currentUser} = useContext(UserContext);
    // const {isCartOpen} = useContext(CartContext);
    // console.log(currentUser);
    const signOutUser = () => dispatch(signOutStart());
   
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