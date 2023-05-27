'use client'

import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'
import { Row, Col, Form, Input, Button, Carousel } from 'antd';
import Image from 'next/image'

import logo from '../../../../public/images/logoBlue.png'
import b1 from '../../../../public/banners/b1.jpg'
import b2 from '../../../../public/banners/b2.jpg'
import b3 from '../../../../public/banners/b3.jpg'
import b4 from '../../../../public/banners/b4.jpg'

export default function Signin() {
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
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
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
        <div className="min-h-screen bg-white">
            <div className="h-screen">
                <Row justify="center" align="middle" className="h-full">
                    <Col xs={22} sm={20} md={14} lg={10} xl={8} xxl={8}>
                        <div className="p-8 flex flex-col justify-center h-screen">
                            <div className="flex justify-center mb-16">
                                <Image
                                    src={logo}
                                    width={192}
                                    height={64}
                                    alt="SOUPE Logo"/>
                            </div>
                            <Form layout="vertical" onFinish={handleSubmit}>
                                <Form.Item
                                    name="username"
                                    label="Email"
                                    rules={[{ required: true, message: 'Por favor, insira seu e-mail.' }]}
                                >
                                    <Input placeholder="E-mail" value={''} onChange={handleChange} />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    label="Senha"
                                    rules={[{ required: true, message: 'Por favor, insira sua senha.' }]}
                                >
                                    <Input.Password placeholder="Senha" value={''} onChange={handleChange} />
                                </Form.Item>
                                <Form.Item>
                                    <Button className='bg-primary' type="primary" htmlType="submit" block>
                                        Entrar
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                    <Col xs={0} sm={0} md={10} lg={14} xl={16} xxl={16} className="bg-primary h-screen">
                        <Carousel className="h-95vh">
                            <div className="h-160px text-white text-center bg-primary !flex-col justify-center pt-10">
                                <Image width={"100%"} src={b1} className="" alt="Banner 1" />
                            </div>
                            <div className="h-160px text-white text-center bg-primary !flex-col justify-center pt-10">
                                <Image width={"100%"} src={b2} className="" alt="Banner 2" />
                            </div>
                            <div className="h-160px text-white text-center bg-primary !flex-col justify-center pt-10">
                                <Image width={"100%"} src={b3} className="" alt="Banner 3" />
                            </div>
                            <div className="h-160px text-white text-center bg-primary !flex-col justify-center pt-10">
                                <Image width={"100%"} src={b4} className="" alt="Banner 4" />
                            </div>
                        </Carousel>
                    </Col>
                </Row>
            </div>
        </div>
    );
}