import React from "react";
import "./App.css";
import Login from "./Components/Login";
import { Route } from "react-router-dom";
import ResultList from "./Components/ResultList";

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Login />
      </Route>
      <Route exact path="/result-list">
        <ResultList />
      </Route>
    </div>
  );
}

export default App;
