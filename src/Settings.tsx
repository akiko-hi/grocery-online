import React, { useState } from 'react';
import { deleteUser, updatePassword } from './api';
import { useDispatch } from 'react-redux';
import { actions } from './store';
import { useHistory } from 'react-router-dom';
import './Settings.scss';

export default function Settings() {

  const dispatch = useDispatch()
  const history = useHistory()
  const [password, setPassword] = useState("")
  const [confirmedPassword, setconfirmedPassword] = useState("")
  const [message, setMessage] = useState<string>()

  async function onDeleteAccount() {
    await deleteUser()
    dispatch(actions.signOut())
    history.replace("/")
  }

  async function onUpdatePassword(password: string) {
    setMessage(undefined)
    if (password === confirmedPassword) {
      await updatePassword(password)
      setMessage("Your password has been successfully changed")
    } else {
      setMessage("passwords don't match plase try again")
    }
  }

  return <div className="Settings">

    <h1 className="settings_header">Settings</h1>
    <p className="settings_title">Change your password?</p>
    <label>enter your password</label>
    <input onChange={e => setPassword(e.currentTarget.value)} value={password} type="password" autoFocus />
    <label>enter your password again</label>
    <input onChange={e => setconfirmedPassword(e.currentTarget.value)} value={confirmedPassword} type="password" />
    <button onClick={() => onUpdatePassword(password)}>Change password</button>
    {message ? <p className="error_msg">{message}</p> : <p className="empty_p"></p>}
    <p className="settings_title">Delete your account?</p>
    <button onClick={onDeleteAccount} className="delete_account_btn">Delete account</button>
  </div>
}