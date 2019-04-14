import React, { Component } from 'react';
import Cookies from 'universal-cookie';
const axios = require("axios");

export default class getreportbyID_part extends Component {

    state = {
        reports: []
      }
    
      componentDidMount() {
        const cookies= new Cookies();
         const token= cookies.get('token')
        axios.get("http://localhost:5000/api/partners/reports", {  headers: {
          Authorization: token}
        })
          .then(res => {
            const reports = res.data.data;
            this.setState({ reports });
          })
      }
      onSubmit(id) {

        const cookies = new Cookies();

        const token= cookies.get('token');

        console.log(token)

        axios.get('http://localhost:5000/api/partners/report/'+ id, { headers: {

            Authorization: token}

          })

          .then(res => {

            const reports = res.data.data;
            this.setState({reports:[reports]})
            console.log(reports);
            this.rerender(token,id);

          })

    }
    rerender(token,id) {
        axios.get('http://localhost:5000/api/partners/report/'+id, { headers: {

            Authorization: token}

          })


          .then(res => {
            const reports = [res.data.data];

            this.setState({ reports });

            console.log(reports);

          })

      }
      render() {
        return (
          <ul>
            { this.state.reports.map(person => <li>
                <p>
                report title: {person.title}<br></br> 
                Report Interests: {person.interests.map(interest =>
                    <p>
                        interest: {interest}
                    </p>)}<br></br>  
                Report content: {String (person.Content)}<br></br>     
                
            <button type="button" className="btn btn-success" onClick={this.onSubmit.bind(this, person._id)}>Get report</button><br></br>
            </p>   </li>)}
          </ul>
        )
      }
    

}