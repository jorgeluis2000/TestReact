import React, { Component } from "react";

class Pelicula extends Component {

    marcar = () => {
        this.props.marcarFavorita(this.props.pelicula);
    }

    colorYear = () => {
        const { year } = this.props.pelicula;
        if (year > 2012) {
            return (
                <p className="year-green">
                    {year}
                </p>
            );
        } else {
            return (
                <p className="year-red">
                    {year}
                </p>
            );
        }
    }

    render() {
        const pelicula = this.props.pelicula;
        const { title, image } = pelicula;
        return (
            <article className="article-item" id="article-template">
                <div className="image-wrap">
                    <img src={image} alt={title}></img>
                </div>
                <h2>{title}</h2>
                <span className="data">Bogota D.C</span>
                <a href="#">Leer mas</a>

                <div className="clearfix"></div>
                {this.colorYear()}
                <input type="button" value="Marcar como favorita" onClick={this.marcar} />
            </article>
        );
    }
}

export { Pelicula };