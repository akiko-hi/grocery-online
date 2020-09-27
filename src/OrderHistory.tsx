import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getOrderHistory } from './api';
import { OrderTable } from './CheckOut';
import { actions } from './store';
import { Order } from './types';
import './OrderHistory.scss';
import ExpandArrow from './images/arrow.png';

export default function OrderHistory() {

    const [orderHistory, setOrderHistory] = useState<Order[]>()
    const [order, setOrder] = useState<Order>()
    const dispatch = useDispatch()

    useEffect(() => {
        load()

        async function load() {
            const orderHistories = await getOrderHistory()
          
            setOrderHistory(orderHistories)
        }
    }, [])

    return <div className="OrderHistory">

        <h1>Order History</h1>
        <div className="outer_container">

            <div className="inner_container">

                <p className="order_date_title">Ordered on</p>
                <div className="order_date_scroll">

                    {orderHistory === undefined ? <div className="loading_msg">loading...</div>
                     :
                     orderHistory.length === 0 ? <div className="loading_msg">You don't have any history yet</div>
                     :
                     orderHistory.map(eachHistory => <>
                            <div className={"order_date" + (eachHistory.order_id === order?.order_id ? " active" : "")}
                                onClick={() => setOrder(eachHistory)}>
                                <div className="date">{new Date(eachHistory.date).toLocaleString()}</div>
                                <img className="arrow" src={ExpandArrow} alt="arrow" />
                            </div>
                        </>)}
                </div>

            </div>

            <div className="order_detail">

                {order && <>
                    <Link to="/cart/" className="reorder_btn" 
                    onClick={() => order && dispatch(actions.reorder(order.items))}>Reorder</Link>
                    <div className="order_table_wrapper">
                        <OrderTable className="order_table" cartItem={order.items} />
                    </div>
                </>}
                
            </div>
        </div>
    </div>
}
