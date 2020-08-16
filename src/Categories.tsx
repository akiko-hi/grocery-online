import React, { useEffect, useState } from 'react';
import { Category, getCategories } from './api';
import './Categories.scss';
import CategoryCard from './CategoryCard';

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
        <div className="category-container">
        {categories.map(c => <CategoryCard  key={c.id} category={c}/>)}
        </div> 
    </div>
}