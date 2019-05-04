import React, { Component } from "react";
import Cookies from "universal-cookie";
import Table from "react-bootstrap/Table";
import axios from "axios";

export default class getallRecievedEmails extends Component {
  constructor(props) {
    super(props);

    this.onChangeSubject = this.onChangeSubject.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onChangeEmailType = this.onChangeEmailType.bind(this);
    this.onChangeReceiverEmail = this.onChangeReceiverEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      subject: "",
      content: "",
      emailType: "",
      receiverEmail: "",
      emails: [],
      createEmail: false
    };
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
      receiverEmail: this.state.receiverEmail
    };
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .post("http://localhost:5000/api/emails", email, {
        headers: {
          Authorization: token
        }
      })
      .then(res => alert("You sent an email successfully "));
    this.setState({
      subject: "",
      content: "",
      emailType: "",
      receiverEmail: ""
    });
  }
  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .get("http://localhost:5000/api/emails/received", {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        const emails = res.data.data;
        this.setState({ emails });
      });
  }
  rerender3(token) {
    axios
      .get("http://localhost:5000/api/emails/received", {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        const emails = res.data.data;
        this.setState({ emails });
      });
  }
  onSubmit2(id) {
    const cookies = new Cookies();

    const token = cookies.get("token");

    console.log(token);

    axios
      .delete("http://localhost:5000/api/emails/" + id, {
        headers: {
          Authorization: token
        }
      })

      .then(res => {
        alert("You deleted this email successfully ");

        this.rerender2(token);
      });
  }

  rerender2(token) {
    axios
      .get("http://localhost:5000/api/emails/received", {
        headers: {
          Authorization: token
        }
      })

      .then(res => {
        const emails = res.data.data;

        this.setState({ emails });

        console.log(emails);
      });
  }
  redirect(e) {
    this.setState({ createEmail: true });
  }
  onSubmit3(id) {
    const cookies = new Cookies();

    const token = cookies.get("token");

    console.log(token);

    axios
      .get("http://localhost:5000/api/emails/received/" + id, {
        headers: {
          Authorization: token
        }
      })

      .then(res => {
        const emails = res.data.data;

        console.log(emails);
        this.rerender(token, id);
      });
  }
  rerender(token, id) {
    axios
      .get("http://localhost:5000/api/emails/received/" + id, {
        headers: {
          Authorization: token
        }
      })

      .then(res => {
        const emails = [res.data.data];

        this.setState({ emails });

        console.log(emails);
      });
  }

  render() {
    if (this.state.createEmail) {
      return (
        <div style={{ marginTop: 10 }}>
          <h3>Send New Email</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Receiver Email: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.receiverEmail}
                onChange={this.onChangeReceiverEmail}
              />
            </div>
            <div className="form-group">
              <label>Subject: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.subject}
                onChange={this.onChangeSubject}
              />
            </div>
            <div className="form-group">
              <label>Content: </label>
              <textarea
                type="text"
                className="form-control"
                value={this.state.content}
                onChange={this.onChangeContent}
              />
            </div>
            <div className="form-group">
              <label>Email Type: </label>
              <div className="form-group">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="priorityOptions"
                    id="Project Orientation Invitation"
                    value="Project Orientation Invitation"
                    checked={
                      this.state.emailType === "Project Orientation Invitation"
                    }
                    onChange={this.onChangeEmailType}
                  />
                  <label className="form-check-label">
                    Project Orientation Invitation
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="priorityOptions"
                    id="Inquiry"
                    value="Inquiry"
                    checked={this.state.emailType === "Inquiry"}
                    onChange={this.onChangeEmailType}
                  />
                  <label className="form-check-label">Inquiry</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="priorityOptions"
                    id="Issue"
                    value="Issue"
                    checked={this.state.emailType === "Issue"}
                    onChange={this.onChangeEmailType}
                  />
                  <label className="form-check-label">Issue</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="priorityOptions"
                    id="Negotiation"
                    value="Negotiation"
                    checked={this.state.emailType === "Negotiation"}
                    onChange={this.onChangeEmailType}
                  />
                  <label className="form-check-label">Negotiation</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="priorityOptions"
                    id="Other"
                    value="Other"
                    checked={this.state.emailType === "Other"}
                    onChange={this.onChangeEmailType}
                  />
                  <label className="form-check-label">Other</label>
                </div>
              </div>
            </div>

            <div className="form-group">
              <input
                type="submit"
                value="Create New Email"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <ul>
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.redirect.bind(this)}
          >
            Send new mail
          </button>

          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Sender Email</th>
                <th>Email Subject</th>
                <th>Email Content</th>
                <th>Email Type</th>
                <th>Delete</th>
                <th>View</th>
              </tr>
            </thead>
            {this.state.emails.map(sent => (
              <tbody>
                <tr>
                  <td>
                    {sent.senderEmail}
                    <br />
                  </td>
                  <td>
                    {sent.subject}
                    <br />
                  </td>
                  <td>
                    {sent.content}
                    <br />
                  </td>
                  <td>
                    {sent.emailType}
                    <br />
                  </td>

                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={this.onSubmit2.bind(this, sent._id)}
                    >
                      Delete
                    </button>
                    <br />
                  </td>

                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={this.onSubmit3.bind(this, sent._id)}
                    >
                      view mail
                    </button>
                    <br />
                  </td>
                </tr>
                <tr />
              </tbody>
            ))}
          </Table>

          <br />
          <br />
        </ul>
      );
    }
  }
}
