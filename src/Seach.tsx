import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchProducts } from './api';
import search from './images/search-enter.png';
import './Search.scss';
import { actions } from './store';


export default function Search() {

    const dispatch = useDispatch()
    const [searchWord, setSearhWord] = useState("")

    async function searchProduct(word: string) {
        if (word === "") {
            dispatch(actions.setSearchResult([]))
        } else {
            const res = await searchProducts(word)
            dispatch(actions.setSearchResult(res))
        }
    }

    function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        searchProduct(searchWord)
    }

    return <form className="Search" onSubmit={onSubmit}>

        <div className="input-container">
            <input onChange={e => setSearhWord(e.currentTarget.value)} value={searchWord} autoFocus />
            <button onClick={() => searchProduct(searchWord)} className="search-btn">
                <img className="searchImg" src={search} alt="search button" />
            </button>
        </div>
    </form>
}
