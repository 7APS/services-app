// import useSWR from 'swr'
import { Breadcrumb, Layout as AntLayout, Menu, theme } from 'antd';
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useState } from 'react';

const { Header, Content, Footer } = AntLayout;

export default function LayoutOne({ children }) {
    const [menu, setMenu] = useState(1);
    //   const { data, error } = useSWR('/api/navigation', fetcher)

    //   if (error) return <div>Failed to load</div>
    //   if (!data) return <div>Loading...</div>
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (

        <AntLayout className="layout">
            <Header>
                <div className="logo" >
                </div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[menu ?? 1]}
                    items={[
                        {
                            key: 1,
                            label: `Agenda`,
                            onClick: () => setMenu(1),

                        },
                        {
                            key: 2,
                            label: `Conversas`,
                            onClick: () => setMenu(2),
                        },
                        {
                            key: 3,
                            label: `Público`,
                            onClick: () => setMenu(3),
                        },
                        {
                            key: 4,
                            label: `Jornadas`,
                            onClick: () => setMenu(4),
                        },
                        {
                            key: 5,
                            label: `Integrações`,
                            onClick: () => setMenu(5),
                        }
                    ]}
                />
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content" style={{ background: colorBgContainer }}>
                    {children}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Easy Services - App ©2023 Created by 7APS</Footer>
        </AntLayout>

    )
}