import React from 'react';
import { NavLink, Route, Switch, useHistory } from 'react-router-dom';
import './App.scss';
import Cart from './Cart';
import Favorites from './Favorites';
import Home from './Home';
import logo from './images/logo.png';
import RegisterForm from './RegisterForm';
import Settings from './Settings';
import { useSelector, actions } from './store';
import { signIn } from './api';
import { useDispatch } from 'react-redux';


function App() {

  const user = useSelector(s => s.user)
  const dispatch = useDispatch()
  const history = useHistory()

  async function onSignIn(name: string, password: string) {
    const user = await signIn(name, password)
    if (user === null) {
      alert("login failed")
    } else {
      dispatch(actions.login(user))
      history.replace("/")
    }
  }

  return (
    <div className="App">
      <nav>
        <div className="company-logo">
          <div className="name">COUNTUP</div>
          <img className="logo" src={logo} alt="logo" />
          <div>hi,{user == null ? "guest" : user.name}</div>
        </div>
        <ul>
          <li><NavLink replace exact to="/">Home</NavLink></li>
          <li><NavLink replace to="/cart">Cart</NavLink></li>
          <li><NavLink replace to="/favorites">Favorites</NavLink></li>
          <li><NavLink replace to="/settings">Settings</NavLink></li>
          <li><NavLink replace to="/register">Register</NavLink></li>
          <li><NavLink replace to="/sign_in">{user !== null ? "Sign Out" : "Sign In"}</NavLink></li>
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
          <RegisterForm title="Create an account" btn_message="Create your account" onClick={() => { }} />
        </Route>
        <Route path="/sign_in">
          <RegisterForm title="Sign-in" btn_message="Sign-in" onClick={onSignIn} />
        </Route>
      </Switch>
    </div >
  );
}

export default App;
