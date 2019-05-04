import React, { Component } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
export default class getResearchbyID_Admin extends Component {
  state = {
    researches: []
  };

  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .get("http://localhost:5000/api/admins/researches", {
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

    console.log(token);

    axios
      .get("http://localhost:5000/api/admins/research/" + id, {
        headers: {
          Authorization: token
        }
      })

      .then(res => {
        const researches = res.data.data;
        this.setState({ researches: [researches] });
        console.log(researches);
        this.rerender(token, id);
      });
  }
  rerender(token, id) {
    axios
      .get("http://localhost:5000/api/admins/research/" + id, {
        headers: {
          Authorization: token
        }
      })

      .then(res => {
        const researches = [res.data.data];

        this.setState({ researches });

        console.log(researches);
      });
  }
  render() {
    return (
      <ul>
        {this.state.researches.map(person => (
          <li>
            <p>
              Research title: {person.title}
              <br />
              Research interests: {person.interests}
              <br />
              Research Content: {person.content}
              <br />
              <button
                type="button"
                className="btn btn-success"
                onClick={this.onSubmit.bind(this, person._id)}
              >
                Get Research
              </button>
              <br />
            </p>{" "}
          </li>
        ))}
      </ul>
    );
  }
}
