import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { confirmOrder } from './api';
import { getTotalPrice } from './cart_function';
import { useSelector, actions } from './store';
import { CartItem } from './types';
import './CheckOut.scss';
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
            <div className="msg_after_checkout">
                <p className="thank_msg">Thank you for shopping with us!</p>
                <p className="orderNum_msg">Your order number is {orderNum}</p>
                <img className="confirmed_img" src={Confirmed} alt="order confirmed" />
            </div>
            :
            <>
                <h1>Summary</h1>
                <div className="outer_container">
                    <div className="inner_container">
                        <OrderTable cartItem={cart} />
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

type OrderTableProps = {
    className?: string
    cartItem: CartItem[]
}

export function OrderTable({ className, cartItem }: OrderTableProps) {
    return <div className={"OrderTable " + (className ?? "")}>

        <p>Product</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Subtotal</p>
        {cartItem.map(item => <>
            <div className="table_item_name">{item.product.name}</div>
            <div>${item.product.price}</div>
            <div>{item.quantity}</div>
            <div className="sub_total">${item.product.price * item.quantity}</div>
        </>)}
        <div className="total_title">Total</div>
        <div className="total_price">${getTotalPrice(cartItem)}</div>

    </div>
}
