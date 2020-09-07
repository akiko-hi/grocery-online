import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchProducts } from './api';
import { actions } from './store';
import './Search.scss';
import search from './images/search-enter.png';
import { useHistory } from 'react-router-dom';

type SearchProps = {
    className?: string
}

export default function Search({ className }: SearchProps) {

    const dispatch = useDispatch()
    const history = useHistory()
    const [searchWord, setSearhWord] = useState("")

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (searchWord === "") {
            dispatch(actions.setSearchResult([]))
        } else {
            const res = await searchProducts(searchWord)
            dispatch(actions.setSearchResult(res))
        }
        history.replace('/')
    }

    return <form className={"Search " + (className ?? "")} onSubmit={onSubmit}>

        <div className="input-container">
            <input onChange={e => setSearhWord(e.currentTarget.value)} value={searchWord} autoFocus />
            <button className="search-btn">
                <img className="searchImg" src={search} alt="search button" />
            </button>
        </div>

    </form>
}
