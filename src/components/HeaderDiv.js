import React, { useState } from 'react';
import { Link } from 'next/link';
import { Menu, Input, Avatar } from 'antd';

// import logo from '../../public/images/7aps.png';
// import avatar from '../../public/images/flat-avatar.png';
import logo from '../static/images/logo.png';
import avatar from '../static/images/flat-avatar.png';

const SubMenu = Menu.SubMenu;
const Search = Input.Search;

export default function HeaderDiv(props) {
  // const [current, setCurrent] = useState('search');

  // const handleClick = e => {
  //   console.log('click ', e);
  //   setCurrent(e.key)
  // };

  return (
    <Menu
      mode="horizontal"
      theme="dark"
      className="d-flex align-items-center custom-navigation"
    >
      <Menu.Item key="brand-logo" className="brand-logo">
          <div>
        {/* <Link href="/dashboard"> */}
            <image src={logo} className="m-r-5" />
            <span>SESA Talkes</span>
        {/* </Link> */}
          </div>
      </Menu.Item>
      <Menu.Item key="search" className="custom-search auto">
        <Search onSearch={value => console.log(value)} />
      </Menu.Item>
      {/* <Menu.Item key="sidebar-toggle" onClick={this.sidebarToggle}>
          <span>LTR/RTR</span>
        </Menu.Item> */}
      {/* <SubMenu
        key="language"
        title={
          <span className="submenu-title-wrapper">
            Language{' '}
          </span>
        }
        className="custom-dropdown language-list"
      >
        <Menu.Item key="setting:1">English</Menu.Item>
        <Menu.Item key="setting:2">Português</Menu.Item>
        <Menu.Item key="setting:3">Espanhol</Menu.Item>
      </SubMenu> */}

      <SubMenu
        key="profile"
        title={
          <span>
            <Avatar size={24} src={avatar} />
            <span> Perfil</span>
          </span>
        }
        className=""
      >
        <Menu.Item key="profile-view">
          {/* <Link href="/profile">Perfil</Link> */}
          Perfil
        </Menu.Item>
        <Menu.Item key="logout">
          {/* <Link href="/">Logout</Link> */}
          Logout
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
}
