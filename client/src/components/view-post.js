// Component to handle viewing a single post.
import React, { Component } from 'react';
import axios from 'axios';

export default class ViewPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            author: '',
            body: '',
            creatdAt: '',
            updatedAt: ''
        }

        // NB: We could .bind here instead of using arrow functions below.
    }

    componentDidMount() {
        axios.get(`http://localhost:3131/${this.props.match.params.id}`)
            .then(response => {
                let blogpost = response.data.blogpost;
                console.log(response.data);
                this.setState({
                    title: blogpost.title,
                    author: blogpost.author,
                    body: blogpost.body,
                    creatdAt: blogpost.creatdAt,
                    updatedAt: new Date(blogpost.updatedAt).toLocaleString()    // quick-and-dirty, not for production
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render = () => {
        return (
            <div>
                <h3>{this.state.title}<br />
                    <small className="text-muted">by {this.state.author}</small>
                </h3>
                <p className="lead">{this.state.body}</p>
                <footer className="figure-caption">Last Updated: {this.state.updatedAt}</footer>
            </div>
        )
    }
}