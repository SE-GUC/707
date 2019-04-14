import React, { Component } from "react";
import Cookies from "universal-cookie";
const axios = require("axios");
export default class consultancyupdateskills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Skills:[]
    };
  }
  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .get("http://localhost:5000/api/consultancies/acquiredCertificates/skills", {
        headers: {
          Authorization: token
        }
      })
      .then(res =>
        this.setState({
          Skills:res.data.data
        })
      );
    }
    render() {

            return (
      <ul>
          {this.state.Skills.map(requiredSkills => {
                return <li>{requiredSkills}</li>
              })}</ul>
            )}}