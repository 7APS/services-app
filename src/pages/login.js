import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState();
    const router = useRouter()

    useEffect(() => {
        setErrors(null);
    }, [email, password]);

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleLogin = () => {
        let error = false;
        if (email == null) {
            setErrors({ email: "Preencha o email!" })
            error = true;
        }
        if (password == null) {
            setErrors({ password: "Preencha a senha!" })
            error = true;
        }
        if (password != "123123" || email != "sysadmin@email.com") {
            setErrors({ email: "Email ou Senha invalido!", password: "Email ou Senha invalido!" })
            error = true;
        }
        if (error === false) {
            setErrors(null);
            login();
        }
    };

    const login = () => {
        Cookies.set('user', { login: 'true', email });
        router.push('dashboard')
    }

    return (
        <div className="loginScreen-container">
            <h1 className="loginScreen-title">Login</h1>
            <form className="loginScreen-form">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" className="loginScreen-input" value={email} onChange={handleEmailChange} required />
                <p className="loginScreen-error-msg">{errors?.email}</p>

                <label htmlFor="password">Senha:</label>
                <input type="password" id="password" className="loginScreen-input" value={password} onChange={handlePasswordChange} required />
                <p className="loginScreen-error-msg">{errors?.password}</p>

                <button type="button" className="loginScreen-button" onClick={handleLogin}>Entrar</button>
            </form>
            <div className="loginScreen-options">
                <Link href="/esqueci-senha" legacyBehavior><a>Esqueci minha senha</a></Link>
                <Link href="/cadastro" legacyBehavior><a>Cadastrar</a></Link>
            </div>
        </div>
    );
}