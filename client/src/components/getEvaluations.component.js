import React, { Component } from 'react';
import Cookies from 'universal-cookie';
const axios = require("axios");

export default class getEvaluations extends Component {

    state = {
        evaluations: []
      }
    
      componentDidMount() {
        const cookies= new Cookies();
         const token= cookies.get('token')
        axios.get("http://localhost:5000/api/consultancies/certificate/evaluationTests/:certificateID", {  headers: {
          Authorization: token}
        })
          .then(res => {
            const evaluations = res.data.data;
            this.setState({ evaluations });
          })
      }
      onSubmit(id) {

        const cookies = new Cookies();

        const token= cookies.get('token');

        console.log(token)

        axios.get('http://localhost:5000/api/consultancies/certificate/evaluationTest/'+ id, { headers: {

            Authorization: token}

          })

          .then(res => {

            const evaluations = res.data.data;
            this.setState({evaluations:[evaluations]})
            console.log(evaluations);
            this.rerender(token,id);

          })

    }
    rerender(token,id) {
        axios.get('http://localhost:5000/api/consultancies/certificate/evaluationTest/'+id, { headers: {

            Authorization: token}

          })


          .then(res => {
            const evaluations = [res.data.data];

            this.setState({ evaluations });

            console.log(evaluations);

          })

      }
      render() {
        return (
          <ul>
            { this.state.evaluations.map(person => <li>
                <p>
                evaluation type: {person.type}<br></br> 
                evaluation content: {person.content}<br></br>  
                
            <button type="button" className="btn btn-success" onClick={this.onSubmit.bind(this, person._id)}>Get announcement</button><br></br>
            </p>   </li>)}
          </ul>
        )
      }
    

}