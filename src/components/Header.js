import React from 'react';
import '../CSS/Header.css';
import { NavLink } from 'react-router-dom'

function Header() {
    return (
        <div>
            <header className='Header-header'>
            <p className='Header-title'>Cricket Farm</p>
            <div className='Header-box'>
                <ul className="Header-links">
                    <li className="Header-links">
                        <NavLink to="/" className='Header-link'>Home</NavLink>
                    </li>
                    <li className="Header-links">
                        <NavLink to="/products" className='Header-link'>Products</NavLink>
                    </li>
                    <li className="Header-links">
                        <NavLink to="/orders" className='Header-link'>Orders</NavLink>
                    </li>
                    <li className="Header-links">
                        <NavLink to="/customers" className='Header-link'>Customers</NavLink>
                    </li>
                    <li className="Header-links">
                        <NavLink to="/overview" className='Header-link'>Overview</NavLink>
                    </li>
                </ul>
            </div>
            </header>
        </div>
    )
}

export default Header
