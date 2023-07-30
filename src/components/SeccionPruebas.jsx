import React, { Component } from "react";
import { Sidebar } from './Sidebar';
import { Slider } from './Slider';

class SeccionPruebas extends Component {

    contador = 0;

    state = {
        contador: 0
    };

    sumar = (e) => {
        this.contador += 1;
        this.setState({
            contador: (this.state['contador'] + 1)
        });
    }

    restar = (e) => {
        this.contador -= 1;
        this.setState({
            contador: (this.state['contador'] - 1)
        });
    }

    render() {
        let params = this.props
        const datos = (
            <div>
                <h1 className="subheader">Pagina de pruebas</h1>
                <span>{(params.nombres) ? `${params.nombres} ` : ''}{(params.apellidos) ? `${params.apellidos}` : ''}</span>
            </div>
        );
        return (
            <React.Fragment>
                <Slider
                    title="Pruebas"
                    classSlider='slider-small'
                    btn={false}
                />
                <div className="center seccion-pruebas">
                    <section id="content">
                        {datos}
                        <h2 className="subheader">Últimos artículos</h2>
                        {/* Listado Articulos */}
                        <h2 className="subheader">{this.props.title}</h2>

                        <h2 className="subheader">Estado</h2>
                        <p>
                            {this.contador}
                        </p>
                        <p>
                            <input className="mg-sm" type="button" value="Sumar" onClick={this.sumar} />
                            <input className="mg-sm" type="button" value="Restar" onClick={this.restar} />
                        </p>
                        {/* Add articles away JS */}
                    </section>
                    <Sidebar />
                    <div className="clearfix"></div>
                </div>
            </React.Fragment>
        );
    }

}

export { SeccionPruebas };