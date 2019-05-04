import React, { Component } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
export default class getcertificatebyID_cand extends Component {
  state = {
    certificates: []
  };

  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .get("http://localhost:5000/api/candidates/certificates", {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        const certificates = res.data.data;
        this.setState({ certificates });
      });
  }
  onSubmit(id) {
    const cookies = new Cookies();

    const token = cookies.get("token");

    console.log(token);

    axios
      .get("http://localhost:5000/api/candidates/certificate/" + id, {
        headers: {
          Authorization: token
        }
      })

      .then(res => {
        const certificates = res.data.data;
        this.setState({ certificates: [certificates] });
        console.log(certificates);
        this.rerender(token, id);
      });
  }

  onSubmit2(id1, id) {
    window.location.replace("/takeEval/" + id1 + "/" + id);
  }

  rerender(token, id) {
    axios
      .get("http://localhost:5000/api/candidates/certificate/" + id, {
        headers: {
          Authorization: token
        }
      })

      .then(res => {
        const certificates = [res.data.data];

        this.setState({ certificates });

        console.log(certificates);
      });
  }
  render() {
    return (
      <ul>
        {this.state.certificates.map(person => (
          <li>
            <p>
              Certificate name: {person.name}
              <br />
              certificate description: {String(person.description)}
              <br />
              Certificate category: {String(person.category)}
              <br />
              Certificate Skills:
              {person.skills.map(skill => (
                <p>skill:{skill}</p>
              ))}
              <br />
              certificate available: {String(person.available)}
              <br />
              <button
                type="button"
                className="btn btn-success"
                onClick={this.onSubmit.bind(this, person._id)}
              >
                Get certificate
              </button>
              <br />
              certificate evaluationTests:{" "}
              {person.evaluationTests.map(evaluationTest => (
                <p>
                  evaluation type: {evaluationTest.type},<br />
                  evaluation content:{evaluationTest.content}
                  <br />
                  <div className="form-group">
                    <input
                      type="submit"
                      value="take evaluation"
                      className="btn btn-primary"
                      onClick={this.onSubmit2.bind(
                        this,
                        person._id,
                        evaluationTest._id
                      )}
                    />
                  </div>
                </p>
              ))}
              <br />
            </p>{" "}
          </li>
        ))}
      </ul>
    );
  }
}
