import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import {Link} from 'react-router-dom';
const axios = require("axios");

export default class viewAllResearches extends Component {

    state = {
        researches: []
      }
    
      componentDidMount() {
        const cookies= new Cookies();
         const token= cookies.get('token')
        axios.get("http://localhost:5000/api/consultancies/researches", {  headers: {
          Authorization: token}
        })
          .then(res => {
            const researches = res.data.data;
            this.setState({ researches });
          })
      }
    
      render() {
        return (
          <ul>
            { this.state.researches.map(person => <li>
                <p>
                <div key={person._id}>
  <Link to={`/researchvieworupdate/${person._id}`}>{person.title}</Link>
</div>
                
                
            </p>   </li>)}
          </ul>
        )
      }
    

}