import React from 'react';
import './Search.scss';
import search from './images/search-enter.png';

export default function Search() {
    return <div className="Search">
        <div className="input-container">
            <input />
            <button className="search-btn">
                <img className="searchImg" src={search} alt="search button" />
            </button>
        </div>
    </div>
}