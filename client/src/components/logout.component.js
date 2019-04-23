import React, { Component } from "react";
import Cookies from "universal-cookie";
export default class logout extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const cookies = new Cookies();
    cookies.set("token", null);
    cookies.set("usertype", null);
    window.location.replace("/")   
    return (<p> 
     You have successfully logged out!
    </p>)
  }
}
