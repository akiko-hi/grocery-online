import React from 'react';
import Search from './Search';
import Categories from './Categories';
import Products from './Products';
import './Home.scss'

export default function Home() {
    return <div className="Home">
        
        <Search className="search" />

        <div className="main_page">
            <Categories />
            <Products />
        </div>

    </div>
}