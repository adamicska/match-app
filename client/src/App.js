import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./routing/PrivateRoute";

import Navigation from "./components/Navigation/Navigation";
import Home from "./pages/index";
import Login from "./auth/login";
import Register from "./auth/register";
import Profile from "./pages/profile";
import Players from "./pages/players";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import { LOGOUT } from "./actions/types";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import ProfileEdit from "./components/profile/ProfileEdit";

const App = () => {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navigation />
          <Switch>
            <Route exact path="/" exact component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute
              exact
              path="/create-profile"
              component={ProfileEdit}
            />
            <PrivateRoute exact path="/profile-edit" component={ProfileEdit} />
            <Route path="/players" component={Players} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
