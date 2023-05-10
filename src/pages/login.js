import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'

export default function Login() {
    const [errors, setErrors] = useState();
    const router = useRouter()
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    useEffect(() => {
        setErrors(null);
    }, [formData]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validLogin = () => {
        let error = false;
        const { username, password } = formData;
        if (username == null) {
            setErrors({ username: "Preencha o email!" })
            error = true;
        }
        if (password == null) {
            setErrors({ password: "Preencha a senha!" })
            error = true;
        }
        if (password != "12345" || username != "administrador@cloud.com") {
            setErrors({ username: "Email ou Senha invalido!", password: "Email ou Senha invalido!" })
            error = true;
        }
        if (error === false) {
            setErrors(null);
            return true;
        }
        return false;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validLogin()) {
            return;
        }
        try {
            const response = await fetch('https://spring-boot-webhook-whatsapp.herokuapp.com/api/login', {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    "email": formData.username,
                    "password": formData.password
                })
            });

            if (response.ok) {
                const ret = await response.json();
                Cookies.set('token', ret?.token);
                localStorage.setItem("token", ret?.token);
                Cookies.set('user', { login: 'true', username: formData.username });
                router.push('dashboard');
            } else {
                throw new Error('Erro ao fazer login');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="loginScreen-container">
            <h1 className="loginScreen-title">Login</h1>
            <form className="loginScreen-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Email:</label>
                <input type="email" name="username" id="username" className="loginScreen-input" value={formData.username} onChange={handleChange} required />
                <p className="loginScreen-error-msg">{errors?.username}</p>

                <label htmlFor="password">Senha:</label>
                <input type="password" name="password" id="password" className="loginScreen-input" value={formData.password} onChange={handleChange} required />
                <p className="loginScreen-error-msg">{errors?.password}</p>

                <button type="submit" className="loginScreen-button">Entrar</button>
            </form>
            <div className="loginScreen-options">
                <Link href="/esqueci-senha" legacyBehavior><a>Esqueci minha senha</a></Link>
                <Link href="/cadastro" legacyBehavior><a>Cadastrar</a></Link>
            </div>
        </div>
    );
}