import React, { Component } from 'react';

import Cookies from 'universal-cookie';

const axios = require("axios");

 

export default class deleteReport_cons extends Component {

    constructor(props){

        super(props)

 

    this.state = {

        reports: []

      }

    }

      componentDidMount() {

        const cookies = new Cookies();

        const token= cookies.get('token');

        console.log(token)

        axios.get('http://localhost:5000/api/consultancies/reports', { headers: {

            Authorization: token}

          })

          .then(res => {

            const reports = res.data.data;

            this.setState({ reports });

            console.log(reports);

         })

      }

 

      onSubmit(id) {

        const cookies = new Cookies();

        const token= cookies.get('token');

        console.log(token)

        axios.delete('http://localhost:5000/api/consultancies/report/'+ id, { headers: {

            Authorization: token}

          })

          .then(res => {

            const deletedReport = res.data.data;

            console.log(deletedReport);

            this.rerender(token);
          })

    }

    rerender(token) {
        axios.get('http://localhost:5000/api/consultancies/reports', { headers: {

            Authorization: token}

          })

          .then(res => {
            const reports = res.data.data;

            this.setState({ reports });

            console.log(reports);

          })

      }

   

      render() {

        return (

          <ul>

 

            { this.state.reports.map(report => <li>
                <p>report Title: {report.title}<br></br>
                report interests: {report.interests}<br></br>
                report Content: {report.content}<br></br>

               <br></br>

                <button type="button" className="btn btn-danger" onClick={this.onSubmit.bind(this, report._id)}>Delete</button>

                </p>

              

                  </li>)}

          </ul>

        )

      }

    };