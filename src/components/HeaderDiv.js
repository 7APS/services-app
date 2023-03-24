import React, { useState } from 'react';
import { Link } from 'next/link';
import Image from 'next/image'
import { Menu, Input, Avatar } from 'antd';

// import logo from '../../public/images/7aps.png';
// import avatar from '../../public/images/flat-avatar.png';
import logo from '../static/images/logo.png';
import avatar from '../static/images/flat-avatar.png';

const SubMenu = Menu.SubMenu;

export default function HeaderDiv(props) {
  const [currentSearch, setCurrentSearch] = useState('');

  const handleChange = e => {
    setCurrentSearch(e?.target?.value)
  };

  function renderLogo() {
    return (
      // <Link href="/dashboard">
        <div>
          <Image
            className="m-r-5"
            src={logo}
            alt="Logo"
            priority
          />
          <a>SESA Talkes</a>
        </div>
    )
    {/* </Link> */}
  }

  return (
    <Menu
      mode="horizontal"
      theme="dark"
      className="d-flex align-items-center custom-navigation"
    >
      <Menu.Item key="brand-logo" className="brand-logo">
        <div>
          {renderLogo()}
        </div>
      </Menu.Item>
      <Menu.Item key="search" className="custom-search auto">
        <div class="search-container">
          <div class="icon-container">
            <i class="fa fa-search"></i>
          </div>
          <input type="text" placeholder="Pesquisar" value={currentSearch} onChange={handleChange} />
        </div>
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
            <Image
              src={avatar}
              alt="Next.js Logo"
              width={30}
              height={30}
              priority
            />
            <span> Perfil</span>
          </span>
        }
        className=""
      >
        <Menu.Item key="profile-view">
          {/* <Link href="/profile">Perfil</Link> */} 
          Perfil
          {/* @TODO o a com href fica muito mais lento do que o Link do next, entender pq o menu.item nao aceita o link... */}
        </Menu.Item>
        <Menu.Item key="logout">
          {/* <Link href="/">Logout</Link> */}
          Logout
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
}
