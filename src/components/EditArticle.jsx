import React, { Component } from "react";
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import Swal from 'sweetalert2';
import { Link, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Slider } from './Slider';
import { defaultImg, Global, loadingImg } from "../Global";


class EditArticle extends Component {

    titleRef = React.createRef();
    contentRef = React.createRef();
    fileRef = React.createRef();
    validator = null;

    state = {
        article: {},
        status: 'loading',
        selectedFile: null,
        fileImg: null
    }
    constructor(props) {
        super(props);
        this.setState({
            article: {},
            status: 'loading',
            selectedFile: null,
            fileImg: null
        });
        this.getArticle(this.props.idArt);
        this.validator = new SimpleReactValidator({
            messages: {
                locale: 'es',
                title: 'Este no es un titulo',
                required: 'Este campo es requerido',
                default: 'Datos incorrectos!!'
            }
        });
    }



    changeState = (e) => {
        if (this.fileRef.current.value !== '') {
            let imagenNew = this.fileRef.current.value.split('\\');
            this.setState({
                fileImg: imagenNew[imagenNew.length - 1]
            });
        }
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value,
                image: this.state.article.image
            },
            status: 'fail',

        });
    }

    getArticle = async (id) => {
        await axios.get(`${Global.urlApi}article/${id}`)
            .then((res) => {
                if (res.data.status) {
                    this.setState({
                        article: res.data.article,
                        status: 'loaded'
                    });
                } else {
                    this.setState({
                        article: {}
                    });
                }

            })
            .catch((err) => { });
    }

    saveArticle = async (event) => {
        event.preventDefault();
        this.changeState();

        if (this.validator.allValid()) {
            // Hacer una peticion HTTP por post para guardar el articulo
            await axios.put(`${Global.urlApi}article/${this.props.idArt}`, this.state.article).then((res) => {
                if (res.data.article) {
                    this.setState({
                        article: res.data.article,
                        status: 'waiting'
                    });
                    if (this.state.selectedFile !== null) {
                        // Sacar el id del articulo guardado
                        var articleId = res.data.article._id;
                        // Crear form data y aniadir el fichero
                        var formData = new FormData();

                        formData.append(
                            'file0',
                            this.state.selectedFile,
                            this.state.selectedFile.name
                        );

                        // Peticion ajax

                        axios.post(`${Global.urlApi}upload-image/${articleId}`, formData).then((nRes) => {
                            if (res.data.article) {
                                this.setState({
                                    article: nRes.data.article,
                                    status: 'success'
                                });
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Articulo editado!!',
                                    text: 'El articulo ha sido editado, ya lo puedes ver los cambios',
                                    confirmButtonText: 'Ok',
                                    confirmButtonColor: '#3085d6'
                                });
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oopps...',
                                    text: 'Revisa los campos, alguno tiene un dato incorrecto!',
                                    confirmButtonText: 'Ok',
                                    confirmButtonColor: '#3085d6'
                                });
                                this.setState({
                                    article: nRes.data.article,
                                    status: 'fail'
                                });
                            }
                        })

                    } else {
                        Swal.fire({
                            icon: 'success',
                            title: 'Articulo editado!!',
                            text: 'El articulo ha sido editado, ya lo puedes ver los cambios',
                            confirmButtonText: 'Ok',
                            confirmButtonColor: '#3085d6'
                        });
                        this.setState({
                            status: 'success'
                        });
                    }

                } else {
                    this.setState({ article: {}, status: 'fail' });
                }
            }).catch((err) => {
                this.setState({ status: 'fail' });
            });
        } else {

            Swal.fire({
                icon: 'error',
                title: 'Oopps...',
                text: 'Revisa los campos, alguno tiene un dato incorrecto!',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#3085d6'
            });

            this.setState({ status: 'fail' });
            this.validator.showMessages();
            this.forceUpdate();
        }

    }

    fileChange = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        });
    }

    invalidData = () => {

    }


    render() {
        if (this.state.status === 'success') {
            return <Navigate replace to={'/blog'} />;
        }
        if (this.state.article.image !== null) {
            this.state.fileImg = this.state.article.image;
        }
        return (
            <React.Fragment>
                <Slider
                    title="Editar Articulo"
                    classSlider='slider-small'
                />
                <div className='center'>
                    <section id='content'>
                        <div className="blog mg-y-xxl">
                            {/* Crear formulario */}
                            {
                                this.state.status !== 'loading' &&
                                <form className="mid-form" onInput={this.changeState}>
                                    <div className="form-group">
                                        <label htmlFor="title">Titulo</label>
                                        <input type="text" name="title" defaultValue={this.state.article.title} ref={this.titleRef} pattern="[A-z0-9\u00C0-\u017F ]{1,500}" />
                                        {this.validator.message('title', this.state.article.title, 'required|alpha_num_space|min:1|max:500', { className: 'text-danger' })}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="content">Contenido</label>
                                        <textarea name="content" cols="30" rows="10" defaultValue={this.state.article.content} ref={this.contentRef} pattern="[A-z0-9\u00C0-\u017F\n \.\,\:\;\#\/]{1,}" onInvalid={this.invalidData} />
                                        {this.validator.message('content', this.state.article.content, 'required|min:20', { className: 'text-danger' })}
                                    </div>
                                    <div className="image-file">
                                        {
                                            (this.state.fileImg) ?
                                                (<img src={`${Global.urlApi}get-image/${this.state.article.image}`} alt={this.state.article.title}></img>)
                                                : (<img src={defaultImg}></img>)
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="file0">Imagen</label>
                                        <input type="file" name="file0" ref={this.fileRef} onChange={this.fileChange} />
                                        {this.state.fileImg && <p>Archivo: <b>{this.state.fileImg}</b></p>}
                                    </div>

                                    <div className="clearfix"></div>
                                    <div className="mg-y-xxl">
                                        <a className="btn btn-success mg-sm" onClick={this.saveArticle} >Enviar</a>
                                        <Link to={`/blog/articulo/${this.props.idArt}`} className="btn btn-danger">Cancelar</Link>
                                    </div>

                                </form>
                            }

                            {
                                !this.state.status === 'loading' &&
                                <div id="articles" className="noFound mg-y-xxl">
                                    <h2>Cargando...</h2>
                                    <img src={loadingImg} alt="loading-pato-duck" />
                                </div>
                            }


                        </div>
                    </section>
                    <Sidebar
                        createArt={false}
                    />
                    <div className="clearfix"></div>
                </div>
            </React.Fragment>
        );
    }
}

export { EditArticle };