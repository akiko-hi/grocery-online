import React from 'react';
import { useSelector } from './store';
import { ProductCard } from './ProductCard';
import './Favorites.scss';

export default function Favorites() {

    const favorite = useSelector(s => s.favorite)

    return <div className="Favorites">
        {favorite.map(item => <ProductCard key={item.id} product={item} />)}
    </div>
}