import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Cookies from 'universal-cookie';
import Form from 'react-bootstrap/Form';

const axios = require("axios");

export default class getAnnouncementbyID_Candidate extends Component {

    state = {
        announcements: []
      }
    
      componentDidMount() {
        const cookies= new Cookies();
         const token= cookies.get('token')
         const usertype = cookies.get("usertype");
        if(usertype !== "candidate"){
            alert("Invalid access");
            window.location.replace("/");
        }
        axios.get("http://localhost:5000/api/candidates/announcements", {  headers: {
          Authorization: token}
        })
          .then(res => {
            const announcements = res.data.data;
            this.setState({ announcements });
          })
      }
      onSubmit(id) {

        const cookies = new Cookies();

        const token= cookies.get('token');

        console.log(token)

        axios.get('http://localhost:5000/api/candidates/announcement/'+ id, { headers: {

            Authorization: token}

          })

          .then(res => {

            const announcements = res.data.data;
            this.setState({announcements:[announcements]})
            console.log(announcements);
            this.rerender(token,id);

          })

    }
    rerender(token,id) {
        axios.get('http://localhost:5000/api/candidates/announcement/'+id, { headers: {

            Authorization: token}

          })


          .then(res => {
            const announcements = [res.data.data];

            this.setState({ announcements });

          })

      }
      viewOneAnnouncement(announcement) {
        this.setState({
            announcement: announcement,
            viewOne: true,
            announcements:[announcement]
        })
    };
    render() {
      if (!this.state.contexteditable && !this.state.viewOne)
          return (
              <ul>

                  <Table striped bordered hover variant="dark">
                      <thead>
                          <tr>
                              <th>Title </th>
                              <th>Type</th>
                              <th>Content</th>
                              <th>View</th>

                          </tr>
                      </thead>
                      {this.state.announcements.map(person =>

                          <tbody>
                              <tr >
                                  <td >{person.title}</td>
                                  <td> {person.type}</td>
                                  <td>{person.content}</td> 
                                  <button id="btn1" onClick={this.viewOneAnnouncement.bind(this, person)}>View</button>



                              </tr>
                          </tbody>
                      )}
                  </Table>



              </ul>
          );
          else{
            return(
              <ul>
                <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Title </th>
                                    <th>Type</th>
                                    <th>Content</th>
                                    

                                </tr>
                            </thead>
                            {this.state.announcements.map(person =>

                                <tbody>
                                    <tr >
                                        <td >{person.title}</td>
                                        <td> {person.type}</td>
                                        <td>{person.content}</td>  

                                    </tr>
                                    
                                </tbody>
                                
                            )}
                        </Table>

                </ul>

            )
          }
      // render() {
      //   return (
      //     <ul>
      //       { this.state.announcements.map(person => <li>
      //           <p>
      //           Announcement title: {person.title}<br></br> 
      //           Announcement type: {person.type}<br></br>  
      //           Anouncement Content: {person.type}<br></br>
                
      //       <button type="button" className="btn btn-success" onClick={this.onSubmit.bind(this, person._id)}>Get announcement</button><br></br>
      //       </p>   </li>)}
      //     </ul>
      //   )
      // }
    

}}