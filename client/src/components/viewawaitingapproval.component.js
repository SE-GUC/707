import axios from "axios";
import React, { Component } from "react";
import Cookies from "universal-cookie";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export default class adminShowAwaitingProjects extends Component {
    constructor(props) {
        super(props);
        this.onChangeTaskName = this.onChangeTaskName.bind(this);
        this.onChangeTaskDescription = this.onChangeTaskDescription.bind(this);
        this.onChangeTaskType = this.onChangeTaskType.bind(this);
        this.onChangeTaskDeadline = this.onChangeTaskDeadline.bind(this);
        this.onChangeTaskHours = this.onChangeTaskHours.bind(this);
        this.onChangeTaskMinCreditHours = this.onChangeTaskMinCreditHours.bind(this);
        this.onChangeTaskMaxCreditHours = this.onChangeTaskMaxCreditHours.bind(this);
        this.onChangeTaskChosenCreditHour = this.onChangeTaskChosenCreditHour.bind(this);
        this.onChangeTaskCreditsPenalty = this.onChangeTaskCreditsPenalty.bind(this);
        this.onChangeTaskYearsOfExperience = this.onChangeTaskYearsOfExperience.bind(this);
        this.onChangeTaskContractSigned = this.onChangeTaskContractSigned.bind(this);
        this.onChangeTaskRequiredSkills = this.onChangeTaskRequiredSkills.bind(this);
        this.onChangeTaskStatus = this.onChangeTaskStatus.bind(this);

        this.state = {
            tasks: [],
            contexteditable: false,
            viewOne: false,
            task: {},
            task2:{},
            taskName:'',
            taskDescription:'',
            taskType:'',
            taskDeadline:'',
            taskHours:0,
            taskMinCreditHours:0,
            taskMaxCreditHours:0,
            taskChosenCreditHour:0,
            taskCreditsPenalty:0,
            taskYearsOfExperience:0,
            taskContractSigned:'',
            taskRequiredSkills:'',
            taskStatus:'',
            isTask:false
        };
    }

    componentDidMount() {
        const cookies = new Cookies();
        const token = cookies.get("token");
        const usertype = cookies.get("usertype");
        if(usertype !=="admin"){
        alert("Invalid Access");
        window.location.replace("/");
        }
        else
        axios
            .get("http://localhost:5000/api/admins/awaitingprojects", {
                headers: {
                    Authorization: token
                }
            })
            .then(res => {
                const tasks = res.data.data;
                this.setState({ tasks });
            });
    }

    onSubmit(Projectid, Taskid) {

        const cookies = new Cookies();

        const token = cookies.get('token');

        axios.delete('http://localhost:5000/api/admins/project/tasks/' + Projectid + '/' + Taskid, {
            headers: {

                Authorization: token
            }

        })

            .then(res => {

                const deletedAnnouncement = res.data.data;

                this.rerender(token, Projectid);
            })

    }

    rerender(token, Projectid) {
        axios.get('http://localhost:5000/api/admins/project/tasks/' + Projectid, {
            headers: {

                Authorization: token
            }

        })

            .then(res => {
                const announcements = res.data.data;

                this.setState({ announcements });


            })

    }
    viewOneTask(task) {
        this.setState({
            task: task,
            viewOne: true,
            tasks:[task]
        })
    };
    editOneProject(task) {
        this.setState({
            task: task,
            contexteditable: true,
            tasks:[task],
            taskName:task.name,
            taskDescription:task.description,
            taskType:task.type,
            taskDeadline:task.deadline,
            taskHours:task.hours,
            taskMinCreditHours:task.minCreditsHour,
            taskMaxCreditHours:task.maxCreditsHours,
            taskChosenCreditHour:task.chosenCreditHour,
            taskCreditsPenalty:task.creditsPenalty,
            taskYearsOfExperience:task.yearsOfExperience,
            taskContractSigned:task.contractSigned,
            taskRequiredSkills:task.requiredSkills,
            taskStatus:task.status
        })
    };
    editOneTask(task,project) {
      this.setState({
          task2: task,
          task:project,
          isTask: true,
          tasks:[task],
          taskName:task.name,
          taskDescription:task.description,
          taskType:task.type,
          taskDeadline:task.deadline,
          taskHours:task.hours,
          taskMinCreditHours:task.minCreditsHour,
          taskMaxCreditHours:task.maxCreditsHours,
          taskChosenCreditHour:task.chosenCreditHour,
          taskCreditsPenalty:task.creditsPenalty,
          taskYearsOfExperience:task.yearsOfExperience,
          taskContractSigned:task.contractSigned,
          taskRequiredSkills:task.requiredSkills,
          taskStatus:task.status
      })
  };

    onChangeTaskName(e){
        this.setState({
            taskName : e.target.value
        });
        const {project}=this.props.match.params;
    }
    onChangeTaskDescription(e){
        this.setState({
            taskDescription : e.target.value
        });
    }
    onChangeTaskType(e){
        this.setState({
            taskType : e.target.value
        });
    }
    onChangeTaskDeadline(e){
        this.setState({
            taskDeadline : e.target.value
        });
    }
    onChangeTaskHours(e){
        this.setState({
            taskHours : e.target.value
        });
    }
    onChangeTaskMinCreditHours(e){
        this.setState({
            taskMinCreditHours : e.target.value
        });
    }
    onChangeTaskMaxCreditHours(e){
        this.setState({
            taskMaxCreditHours: e.target.value
        });
    }
    onChangeTaskChosenCreditHour(e){
        this.setState({
            taskChosenCreditHour : e.target.value
        });
    }
    onChangeTaskCreditsPenalty(e){
        this.setState({
            taskCreditsPenalty : e.target.value
        });
    }
    onChangeTaskYearsOfExperience(e){
        this.setState({
            taskYearsOfExperience : e.target.value
        });
    }
    onChangeTaskCandidateRole(e){
        this.setState({
            taskCandidateRole : e.target.value
        });
    }
    onChangeTaskContractSigned(e){
        this.setState({
            taskYearsOfExperience : e.target.value
        });
    }
    onChangeTaskRequiredSkills(e){
        this.setState({
            taskRequiredSkills : e.target.value
        });
    }
    onChangeTaskStatus(e){
        this.setState({
            taskStatus : e.target.value
        });
    }
    
    editTask(task) {
        //const word=this.state.taskRequiredSkills.split(',');
        const cookies = new Cookies();
        const token = cookies.get('token');
        let updatedTask={
            name:this.state.taskName,
            description: this.state.taskDescription,
            type: this.state.taskType,
            deadline: this.state.taskDeadline,
            hours: this.state.taskHours,
            minCreditsHour:this.state.taskMinCreditsHour,
            maxCreditsHour: this.state.taskMaxCreditsHour,
            chosenCreditHour: this.state.taskChosenCreditHour,
            creditsPenalty: this.state.taskCreditsPenalty,
            yearsOfExperience: this.state.taskYearsOfExperience,
            contractSigned: true,
            requiredSkills:this.state.taskRequiredSkills,
            status:this.state.taskStatus
        }
        axios.put('http://localhost:5000/api/admins/project/'+task._id,updatedTask,{
            headers: {
                Authorization: token
            }
        }).then(res => {
                this.setState({
                    contexteditable: false,
            viewOne: false,
            task: {},
            taskName:'',
            taskDescription:'',
            taskType:'',
            taskDeadline:'',
            taskHours:0,
            taskMinCreditHours:0,
            taskMaxCreditHours:0,
            taskChosenCreditHour:0,
            taskCreditsPenalty:0,
            taskYearsOfExperience:0,
            taskContractSigned:'',
            taskRequiredSkills:'',
            taskStatus:''
                })
               // window.location.reload();
            
        })

    };
    editTask2(task2) {
      //const word=this.state.taskRequiredSkills.split(',');
      const cookies = new Cookies();
      const token = cookies.get('token');
      let updatedTask={
          name:this.state.taskName,
          description: this.state.taskDescription,
          type: this.state.taskType,
          deadline: this.state.taskDeadline,
          hours: this.state.taskHours,
          minCreditsHour:this.state.taskMinCreditsHour,
          maxCreditsHour: this.state.taskMaxCreditsHour,
          chosenCreditHour: this.state.taskChosenCreditHour,
          creditsPenalty: this.state.taskCreditsPenalty,
          yearsOfExperience: this.state.taskYearsOfExperience,
          contractSigned: this.state.taskContractSigned,
          requiredSkills:this.state.taskRequiredSkills,
          status:this.state.taskStatus
      }
      axios.put('http://localhost:5000/api/admins/project/tasks/'+this.state.task._id+'/'+task2._id,updatedTask,{
          headers: {
              Authorization: token
          }
      }).then(res => {
              this.setState({
                  contexteditable: false,
          viewOne: false,
          isTask:false,
          task: {},
          taskName:'',
          taskDescription:'',
          taskType:'',
          taskDeadline:'',
          taskHours:0,
          taskMinCreditHours:0,
          taskMaxCreditHours:0,
          taskChosenCreditHour:0,
          taskCreditsPenalty:0,
          taskYearsOfExperience:0,
          taskContractSigned:'',
          taskRequiredSkills:'',
          taskStatus:''
              })
              window.location.reload();
          
      })

  };
    deleteOneProject(task) {
        const cookies = new Cookies();
        const token = cookies.get('token');
        axios.delete('http://localhost:5000/api/admins/project/'+task._id,{
            headers: {
                Authorization: token
            }
        })
        window.location.reload();
    }
    deleteOneTask(task) {
      const cookies = new Cookies();
      const token = cookies.get('token');
      axios.delete('http://localhost:5000/api/admins/project/tasks/'+this.state.task._id+'/'+task._id,{
          headers: {
              Authorization: token
          }
      })
      window.location.reload();
  }

    render() {
        if (!this.state.contexteditable && !this.state.viewOne)
            return (
                <ul>

                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Name </th>
                                <th>Description</th>
                                <th>Type</th>
                                <th>View</th>

                            </tr>
                        </thead>
                        {this.state.tasks.map(person =>

                            <tbody>
                                <tr >
                                    <td >{person.name}</td>
                                    <td> {person.description}</td>
                                    <td>{person.type}</td> <td><button id="btn1" type="button" className="btn btn-primary"
 onClick={this.viewOneTask.bind(this, person)}>View</button></td>



                                </tr>
                            </tbody>
                        )}
                    </Table>



                </ul>
            );
        else
            if (this.state.contexteditable)
                return (
                    <Form>
                        <Form.Group controlId="formContent">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder={this.state.taskName} onChange={this.onChangeTaskName} />
                            <Form.Text className="text-muted">
                                Please Enter the name to update</Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formType">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder={this.state.taskDescription} onChange={this.onChangeTaskDescription} />
                        </Form.Group>
                        <Form.Group controlId="formPassing">
                            <Form.Label>Type</Form.Label>
                            <Form.Control type="text" placeholder={this.state.taskType} onChange={this.onChangeTaskType} />
                        </Form.Group>
                        <Form.Group controlId="formTotal">
                            <Form.Label>Deadline</Form.Label>
                            <Form.Control type="date" placeholder={this.state.taskDeadline} onChange={this.onChangeTaskDeadline} />
                        </Form.Group>
                        <Form.Group controlId="formTotal">
                            <Form.Label>Hours</Form.Label>
                            <Form.Control type="number" placeholder={this.state.taskHours} onChange={this.onChangeTaskHours} />
                        </Form.Group>
                        <Form.Group controlId="formTotal">
                            <Form.Label>Minimum Credits per Hour</Form.Label>
                            <Form.Control type="number" placeholder={this.state.taskMinCreditHours} onChange={this.onChangeTaskMinCreditHours} />
                        </Form.Group>
                        <Form.Group controlId="formTotal">
                            <Form.Label>Maximum Credits per Hour</Form.Label>
                            <Form.Control type="number" placeholder={this.state.taskMaxCreditHours} onChange={this.onChangeTaskMaxCreditHours} />
                        </Form.Group>
                        <Form.Group controlId="formTotal">
                            <Form.Label>Chosen Credits per Hour</Form.Label>
                            <Form.Control type="number" placeholder={this.state.taskChosenCreditHour} onChange={this.onChangeTaskChosenCreditHour} />
                        </Form.Group>
                        <Form.Group controlId="formTotal">
                            <Form.Label>Credits Penalty</Form.Label>
                            <Form.Control type="number" placeholder={this.state.taskCreditsPenalty} onChange={this.onChangeTaskCreditsPenalty} />
                        </Form.Group>
                        <Form.Group controlId="formTotal">
                            <Form.Label>Years of Experience</Form.Label>
                            <Form.Control type="number" placeholder={this.state.taskYearsOfExperience} onChange={this.onChangeTaskYearsOfExperience} />
                        </Form.Group>
                        <Form.Group controlId="formTotal">
                            <Form.Label>Required Skills</Form.Label>
                            <Form.Control type="text" placeholder={this.state.taskRequiredSkills} onChange={this.taskRequiredSkills} />
                        </Form.Group>
                        <Form.Group controlId="formTotal">
                            <Form.Label>Status</Form.Label>
                            <Form.Control as="select" onChange={e => this.onChangeTaskStatus(e)}>
                            <option>Negotiation</option>
                            <option>Approved</option>
                            <option>RequireConsultancy</option>
                            <option>RequireCandidate</option>
                            <option>processing</option>
                            <option>finished</option>
                             </Form.Control>
                        </Form.Group>
                        <button id="btn2" type="button" className="btn btn-success" onClick={this.editTask.bind(this, this.state.task)}>Edit</button>


                    </Form>
                );
            else
            if(!this.state.isTask)
                return (
                    <ul>

                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr> <th>Project/Task</th>
                                    <th>Name </th>
                                    <th>Description</th>
                                    <th>Type</th>
                                    <th>Deadline</th>
                                    <th>Hours</th>
                                    <th>Min. Hours</th>
                                    <th>Max. Hours</th>
                                    <th>Chosen Hours</th>
                                    <th>Credits Penalty</th>
                                    <th>Years of Experience</th>
                                    <th>Contract Signed</th>
                                    <th>Required Skills</th>
                                    <th>Status</th>
                                    <th>View</th>
                                    <th>Edit</th>
                                    <th>Delete</th>


                                </tr>
                            </thead>
                            {this.state.tasks.map(person =>

                                <tbody>
                                    <tr >
                                        <td>Project</td>
                                        <td >{person.name}</td>
                                        <td> {person.description}</td>
                                        <td>{person.type}</td>  
                                        <td>{person.deadline}</td>
                                        <td >{person.hours}</td>
                                        <td> {person.minCreditsHour}</td>
                                        <td>{person.maxCreditsHour}</td>
                                        <td>{person.chosenCreditHour}</td>
                                        <td>{person.creditsPenalty}</td>
                                        <td>{person.yearsOfExperience}</td>
                                        <td>{person.contractSigned}</td>
                                        <td>{person.requiredSkills}</td>
                                        <td>{person.status}</td>
                                        <td></td>
                                        <td><button id="btn3" type="button" className="btn btn-primary" onClick={this.editOneProject.bind(this, person)}>Edit</button></td>
                                    <td><button id="btn4" type="button" className="btn btn-danger" onClick={this.deleteOneProject.bind(this, person)}>Delete</button></td>

                                    </tr>
                                    {person.tasks.map(personx =>
                                    <tr>
                                      <td>Task</td>
                                      {console.log(personx)}
                                        <td >{personx.name}</td>
                                        <td> {personx.description}</td>
                                        <td>{personx.type}</td>  
                                        <td>{personx.deadline}</td>
                                        <td >{personx.hours}</td>
                                        <td> {personx.minCreditsHour}</td>
                                        <td>{personx.maxCreditsHour}</td>
                                        <td>{personx.chosenCreditHour}</td>
                                        <td>{personx.creditsPenalty}</td>
                                        <td>{personx.yearsOfExperience}</td>
                                        <td>{personx.contractSigned}</td>
                                        <td>{personx.requiredSkills}</td>
                                        <td>{personx.status}</td>
                                        <td></td>
                                        <td><button id="btn5" type="button" className="btn btn-primary" onClick={this.editOneTask.bind(this, personx,person)}>Edit</button></td>
                                    <td><button id="btn6" type="button" className="btn btn-danger" onClick={this.deleteOneTask.bind(this, personx)}>Delete</button></td>

                                    </tr>
                                    )
                                    }
                                    
                                </tbody>
                                
                            )}
                        </Table>




                    </ul>

                );
                else
                return(
                  <ul>
                    {console.log(this.state.task)}
                    {console.log(this.state.task2)}

                          <Form>
                        <Form.Group controlId="formContent">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder={this.state.taskName} onChange={this.onChangeTaskName} />
                            <Form.Text className="text-muted">
                                Please Enter the name to update</Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formType">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder={this.state.taskDescription} onChange={this.onChangeTaskDescription} />
                        </Form.Group>
                        <Form.Group controlId="formPassing">
                            <Form.Label>Type</Form.Label>
                            <Form.Control type="text" placeholder={this.state.taskType} onChange={this.onChangeTaskType} />
                        </Form.Group>
                        <Form.Group controlId="formTotal">
                            <Form.Label>Deadline</Form.Label>
                            <Form.Control type="date" placeholder={this.state.taskDeadline} onChange={this.onChangeTaskDeadline} />
                        </Form.Group>
                        <Form.Group controlId="formTotal">
                            <Form.Label>Hours</Form.Label>
                            <Form.Control type="number" placeholder={this.state.taskHours} onChange={this.onChangeTaskHours} />
                        </Form.Group>
                        <Form.Group controlId="formTotal">
                            <Form.Label>Minimum Credits per Hour</Form.Label>
                            <Form.Control type="number" placeholder={this.state.taskMinCreditHours} onChange={this.onChangeTaskMinCreditHours} />
                        </Form.Group>
                        <Form.Group controlId="formTotal">
                            <Form.Label>Maximum Credits per Hour</Form.Label>
                            <Form.Control type="number" placeholder={this.state.taskMaxCreditHours} onChange={this.onChangeTaskMaxCreditHours} />
                        </Form.Group>
                        <Form.Group controlId="formTotal">
                            <Form.Label>Chosen Credits per Hour</Form.Label>
                            <Form.Control type="number" placeholder={this.state.taskChosenCreditHour} onChange={this.onChangeTaskChosenCreditHour} />
                        </Form.Group>
                        <Form.Group controlId="formTotal">
                            <Form.Label>Credits Penalty</Form.Label>
                            <Form.Control type="number" placeholder={this.state.taskCreditsPenalty} onChange={this.onChangeTaskCreditsPenalty} />
                        </Form.Group>
                        <Form.Group controlId="formTotal">
                            <Form.Label>Years of Experience</Form.Label>
                            <Form.Control type="number" placeholder={this.state.taskYearsOfExperience} onChange={this.onChangeTaskYearsOfExperience} />
                        </Form.Group>
                        <Form.Group controlId="formTotal">
                            <Form.Label>Contract Signed</Form.Label>
                            <Form.Control type="text" placeholder={this.state.taskContractSigned} onChange={this.onChangeTaskContractSigned} />
                        </Form.Group>
                        <Form.Group controlId="formTotal">
                            <Form.Label>Required Skills</Form.Label>
                            <Form.Control type="text" placeholder={this.state.taskRequiredSkills} onChange={this.taskRequiredSkills} />
                        </Form.Group>
                        <Form.Group controlId="formTotal">
                            <Form.Label>Status</Form.Label>
                            <Form.Control as="select" onChange={e => this.onChangeTaskStatus(e)}>
                            <option>RequireCandidate</option>
                            <option>processing</option>
                            <option>finished</option>
                             </Form.Control>
                        </Form.Group>
                        <button id="btn7" type="button" className="btn btn-success" onClick={this.editTask2.bind(this, this.state.task2)}>Edit</button>

                    </Form>
           
              </ul>

                )
    }


}
