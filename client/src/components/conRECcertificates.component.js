import React, { Component } from "react";
import Cookies from "universal-cookie";
import Table from "react-bootstrap/Table";
import axios from "axios";

export default class getallcertificateRecConsultancy extends Component {
  state = {
    certificates: [],
    evaluations: []
  };
  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .get("http://localhost:5000/api/consultancies/recommendedCertificates", {
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
      .get("http://localhost:5000/api/consultancies/certificate/" + id, {
        headers: {
          Authorization: token
        }
      })

      .then(res => {
        const Certificate = res.data.data;

        console.log(Certificate);
        this.rerender(token, id);
      });
  }
  onSubmit2(id) {
    console.log(id);
    const cookies = new Cookies();

    const token = cookies.get("token");

    console.log(token);

    axios
      .post(
        "http://localhost:5000/api/consultancies/certificate/" + id,
        {},
        {
          headers: {
            Authorization: token
          }
        }
      )

      .then(res => alert("You applied successfully for this certificate"))
      .catch(err => console.log(err));
  }
  rerender(token, id) {
    axios
      .get("http://localhost:5000/api/consultancies/certificate/" + id, {
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
  requestCertificate(e) {
    e.preventDefault();
    window.location.replace("/consultancyrequestcertificate");
  }

  render() {
    return (
      <ul>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Certificate Name</th>
              <th>Certificate Description</th>
              <th>Certificate Category</th>
              <th>Certificate Skills</th>
              <th>Certificate available</th>
              <th>Evaluations</th>
              <th>View</th>
              <th>Apply</th>
            </tr>
          </thead>
          {this.state.certificates.map(person => (
            <tbody>
              <tr>
                <th>
                  {person.name}
                  <br />
                </th>
                <th>
                  {person.description}
                  <br />
                </th>
                <th>
                  {person.category}
                  <br />
                </th>
                <th>
                  {person.skills.map(skill => (
                    <p>skill:{skill}</p>
                  ))}
                  <br />
                </th>
                <th>
                  {String(person.available)}
                  <br />
                </th>
                <th>
                  {person.evaluationTests.map(evaluation => (
                    <p>
                      Evaluation Content:{evaluation.evaluationContent}
                      <br />
                      Total Score: {evaluation.totalScore}
                      <br />
                      evaluationType:{evaluation.evaluationType}
                      <br />
                      Passing Score: {evaluation.passingScore}
                      <br />
                      Candidate Score: {evaluation.score}
                      <br />
                      Passed: {String(evaluation.passed)}
                      <br />
                    </p>
                  ))}
                </th>

                <th>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={this.onSubmit.bind(this, person._id)}
                  >
                    view Certificate
                  </button>
                  <br />
                </th>

                <th>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={this.onSubmit2.bind(this, person._id)}
                  >
                    Apply on Certificate
                  </button>
                  <br />
                </th>
              </tr>
              <tr />
            </tbody>
          ))}
        </Table>
        <br />
        <br />
        <button
          type="button"
          className="btn btn-danger"
          onClick={this.requestCertificate.bind(this)}
        >
          Request New Certificate
        </button>
        <br />
      </ul>
    );
  }
}
