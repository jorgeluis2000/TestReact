import React, { Component } from "react";
import { BrowserRouter, Route, Routes, useParams, useLocation } from 'react-router-dom';

import { Peliculas } from './components/Peliculas';
import { SeccionPruebas } from './components/SeccionPruebas';
import { Error } from './components/Error';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { Blog } from './components/Blog';
import { Formulario } from './components/Formulario';
import { Article } from "./components/Article";
import { Search } from "./components/Search";
import { CreateArticle } from "./components/CreateArticle";
import { EditArticle } from "./components/EditArticle";


class Router extends Component {
    state = {
        locUrl: window.location.pathname
    }

    setLocUrl = (cUrl) => {
        this.setState({
            locUrl: cUrl
        });
    }

    render() {
        function GetParamsPruebas() {
            let { nombres, apellidos } = useParams();
            var url = useLocation();
            url = url.pathname;
            let locPath = url.split('/');
            return (
                <SeccionPruebas
                    nombres={nombres}
                    apellidos={apellidos}
                    locURL={locPath[1]}
                />
            );
        }

        function GetParamsArticle() {
            let { id } = useParams();
            return (
                <Article
                    id={id}
                />
            );
        }

        function GetParamsSearch() {
            let { search } = useParams();
            return (
                <Search
                    search={search}
                />
            );
        }

        function GetParamsEdit() {
            let { id } = useParams();
            return (
                <EditArticle
                    idArt={id}
                />
            );
        }


        return (

            <BrowserRouter>
                <Header />
                {/* Configurar Rutas y paginas */}
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="home" element={<Home />} />
                    <Route exact path="peliculas" element={<Peliculas />} />
                    <Route exact path="blog" element={<Blog />} />
                    <Route exact path="blog/articulo/:id" element={<GetParamsArticle />} />
                    <Route exact path="blog/busqueda/:search" element={<GetParamsSearch />} />
                    <Route exact path="blog/crear" element={<CreateArticle />} />
                    <Route exact path="blog/editar/:id" element={<GetParamsEdit />} />
                    <Route exact path="formulario" element={<Formulario />} />
                    <Route exact path="pruebas" element={<GetParamsPruebas />} />
                    <Route exact path="pruebas/:nombres" element={<GetParamsPruebas />} />
                    <Route exact path="pruebas/:nombres/:apellidos" element={<GetParamsPruebas />} />
                    <Route path="*" element={<Error />} />
                </Routes>
                <Footer />
            </BrowserRouter >
        );
    }
}


export { Router };