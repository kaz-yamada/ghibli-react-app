import React, { Component } from "react";

export default class Home extends Component {
  render() {
    return (
      <div>
        <p>
          Created using{" "}
          <a href="https://github.com/facebook/create-react-app">
            create-react-app
          </a>
          , <a href="https://reactstrap.github.io/">Reactstrap</a> and the{" "}
          <a href="https://ghibliapi.herokuapp.com/">Studio Ghibli API</a> this
          displays a list of films, characters, vechicles, species, and
          locations that appear in Studio Ghibli's many films. Navigate through
          the categories using the links above
        </p>
      </div>
    );
  }
}
