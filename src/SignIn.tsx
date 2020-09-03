import React, { useState } from 'react';
import RegisterForm from './RegisterForm';
import { useDispatch } from 'react-redux';
import { actions } from './store';
import './SignIn.scss';
import { User } from './types';

type SignInProps = {
    title: string
    btn_message: string
    act: (name: string, password: string) => Promise<User | null>
    onSuccess: () => void
}

export default function SignIn({ title, btn_message, onSuccess, act }: SignInProps) {

    const dispatch = useDispatch()
    const [showAlertMessage, setShowAlertMessage] = useState(false)

    async function onSignIn(name: string, password: string) {
        const user = await act(name, password)
        if (user === null) {
            setShowAlertMessage(true)
        } else {
            dispatch(actions.signIn(user))
            onSuccess()
        }
    }

      return <div className="SignIn">
        <RegisterForm title={title} btn_message={btn_message} onClick={onSignIn} />
        <p className="alert_msg">{showAlertMessage ? <>Your name or password is wrong</> : <>&nbsp;</>}</p>
    </div>
}