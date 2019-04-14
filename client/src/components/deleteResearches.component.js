import React, { Component } from 'react';

import Cookies from 'universal-cookie';

const axios = require("axios");

 

export default class deleteResearches extends Component {

    constructor(props){

        super(props)

 

    this.state = {

        researches: []

      }

    }

      componentDidMount() {

        const cookies = new Cookies();

        const token= cookies.get('token');

        console.log(token)

        axios.get('http://localhost:5000/api/consultancies/researches', { headers: {

            Authorization: token}

          })

          .then(res => {

            const researches = res.data.data;

            this.setState({ researches });

            console.log(researches);

         })

      }

 

      onSubmit(id) {

        const cookies = new Cookies();

        const token= cookies.get('token');

        console.log(token)

        axios.delete('http://localhost:5000/api/consultancies/research/'+ id, { headers: {

            Authorization: token}

          })

          .then(res => {

            const deletedResearch = res.data.data;

            console.log(deletedResearch);

            this.rerender(token);
          })

    }

    rerender(token) {
        axios.get('http://localhost:5000/api/consultancies/researches', { headers: {

            Authorization: token}

          })

          .then(res => {
            const researches = res.data.data;

            this.setState({ researches });

            console.log(researches);

          })

      }

   

      render() {

        return (

          <ul>

 

            { this.state.researches.map(research => <li>
                <p>Research Title: {research.title}<br></br>
                Research Interests: {research.interests}<br></br>
                Research Content: {research.content}<br></br>

               <br></br>

                <button type="button" className="btn btn-danger" onClick={this.onSubmit.bind(this, research._id)}>Delete</button>

                </p>

              

                  </li>)}

          </ul>

        )

      }

    };