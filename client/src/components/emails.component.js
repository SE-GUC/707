import React, { Component } from 'react';
import Cookies from 'universal-cookie';
const axios = require("axios");

export default class CreateEmail extends Component {
    constructor(props) {
        super(props);

        this.onChangeSubject = this.onChangeSubject.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onChangeEmailType = this.onChangeEmailType.bind(this);
        this.onChangeReceiverEmail=this.onChangeReceiverEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            subject: '',
            content: '',
            emailType: '',
            receiverEmail:''
            
        }
    }

    onChangeSubject(e) {
        this.setState({
            subject: e.target.value
        });
    }

    onChangeContent(e) {
        this.setState({
            content: e.target.value
        });
    }

    onChangeEmailType(e) {
        this.setState({
            emailType: e.target.value
        });
    }
    onChangeReceiverEmail(e) {

        this.setState({
            receiverEmail: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        
        console.log(`email is sent sucessfully:`);
        console.log(`Subject: ${this.state.subject}`);
        console.log(`Content: ${this.state.content}`);
        console.log(`EmailType: ${this.state.emailType}`);
        console.log(`ReceiverEmail: ${this.state.receiverEmail}`);
        const email = {
            subject: this.state.subject,
            content: this.state.content,
            emailType: this.state.emailType,
            receiverEmail:this.state.receiverEmail
        };
         const cookies= new Cookies();
         const token= cookies.get('token')
        axios.post("http://localhost:5000/api/emails",email,{  headers: {
            Authorization: token}
          })
            .then(res => alert("You sent an email successfully "));
            this.setState({
            subject: '',
            content: '',
            emailType: '',
            receiverEmail:''
            })
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Send New Email</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Subject: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.subject}
                                onChange={this.onChangeSubject}
                                />
                    </div>
                    <div className="form-group">
                        <label>Content: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.content}
                                onChange={this.onChangeContent}
                                />
                    </div>
                    <div className="form-group">
                    <label>Email Type: </label>
                            <input   type="text" 
                                    className="form-control"
                                    value={this.state.emailType}

                                    onChange={this.onChangeEmailType}
                                    />
                            
                        </div>
                        <div className="form-group">
                    <label>Receiver Email: </label>
                            <input   type="text" 
                                    className="form-control"
                                    value={this.state.receiverEmail}

                                    onChange={this.onChangeReceiverEmail}
                                    />
                            
                        </div>
                    <div className="form-group">
                        <input type="submit" value="Create New Email" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
};