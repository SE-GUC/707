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
            Authorization: token
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
            this.setState({ reports: res.data.reports });
          if (this.state.searchType === "researches")
            this.setState({researches: res.data.researches });
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
  onSubmit2(id) {

    const cookies = new Cookies();

    const token= cookies.get('token');

    console.log(token)

    axios.get('http://localhost:5000/api/candidates/certificate/'+ id, { headers: {

        Authorization: token}

      })

      .then(res => {

        const Certificate = res.data.data;

        console.log(Certificate);
        this.rerender(token,id);

      })

}
rerender(token,id) {
    axios.get('http://localhost:5000/api/candidates/certificate/'+id, { headers: {

        Authorization: token}

      })


      .then(res => {
        const certificates = [res.data.data];

        this.setState({ certificates });

        console.log(certificates);

      })

  }
  onSubmit3(id) {

    const cookies = new Cookies();

    const token= cookies.get('token');

    console.log(token)

    axios.get('http://localhost:5000/api/admins/project/'+ id, { headers: {

        Authorization: token}

      })

      .then(res => {

        const project = res.data.data;
        this.setState({projects:[project]})
        console.log(project);
        this.rerender2(token,id);

      })

}
rerender2(token,id) {
    axios.get('http://localhost:5000/api/admins/project/'+id, { headers: {

        Authorization: token}

      })


      .then(res => {
        const project = [res.data.data];

        this.setState({ project });

        console.log(project);

      })

  }
  onSubmit4(id){

    const cookies = new Cookies();

    const token= cookies.get('token');

    console.log(token)
      
      axios.get('http://localhost:5000/api/admins/task/'+id, {
        headers: {
          Authorization: token
        }
      })
        .then(res => {
          const task = res.data.data;
          console.log(task);
          this.setState({tasks:[task]});
          console.log(this.state.tasks);
          this.rerender3(token,id);
        })
    }
    rerender3(token,id) {
      axios.get('http://localhost:5000/api/admins/task/'+id, { headers: {
  
          Authorization: token}
  
        })
  
  
        .then(res => {
          const task = [res.data.data];
  
          this.setState({ task });
  
          console.log(task);
  
        })
  
    }
    onSubmit5(id) {

      const cookies = new Cookies();

      const token= cookies.get('token');

      console.log(token)

      axios.get('http://localhost:5000/api/admins/report/'+ id, { headers: {

          Authorization: token}

        })

        .then(res => {
          const reports = res.data.data;
          this.setState({reports:[reports]})
          console.log(reports);
          this.rerender4(token,id);

        })

  }
  rerender4(token,id) {
      axios.get('http://localhost:5000/api/admins/report/'+id, { headers: {

          Authorization: token}

        })


        .then(res => {
          const reports = [res.data.data];

          this.setState({reports});

          console.log(reports);

        })

    }
    onSubmit6(id) {

      const cookies = new Cookies();

      const token= cookies.get('token');

      console.log(token)

      axios.get('http://localhost:5000/api/admins/research/'+ id, { headers: {

          Authorization: token}

        })

        .then(res => {

          const researches = res.data.data;
          this.setState({researches:[researches]})
          console.log(researches);
          this.rerender5(token,id);

        })

  }
  rerender5(token,id) {
      axios.get('http://localhost:5000/api/admins/research/'+id, { headers: {

          Authorization: token}

        })


        .then(res => {
          const researches = [res.data.data];

          this.setState({ researches });

          console.log(researches);

        })

    }
    onSubmit7(email) {

      const cookies = new Cookies();

      const token= cookies.get('token');

      console.log(token)

      axios.get('http://localhost:5000/api/profiles/'+email, { headers: {

          Authorization: token}

        })

        .then(res => {

          const partner = res.data.data;
          console.log(res);
          this.setState({partners:[partner]})
          console.log(partner);
          this.rerender6(token,email);

        })

  }
  rerender6(token,email) {
      axios.get('http://localhost:5000/api/profiles/'+email, { headers: {

          Authorization: token}

        })


        .then(res => {
          const partner = res.data.data;

          this.setState({partners:partner});
          console.log(this.state.partners);

          console.log(partner);

        })

    }
    onSubmit8(email) {

      const cookies = new Cookies();

      const token= cookies.get('token');

      console.log(token)

      axios.get('http://localhost:5000/api/profiles/'+email, { headers: {

          Authorization: token}

        })

        .then(res => {

          const candidate = res.data.data;
          this.setState({candidates:[candidate]})
          console.log(candidate);
          this.rerender7(token,email);

        })

  }
  rerender7(token,email) {
      axios.get('http://localhost:5000/api/profiles/'+email, { headers: {

          Authorization: token}

        })


        .then(res => {
          const candidate = res.data.data;

          this.setState({candidates:candidate});
          

        })

    }
    onSubmit9(email) {

      const cookies = new Cookies();

      const token= cookies.get('token');

      console.log(token)

      axios.get('http://localhost:5000/api/profiles/'+email, { headers: {

          Authorization: token}

        })

        .then(res => {

          const consultancy = res.data.data;
          this.setState({consultancies:[consultancy]})
          console.log(consultancy);
          this.rerender8(token,email);

        })

  }
  rerender8(token,email) {
      axios.get('http://localhost:5000/api/profiles/'+email, { headers: {

          Authorization: token}

        })


        .then(res => {
          const consultancy = res.data.data;

          this.setState({consultancies:consultancy});
          

        })

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
                    <button type="button" className="btn btn-primary" onClick={this.onSubmit2.bind(this, certificate._id)}>view Certificate</button><br></br>  
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
                    <button type="button" className="btn btn-primary" onClick={this.onSubmit3.bind(this, project._id)}>view Project</button><br></br>
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
                 <button type="button" className="btn btn-primary" onClick={this.onSubmit4.bind(this, task._id)}>view Task</button><br></br> 
                  </p>
                </li>
              ))}{" "}
              {this.state.reports.map(report => (
                <li>
                  { console.log(report)}
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
                    <button type="button" className="btn btn-primary" onClick={this.onSubmit5.bind(this, report._id)}>view Report</button><br></br>
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
                    <button type="button" className="btn btn-primary" onClick={this.onSubmit6.bind(this,research._id)}>view Research</button><br></br>
                  </p>
                </li>
              ))}{" "}
              {this.state.partners.map(partner => (
                <li>
                  {console.log(partner)}
                  {console.log(partner.name)}
                  <p>
                    Partner Name:{partner.name}
                    <br />
                    Partner Email: {partner.email}
                    <br />
                    <button type="button" className="btn btn-primary" onClick={this.onSubmit7.bind(this,partner.email)}>view Partner</button><br></br>
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
                    <button type="button" className="btn btn-primary" onClick={this.onSubmit8.bind(this,candidate.email)}>view Candidate</button><br></br>
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
                    <button type="button" className="btn btn-primary" onClick={this.onSubmit9.bind(this,consultancy.email)}>view Consultancy</button><br></br>
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
