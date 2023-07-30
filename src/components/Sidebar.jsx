import React, { Component } from "react";
import { Navigate, Link } from 'react-router-dom';

class Sidebar extends Component {

    searchRef = React.createRef();

    state = {
        search: '',
        redirect: false
    };

    constructor(props) {
        super(props);
        this.setState({
            search: '',
            redirect: false
        });
    }


    redirectToSearch = (e) => {
        e.preventDefault();
        this.setState({
            search: this.searchRef.current.value,
            redirect: true
        });
    }

    render() {
        if (this.state.redirect) {
            this.setState({
                redirect: false
            });
            return (
                <Navigate replace to={`/blog/busqueda/${this.state.search}`} />
            );
        }
        return (
            <aside id="sidebar">
                {
                    this.props.createArt &&
                    <div id="nav-blog" className="sidebar-item">
                        <h3>Puedes hacer esto</h3>
                        <Link to={'/blog/crear'} className="btn btn-success">Crear articulo</Link>
                    </div>
                }

                <div id="search" className="sidebar-item">
                    <h3>Buscador</h3>
                    <p>Encuentra el articulo que buscas</p>
                    <form onSubmit={this.redirectToSearch}>
                        <input type="text" name="search" ref={this.searchRef} />
                        <input type="submit" className="btn" name="submit" value="Buscar" />
                    </form>
                </div>
            </aside>
        );
    }
}

export { Sidebar };