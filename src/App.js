import React, { useContext } from "react";
import "./App.css";
import Signup from "./SignUp/Signup";
import Login from "./Login/Login/Login";
import HomeScreen from "./HomeScreen";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import explore from "./Explore tab/Explore";
import { AuthContext } from "./FireBaseContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="app">
      <Router>
        <Route path="/signup">
          <Signup></Signup>
        </Route>

        <Route exact path="/">
          {" "}
          <HomeScreen />
        </Route>
        {user ? (
          <Redirect to="/" path="/twitter"></Redirect>
        ) : (
          <Redirect to="/signup" path="/twitter"></Redirect>
        )}

        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="/explore" component={explore} />
      </Router>{" "}
    </div>
  );
}

export default App;
