import React from "react";
import './cart-dropdown.styles.scss';
import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import { connect } from "react-redux";


const CartDropdown = ({cartItems}) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {
               cartItems.map(cartItems => 
               <cartItems key={cartItems.id}/>) 
            }
        </div>
        <CustomButton>GO TO CHECKOUT</CustomButton>


    </div>
)

const mapStateToProps = ({cart: { cartItems}}) => ({
    cartItems
})

export default connect(mapStateToProps)(CartDropdown);