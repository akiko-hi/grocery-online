import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
import { getCategories } from './api';
import { Category } from './types';
import './Categories.scss';

type CategoriesProps = {
    onClick?: () => void
}

export default function Categories({ onClick }: CategoriesProps) {

    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        load()

        async function load() {
            const categories = await getCategories();
            setCategories(categories);
        }
    }, [])

    return <div onClick={onClick} className="Categories" >
        
        <div className="category-container">
            {categories.map(c => <CategoryCard key={c.id} category={c} />)}
        </div>
    </div>
}