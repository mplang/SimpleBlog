// Component to handle adding new posts.
import React, { Component } from 'react';
import axios from 'axios';

export default class AddPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            author: '',
            body: '',
        }

        // NB: We could .bind here instead of using arrow functions below.
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

        const newPost = {
            title: this.state.title,
            author: this.state.author,
            body: this.state.body
        };

        await axios.post('http://localhost:3131/new', newPost)
            .then(res => console.log(res.data));

        // Reset the form
        this.setState({
            post_title: '',
            post_author: '',
            post_body: ''
        })

        this.props.history.push('/');   // navigate to home
    }

    // JSX for the form itself
    render = () => {
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Add New Post</h3>
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
                    <div className="form-group">
                        <label>Body: </label>
                        <textarea
                            rows="10"
                            className="form-control"
                            value={this.state.body}
                            onChange={this.onChangePostBody}
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Post" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}