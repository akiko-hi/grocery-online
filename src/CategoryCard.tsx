import './CategoryCard.scss';
import React from 'react';
import { Category } from './api';

type CategoryCardProps = {
    category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
    return <div className="CategoryCard">
        <p style={{background: category.color}}>{category.name}</p>
        <img src={"/images/" + category.image} alt="product"/>
    </div>
}