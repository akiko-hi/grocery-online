import React, { useEffect, useState } from 'react';
import { getProducts, Product } from './api';
import { ProductCard } from './ProductCard';
import './Products.scss';
import { useSelector } from './store';

export default function Products() {

    const [products, setProducts] = useState<Product[]>([])
    const categoryId = useSelector(s => s.categoryId)
    const searchedProduct = useSelector(s => s.searchResult)


    useEffect(() => {
        load()

        async function load() {
            const categories = await getProducts();
            setProducts(categories);
        }
    }, [])

    return <div className="Products">
        {searchedProduct.map(item => <ProductCard key={item.id} product={item}/>)}
        {products.filter(product => product.category_id === categoryId)
            .map(product => <ProductCard key={product.id} product={product}/>)}
    </div>
}
