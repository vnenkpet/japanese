import React, { Component } from "react";
import "./App.css";
import Dictionary from "./containers/dictionary";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Dictionary />
      </div>
    );
  }
}

export default App;
