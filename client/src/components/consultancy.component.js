import React, { Component } from 'react';
import Cookies from 'universal-cookie';
const axios = require("axios");

export default class getconsultancy extends Component {




    constructor(props) {
        super(props);
        
        this.state = {
            name:'',
            email:'',
            address:'',
            type:''
        }
    }


    // onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    componentDidMount() {
         const cookies= new Cookies();
         const token= cookies.get('token')
        axios.get("http://localhost:5000/api/profiles/consultancy", {  headers: {
            Authorization: token.data}
          })
          .then(res =>this.setState({ 
              name: res.data.data.name,
              email:res.data.data.email,
            address:res.data.data.address,
            type :res.data.data.usertype
        })) 
      }

      onKeyPress = e => {
        const regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
        if (e.target.value === "" || !regEx.test(e.target.value)) {
        
        } else {
          this.setState({
            name: e.target.value ,
            email:this.state.email,
          address:this.state.address,
          type :this.state.type 
          });
        }
      };
    

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Your profile Info</h3>
                <form onSubmit={this.onSubmit}>
                <label>User type: {this.state.type}</label>
                    <div className="form-group"> 
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={e => this.onKeyPress(e)}
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