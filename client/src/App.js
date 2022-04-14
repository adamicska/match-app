import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import PrivateRoute from "./routing/PrivateRoute";

import Navigation from "./components/Navigation/Navigation";
import Home from "./pages/index";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Profile from "./components/profile/Profile";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import { LOGOUT } from "./actions/types";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import ProfileEdit from "./components/profile/ProfileEdit";
import Profiles from "./components/profile/Profiles";
import PostForm from "./components/post/PostForm";
import Post from "./components/post/Post";
import Posts from "./components/post/Posts";
import Friends from "./components/profile/Friends";
import Footer from "./components/Navigation/Footer";
import Dashboard from "./components/profile/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import Chat from "./components/chat/Chat";

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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route
              path="/dashboard"
              element={<PrivateRoute component={Dashboard} />}
            />
            <Route path="/profile-edit" element={<ProfileEdit />} />
            <Route path="/players" element={<Profiles />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/post-form" element={<PostForm />} />
            <Route path="/feed" element={<Posts />} />
            <Route path="/posts/:id" element={<Post />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
