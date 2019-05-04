import React, { Component } from "react";
import Cookies from "universal-cookie";
import Table from "react-bootstrap/Table";
import axios from "axios";
export default class getallReports extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      Content: "",
      reports: [],
      interests: []
    };
  }

  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .get("http://localhost:5000/api/admins/reports", {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        const reports = res.data.data;
        this.setState({ reports });
      });
  }

  onSubmit2(id) {
    const cookies = new Cookies();

    const token = cookies.get("token");

    console.log(token);

    axios
      .delete("http://localhost:5000/api/admins/report/" + id, {
        headers: {
          Authorization: token
        }
      })

      .then(res => {
        alert("You deleted this report successfully ");
        this.rerender2(token);
      });
  }

  rerender2(token) {
    axios
      .get("http://localhost:5000/api/admins/reports", {
        headers: {
          Authorization: token
        }
      })

      .then(res => {
        const reports = res.data.data;

        this.setState({ reports });

        console.log(reports);
      });
  }
  redirect(e) {
    this.setState({ createReport: true });
  }
  onSubmit3(id) {
    const cookies = new Cookies();

    const token = cookies.get("token");

    console.log(token);

    axios
      .get("http://localhost:5000/api/admins/report/" + id, {
        headers: {
          Authorization: token
        }
      })

      .then(res => {
        const reports = res.data.data;

        console.log(reports);
        this.rerender(token, id);
      });
  }
  rerender(token, id) {
    axios
      .get("http://localhost:5000/api/admins/report/" + id, {
        headers: {
          Authorization: token
        }
      })

      .then(res => {
        const reports = [res.data.data];

        this.setState({ reports });

        console.log(reports);
      });
  }

  render() {
    return (
      <ul>
        <button
          type="button"
          className="btn btn-danger"
          onClick={this.redirect.bind(this)}
        >
          Create new report
        </button>

        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Report Title</th>
              <th>Report Content</th>
              <th>Report interests</th>
              <th>View</th>
            </tr>
          </thead>
          {this.state.reports.map(sent => (
            <tbody>
              <tr>
                <td>
                  {" "}
                  {sent.title}
                  <br />
                </td>
                <td>
                  {" "}
                  {sent.Content}
                  <br />
                </td>
                <td>
                  {sent.interests.map(interest => (
                    <p>interest: {interest}</p>
                  ))}
                  <br />
                </td>

                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={this.onSubmit3.bind(this, sent._id)}
                  >
                    view report
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
