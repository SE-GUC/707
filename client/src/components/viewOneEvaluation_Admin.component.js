import React, { Component } from "react";
import Cookies from "universal-cookie";
import Table from "react-bootstrap/Table";
import axios from "axios";
export default class viewOnlyEvaluation_Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      evaluationContent: "",
      evaluationType: "",
      passingScore: "",
      totalScore: ""
    };
  }

  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const { evaluation } = this.props.match.params;
    console.log({ evaluation }.evaluation);

    axios
      .get(
        "http://localhost:5000/api/admins/certificate/evaluationTest/" +
          { evaluation }.evaluation,
        {
          headers: {
            Authorization: token
          }
        }
      )
      .then(res => {
        console.log(res.data.data);
        const evaluations = res.data.data;
        this.setState({
          evaluationContent: evaluations.evaluationContent,
          evaluationType: evaluations.evaluationType,
          passingScore: evaluations.passingScore,
          totalScore: evaluations.totalScore
        });
      });
  }
  render() {
    return (
      <ul>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Evaluation Type</th>
              <th>Evaluation Content</th>
              <th>Evaluation Total Score</th>
              <th>Evaluation Passing Score</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{this.state.evaluationType}</td>
              <td> {this.state.evaluationContent}</td>
              <td>{this.state.totalScore}</td>
              <td>{this.state.passingScore}</td>
            </tr>
          </tbody>
        </Table>
      </ul>
    );
  }
}
