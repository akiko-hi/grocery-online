import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signIn, addFavoriteItem, removeFavoriteItem } from './api';
import { actions, useSelector } from './store';
import { Product } from './types';
import RegisterForm from './RegisterForm';
import Modal from './Modal';
import './ProductCard.scss';

type ProductCardProps = {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {

    const user = useSelector(s => s.user)
    const favorite = useSelector(s => s.favorite)
    const dispatch = useDispatch()
    const [addedToCart, setAddedToCart] = useState(false)
    const [signInMsg, setSignInMsg] = useState<string>()

    function addToCart(product: Product) {
        if (user === null) {
            setSignInMsg("add products to your cart")
        } else {
            dispatch(actions.addToCart(product))
            setAddedToCart(true)
        }
    }

    async function addToFavorite(product: Product) {
        if (user === null) {
            setSignInMsg("favorite products")
        } else {
            dispatch(actions.addToFavorite(product))

            if (favorite.some(favoriteItem => favoriteItem.id === product.id)) {
                await removeFavoriteItem(product.id)
            } else {
                await addFavoriteItem(product.id)
            }
        }
    }

    async function onSignIn(name: string, password: string) {
        const user = await signIn(name, password)
        if (user === null) {
            alert("login failed")
        } else {
            dispatch(actions.signIn(user))
            setSignInMsg(undefined)
        }
    }

    return <div className="ProductCard">

        <div className="product_container">

            <button className={"like" + (favorite.some(item => item.id === product.id) ? " liked" : "")}
                onClick={() => addToFavorite(product)}></button>
            <img className="product_image" src={"/images/" + product.image} alt="product" />
            <p className="product_name">{product.name}</p>
            <p className="product_description">{product.description}</p>
            <p className="product_price">${product.price}</p>
            <button className="add_to_cart" onClick={() => addToCart(product)}>Add to cart</button>

        </div>

        {addedToCart &&

            <Modal className="popup" onClick={() => setAddedToCart(!addedToCart)} >
                <p>{product.name + ": added to cart"}</p>
                <p>click the screen to go back</p>
            </Modal>
        }

        {signInMsg &&

            <Modal className="popup animated" onClick={() => setSignInMsg(undefined)}>
                <p>Sign in to {signInMsg}</p>
                <RegisterForm title="Sign-in" btn_message="Sign-in" onClick={onSignIn} />
            </Modal>
        }

    </div >
}