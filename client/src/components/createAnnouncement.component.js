import React, { Component } from "react";
import Cookies from 'universal-cookie';
import axios from "axios";
export default class createAnnouncement extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      title: "",
      content: "",
      type: ""
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
  onChangeType(e) {
    this.setState({
      type: e.target.value
    });
  }
  onSubmit(e) {
    const cookies= new Cookies();
         const token= cookies.get('token');
    e.preventDefault();
    console.log(`Form submitted:`);
    console.log(`Title: ${this.state.title}`);
    console.log(`Type: ${this.state.type}`);
    console.log(`Content: ${this.state.content}`);
    const announc = {
      title: this.state.title,
      type: this.state.type,
      content: this.state.content
      //todo_completed: this.state.todo_completed
    };
    console.log(announc);
    axios.post(
        "http://localhost:5000/api/admins/announcement",announc,{  headers: { Authorization: token}}
      )
      .then(res => alert("Created Successfully!"));

    this.setState({
      title: "",
      type: "",
      content: ""
    });
  }
  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Create New Announcement</h3>
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
            <label>Type: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.type}
              onChange={this.onChangeType}
            />
          </div>
          <div className="form-group">
            <label>Content: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.content}
              onChange={this.onChangeContent}
            />
          </div>
          
          <div className="form-group">
            <input
              type="submit"
              value="Create Announcement"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
