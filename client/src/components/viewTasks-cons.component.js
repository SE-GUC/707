import React, { Component } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
export default class viewAllTasks extends Component {
  state = {
    Tasks: []
  };

  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .get("http://localhost:5000/api/consultancies/Tasks", {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        const Tasks = res.data.data;
        this.setState({ Tasks });
      });
  }

  render() {
    return (
      <ul>
        {this.state.Tasks.map(person => (
          <li>
            <p>
              Task name: {person.name}
              <br />
              Task description: {person.description}
              <br />
              Task type: {person.type}
              <br />
              Task deadline: {String(person.deadline)}
              <br />
              Task hours: {String(person.hours)}
              <br />
              Task minimum credit hours: {String(person.minCreditsHour)}
              <br />
              Task maximum credit hours: {String(person.maxCreditsHour)}
              <br />
              Task Chosen Credit Hour: {String(person.chosenCreditHour)}
              <br />
              Task Credits Penalty: {String(person.creditsPenalty)}
              <br />
              Task required years of experience:{" "}
              {String(person.yearsOfExperience)}
              <br />
              Task Contract signed: {String(person.contractSigned)}
              <br />
              Task status: {String(person.status)}
              <br />
            </p>{" "}
          </li>
        ))}
      </ul>
    );
  }
}
