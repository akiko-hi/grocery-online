import React, { useEffect, useState } from 'react';
import { getProducts } from './api';
import { Product } from './types';
import { useSelector } from './store';
import { ProductCard } from './ProductCard';
import './Products.scss';

export default function Products() {

    const [products, setProducts] = useState<Product[]>([])
    const categoryId = useSelector(s => s.categoryId)
    const searchedProduct = useSelector(s => s.searchResult)

    useEffect(() => {
        load()

        async function load() {
            if (categoryId === null) {
                setProducts([])
                return
            }
            const filteredProducts = await getProducts(categoryId);
            setProducts(filteredProducts);
        }
    }, [categoryId])

    return <div className="Products">

        {searchedProduct.map(item => <ProductCard key={item.id} product={item} />)}
        {products.map(pro => <ProductCard key={pro.id} product={pro} />)}

    </div>
}
