import './CategoryCard.scss';
import React from 'react';
import { Category } from './api';
import { useDispatch } from 'react-redux';
import { actions } from './store';

type CategoryCardProps = {
    category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const dispatch = useDispatch()

   
  return <div className="CategoryCard" onClick={() => dispatch(actions.pickCategory(category.id))}>
        <p style={{background: category.color}}>{category.name}</p>
        <img src={"/images/" + category.image} alt="product"/>
    </div>
}