import React from 'react';
import './CheckOut.scss';
import { useSelector } from './store';
import { getTotalPrice } from './cart_function'
import { Link } from 'react-router-dom';

export default function CheckOut() {

    const cart = useSelector(s => s.cart)

    return <div className="CheckOut">
        <h1>Summary</h1>
        <div className="summary">
            <div className="table_container">
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map(cartItem => <tr>
                            <td className="product_name">{cartItem.product.name}</td>
                            <td>${cartItem.product.price}</td>
                            <td>{cartItem.quantity}</td>
                            <td>${cartItem.product.price * cartItem.quantity}</td>
                        </tr>)}
                    </tbody>
                    <tr>
                        <th className="total_row" colSpan={3}>Total</th>
                        <td className="total_price">${getTotalPrice(cart)}</td>
                    </tr>
                </table>
            </div>
            <div className="confirm_section">
                <p>Total ({cart.length} items): <span>${getTotalPrice(cart)}</span></p>
                <Link to="/cart/checkout/confirmed" className="confirm_btn">Confirm my order</Link >
            </div>
        </div>
    </div>
}
