import React, { Component } from "react";
import { MensajeEstatico } from "./MensajeEstatico";
import { Pelicula } from "./Pelicula";
import { Sidebar } from './Sidebar';
import { Slider } from './Slider';

class Peliculas extends Component {

    state = {
        peliculas: [
            {
                title: "Batman vs Superman",
                image: "https://es.web.img3.acsta.net/r_1280_720/newsv7/21/09/13/21/22/4178692.jpg",
                year: 2016
            },
            {
                title: "Gran torino",
                image: "https://i.blogs.es/2646f8/gran_torino_-_h_-_2008/840_560.jpg",
                year: 2008
            },
            {
                title: "Looper",
                image: "https://i.blogs.es/1bf2df/looper_movie_banner_by_dcomp-d5d7awv_650/1366_2000.jpg",
                year: 2012
            },
            {
                title: "Spiderman: no way home",
                image: "https://areajugones.sport.es/wp-content/uploads/2021/11/spider-man-no-way-home-1-1080x609.jpeg",
                year: 2021
            },
        ],
        nombre: "Jorge Luis Guiza Granobles",
        favorita: {}
    };

    cambiarTitulo = (e) => {
        var { peliculas } = this.state;
        var aleatorio = Math.floor(Math.random() * peliculas.length);
        peliculas[aleatorio].title = peliculas[aleatorio].title + " Begins";

        this.setState({
            peliculas
        });
    }


    favorita = (pelicula) => {
        this.setState({
            favorita: pelicula
        });
    }

    render() {
        var pStyle = {
            background: 'green',
            color: 'white',
            padding: '10px'
        };

        return (
            <React.Fragment>
                <Slider
                    title="Peliculas"
                    classSlider='slider-small'
                    btn={false}
                />
                <div className="center peliculas">
                    <section id='content'>
                        <h2 className="subheader">Lista de peliculas</h2>
                        <p>Seleccion de las peliculas favoritas de {this.state["nombre"]}</p>
                        <p>
                            <input type="button" value="Cambiar nombre" onClick={this.cambiarTitulo} />
                        </p>
                        {
                            this.state.favorita.title &&
                            <p className="favorita" style={pStyle}>
                                <strong>La pelicula favorita es: </strong>
                                <span>{this.state.favorita.title}</span>
                            </p>
                        }
                        {/** Crear componenete de pelicula */}
                        <div id="articles">
                            {this.state.peliculas.map((pelicula, i) => {
                                return (
                                    <Pelicula
                                        pelicula={pelicula}
                                        key={i}
                                        marcarFavorita={this.favorita}
                                    />
                                );
                            })}
                        </div>
                        <MensajeEstatico />
                    </section>
                    <Sidebar />
                    <div className="clearfix"></div>
                </div>
            </React.Fragment>
        );
    }
}

export { Peliculas };
