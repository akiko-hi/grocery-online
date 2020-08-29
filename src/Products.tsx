import React, { useEffect, useState, useRef } from 'react';
import { getProducts } from './api';
import { Product } from './types';
import { useSelector } from './store';
import { ProductCard } from './ProductCard';
import './Products.scss';


export default function Products() {
    const [products, setProducts] = useState<Product[]>([])
    const categoryId = useSelector(s => s.categoryId)
    const searchedProduct = useSelector(s => s.searchResult)
    const [next, setNext] = useState(0);
    const itemsPerPage = 8;
    const [haveMore, setHaveMore] = useState(false)
    const loading = useRef(false)

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

            setHaveMore(moreProducts.length === itemsPerPage)
            setProducts(p => [...p, ...moreProducts])
            loading.current = false
        }

    }, [categoryId, next])

    function onScroll({ currentTarget: { scrollTop, scrollHeight, clientHeight } }: React.SyntheticEvent) {

        if (scrollTop === 0) { return }
        const shouldLoad = scrollHeight - scrollTop - clientHeight < clientHeight

        if (!loading.current && shouldLoad && haveMore && categoryId !== null) {
            loading.current = true
            setNext(next + itemsPerPage)
        }
    }

    return <div className="Products" onScroll={onScroll}>


        <div className="outer_wrapper">
            <div className="products_wrapper">
                {searchedProduct.map(item => <ProductCard key={item.id} product={item} />)}
                {products.map(pro => <ProductCard key={pro.id} product={pro} />)}
            </div>
        </div>

    </div>
}
