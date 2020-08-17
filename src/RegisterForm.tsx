import React, { useState } from 'react';
import './RegisterForm.scss';

type RegisterFormProps = {
    title: string
    btn_message: string
    onClick(name: string, password: string): void
}

export default function RegisterForm({ title, btn_message, onClick }: RegisterFormProps) {

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        onClick(name, password)
    }

    return <form className="RegisterForm" onSubmit={onSubmit}>
        <p>{title}</p>
        <label>Your name</label>
        <input onChange={e => setName(e.currentTarget.value)} value={name} autoFocus />
        <label>Password</label>
        <input onChange={e => setPassword(e.currentTarget.value)} value={password} type="password" />
        <button>{btn_message}</button>
    </form>
} 