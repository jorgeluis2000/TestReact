import React, { Component } from "react";
import { Sidebar } from './Sidebar';
import { Slider } from './Slider';

class Formulario extends Component {

    nombreRef = React.createRef();
    apellidosRef = React.createRef();
    bioRef = React.createRef();
    generoRef = {
        hombre: React.createRef(),
        mujer: React.createRef(),
        otro: React.createRef()
    };


    state = {
        user: {}
    }

    recibirFormulario = (event) => {
        event.preventDefault();
        var genero = '';
        for (const element in this.generoRef) {
            if (this.generoRef[element].current.checked) genero = `${this.generoRef[element].current.value}`;
        }

        var user = {
            nombre: this.nombreRef.current.value,
            apellidos: this.apellidosRef.current.value,
            bio: this.bioRef.current.value,
            genero: genero
        }

        this.setState({
            user: user
        });
    }

    render() {
        return (
            <React.Fragment>
                <Slider
                    title="Formulario"
                    classSlider='slider-small'
                />
                <div className='center'>
                    <section id='content'>
                        <div className="formulario mg-y-sm">
                            {/* Mostrar datos formulario */}

                            <div className="data-form">
                                {this.state.user.nombre && <p>Nombre: <b>{this.state.user.nombre}</b></p>}
                                {this.state.user.apellidos && <p>Apelldios: <b>{this.state.user.apellidos}</b></p>}
                                {this.state.user.bio && <p>Bio: <b>{this.state.user.bio}</b></p>}
                                {this.state.user.genero && <p>Genero: <b>{this.state.user.genero}</b></p>}
                            </div>

                            {/* Crear formulario */}
                            <form className="mid-form" onSubmit={this.recibirFormulario} onInput={this.recibirFormulario} >
                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre</label>
                                    <input type="text" name="nombre" ref={this.nombreRef} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="apellidos">Apellidos</label>
                                    <input type="text" name="apellidos" ref={this.apellidosRef} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="biografia">Biografia</label>
                                    <textarea name="biografia" cols="30" rows="10" ref={this.bioRef}></textarea>
                                </div>
                                <div className="form-group raddionsbuttons">
                                    <label className="content-radio"><input type="radio" name="genero" value="Hombre" ref={this.generoRef.hombre} /> hombre</label>
                                    <label className="content-radio"><input type="radio" name="genero" value="Mujer" ref={this.generoRef.mujer} /> mujer</label>
                                    <label className="content-radio"><input type="radio" name="genero" value="Otro" ref={this.generoRef.otro} /> Otro</label>
                                </div>
                                <div className="clearfix"></div>
                                <input type="submit" value="Enviar" className="btn btn-success" />
                            </form>
                        </div>
                    </section>
                    <Sidebar />
                    <div className="clearfix"></div>
                </div>
            </React.Fragment>
        );
    }
}

export { Formulario };