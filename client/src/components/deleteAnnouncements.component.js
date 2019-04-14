import React, { Component } from 'react';

import Cookies from 'universal-cookie';

const axios = require("axios");

 

export default class deleteAnnouncements extends Component {

    constructor(props){

        super(props)

 

    this.state = {

        announcements: []

      }

    }

      componentDidMount() {

        const cookies = new Cookies();

        const token= cookies.get('token');

        console.log(token)

        axios.get('http://localhost:5000/api/admins/announcements', { headers: {

            Authorization: token}

          })

          .then(res => {

            const announcements = res.data.data;

            this.setState({ announcements });

            console.log(announcements);

         })

      }

 

      onSubmit(id) {

        const cookies = new Cookies();

        const token= cookies.get('token');

        console.log(token)

        axios.delete('http://localhost:5000/api/admins/announcement/'+ id, { headers: {

            Authorization: token}

          })

          .then(res => {

            const deletedAnnouncement = res.data.data;

            console.log(deletedAnnouncement);

            this.rerender(token);
          })

    }

    rerender(token) {
        axios.get('http://localhost:5000/api/admins/announcements', { headers: {

            Authorization: token}

          })

          .then(res => {
            const announcements = res.data.data;

            this.setState({ announcements });

            console.log(announcements);

          })

      }

   

      render() {

        return (

          <ul>

 

            { this.state.announcements.map(announcement => <li>
                <p>Announcement Title: {announcement.title}<br></br>
                Announcement Type: {announcement.type}<br></br>
                Announcement Content: {announcement.content}<br></br>

               <br></br>

                <button type="button" className="btn btn-danger" onClick={this.onSubmit.bind(this, announcement._id)}>Delete</button>

                </p>

              

                  </li>)}

          </ul>

        )

      }

    };