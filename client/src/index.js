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
//AdminWorkflow pages for this product
import AdminWorkflowCertificates from "views/ProfilePage/AdminWorkflow/certificate.component.js";
import AdminWorkflowEvaluations from "views/ProfilePage/AdminWorkflow/evaluation.component.js";
var hist = createBrowserHistory();
ReactDOM.render(
  <Router history={hist}>
    <Switch>
      (//AdminWorkflow Pages)
      <Route
        path="/AdminWorkflow/Certificates"
        component={AdminWorkflowCertificates}
      />
      <Route
        path="/AdminWorkflow/Evaluations/:evaluation"
        component={AdminWorkflowEvaluations}
      />
      (//General pages)
      <Route path="/profile-page" component={ProfilePage} />
      <Route path="/login-page" component={LoginPage} />
      <Route path="/register-page" component={RegisterPage} />
      <Route path="/" component={LandingPage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
