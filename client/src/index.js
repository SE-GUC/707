import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import "assets/scss/material-kit-react.scss?v=1.4.0";
import "bootstrap/dist/css/bootstrap.min.css";
//Pages for this product
import LandingPage from "views/LandingPage/LandingPage.jsx";
import ProfilePage from "views/ProfilePage/ProfilePage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import RegisterPage from "views/RegisterPage/RegisterPage.jsx";
//Old website
//import OldWebsite from "./OldWebsite.js";
var hist = createBrowserHistory();
ReactDOM.render(
  <Router history={hist}>
    <Switch>
      (//General pages)
      <Route path="/profile-page" component={ProfilePage} />
      <Route path="/login-page" component={LoginPage} />
      <Route path="/register-page" component={RegisterPage} />
      {/* <Route path="/old-website" component={OldWebsite} /> */}
      <Route path="/" component={LandingPage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
