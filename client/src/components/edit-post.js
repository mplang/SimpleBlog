
// Component to handle editing posts.
import React, { Component } from 'react';
import axios from 'axios';

export default class EditPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            author: '',
            body: '',
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
                    body: blogpost.body
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangePostTitle = (e) => {
        this.setState({
            title: e.target.value
        });
    }

    onChangePostAuthor = (e) => {
        this.setState({
            author: e.target.value
        });
    }

    onChangePostBody = (e) => {
        this.setState({
            body: e.target.value
        });
    }

    onSubmit = async (e) => {
        e.preventDefault();

        const editedPost = {
            title: this.state.title,
            author: this.state.author,
            body: this.state.body
        };
        await axios.post(`http://localhost:3131/update/${this.props.match.params.id}`, editedPost)
            .then(res => console.log(res.data));

        // Reset the form
        this.setState({
            title: '',
            author: '',
            body: ''
        })
        this.props.history.push('/');
    }

    // JSX for the form itself
    render = () => {
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Edit Post</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.title}
                            onChange={this.onChangePostTitle}
                        />
                    </div>
                    <div className="form-group">
                        <label>Author: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.author}
                            onChange={this.onChangePostAuthor}
                        />
                    </div>
                    <textarea
                        rows="10"
                        className="form-control"
                        value={this.state.body}
                        onChange={this.onChangePostBody}
                    ></textarea>

                    <div className="form-group">
                        <input type="submit" value="Save Post" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
