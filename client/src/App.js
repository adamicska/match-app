import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navigation from "./components/Navigation/Navigation";
import Home from "./pages/index";
import Login from "./pages/login";
import Register from "./pages/register";
import Profile from "./pages/profile";
import Players from "./pages/players";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      route: "home",
      isLoggedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        thumbnail: "",
      },
    };
  }

  // onRouteChange = (route) => {
  //   if (route === "signout") {
  //     this.setState({ isSignedIn: false });
  //   } else if (route === "home") {
  //     this.setState({ isSignedIn: true });
  //   }
  //   this.setState({ route: route });
  // };

  componentDidMount() {
    fetch("http://localhost:4000")
      .then((response) => response.json())
      .then(console.log);
  }

  render() {
    const { isSignedIn, route } = this.state;
    return (
      <Router>
        <div className="App">
          <Navigation />
          <Switch>
            <Route exact path="/" exact component={Home} />
            <Route path="/login/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/profile" component={Profile} />
            <Route path="/players" component={Players} />
          </Switch>
        </div>
      </Router>
      // <div className="App">
      //   <Navigation
      //     isSignedIn={isSignedIn}
      //     onRouteChange={this.onRouteChange}
      //   />
      //   {route === "home" ? (
      //     <Home />
      //   ) : route === "login" ? (
      //     <Login loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
      //   ) : (
      //     <Register
      //       loadUser={this.loadUser}
      //       onRouteChange={this.onRouteChange}
      //     />
      //   )}
      // </div>
    );
  }
}

export default App;
