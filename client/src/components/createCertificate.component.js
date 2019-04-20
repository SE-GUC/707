import React, { Component } from 'react';
import Cookies from 'universal-cookie';
const axios = require("axios");

export default class Createcertificate extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeSkills=this.onChangeSkills.bind(this);
        this.onAvaliable = this.onAvaliable.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            description: '',
            category: '',
            skills:'',
            available:'',
           evaluationType:'',
           evaluationContent:'',
           totalScore:'',
           passingScore:''
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

    onChangeCategory(e) {
        this.setState({
            category: e.target.value
        });
    }
    onChangeSkills(e) {

        this.setState({
            skills: e.target.value
        });
    }
    onAvaliable(e) {

        this.setState({
            available: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        
        console.log(`certificate submitted:`);
        console.log(`Name: ${this.state.name}`);
        console.log(`description: ${this.state.description}`);
        console.log(`category: ${this.state.category}`);
        const certificate = {
            name: this.state.name,
            description: this.state.description,
            category: this.state.category,
            skills:this.state.skills,
            available:this.state.available,
          evaluationTests:[]
        };
         const cookies= new Cookies();
         const token= cookies.get('token')
        axios.post("http://localhost:5000/api/admins/certificate",certificate ,{  headers: {
            Authorization: token}
          })
            .then(res => alert("You created a certificate successfully "));
            this.setState({
                name: '',
                description: '',
                category: '',
                skills:'',
                available:'',
               evaluationType:'',
               evaluationContent:'',
               totalScore:'',
               passingScore:''
            })
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Certificate</h3>
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
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                />
                    </div>
                    <div className="form-group">
                    <label>Category: </label>
                            <input   type="text" 
                                    className="form-control"
                                    value={this.state.category}

                                    onChange={this.onChangeCategory}
                                    />
                            
                        </div>
                        <div className="form-group">
                    <label>Skills: </label>
                            <input   type="text" 
                                    className="form-control"
                                    value={this.state.skills}

                                    onChange={this.onChangeSkills}
                                    />
                            
                        </div>
                        <div className="form-group">
                        <label>Avaliable: </label>
                            <input   type="text" 
                                    className="form-control"
                                    value={this.state.available}

                                    onChange={this.onAvaliable}
                                    />
                            
                        </div>
                      
                        
                           
                            
                      
                       
                   

                    <div className="form-group">
                        <input type="submit" value="Create Certificate" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
};