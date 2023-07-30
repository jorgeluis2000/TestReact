import React, { Component } from "react";
import logo from '../assets/images/logo-react.png';
import { NavLink } from 'react-router-dom';


class Header extends Component {
    render() {
        return (
            <header id="header">
                <div className="center">
                    {/*LOGO */}
                    <div id="logo">
                        <img src={logo} className="app-logo" alt="Logotipo"></img>
                        <span id="brand">
                            <strong>Curso</strong>ReactJS
                        </span>
                    </div>
                    {/*MENU NAVEGACION*/}
                    <nav id="menu">
                        <ul>
                            <li>
                                <NavLink to="/" className={({ isActive }) => isActive? "active": ''} >Inicio</NavLink>
                            </li>
                            <li>
                                <NavLink to="/blog" className={({ isActive }) => isActive? "active": ''}>Blog</NavLink>
                            </li>
                            <li>
                                <NavLink to="/formulario" className={({ isActive }) => isActive? "active": ''}>Formulario</NavLink>
                            </li>
                            <li>
                                <NavLink to="/peliculas" className={({ isActive }) => isActive? "active": ''}>Peliculas</NavLink>
                            </li>
                            <li>
                                <NavLink to="/pruebas" className={({ isActive }) => isActive? "active": ''}>Pruebas</NavLink>
                            </li>
                        </ul>
                    </nav>
                    {/*LIMPIAR FLOTADOS */}
                    <div className="clearfix"></div>
                </div>
            </header>
        );
    }
}

export { Header };