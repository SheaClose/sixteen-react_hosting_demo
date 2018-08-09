import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import routes from "./routes";

class App extends Component {
  render() {
    console.log(process.env);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "white"
            }}
          >
            <Link style={{ color: "white" }} to="/">
              Home
            </Link>
            <Link style={{ color: "white" }} to="/todos">
              Todos
            </Link>
            <Link style={{ color: "white" }} to="/edit_todos">
              Edit Todo
            </Link>
          </div>
        </header>
        {routes}
      </div>
    );
  }
}

export default App;
