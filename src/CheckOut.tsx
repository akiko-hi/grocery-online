import React, { useState } from 'react';
import { confirmOrder } from './api';
import { getTotalPrice } from './cart_function';
import './CheckOut.scss';
import { useSelector, actions } from './store';
import { useDispatch } from 'react-redux';
import { ReactComponent as Spinner } from './images/spinner.svg'
import Confirmed from './images/confirmed_order.svg';

export default function CheckOut() {

    const cart = useSelector(s => s.cart)
    const dispatch = useDispatch()
    const [orderNum, setOrderNum] = useState<number>()
    const [showSpinner, setShowSpinner] = useState(false)

    async function onConfirm() {
        setShowSpinner(true)
        const res = await confirmOrder(cart)
        dispatch(actions.resetCart())
        setOrderNum(res)
        setShowSpinner(false)
    }

    return <div className="CheckOut">

        {showSpinner && <div className="spinner_container">
            <Spinner className="spinner" />
        </div>}

        {orderNum ?
            <>
                <h1>Thank you for shopping with us!</h1>
                <p className="orderNum_msg">Your order number is {orderNum}</p>
                <img className="confirmed_img" src={Confirmed} alt="order confirmed" />
            </>
            :
            <>
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
                        <button onClick={() => onConfirm()} className="confirm_btn">Confirm my order</button>
                    </div>



                </div>
            </>
        }
    </div>
}
