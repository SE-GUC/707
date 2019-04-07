import React, { Component } from 'react';
import Cookies from 'universal-cookie';
const axios = require("axios");

export default class getCandidate extends Component {




    constructor(props) {
        super(props);
        

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
        axios.get("http://localhost:5000/api/candidates/profile/", {  headers: {
            Authorization: token.data}
          })
          .then(res =>this.setState({ 
              name: res.data.data.name,
              email:res.data.data.email,
              birthdate: res.data.data.birthdate,
              address: res.data.data.address,
              occupation: res.data.data.occupation,
              languages: res.data.data.languages,
              setOfSkills: res.data.data.setOfSKills,
              interests: res.data.data.interests,
              certificates: res.data.data.certificates,
              masterClasses: res.data.data.masterClasses,
              education: res.data.data.education,
              phoneNumber: res.data.data.phoneNumber,

        })) 
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
                    <div className="form-group">
                        <label>languages: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.languages}
                                />
                    </div>
                    <div className="form-group">
                        <label>setOfSkills: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.setOfSkills}
                                />
                    </div>
                    <div className="form-group">
                        <label>interests: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.interests}
                                />
                    </div>
                    <div className="form-group">
                        <label>certificates: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.certificates}
                                />
                    </div>
                    <div className="form-group">
                        <label>masterClasses: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.occupation}
                                />
                    </div>
                    <div className="form-group">
                        <label>education: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.education}
                                />
                    </div>
                    <div className="form-group">
                        <label>phoneNumber: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.phoneNumber}
                                />
                    </div>
                   
                </form>
            </div>
        )
    }
}