import React from 'react';
import './RegisterForm.scss';

type RegisterFormProps = {
    title: string
    btn_message: string
}

export default function RegisterForm({ title, btn_message }: RegisterFormProps) {
    return <div className="RegisterForm">
        <form>
            <p>{title}</p>
            <label>Your name</label>
            <input />
            <label>Password</label>
            <input />
            <button>{btn_message}</button>
        </form>
    </div>
} 