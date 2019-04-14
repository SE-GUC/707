import axios from "axios";
import React, { Component } from "react";
import Cookies from "universal-cookie";
export default class search extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchText = this.onChangeSearchText.bind(this);
    this.onChangeSearchType = this.onChangeSearchType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      text: "",
      searchType: "",
      certificates: [],
      projects: [],
      tasks: [],
      reports: [],
      researches: [],
      partners: [],
      consultancies: [],
      candidates: []
    };
  }
  onChangeSearchText(e) {
    this.setState({ text: e.target.value });
  }
  onChangeSearchType(e) {
    this.setState({
      searchType: e.target.value
    });
  }
  async onSubmit(e) {
    e.preventDefault();
    const cookies = new Cookies();
    const token = cookies.get("token");
    await axios
      .post(
        "http://localhost:5000/api/searches/" + this.state.searchType,
        { text: this.state.text },
        {
          headers: {
            Authorization: token.data
          }
        }
      )
      .then(res => {
        if (this.state.searchType) {
          if (this.state.searchType === "certificates")
            this.setState({ certificates: res.data.certificates });
          if (this.state.searchType === "projects")
            this.setState({ projects: res.data.projects });
          if (this.state.searchType === "tasks")
            this.setState({ tasks: res.data.tasks });
          if (this.state.searchType === "reports")
            this.setState({ tasks: res.data.reports });
          if (this.state.searchType === "researches")
            this.setState({ tasks: res.data.researches });
          if (this.state.searchType === "partners")
            this.setState({ partners: res.data.partners });
          if (this.state.searchType === "consultancies")
            this.setState({ consultancies: res.data.consultancies });
          if (this.state.searchType === "candidates")
            this.setState({ candidates: res.data.candidates });
        } else {
          this.setState({ certificates: res.data.certificates });
          this.setState({ projects: res.data.projects });
          this.setState({ tasks: res.data.tasks });
          this.setState({ reports: res.data.reports });
          this.setState({ researches: res.data.researches });
          this.setState({ partners: res.data.partners });
          this.setState({ consultancies: res.data.consultancies });
          this.setState({ candidates: res.data.candidates });
        }
      });
  }
  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Search</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="content-control"
              placeholder="if left empty searches all"
              value={this.state.text}
              onChange={this.onChangeSearchText}
            />
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="certificates"
                value="certificates"
                checked={this.state.searchType === "certificates"}
                onChange={this.onChangeSearchType}
              />
              <label className="form-check-label">certificates</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="projects"
                value="projects"
                checked={this.state.searchType === "projects"}
                onChange={this.onChangeSearchType}
              />
              <label className="form-check-label">projects</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="tasks"
                value="tasks"
                checked={this.state.searchType === "tasks"}
                onChange={this.onChangeSearchType}
              />
              <label className="form-check-label">tasks</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="reports"
                value="reports"
                checked={this.state.searchType === "reports"}
                onChange={this.onChangeSearchType}
              />
              <label className="form-check-label">reports</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="researches"
                value="researches"
                checked={this.state.searchType === "researches"}
                onChange={this.onChangeSearchType}
              />
              <label className="form-check-label">researches</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="partners"
                value="partners"
                checked={this.state.searchType === "partners"}
                onChange={this.onChangeSearchType}
              />
              <label className="form-check-label">partners</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="consultancies"
                value="consultancies"
                checked={this.state.searchType === "consultancies"}
                onChange={this.onChangeSearchType}
              />
              <label className="form-check-label">consultancies</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="candidates"
                value="candidates"
                checked={this.state.searchType === "candidates"}
                onChange={this.onChangeSearchType}
              />
              <label className="form-check-label">candidates</label>
            </div>
            <div className="form-group">
              <input type="submit" value="Search" className="btn btn-primary" />
            </div>
            <ul>
              {this.state.certificates.map(certificate => (
                <li>
                  <p>
                    Certificate Name: {certificate.name}
                    <br />
                    Certificate Description: {certificate.description}
                    <br />
                    Certificate Category: {certificate.category}
                    <br />
                    Certificate Skills:
                    {certificate.skills.map(skills => {
                      return skills;
                    })}
                    <br />
                    Certificate Availabe: {certificate.available}
                    <br />
                  </p>
                </li>
              ))}{" "}
              {this.state.projects.map(project => (
                <li>
                  <p>
                    Project Name: {project.name}
                    <br />
                    Project Description: {project.description}
                    <br />
                    Project Type: {project.type}
                    <br />
                    Project Required Skills:
                    {project.requiredSkills.map(requiredSkills => {
                      return requiredSkills;
                    })}
                    <br />
                    Project needs years of experience:{" "}
                    {project.yearsOfExperience}
                    <br />
                  </p>
                </li>
              ))}{" "}
              {this.state.tasks.map(task => (
                <li>
                  <p>
                    Task Name: {task.name}
                    <br />
                    Task Description: {task.description}
                    <br />
                    Task Type: {task.type}
                    <br />
                    Task Required Skills:
                    {task.requiredSkills.map(requiredSkill => {
                      return " " + requiredSkill + " ";
                    })}
                    <br />
                    Task needs years of experience: {task.yearsOfExperience}
                    <br />
                  </p>
                </li>
              ))}{" "}
              {this.state.reports.map(report => (
                <li>
                  <p>
                    Report Title: {report.title}
                    <br />
                    Task Content: {report.content}
                    <br />
                    Report Hashtags:
                    {report.interests.map(interests => {
                      return interests;
                    })}
                    <br />
                  </p>
                </li>
              ))}{" "}
              {this.state.researches.map(research => (
                <li>
                  <p>
                    Research Title: {research.title}
                    <br />
                    Research Content: {research.content}
                    <br />
                    Research Hashtags:
                    {research.interests.map(interests => {
                      return interests;
                    })}
                    <br />
                  </p>
                </li>
              ))}{" "}
              {this.state.partners.map(partner => (
                <li>
                  <p>
                    Partner Name: {partner.name}
                    <br />
                    Partner Email: {partner.email}
                    <br />
                  </p>
                </li>
              ))}{" "}
              {this.state.candidates.map(candidate => (
                <li>
                  <p>
                    Candidate Name: {candidate.name}
                    <br />
                    Candidate Email: {candidate.email}
                    <br />
                  </p>
                </li>
              ))}{" "}
              {this.state.consultancies.map(consultancy => (
                <li>
                  <p>
                    Consultancy Name: {consultancy.name}
                    <br />
                    Consultancy Email: {consultancy.email}
                    <br />
                  </p>
                </li>
              ))}{" "}
            </ul>
          </div>
        </form>
      </div>
    );
  }
}
