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
import logoMini from '../../public/images/logoMiniWhite.png';

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
        Cookies.set('token', null);
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

    function getItem(label, key, icon, children) {
        return {
            key,
            icon,
            children,
            label,
        };
    }

    const MenuItems = [
        getItem(
            <Link href="/dashboard" >
                Dashboard
            </Link>,
            '01',
            <DashboardOutlined />,
        ),
        getItem(
            <Link href="/schedule" >
                Agenda
            </Link>,
            '02',
            <ScheduleOutlined />,
        ),
        getItem(
            <Link href="/contact" >
                Mensagens
            </Link>,
            '03',
            <MessageOutlined />,
        ),
        getItem('Cadastros', 'sub04', <FormOutlined />, [
            getItem(
                <Link href="/users" >
                    Usuários
                </Link>,
                '04',
                <UserOutlined />,
            ),
            getItem(
                <Link href="/persons" >
                    Pessoas
                </Link>,
                '05',
                <MessageOutlined />,
            ),
            getItem(
                <Link href="/items" >
                    Items
                </Link>,
                '06',
                <MessageOutlined />,
            ),
            getItem(
                <Link href="/company" >
                    Empresa
                </Link>,
                '07',
                <MessageOutlined />,
            ),
        ]),
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
                    <Menu
                        className='bg-white '
                        mode="inline"
                        defaultSelectedKeys={[keySelected]}
                        items={MenuItems}>

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
