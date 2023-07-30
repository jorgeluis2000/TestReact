import React, { Component } from "react";
import { Sidebar } from './Sidebar';
import { Slider } from './Slider';
import { Articles } from './Articles';

class Blog extends Component {

    render() {
        return (
            <React.Fragment>
                <Slider
                    title="Blog"
                    classSlider='slider-small'
                />
                <div className='center'>
                    <section id='content'>
                        <div className="blog">
                            <Articles />


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

export { Blog };