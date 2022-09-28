import { NavLink, Navigate } from 'react-router-dom'

import './appHeader.scss';

const AppHeader = () => {
    const activeStyle = {
        "color": '#ce262c'
    }

    return (
        <header className="app__header">
            <h1 className="app__title">
                <NavLink to="/">
                    <span>Marvel</span> information portal
                </NavLink>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li>
                        <NavLink
                            end
                            to="/"
                            style={({ isActive }) => isActive ? activeStyle : undefined}>
                            Characters
                        </NavLink></li>
                    /
                    <li>
                        <NavLink
                            to="comics"
                            style={({ isActive }) => isActive ? activeStyle : undefined}>
                            Comics
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;