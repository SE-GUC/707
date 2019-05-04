import React, { Component } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
export default class createReport extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeInterests = this.onChangeInterests.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      temp: "",
      title: "",
      interests: [],
      content: ""
      //   todo_completed: false
    };
  }
  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }
  onChangeContent(e) {
    this.setState({
      content: e.target.value
    });
  }
  onChangeInterests(e) {
    this.setState({
      temp: e.target.value
    });
  }
  onSubmit(e) {
    const cookies = new Cookies();
    const token = cookies.get("token");
    e.preventDefault();
    console.log(`Form submitted:`);
    console.log(`Title: ${this.state.title}`);
    console.log(`Interests: ${this.state.interests}`);
    console.log(`Content: ${this.state.content}`);
    const announc = {
      title: this.state.title,
      interests: this.state.temp.split(","),
      Content: this.state.content
      //todo_completed: this.state.todo_completed
    };
    console.log(announc);
    axios
      .post("http://localhost:5000/api/consultancies/report", announc, {
        headers: { Authorization: token }
      })
      .then(res => console.log(res.data));
    this.setState({
      title: "",
      interests: [],
      Content: "",
      temp: ""
    });
  }
  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Create New Report</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
            />
          </div>
          <div className="form-group">
            <label>Interests: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.temp}
              onChange={this.onChangeInterests}
            />
          </div>
          <div className="form-group">
            <label>Content: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.Content}
              onChange={this.onChangeContent}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Report"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
