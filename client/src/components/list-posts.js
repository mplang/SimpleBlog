// Component to handle listing all posts.
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BlogPost = (props) => (
    <tr>
        <td>{props.blogPost.title}</td>
        <td>{props.blogPost.author}</td>
        <td>{props.blogPost.body}</td>
        <td>
            <Link to={`/view/${props.blogPost._id}`}>View</Link>|
            <Link to={`/edit/${props.blogPost._id}`}>Edit</Link>
        </td>
    </tr>
)

export default class ListPosts extends Component {
    constructor(props) {
        super(props);
        this.state = { bposts: [] };
        
        // NB: We could .bind here instead of using arrow functions below.
    }

    componentDidMount = () => {
        axios.get('http://localhost:3131/')
            .then(response => {
                this.setState({ bposts: response.data });
                console.log(this.state.bposts.blogposts);
                console.log(this.state.bposts.blogposts.map((curr, i) => { return i; }));
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    postList = () => {
        // Iterate over each blog post and let the BlogPost component do its thing.
        if (this.state.bposts.length !== 0) {
            return this.state.bposts.blogposts.map((curr, i) => {
                return <BlogPost blogPost={curr} key={i} />;
            })
        }
    }

    render = () => {
        return (
            <div>
                <h3>Blog Posts</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Body</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.postList()}
                    </tbody>
                </table>
            </div>
        )
    }
}
