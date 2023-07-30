import React, { Component } from "react";
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/es';
import { Link } from "react-router-dom";
import { Global, loadingImg, noContent, defaultImg } from "../Global";

class Articles extends Component {


    state = {
        articles: [],
        status: false,
        locUrl: `${window.location.protocol}//${window.location.hostname}/`
    };

    constructor(props) {
        super(props);
        this.setState({
            articles: [],
            status: false,
            locUrl: `${window.location.protocol}//${window.location.hostname}/`
        });
        if (this.props.home) {
            this.firstFiveArticles();
            
        } else if (this.props.search) {
            this.getArticlesBySearch(this.props.search);
            
        } else {
            this.setArticles();
            
        }
    }

    setArticles = async () => {
        var response = null;
        
        response = await axios.get(`${Global.urlApi}articles`).then((res) => {
            if (res.data.status) {
                this.setState({
                    articles: res.data.articles,
                    status: true
                });
            } else {
                this.setState({
                    articles: [],
                    status: true
                });
            }
        }).catch((err) => {
            this.setState({
                articles: [],
                status: true
            });
        });

        return response;
    }

    firstFiveArticles = async (cCount = 5) => {
        var response = await axios.get(`${Global.urlApi}articles/${cCount}`).then((res) => {
            if (res.data.status) {
                this.setState({
                    articles: res.data.articles,
                    status: true
                });
            } else {
                this.setState({
                    articles: [],
                    status: true
                });
            }
        }).catch((err) => {
            this.setState({
                articles: [],
                status: true
            });
        });
        return response;
    }

    getArticlesBySearch = async (searched) => {
        var response = null;
        response = await axios.get(`${Global.urlApi}search/${searched}`).then((res) => {
            if (res.data.status) {
                this.setState({
                    articles: res.data.articles,
                    status: true
                });
            } else {
                this.setState({
                    articles: [],
                    status: true
                });
            }
            
        }).catch((err) => {
            this.setState({
                articles: [],
                status: true
            });
        });
        return response
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.search !== prevProps.search) {
            if (prevProps.home) {
                try {
                    this.firstFiveArticles();
                } catch (err) { }
                
            } else if (prevProps.search && prevProps.search !== '') {
                try {
                    this.getArticlesBySearch(this.props.search);
                } catch (err) { }
                
            } else {
                try {
                    this.setArticles();
                } catch (err) { }
                
            }
        }
    }


    render() {
        if (this.state.articles.length >= 1 && this.state.status) {
            return (
                <div id="articles">
                    {!this.props.home && <h1 className="subheader">Lista de articulos</h1>}
                    {
                        this.state.articles.map((article, i) => {
                            return (
                                <article className="article-item" id="article-template" key={i}>
                                    <div className="image-wrap">
                                        {(article.image !== null) ? <img src={Global.urlApi + 'get-image/' + article.image} alt={article.title} /> : <img src={defaultImg} alt={article.title} />}
                                    </div>
                                    <h2>{article.title}</h2>
                                    <span className="data">
                                        {moment(article.date, 'YYYYMMDD').fromNow()}
                                    </span>
                                    <Link to={`/blog/articulo/${article._id}`}>Leer mas</Link>
                                    <div className="clearfix"></div>
                                </article>
                            );
                        })
                    }

                </div>
            );
        } else if (this.state.articles.length === 0 && this.state.status) {
            return (
                <div id="articles" className="noFound mg-y-xxl">
                    <h2>No hay articulos</h2>
                    <img src={noContent} alt="loading-pato-duck" />
                    <p>Lo sentimos no pudimos encontrar ningun articulo en nuestras bases de datos.</p>
                </div>
            );
        } else {
            return (
                <div id="articles" className="noFound mg-y-xxl">
                    <h2>Cargando...</h2>
                    <img src={loadingImg} alt="loading-pato-duck" />
                </div>

            );
        }
    }
}

export { Articles };