import {Link} from 'react-router-dom';
import React from 'react';
import Toolbar from '@mui/material/Toolbar';

import './PageContentCommons.scss';
import tdLogo from '../../public/td_logo.jpg';

export type WrapAroundProps = {
  active: number;
  children: string | React.ReactElement | React.ReactElement[] | (() => React.ReactElement);
};

type MenuObject = {
    id: number;
    location: string;
    pathName: string;
}

const menus: MenuObject[] = [
    {
        id: 0,
        location: '/',
        pathName: 'Home'
    },
    {
        id: 1,
        location: '#',
        pathName: 'About Us'
    },
    {
        id: 2,
        location: '#',
        pathName: 'Services'
    },
    {
        id: 3,
        location: '#',
        pathName: 'FAQs'
    }
]

export default function PageContentCommons(props: WrapAroundProps) {
    return (
        <>
            <div className="navbar-main">
                <Toolbar>
                    <img src={tdLogo} className="h-16" alt="Topdown logo" />
                    <ul className="navbar-menu-wrapper">
                        {
                            menus.map((menu, index) => (
                                <li key={index}>
                                    <Link
                                        to={menu.location}
                                        className={props.active === menu.id ? 'selected' : ''}>
                                        {menu.pathName}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                    <div className="navbar-right-side">
                        <Link to="/login" className="btn login-button">Login</Link>
                        <Link to="/signup" className="btn signup-button">
                            Sign-Up
                        </Link>
                    </div>
                </Toolbar>
            </div>
            {props.children}
            <div className="footer">
                <div className="contents">
                    <Link to="/">
                        <img src={tdLogo} className="h-24" alt="Topdown logo" />
                    </Link>
                    <div className="contact-field">
                        {
                            [
                                {
                                    label: 'Email',
                                    value: 'example@example.com'
                                },
                                {
                                    label: 'Phone',
                                    value: '09124234324324'
                                }
                            ].map((item, index) => (
                                <p key={index} className={index <= 0 ? '' : 'mt-8'}>
                                    <b>{item.label}</b><br />
                                    {item.value}
                                </p>
                            ))
                        }
                    </div>
                    <div className="contact-field">
                        <p className="font-bold">Socials</p>
                    </div>
                    <div className="contact-field">
                        <p className="font-bold">Site Map</p>
                    </div>
                </div>
                <div className="divider" />
                Copyright (C) 2023 Topdown Cleaning Services
            </div>
        </>
    )
}
