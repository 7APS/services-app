import React, { useState } from 'react';
import Link from 'next/link'
import HeaderDiv from './HeaderDiv';
import { Layout, Menu } from 'antd';
import { DashboardOutlined, MenuFoldOutlined, ScheduleOutlined, MenuUnfoldOutlined, MessageOutlined, FormOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;

const { Header, Sider, Content } = Layout;

export default function Layouts(props) {
    const [collapsed, setCollapsed] = useState(true);
    const [openKeys, setOpenKeys] = useState('');
    const rootSubmenuKeys = ['sub1', 'sub2', 'sub4', 'sub5', 'sub3', 'sub6'];

    const toggle = () => {
        setCollapsed(!collapsed);
    };

    const onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(openKeys);
        } else {
            setOpenKeys({ openKeys: latestOpenKey ? [latestOpenKey] : [] });
        }
    };

    const active = props.active;

    return (
        <Layout className={`${props.classname}`} >
            <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: '#fff' }} className="sidebar-left">
                <div className="logo" />
                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={[active]}
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}>
                    <Menu.Item key="1">
                        <Link href="/dashboard">
                            <div>
                                <DashboardOutlined />
                                <span> Dashboard </span>
                            </div>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link href="/schedule">
                            <div>
                                <ScheduleOutlined />
                                <span> Agenda </span>
                            </div>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link href="/contact">
                            <div>
                                <MessageOutlined />
                                <span> Mensagens </span>
                            </div>
                        </Link>
                    </Menu.Item>
                    <SubMenu
                        key="7"
                        title={
                            <span>
                                <FormOutlined />
                                <span>Cadastros</span>
                            </span>
                        }
                    >
                        <Menu.Item key="7.1">
                            <Link href="/users"> Usuários </Link>
                        </Menu.Item>
                        <Menu.Item key="7.2">
                            <Link href="/persons"> Pessoas </Link>
                        </Menu.Item>
                        <Menu.Item key="7.3">
                            <Link href="/items"> Items</Link>
                        </Menu.Item>
                        <Menu.Item key="7.4">
                            <Link href="/company"> Empresa</Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
                {collapsed &&
                    <MenuUnfoldOutlined className="trigger" onClick={toggle} />
                }
                {!collapsed &&
                    <MenuFoldOutlined className="trigger" onClick={toggle} />
                }
                {/* <Icon
                    className="trigger"
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={toggle}
                /> */}
            </Sider>
            <Layout>
                <Header className="headerTop">
                    <HeaderDiv />
                    {/* <Icon
                            className="trigger layout-trigger header-toggle"
                            type={collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={toggle}
                        /> */}
                </Header>
                <Content
                    style={{
                        padding: 24,
                        minHeight: '100vh',
                    }}
                    className={collapsed ? "collapsed mainContent " : "mainContent"}
                >

                    {props.children}
                </Content>
            </Layout>
        </Layout>
    );

}