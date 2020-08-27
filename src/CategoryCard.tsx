import React from 'react';
import { useDispatch } from 'react-redux';
import { actions, useSelector } from './store';
import { Category } from './types';
import './CategoryCard.scss';


type CategoryCardProps = {
    category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {

    const dispatch = useDispatch()
    const selectedCategory = useSelector(s => s.categoryId)

    return <div className={selectedCategory === category.id ? "CategoryCard active" : "CategoryCard"}
        onClick={() => dispatch(actions.pickCategory(category.id))}>

        <p style={{ background: category.color }}>{category.name}</p>
        <img src={"/images/" + category.image} alt="product" />

    </div>
}