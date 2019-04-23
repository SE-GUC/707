import React, { Component } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';

export default class createProject extends Component {

    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        

        this.state = {
            name: '',
            description:'',
            type: ''
            
           
        }
        
        
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    onChangeType(e) {
        this.setState({
            type: e.target.value
        });
    }
 

    
    createProject(e) {
        e.preventDefault();
        const cookies = new Cookies();
        const token= cookies.get('token');
        const project = {
            name: this.state.name,
            description: this.state.description,
            type: this.state.type
           
           
        };
      
        
      
        axios.post('http://localhost:5000/api/partners/project', project,{ headers: {
            Authorization: token}})
            .then(
                res => alert("Created Successfully!")).catch(e =>{
                    alert(e)
                });
           
            this.setState({
                name: '',
                description: '',
                type: ''
              
            })
    }
  
    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create Project</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeName}
                                />
                    </div>
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                />
                    </div>
                    <div className="form-group"> 
                        <label>Type: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.type}
                                onChange={this.onChangeType}
                                />
                    </div>  
                  
                   
                     
                    <div className="form-group">
                        <input type="submit" value="Create" className="btn btn-primary" onClick={this.createProject.bind(this)}/>
                    </div>
                </form>

      </div>
    );
  }
}
