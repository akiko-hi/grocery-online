import React, { useEffect, useState } from 'react';
import './Categories.scss';
import CategoryCard from './CategoryCard';
import { getCategories, Category } from './api';

export default function Categories() {

    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        load()

        async function load() {
            const categories = await getCategories();
            setCategories(categories);
        }
    }, [])

    return <div className="Categories">
        <p className="title">Browse all items by category</p>
        <div className="category-container">
        {categories.map(c => <CategoryCard key={c.id} category={c}/>)}
        </div>
    </div>
}