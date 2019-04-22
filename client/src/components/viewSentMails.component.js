import React, { Component } from 'react';
import Cookies from 'universal-cookie';
const axios = require("axios");

export default class getallSentEmails extends Component {
   
  state = {
            emails:[]
      }
      componentDidMount() {
        const cookies= new Cookies();
         const token= cookies.get('token')
        axios.get("http://localhost:5000/api/emails/sent", {  headers: {
          Authorization: token}
        })
          .then(res => {
            const emails = res.data.data;
            this.setState({ emails });
          })
      }
      rerender3(token) {
        axios.get("http://localhost:5000/api/emails/sent", {  headers: {
          Authorization: token}
        })
          .then(res => {
            const emails = res.data.data;
            this.setState({ emails });
          })
      }
      onSubmit2(id) {

        const cookies = new Cookies();

        const token= cookies.get('token');

        console.log(token)

        axios.delete('http://localhost:5000/api/emails/'+ id, { headers: {

            Authorization: token}

          })

          .then(res => {

            const deletedEmail = res.data.data;
            alert("You deleted this email successfully ");
           
            this.rerender2(token);
          })

    }

    rerender2(token) {
        axios.get('http://localhost:5000/api/emails/sent', { headers: {

            Authorization: token}

          })

          .then(res => {
            const emails = res.data.data;

            this.setState({ emails });

            console.log(emails);

          })

      }
      redirect(e){
        e.preventDefault();
        window.location.replace("/createEmail");
    }
    onSubmit(id) {
        
      const cookies = new Cookies();

      const token= cookies.get('token');

      console.log(token)

      axios.get('http://localhost:5000/api/emails/sent/'+ id, { headers: {

          Authorization: token}

        })

        .then(res => {

          const emails = res.data.data;

          console.log(emails);
          this.rerender(token,id);

        })

  }
  rerender(token,id) {
    axios.get('http://localhost:5000/api/emails/sent/'+id, { headers: {

        Authorization: token}

      })


      .then(res => {
        const emails = [res.data.data];

        this.setState({ emails });

        console.log(emails);

      })

  }

     
      render() {
        
        return (
          <ul>
             <p>
                <button type="button" className="btn btn-danger" onClick={this.redirect.bind(this)}>Send new mail</button>
                
             </p>
               
            { this.state.emails.map(sent => <li>
                <p>
                Reciever Email: {sent.receiverEmail}<br></br>    
                Email Subject: {sent.subject}<br></br>   
                Email Content: {sent.content}<br></br>  
                Email Type: {sent.emailType}<br></br> 
                <p>
                     <button type="button" className="btn btn-danger" onClick={this.onSubmit2.bind(this, sent._id)}>Delete</button><br></br> 
                     <br></br>
                     <button type="button" className="btn btn-danger" onClick={this.onSubmit.bind(this, sent._id)}>view mail</button><br></br> 
                  </p>

              
             <br/>  
             <br/>

                
            </p>   </li>)}
          </ul>
        )
      }
    

};