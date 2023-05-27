'use client'

import { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, ConfigProvider, Button } from 'antd';
import Cookies from 'js-cookie';
import {
    UserOutlined,
    LogoutOutlined,
    DashboardOutlined,
    ScheduleOutlined,
    MessageOutlined,
    FormOutlined,
    ToolOutlined,
    BellOutlined,
    RightOutlined,
    LeftOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation'

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

import logo from '../../public/images/logoWhite.png';
import logoMini from '../../public/images/logoMiniBlack.png';

export default function AppLayout({ children }) {
    const router = useRouter()
    const [collapsed, setCollapsed] = useState(false);
    const [keySelected, setKeySelected] = useState('1');

    const toggleMenu = () => {
        setCollapsed(!collapsed);
    };

    const handleLogout = () => {
        router.push('/signin');
        Cookies.set('user', null);
    };

    const items = [
        {
            label: 'Perfil',
            key: '1',
            icon: <UserOutlined />,
        },
        {
            label: 'Sair',
            key: '2',
            icon: <LogoutOutlined />,
        },
    ];

    const handleMenuClick = (e) => {
        console.log('click', e);
        if (e.key === '2') {
            handleLogout();
        }
    };

    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#545cad' } }} >
            <Layout className='bg-transparent' style={{ minHeight: '100vh' }}>
                <Sider className='!bg-white' trigger={null} collapsible collapsed={collapsed}>
                    <div className="flex items-center justify-center h-14 text-white bg-primary gap-2">
                        {collapsed ? (
                            <div className="text-2xl font-bold">
                                <Image
                                    className="m-r-5"
                                    width={40}
                                    src={logoMini}
                                    alt="Logo mini"
                                    priority
                                />
                            </div>
                        ) : (
                            <div className="text-2xl font-bold">
                                <Image
                                    className="m-r-5"
                                    width={120}
                                    src={logo}
                                    alt="Logo"
                                    priority
                                />
                            </div>
                        )}
                        {collapsed ? (
                            <RightOutlined className="text-sm !text-white hover:!text-warmGray-300" onClick={toggleMenu} />
                        ) : (
                            <LeftOutlined className="text-sm !text-white hover:!text-warmGray-300" onClick={toggleMenu} />
                        )}
                    </div>
                    <Menu className='bg-white ' mode="inline" defaultSelectedKeys={[keySelected]}>
                        <Menu.Item key="1" icon={<DashboardOutlined />}>
                            <Link href="/dashboard">Dashboard</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<ScheduleOutlined />}>
                            <Link href="/schedule">Agenda</Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<MessageOutlined />}>
                            <Link href="/contact">Mensagens</Link>
                        </Menu.Item>
                        <SubMenu
                            key="4"

                            title={
                                <span>
                                    <FormOutlined />
                                    <span>Cadastros</span>
                                </span>
                            }
                        >
                            <Menu.Item key="4.1" icon={<UserOutlined />}>
                                <Link href="/users"> Usuários </Link>
                            </Menu.Item>
                            <Menu.Item key="4.2" icon={<UserOutlined />}>
                                <Link href="/persons"> Pessoas </Link>
                            </Menu.Item>
                            <Menu.Item key="4.3" icon={<UserOutlined />}>
                                <Link href="/items"> Items</Link>
                            </Menu.Item>
                            <Menu.Item key="4.4" icon={<UserOutlined />}>
                                <Link href="/company"> Empresa</Link>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout className="bg-gray-100">
                    <Header className="flex items-center text-right px-4 bg-primary !h-14 justify-end gap-4">
                        <BellOutlined className="text-xl !text-white hover:!text-warmGray-300 hover:cursor-pointer" />
                        <ToolOutlined className="text-xl !text-white hover:!text-warmGray-300 hover:cursor-pointer" />

                        <div className="text-white hover:!text-warmGray-300">
                            <Dropdown
                                menu={{
                                    items,
                                    onClick: handleMenuClick
                                }}
                                placement="bottomRight"
                                arrow>
                                <Avatar icon={<UserOutlined />} />
                            </Dropdown>
                        </div>
                    </Header>
                    <Content className="p-4">{children}</Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};
