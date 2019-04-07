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
                   
                </form>
            </div>
        )
    }
}