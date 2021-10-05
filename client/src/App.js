import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navigation from "./components/Navigation/Navigation";
import Home from "./pages/index";
import Login from "./auth/login";
import Register from "./auth/register";
import Profile from "./pages/profile";
import Players from "./pages/players";
// Redux
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navigation />
          <Switch>
            <Route exact path="/" exact component={Home} />
            <Route exact path="/login/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route path="/profile" component={Profile} />
            <Route path="/players" component={Players} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
