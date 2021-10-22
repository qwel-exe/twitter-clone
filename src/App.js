import React from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import explore from "./Explore tab/Explore"

function App() {
  return (
    // BEM
    <div className="app">     
      <BrowserRouter>
        <Sidebar/>
        <Route path="/" exact component={Feed}/>
        <Route path="/explore" exact component={explore}/>
      </BrowserRouter>  
    </div>
  );
}

export default App;
