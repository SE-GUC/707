import React, { Component } from "react";
import Cookies from "universal-cookie";
export default class logout extends Component {
  render() {
    const cookies = new Cookies();
    cookies.set("token", undefined);
    cookies.set("usertype", undefined);
    window.location.replace("/");
    return <p>You have successfully logged out!</p>;
  }
}
