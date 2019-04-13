import React, { Component } from "react";
import axios from "axios";
export default class Createuser extends Component {

    constructor(props) {
        super(props);

        this.onChangeuserName = this.onChangeuserName.bind(this);
        this.onChangeuserEmail = this.onChangeuserEmail.bind(this);
        this.onChangeuserPassword = this.onChangeuserPassword.bind(this);
        this.onChangeType=this.onChangeType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            password: '',
            type:''
         //   todo_completed: false
        }
    }

    onChangeuserName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeuserEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangeuserPassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    onChangeType(e) {

        this.setState({
            type: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Name: ${this.state.name}`);
        console.log(`Email: ${this.state.email}`);
        console.log(`Password: ${this.state.password}`);
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
            //todo_completed: this.state.todo_completed
        };
        // axios.post('http://localhost:5000/api/'+this.state.type+'/register', user)
//https://lirtenhub-707.herokuapp.com/api/
        console.log(this.state.type)
        axios.post('http://localhost:5000/api/profiles/'+this.state.type+'/register', user)
            .then(res => console.log(res.data));
           // <Redirect to="/register"/>
            this.setState({
                name: '',
                email: '',
                password: '',
                type:''
            })
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Register New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeuserName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.email}
                                onChange={this.onChangeuserEmail}
                                />
                    </div>
                    <div className="form-group">
                    <label>Password: </label>
                            <input   type="password" 
                                    className="form-control"
                                    value={this.state.password}

                                    onChange={this.onChangeuserPassword}
                                    />
                            
                        </div>
                        <div className="form-group">
                            <div className="form-check form-check-inline">
                                <input  className="form-check-input" 
                                        type="radio" 
                                        name="priorityOptions" 
                                        id="candidate" 
                                        value="candidate"
                                        checked={this.state.type==='candidate'} 
                                        onChange={this.onChangeType}
                                        />
                                <label className="form-check-label">Candidate</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input  className="form-check-input" 
                                        type="radio" 
                                        name="priorityOptions" 
                                        id="partner" 
                                        value="partner" 
                                        checked={this.state.type==='partner'} 
                                        onChange={this.onChangeType}
                                        />
                                <label className="form-check-label">Partner</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input  className="form-check-input" 
                                        type="radio" 
                                        name="priorityOptions" 
                                        id="consultancy" 
                                        value="consultancy" 
                                        checked={this.state.type==='consultancy'} 
                                        onChange={this.onChangeType}
                                        />
                                <label className="form-check-label">Consultancy</label>
                            </div>
                        </div>
                         
                       
                   

                    <div className="form-group">
                        <input type="submit" value="Create Account" className="btn btn-primary" />
                    </div>
                </form>

      </div>
    );
  }
}
