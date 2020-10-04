import React from "react";
import "./App.css";
import Login from "./Components/Login";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route>
        <Login />
      </Route>
    </div>
  );
}

export default App;
