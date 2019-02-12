import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import ListPosts from "./components/list-posts";
import AddPost from "./components/add-post";
import EditPost from "./components/edit-post";
import ViewPost from "./components/view-post";

import logo from "./logo.png";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="http://michaelmadethis.com" target="_blank" rel="noreferrer noopener">
              <img src={logo} width="75" height="75" alt="Michael Made This" />
            </a>
            <Link to="/" className="navbar-brand">Simple Blog Demo App</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">List Posts</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/new" className="nav-link">New Post</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={ListPosts} />
          <Route path="/edit/:id" component={EditPost} />
          <Route path="/new" component={AddPost} />
          <Route path="/view/:id" component={ViewPost} />
        </div>
      </Router>
    );
  }
}

export default App;
