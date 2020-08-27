import React, { useEffect, useState } from 'react';
import { NavLink, Route, Switch, useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector, actions } from './store';
import { signIn, signUp, whoAmI, signOut, getFavoriteItems } from './api';
import './App.scss';
import Home from './Home';
import Cart from './Cart';
import CheckOut from './CheckOut';
import Favorites from './Favorites';
import Settings from './Settings';
import RegisterForm from './RegisterForm';
import OrderHistory from './OrderHistory';
import logo from './images/logo.png';
import DownArrow from './images/down-arrow.png';
import Account from './images/account.png';
import Setting from './images/setting.png';
import SignOut from './images/sign_out.png';

function App() {

  const user = useSelector(s => s.user)
  const dispatch = useDispatch()
  const history = useHistory()
  const [showAccount, setShowAccount] = useState(false)

  useEffect(() => {
    load()

    async function load() {
      const user = await whoAmI();
      if (user !== null) {
        dispatch(actions.signIn(user));
      }
    }
  }, [dispatch])

  useEffect(() => {
    load()

    async function load() {
      if(user === null) {
        return
      }
      const res = await getFavoriteItems()
      dispatch(actions.loadFavoriteItems(res))
    }
  }, [dispatch, user])

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
    setShowAccount(false)
  }

  return (
    <div className="App" onClick={() => setShowAccount(false)}>

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
              <li><NavLink replace to="/order_history">Order History</NavLink></li>

              <li className="account_li" onClick={e => { setShowAccount(!showAccount); e.stopPropagation() }}>
                <div className="account_user">
                  <img className="account_img" src={Account} alt="account" />
                  {user.name}
                  <img className="account_down_arrow" src={DownArrow} alt="down arrow" />
                </div>
                {showAccount && <ul className="account_dropdown">
                  <li><img className="account_img" src={Setting} alt="" />Account Setting</li>
                  <li onClick={onSignOut}><img className="account_img" src={SignOut} alt="" /><Link to='/sign_in'>Sign Out</Link></li>
                </ul>}
              </li>

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
          <Route path='/order_history'>
            <OrderHistory />
          </Route>
        </Switch>
      </main>

    </div >
  );
}

export default App;
