import React from 'react';
import Search from './Seach';
import Categories from './Categories';
import Products from './Products';
import './Home.scss'

export default function Home() {
    return <div className="Home">
        
        <Search />

        <div className="main_row">
            <Categories/>
            <Products />
        </div>

    </div>
}