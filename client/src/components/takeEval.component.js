import axios from "axios";
import React, { Component } from "react";
import Cookies from "universal-cookie";
export default class takeEval extends Component {
  constructor(props) {
    super(props);
    this.state = {
      evaluations: [],
      answer: ""
    };
  }

  answerchanged = e => {
    if (e.target.value === "") {
    } else {
      this.setState({
        answer: e.target.value
      });
    }
  };

  emailchanged = e => {
    this.setState({
      answer: e.target.value
    });
  };
  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const { evaluation } = this.props.match.params;
    axios
      .get(
        "http://localhost:5000/api/candidates/certificate/evaluationTest/" +
          { evaluation }.evaluation,
        {
          headers: {
            Authorization: token
          }
        }
      )
      .then(res => {
        console.log(res.data.data);
        this.setState({ evaluations: [res.data.data] });
        console.log(this.state);
      });
  }

  submitEval(id) {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const { evaluation } = this.props.match.params;
    const { certificate } = this.props.match.params;
    var answer = {
      answer: this.state.answer
    };
    axios
      .post(
        "http://localhost:5000/api/candidates/certificate/evaluationTests/" +
          { certificate }.certificate +
          "/" +
          { evaluation }.evaluation,
        answer,
        {
          headers: {
            Authorization: token
          }
        }
      )
      .then(res => alert(res.data.msg));
  }

  render() {
    return (
      <ul>
        {this.state.evaluations.map(evaluation => (
          <li>
            <p>
              evaluation content: {evaluation.content}
              <br />
              <div className="form-group">
                <label>Evaluation Answer: </label>
                <input
                  type="text"
                  className="content-editable"
                  value={this.state.answer}
                  onChange={e => this.emailchanged(e)}
                />
              </div>
            </p>
            <br />
            <button
              type="button"
              className="btn btn-success"
              onClick={this.submitEval.bind(this, evaluation._id)}
            >
              Submit Evaluation
            </button>
            <br />
          </li>
        ))}
      </ul>
    );
  }
}