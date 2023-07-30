import React, { Component } from "react";
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/es';

import { Articles } from "./Articles";
import { Sidebar } from './Sidebar';
import { Slider } from './Slider';


class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <Slider
                    title="Bienvenido al curso de React de JavaScript con Jorge Guiza de jorgeguizagranobles.com"
                    classSlider='slider-big'
                    btn={true}
                />
                <div className='center'>
                    <section id='content'>
                        <div className="home-index">
                            <h1 className="subheader">Ultimos articulos</h1>
                            <Articles 
                            home={true}
                            />
                        </div>
                    </section>
                    <Sidebar 
                    createArt={true}
                    />
                    <div className="clearfix"></div>
                </div>
            </React.Fragment>
        );
    }
}

export { Home };