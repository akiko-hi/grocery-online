import React, { useEffect, useState } from 'react';
import { getProducts } from './api';
import { Product } from './types';
import { useSelector } from './store';
import { ProductCard } from './ProductCard';
import './Products.scss';

let loading = false

export default function Products() {

    const [products, setProducts] = useState<Product[]>([])
    const categoryId = useSelector(s => s.categoryId)
    const searchedProduct = useSelector(s => s.searchResult)
    const [next, setNext] = useState(0);
    const itemsPerPage = 8;
    const [haveMore, setHaveMore] = useState(false)

    useEffect(() => {
        setNext(0)
        setProducts([])

    }, [categoryId])

    useEffect(() => {
        let canceled = false
        load()

        return () => {
            canceled = true
        }

        async function load() {
            if (categoryId === null) {
                setProducts([])
                return
            }

            const moreProducts = await getProducts(categoryId, next, itemsPerPage)
            if (canceled) { return }

            if (moreProducts.length < itemsPerPage) {
                setHaveMore(false)
            } else {
                setHaveMore(true)
            }
            setProducts(p => [...p, ...moreProducts])
        }

    }, [categoryId, next])

    return <div className="Products">

        <div className="outer_wrapper">
            <div className="products_wrapper">
                {searchedProduct.map(item => <ProductCard key={item.id} product={item} />)}
                {products.map(pro => <ProductCard key={pro.id} product={pro} />)}
            </div>
            {haveMore && categoryId !== null && <button className="load_btn" onClick={() => setNext(next + itemsPerPage)}>Load More</button>}
        </div>

    </div>
}
