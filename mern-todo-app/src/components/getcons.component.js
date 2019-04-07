import React, { Component } from 'react';
import Cookies from 'universal-cookie';
const axios = require("axios");

export default class getconsultancy extends Component {




    constructor(props) {
        super(props);
        this.onChangename = this.onChangename.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name:'',
            email:'',
            address:'',
            occupation:''
        }
    }


    // onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    componentDidMount() {
         const cookies= new Cookies();
         const token= cookies.get('token')
        axios.get("http://localhost:5000/api/consultancies/profile/", {  headers: {
            Authorization: token.data}
          })
          .then(res =>this.setState({ 
              name: res.data.data.name,
              email:res.data.data.email,
            address:res.data.data.address,
            occupation:res.data.data.occupation  
        })) 
      }

    onChangename(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeTodoResponsible(e) {
        this.setState({
            todo_responsible: e.target.value
        });
    }

    onChangeTodoPriority(e) {
        this.setState({
            todo_priority: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Todo Description: ${this.state.todo_description}`);
        console.log(`Todo Responsible: ${this.state.todo_responsible}`);
        console.log(`Todo Priority: ${this.state.todo_priority}`);
        // let updated ={
        //     name:this.state.name,
        //     email:this.state.email,
        //     occupation:this.state.occupation,
        //     address:this.state.address
        // }

        // axios.put("http://localhost:5000/api/consultancies/5ca743730c91344f1cf73aef",updated)
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Your profile Info</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.name}
                                onchange={this.onChangename}
                                />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.email}
                                />
                    </div>
                    <div className="form-group">
                        <label>Address: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.address}
                                />
                    </div>

                    <div className="form-group">
                        <label>Occupation: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.occupation}
                                />
                    </div>
                    {/* <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityLow" 
                                    value="Low"
                                    checked={this.state.todo_priority==='Low'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityMedium" 
                                    value="Medium" 
                                    checked={this.state.todo_priority==='Medium'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityHigh" 
                                    value="High" 
                                    checked={this.state.todo_priority==='High'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">High</label>
                        </div> */}
                    {/* </div> */}

                    {/* <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary" />
                    </div> */}
                </form>
            </div>
        )
    }
}