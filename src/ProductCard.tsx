import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Product } from './api';
import { actions, useSelector } from './store';
import './ProductCard.scss';

type ProductCardProps = {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {

    const favorite = useSelector(s => s.favorite)
    const dispatch = useDispatch()
    const [addedToCart, setAddedToCart] = useState(false)

    function addToCart(product: Product) {
        dispatch(actions.addToCart(product))
        setAddedToCart(true)
    }

    return <div className="ProductCard">
        <div className="product_container">
            <button className="add_to_favorite" onClick={() => dispatch(actions.addToFavorite(product))}>
                {favorite.some(item => item.id === product.id) ? "♥" : "♡"}</button>
            <img className="product_image" src={"/images/" + product.image} alt="product" />
            <p className="product_name">{product.name}</p>
            <p className="product_description">{product.description}</p>
            <p className="product_price">${product.price}</p>
            <button className="add_to_cart" onClick={() => addToCart(product)}>Add to cart</button>
            <div className="modal-screen">
                <div className="modal-content">
                    <p>{product.name}: added to cart</p>
                </div>
            </div>
           
        </div>
    </div>
}