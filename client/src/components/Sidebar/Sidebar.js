import React from 'react';
import './Sidebar.scss';
import MenutItem from './MenuItem/MenuItem';
import news from "./icons/news.svg";
import messages from "./icons/messages.svg";
import notifications from "./icons/notifications.svg";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const menus = [
    { logo: news, label: "Actualités" },
    { logo: messages, label: "Messages" },
    { logo: notifications, label: "Notifications" }
  ];

  const logout = process.env.REACT_APP_URL + '/icons/logout.svg';

  return <>
    <div className="Sidebar">
      <div className="UserProfil mt-2">
        <img className="rounded-circle" src="https://lorempixel.com/570/400?t=1563270dd49782389" alt="User Profil" />
      </div>

      <div className="MenuItems mt-4 w-100">
        {menus.map((menu, key) => <MenutItem index={key} key={key} menu={menu} />)}
      </div>

      <Link to='/logout' className="logout">
        <img src={logout} alt="Se déconnecter" title="Se déconnecter" />
      </Link>
    </div>
  </>
}

export default Sidebar;
