import axios from "axios";
import Swal from 'sweetalert2';
import moment from "moment";
import "moment/locale/es";
import React, { Component } from "react";
import { Global, defaultImg, noContent } from "../Global";
import { Sidebar } from "./Sidebar";
import { Link, Navigate } from "react-router-dom";

class Article extends Component {

    state = {};

    constructor(props) {
        super(props);
        this.setState({
            article: {},
            status: 'fail'
        });
        try {
            this.getArticleComplete(props.id);
        } catch (err) { }

    }

    deleteArticle = async(nArticle) => {
        Swal.fire({
            title: 'Estas seguro?',
            text: "Al eliminarlo estos datos no se volveran a restaurar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminarlo!'
        }).then(async(result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Eliminado!',
                    `El articulo <b>${nArticle.title}</b> ha sido eliminado.`,
                    'success'
                );
                await axios
                    .delete(`${Global.urlApi}article/${nArticle._id}`)
                    .then((res) => {
                        if (res.data.status) {
                            this.setState({
                                article: res.data.article,
                                status: 'deleted'
                            });
                        } else {
                            this.setState({
                                article: {},
                                status: 'fail'
                            });
                        }
                    })
                    .catch((err) => {
                        this.setState({
                            article: {},
                            status: 'fail'
                        });
                    });
            } else {
                Swal.fire(
                    'Tranquilo!',
                    `El articulo <b>${nArticle.title}</b> no ha sido eliminado.`,
                    'info'
                );
            }
        })
    }

    getArticleComplete = async (cId) => {
        var response = await axios
            .get(`${Global.urlApi}article/${cId}`)
            .then((res) => {
                if (res.data.status) {
                    this.setState({
                        article: res.data.article,
                        status: 'success'
                    });
                } else {
                    this.setState({
                        article: {},
                        status: 'fail'
                    });
                }
            })
            .catch((err) => {
                this.setState({
                    article: {},
                    status: 'fail'
                });
            });
        return response;
    }

    componentDidUpdate(prevProps, nextState) {
        if (this.props.id !== prevProps.id) {
            this.getArticleComplete(this.props.id);
        }
    }

    render() {
        if (this.state.status === 'deleted') {
            return <Navigate to={'/blog'} />;
        }
        return (
            <React.Fragment>
                <div className="center">
                    <section id="content">
                        {
                            (this.state.status === 'success') ?
                                <article className="article-item article-detail mg-y-sm">
                                    <div className="image-wrap">
                                        {this.state.article.image != null ? (
                                            <img
                                                src={
                                                    Global.urlApi + "get-image/" + this.state.article.image
                                                }
                                                alt={this.state.article.title}
                                            />
                                        ) : (
                                            <img
                                                className="image-wrap"
                                                src={defaultImg}
                                                alt={this.state.article.title}
                                            />
                                        )}
                                    </div>
                                    <h1 className="subheader">{this.state.article.title}</h1>
                                    <span className="data">
                                        {moment(this.state.article.date, "YYYYMMDD").fromNow()}
                                    </span>
                                    <p className="mg-mg-y-xxl">{this.state.article.content}</p>
                                    <div className="center">
                                        <Link to={`/blog/editar/${this.state.article._id}`} className="btn btn-warning btn-shadown mg-sm">Editar</Link>
                                        <a onClick={() => {
                                            this.deleteArticle(this.state.article);
                                        }} className="btn btn-danger btn-shadown ">Eliminar</a>
                                    </div>



                                </article>
                                :
                                <div id="articles" className="noFound mg-y-xxl">
                                    <h2>No existe el articulo</h2>
                                    <img src={noContent} alt="loading-pato-duck" />
                                    <p>Lo sentimos no pudimos encontrar ningun articulo con esa id.</p>
                                </div>
                        }
                        <div className="clearfix"></div>
                    </section>
                    <Sidebar createArt={true} />
                    <div className="clearfix"></div>
                </div>
            </React.Fragment>
        );
    }
}

export { Article };
