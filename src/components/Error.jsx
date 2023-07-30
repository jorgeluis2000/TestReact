import React from "react";
import imgNoFound from '../assets/images/no-found.gif'

const Error = () => {
    return (
        <div className="noFound">
            <h2 className="subheader">Error 404: Pagina no encontrada</h2>
            <img src={imgNoFound} alt="loading-pato-duck" />
            <p>La pagina que buscas no existe, intentalo mas tarde.</p>
        </div>
    )
};

export { Error };