import React from 'react';
import Search from './Seach';
import Categories from './Categories';
import Products from './Products';
import './Home.scss'

export default function Home() {
    return <div className="Home">
        <Search />
        <main>
            <Categories />
            <Products />
        </main>
    </div>
}