import React, { Component } from 'react';
import Cookies from 'universal-cookie';
const axios = require("axios");


export default class consultanciesconversations extends Component {
    
    state = {
        conversations: []
      }
   
      componentDidMount() {
        const cookies = new Cookies();
        const token= cookies.get('token');
        console.log(token)
        axios.get('https://lirtenhub-707.herokuapp.com/api/consultancies/conversations/get', { headers: {
            Authorization: token.data}
          })
          .then(res => {
            const conversations = res.data.data;
            this.setState({ conversations });
            console.log(conversations);
          })
      }
    
      render() {
        return (
          <ul>
            { this.state.conversations.map( conversation => <li>
            <p>Conversation Received-Emails: {conversation.receivedEmails}<br></br>
             </p></li>)}
          </ul>
        )
      }
      
    };