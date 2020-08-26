import React, { useEffect } from 'react';
import { useSelector } from './store';
import { ProductCard } from './ProductCard';
import './Favorites.scss';
import EmptyFavorite from './images/empty_favorite.svg';

export default function Favorites() {

    const favorite = useSelector(s => s.favorite)


    return <div className="Favorites">

        {favorite.length === 0 ? <div className="empty_favorite">
            <p>You don't have any favorited product</p>
            <p>Click heart icon to remember what product you liked!</p>
            <img className="empty_favorite_img" src={EmptyFavorite} alt="empty favorited products" />
        </div>
            :
            <>
                <h1>I like ...</h1>
                <div className="favorited_products_container">
                    {favorite.map(item => <ProductCard key={item.id} product={item} />)}
                </div>
            </>
        }
    </div>
}