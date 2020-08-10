import React, { useState, useEffect } from 'react';
import './App.scss';
import logo from './images/logo.png';
import Search from './Seach';
import Categories from './Categories';



function App() {


  return (
    <div className="App">
      <nav>
        <div className="company-logo">
          <div className="name">COUNTUP</div>
          <img className="logo" src={logo} alt="logo" />
        </div>
        <ul>
          <li>Home</li>
          <li>Cart</li>
          <li>Favorites</li>
          <li>Settings</li>
        </ul>
      </nav>
      <Search />
      <Categories />
    </div>
  );
}

export default App;
