import React from 'react';
import './Settings.scss';
import { deleteUser } from './api';
import { useDispatch } from 'react-redux';
import { actions } from './store';
import { useHistory } from 'react-router-dom';

export default function Settings() {

  const dispatch = useDispatch()
  const history = useHistory()

  async function onDeleteAccount() {
    await deleteUser()
    dispatch(actions.signOut())
    history.replace("/")
  }

  return <div className="Settings">
    <h1>Settings</h1>
    <p className="settings_title">Change your password?</p>
    <label>enter your password</label>
    <input type="password" />
    <label>enter your password again</label>
    <input type="password" />
    <button>Change password</button>
    <p className="settings_title">Delete your account?</p>
    <button onClick={onDeleteAccount} className="delete_account_btn">Delete account</button>
  </div>
}