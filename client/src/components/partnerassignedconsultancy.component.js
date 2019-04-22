import axios from "axios";
import React, { Component } from "react";
import Cookies from "universal-cookie";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export default class partnerassignedconsultancy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            consultancies: []
          };
      }



      componentDidMount() {
        const cookies = new Cookies();
        const token = cookies.get("token");
        const {project}=this.props.match.params
        axios
          .get("http://localhost:5000/api/partners/consultancy/approvedProjects/"+{project}.project, {
            headers: {
              Authorization: token
            }
          })
          .then(res =>{
                const consultancies = res.data.data;
                this.setState({ consultancies });
            
          });
      }
   
      render() {
        return (
          <ul>
            {this.state.consultancies.map(consultancy => (
              <li>
               <div className="form-group">
            <label>Name: {consultancy.name}</label>
          </div>
          <div className="form-group">
            <label>Email: {consultancy.email}</label>
          </div>
          <div className="form-group">
            <label>Address: {consultancy.address}</label>
          </div>
          <div className="form-group">
            <label>Years of Experience: {consultancy.yearsOfExperience}</label>
          </div>
          <div className="form-group">
            <label>Profession: {consultancy.profession}</label>
          </div>
          <div className="form-group">
            <label>Establishment date: {this.state.establishmentDate}</label>
          </div>
          <div className="form-group">
            <label>Interests: </label>
            <li>{consultancy.interests.map(interest => {
            return<li>{interest}</li>})}</li>
            <br />
          </div>
          <div className="form-group">
            <label>Contact numbers: </label>
            <li>{consultancy.contactNumbers.map(contact => {
            return<li>{contact}</li>})}</li>
            <br />
          </div>
          <div className="form-group">
            <label>Skills: </label>
            <li>{consultancy.skills.map(skill => {
            return<li>{skill}</li>})}</li>
            <br />
          </div>



            
        
              </li>
            ))}
          </ul>
        );
      }


}
