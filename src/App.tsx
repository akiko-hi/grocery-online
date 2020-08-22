import React, { useEffect } from 'react';
import { NavLink, Route, Switch, useHistory, Link } from 'react-router-dom';
import './App.scss';
import Cart from './Cart';
import Favorites from './Favorites';
import Home from './Home';
import logo from './images/logo.png';
import RegisterForm from './RegisterForm';
import Settings from './Settings';
import { useSelector, actions } from './store';
import { signIn, signUp, whoAmI, signOut } from './api';
import { useDispatch } from 'react-redux';
import CheckOut from './CheckOut';


function App() {

  const user = useSelector(s => s.user)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    load()

    async function load() {
      const user = await whoAmI();
      if (user !== null) {
        dispatch(actions.signIn(user));
      }
    }
  }, [dispatch])

  async function onSignIn(name: string, password: string) {
    const user = await signIn(name, password)
    if (user === null) {
      alert("login failed")
    } else {
      dispatch(actions.signIn(user))
      history.replace("/")
    }
  }

  async function onSignUp(name: string, password: string) {
    const user = await signUp(name, password)
    if (user === null) {
      alert('failed')
    } else {
      dispatch(actions.signIn(user))
      history.replace("/")
    }
  }

  async function onSignOut() {
    dispatch(actions.signOut())
    await signOut()
  }

  return (
    <div className="App">

      <nav>
        <Link to="/">
          <div className="company-logo">
            <div className="name">COUNTUP</div>
            <img className="logo" src={logo} alt="logo" />
          </div>
        </Link>
        <p>Hi {user == null ? "guest" : user.name}!</p>
        <ul>
          <li><NavLink replace exact to="/">Home</NavLink></li>
          {user === null ?
            <>
              <li><NavLink replace to="/register">Register</NavLink></li>
              <li><NavLink replace to="/sign_in">Sign In</NavLink></li>
            </>
            :
            <>
              <li><NavLink replace to="/cart">Cart</NavLink></li>
              <li><NavLink replace to="/favorites">Favorites</NavLink></li>
              <li><NavLink replace to="/settings">Settings</NavLink></li>
              <li onClick={onSignOut}><NavLink replace to="/sign_in">Sign Out</NavLink></li>
            </>
          }
        </ul>
      </nav>

      <main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route path="/cart/checkout">
            <CheckOut />
          </Route>
          <Route path="/favorites">
            <Favorites />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/register" >
            <RegisterForm title="Create an account" btn_message="Create your account" onClick={onSignUp} />
          </Route>
          <Route path="/sign_in">
            <RegisterForm title="Sign-in" btn_message="Sign-in" onClick={onSignIn} />
          </Route>
        </Switch>
      </main>

    </div >
  );
}

export default App;
