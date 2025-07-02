import React from 'react';
import { NavLink } from 'react-router-dom';
import './FooterNav.css';
import HomeIcon from '../../assets/icons/home.svg';
import MoneyInIcon from '../../assets/icons/moneyin.svg';
import MoneyOutIcon from '../../assets/icons/moneyout.svg';
import ExchangeIcon from '../../assets/icons/exchange.svg';
import DocumentsIcon from '../../assets/icons/documents-navbar.svg';
import LogoutIcon from '../../assets/icons/logout.svg';

export default function FooterNav({ onLogout }) {
  return (
    <nav className="dxbt-footer-nav">
      <NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''}>
        <img src={HomeIcon} alt="Home" />
        <span className="nav-label">Home</span>
      </NavLink>
      <NavLink to="/money-in" className={({isActive}) => isActive ? 'active' : ''}>
        <img src={MoneyInIcon} alt="Money In" />
        <span className="nav-label">Money In</span>
      </NavLink>
      <NavLink to="/money-out" className={({isActive}) => isActive ? 'active' : ''}>
        <img src={MoneyOutIcon} alt="Money Out" />
        <span className="nav-label">Money Out</span>
      </NavLink>

      <NavLink to="/documents" className={({isActive}) => isActive ? 'active docs-nav-btn' : 'docs-nav-btn'}>
        <img src={DocumentsIcon} alt="Documents" />
        <span className="nav-label">Documents</span>
      </NavLink>
      <button className="logout-btn" onClick={onLogout} aria-label="Logout">
        <img src={LogoutIcon} alt="Logout" />
        <span className="nav-label">Logout</span>
      </button>
    </nav>
  );
}
