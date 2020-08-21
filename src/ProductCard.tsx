import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Product, signIn } from './api';
import { actions, useSelector } from './store';
import './ProductCard.scss';
import RegisterForm from './RegisterForm';
import { useHistory } from 'react-router-dom';

type ProductCardProps = {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {


    const user = useSelector(s => s.user)
    const favorite = useSelector(s => s.favorite)
    const dispatch = useDispatch()
    const [addedToCart, setAddedToCart] = useState(false)
    const [signInMsg, setSignInMsg] = useState(false)


    function addToCart(product: Product) {
        if (user === null) {
            setSignInMsg(true)

        } else {
            dispatch(actions.addToCart(product))
            setAddedToCart(true)
        }
    }

    async function onSignIn(name: string, password: string) {
        const user = await signIn(name, password)
        if (user === null) {
            alert("login failed")
        } else {
            dispatch(actions.signIn(user))
            setSignInMsg(false)
        }
    }

    return <div className="ProductCard">

        <div className="product_container">

            <button className={favorite.some(item => item.id === product.id) ? "like liked" : "like"}
                onClick={() => dispatch(actions.addToFavorite(product))} ></button>
            <img className="product_image" src={"/images/" + product.image} alt="product" />
            <p className="product_name">{product.name}</p>
            <p className="product_description">{product.description}</p>
            <p className="product_price">${product.price}</p>
            <button className="add_to_cart" onClick={() => addToCart(product)}>Add to cart</button>

        </div>

        {addedToCart && <div onClick={() => setAddedToCart(!addedToCart)} className="modal-screen">
            <div className="modal-content">
                <p><span>{product.name}</span>: added to cart</p>
                <p>Click the screen to go back</p>
            </div>
        </div>}

        {signInMsg && <div onClick={() => setSignInMsg(!signInMsg)} className="modal-screen">
            <div className="modal-content signIn" onClick={e => e.stopPropagation()}>
                <p>Sign in to add products to your cart</p>
                <RegisterForm title="Sign-in" btn_message="Sign-in" onClick={onSignIn} />
            </div>
        </div>}

    </div>
}