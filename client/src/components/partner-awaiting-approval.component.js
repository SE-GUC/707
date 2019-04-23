import axios from "axios";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import Cookies from "universal-cookie";
import PartnerTasks from "./admin-tasks.component.js";
import AddTask from "./add-task.component.js";

export default class projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingProjects: []
    };
  }
  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .get("http://localhost:5000/api/partners/pendingProjects", {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        const pendingProjects = res.data.data;
        this.setState({ pendingProjects });
      });
  }
  

  addTask(projectID){
    ReactDOM.render(
      <AddTask projectID={projectID} />,
      document.getElementById("root")
    );
  }
  delete(id) {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .delete("http://localhost:5000/api/partners/project/" + id, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        if(res.data.msg==='This project has been deleted successfully'){      
          alert('Deleted Successfully!');
        }

      }).then(res => {
        axios.put('http://localhost:5000/api/partners/update/projects',{},{
            headers: {
                Authorization: token
            }
        }).catch(error=>{ alert('Project cannot be deleted!')});
    window.location.reload();
    })}
      getmethod(Projectid) {

        const cookies = new Cookies();
    
        const token= cookies.get('token');
    
        console.log(token)
    
        axios.get('http://localhost:5000/api/partners/project/'+ Projectid, { headers: {
    
            Authorization: token}
    
          })
    
          .then(res => {
            const projects = res.data.data;
            this.setState({pendingProjects:[projects]})
            console.log(projects);
            this.rerender2(token,Projectid);
    
          })
    
    }
    
rerender2(token,Projectid) {
  axios.get('http://localhost:5000/api/partners/project/'+Projectid, { headers: {

      Authorization: token}

    })


    .then(res => {
      const projects = [res.data.data];
      this.setState({ projects });

    })

}
    rerender(token) {
      axios
        .get("http://localhost:5000/api/partners/pendingProjects", {
          headers: {
            Authorization: token
          }
        })
        .then(res => {
          const pendingProjects = res.data.data;
          this.setState({ pendingProjects });
        });
    }
    showtasks = id => {
      window.location.replace("/partnershowAwaitingtasks/"+id)
    };
     
     update(token){
       axios
         .put("http://localhost:5000/api/partners/update/projects",{
         headers:{
           Authorization: token
         }
       })
       .then(res => {
         if(res.data.msg==='all projects are updated'){
              alert('updated successfully!')
         }
       });
     }
  
  render() {
    return (
      <Router>
        <ul>
          {this.state.pendingProjects.map(project => (
            <li>
              <p>
                Name: {project.name}
                <br />
                Description: {project.description}
                <br />
                Type: {project.type}
                <br />
                Deadline: {project.deadline}
                <br />
                Hours: {project.hours}
                <br />
                Min Credits/Hr: {project.minCreditsHour}
                <br />
                Max Credits/Hr: {project.maxCreditsHour}
                <br />
                Chosen Credit Hour: {project.chosenCreditHour}
                <br />
                Penalty: {project.creditsPenalty}
                <br />
                Years of Experience: {project.yearsOfExperience}
                <br />
                Contract Signed: {project.contractSigned}
                <br />
                Required Skills:{" "}
                {project.requiredSkills.map(requiredSkills => (
                  <li>{requiredSkills}</li>
                ))}
                <br />
                Status: {project.status} <br />
                Life Cycle:
                {project.projectcycle.map(cycle => (
                  <li>
                    Description: {cycle.description}
                    <br />
                    Status: {cycle.status}
                    <br />
                    Percentage: {cycle.percentage}
                  </li>
                 ) )}
                <br />
              
                <div className="form-group">
                        <input type="submit" value="Add Task" className="btn btn-primary" onClick={this.addTask.bind(this,project._id)}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Get Project" className="btn btn-primary" onClick={this.getmethod.bind(this,project._id)}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Delete" className="btn btn-primary" onClick={this.delete.bind(this,project._id)}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Show Tasks" className="btn btn-primary" onClick={this.showtasks.bind(this,project._id)}/>
                    </div>

                    
                <br />
                
              </p>
            </li>
          ))}
        </ul>
      </Router>
    );
  }
}
