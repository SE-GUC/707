import axios from "axios";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Research from "./research.component.js";
import Cookies from "universal-cookie";
export default class candidateresearches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      researches: []
    };
  }
  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .get("http://localhost:5000/api/candidates/researches", {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        const researches = res.data.data;
        this.setState({ researches });
      });
  }
  onSubmit(id) {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .get("http://localhost:5000/api/candidates/research/" + id, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        const research = res.data.data;
        ReactDOM.render(
          <Research research={research} />,
          document.getElementById("root")
        );
      });
  }
  render() {
    return (
      <ul>
        {this.state.researches.map(research => (
          <li>
            <p>
              Research Title: {research.title}
              <br />
              <br />
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.onSubmit.bind(this, research._id)}
              >
                View
              </button>
            </p>
          </li>
        ))}
      </ul>
    );
  }
}
