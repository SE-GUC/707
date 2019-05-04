import React, { Component } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
export default class gettaskbyID_cand extends Component {
  state = {
    tasks: []
  };

  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .get("http://localhost:5000/api/candidates/tasks", {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        const tasks = res.data.data;
        this.setState({ tasks });
      });
  }
  onSubmit(id) {
    const cookies = new Cookies();

    const token = cookies.get("token");

    console.log(token);

    axios
      .get("http://localhost:5000/api/candidates/task/" + id, {
        headers: {
          Authorization: token
        }
      })

      .then(res => {
        const tasks = res.data.data;
        this.setState({ tasks: [tasks] });
        console.log(tasks);
        this.rerender(token, id);
      });
  }
  rerender(token, id) {
    axios
      .get("http://localhost:5000/api/consultancies/task/" + id, {
        headers: {
          Authorization: token
        }
      })

      .then(res => {
        const tasks = [res.data.data];

        this.setState({ tasks });

        console.log(tasks);
      });
  }
  render() {
    return (
      <ul>
        {this.state.tasks.map(person => (
          <li>
            <p>
              task name: {person.name}
              <br />
              task name: {person.name}
              <br />
              task description: {person.description}
              <br />
              task type: {person.type}
              <br />
              task deadline: {String(person.deadline)}
              <br />
              task hours: {String(person.hours)}
              <br />
              task minimum credit hours: {String(person.minCreditsHour)}
              <br />
              task maximum credit hours: {String(person.maxCreditsHour)}
              <br />
              task Chosen Credit Hour: {String(person.chosenCreditHour)}
              <br />
              task Credits Penalty: {String(person.creditsPenalty)}
              <br />
              task required years of experience:{" "}
              {String(person.yearsOfExperience)}
              <br />
              task Contract signed: {String(person.contractSigned)}
              <br />
              task status: {String(person.status)}
              <br />
              task requiredSkills:{" "}
              {person.requiredSkills.map(requiredSkill => (
                <p>requiredSkill: {requiredSkill}</p>
              ))}
              <br />
              <button
                type="button"
                className="btn btn-success"
                onClick={this.onSubmit.bind(this, person._id)}
              >
                Get task
              </button>
              <br />
            </p>{" "}
          </li>
        ))}
      </ul>
    );
  }
}
