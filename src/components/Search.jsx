import React, { Component } from "react";
import { Sidebar } from './Sidebar';
import { Slider } from './Slider';
import { Articles } from './Articles';

class Search extends Component {

    render() {
        const search = this.props.search;
        return (
            <React.Fragment>
                <Slider
                    title={`Busqueda: ${search}`}
                    classSlider='slider-small'
                />
                <div className='center'>
                    <section id='content'>
                        <div className="blog">
                            <Articles
                                search={search}
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

export { Search };