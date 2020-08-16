import React from 'react';
import { useDispatch } from 'react-redux';
import './Cart.scss';
import { actions, useSelector } from './store';

export default function Cart() {

    const cart = useSelector(s => s.cart)
    const dispatch = useDispatch()

    const totalPrice = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)

    return <div className="Cart">
        <div className="scroller">
            <div className="cart_products">
                {cart.map(item =>
                    <div key={item.product.id} className="cartP_container">
                        <img className="cartP_image" src={"/images/" + item.product.image} alt="product" />
                        <div className="cartP_details">
                            <div>{item.product.name}</div>
                            <div className="cartP_description">{item.product.description}</div>
                        </div>
                        <div className="quantity_container">
                            {/* <div>Qty</div> */}
                            <button onClick={() => dispatch(actions.decreaseQty(item.product.id))}>&minus;</button>
                            <div className="quantity">{item.quantity}</div>
                            <button onClick={() => dispatch(actions.increaseQty(item.product.id))}>+</button>
                        </div>
                        <div className="cartP_price">${item.product.price}</div>
                    </div>)}
            </div>
        </div>
        <div className="payment_details">
            <p>Subtotal ({cart.length} items): ${totalPrice}</p>
            <button>Proceed to checkout</button>
        </div>
    </div>
}