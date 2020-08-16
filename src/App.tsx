import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import './App.scss';
import Cart from './Cart';
import Favorites from './Favorites';
import Home from './Home';
import logo from './images/logo.png';
import Settings from './Settings';
import { useSelector } from './store';
import Register from './Register';


function App() {

  const cart = useSelector(s => s.cart)



  return (
    <div className="App">
      <nav>
        <div className="company-logo">
          <div className="name">COUNTUP</div>
          <img className="logo" src={logo} alt="logo" />
        </div>
        <ul>
          <li><NavLink replace exact to="/">Home</NavLink></li>
          <li><NavLink replace to="/cart">Cart</NavLink></li>
          <li><NavLink replace to="/favorites">Favorites</NavLink></li>
          <li><NavLink replace to="/settings">Settings</NavLink></li>
          <li><NavLink replace to="/register">Register</NavLink></li>
          <li><NavLink replace to="/sign_in">Sign In</NavLink></li>
        </ul>
      </nav>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/favorites">
          <Favorites />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/register" >
          <Register/>
        </Route>
      </Switch>
    </div >
  );
}

export default App;
