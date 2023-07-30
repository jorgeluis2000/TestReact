import React, { Component } from "react";

class Micomponente extends Component {

    render() {
        let receta = {
            nombre: 'Pizza',
            ingredientes: ['Tomate', 'Queso', 'Jamon cosido'],
            calorias: 400
        };
        return (
            <React.Fragment>
                <div className="mi-componente">


                    <h1>{receta['nombre']}</h1>
                    <h2>{'Calorias: ' + receta['calorias']}</h2>
                    <ol>
                        {
                            receta.ingredientes.map((ingrediente, i) => {
                                return (
                                    <li key={i}>
                                        {ingrediente}
                                    </li>
                                )
                            })
                        }
                    </ol>
                    <hr />
                </div>
            </React.Fragment>

        );
    }

}

export { Micomponente };