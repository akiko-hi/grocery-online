import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink, Route, Switch, useHistory } from 'react-router-dom';
import { getFavoriteItems, signIn, signOut, signUp, whoAmI } from './api';
import './App.scss';
import Cart from './Cart';
import CheckOut from './CheckOut';
import Favorites from './Favorites';
import Home from './Home';
import Account from './images/account.png';
import DownArrow from './images/down-arrow.png';
import logo from './images/logo.png';
import Menu from './images/menu.png';
import Setting from './images/setting.png';
import SignOut from './images/sign_out.png';
import HomeIcon from './images/home_icon.png';
import RegisterIcon from './images/signup_icon.png';
import SignInIcon from './images/sign_in.png';
import CartIcon from './images/cart_icon.png';
import FavoriteIcon from './images/favorite_icon.png';
import OrderHistoryIcon from './images/order_history_icon.png';
import OrderHistory from './OrderHistory';
import RegisterForm from './RegisterForm';
import Search from './Seach';
import Settings from './Settings';
import { actions, useSelector } from './store';
import SignIn from './SignIn';


function App() {

  const user = useSelector(s => s.user)
  const dispatch = useDispatch()
  const history = useHistory()
  const [showAccount, setShowAccount] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

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
      if (user === null) {
        return
      }
      const res = await getFavoriteItems()
      dispatch(actions.loadFavoriteItems(res))
    }
  }, [dispatch, user])

  async function onSignIn() {
    history.replace('/')
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

  function onAppClick(e: React.SyntheticEvent) {
    setShowAccount(false)
    setShowMenu(false)
  }

  function onMenuClick(e: React.SyntheticEvent) {
    setShowMenu(!showMenu)
    e.stopPropagation()
    setShowAccount(false)
  }

  // function goHome() {
  //   if (history.location.pathname !== "/") {
  //     history.push("/")
  //   }
  // }

  return (
    <div className="App" onClick={onAppClick}>
      <nav>
        <div className="nav_title">
          <button onClick={onMenuClick} className="menu_mobile">
            <img src={Menu} alt="menu" />
          </button>
          <Search className="search_mobile" />
          <Link to="/">
            <div className="company-logo" onClick={() => dispatch(actions.removeCategoryId())}>
              <div className="name">COUNTUP</div>
              <img className="logo" src={logo} alt="logo" />
            </div>
          </Link>
        </div>

        <p className="hi_msg">Hi {user == null ? "guest" : user.name}!</p>

        <ul className={"nav_ul" + (showMenu ? " active" : "")}>

          <li onClick={() => dispatch(actions.removeCategoryId())}>
            <img className="menu_icon" src={HomeIcon} alt="register" />
            <NavLink className="menu_text" replace exact to="/">Home</NavLink>
          </li>

          {user === null ?
            <>
              <li>
                <img className="menu_icon" src={RegisterIcon} alt="register" />
                <NavLink className="menu_text" replace to="/register">Register</NavLink>
              </li>
              <li>
                <img className="menu_icon" src={SignInIcon} alt="signin" />
                <NavLink className="menu_text" replace to="/sign_in">Sign In</NavLink>
              </li>
            </>
            :
            <>
              <li>
                <img className="menu_icon" src={CartIcon} alt="cart" />
                <NavLink className="menu_text" replace to="/cart">Cart</NavLink>
              </li>
              <li>
                <img className="menu_icon" src={FavoriteIcon} alt="favorite" />
                <NavLink className="menu_text" replace to="/favorites">Favorites</NavLink>
              </li>
              <li>
                <img className="menu_icon" src={OrderHistoryIcon} alt="order" />
                <NavLink className="menu_text" replace to="/order_history">Order History</NavLink>
              </li>

              <li className="account_li" onClick={e => { setShowAccount(!showAccount); e.stopPropagation() }}>
                <img className="menu_icon" src={Account} alt="account" />
                <div className="menu_text">
                  <div className="account_username">{user.name}</div>
                  <img className="account_down_arrow" src={DownArrow} alt="down arrow" />
                </div>
              </li>
              {showAccount && <ul className="account_dropdown">
                <li className="account_dropdown_list">
                  <img className="menu_icon" src={Setting} alt="" />
                  <Link className="menu_text" replace to="/setting">Account Setting</Link>
                </li>
                <li className="account_dropdown_list" onClick={onSignOut}>
                  <img className="menu_icon" src={SignOut} alt="" />
                  <Link className="menu_text" to='/sign_in'>Sign Out</Link>
                </li>
              </ul>}

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
            <SignIn key="reg" onSuccess={onSignIn} act={signUp} title="Create your account" btn_message="Register"/>
          </Route>
          <Route path="/sign_in">
            <SignIn key="si" onSuccess={onSignIn} act={signIn} title="Sign In" btn_message="Sign In"/>
          </Route>
          <Route path='/order_history'>
            <OrderHistory />
          </Route>
          <Route path='/setting'>
            <Settings />
          </Route>
        </Switch>
      </main>

    </div >
  );
}

export default App;
