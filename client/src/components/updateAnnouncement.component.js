import React, { Component } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
export default class updateAnnouncement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      temp: "",
      announcements: [],
      updatedAnnouncement: {
        title: "",
        type: "",
        Content: ""
      }
    };
  }

  onChangeAnnouncementTitle(announcement, e) {
    announcement.title = e.target.value;
    this.setState({
      updatedAnnouncement: {
        title: announcement.title,
        type: announcement.type,
        Content: announcement.Content
      }
    });
  }
  onChangeAnnouncementType(announcement, e) {
    announcement.type = e.target.value;
    this.setState({
      updatedAnnouncement: {
        title: announcement.title,
        type: announcement.type,
        Content: announcement.Content
      }
    });
  }
  onChangeAnnouncementContent(announcement, e) {
    announcement.Content = e.target.value;
    this.setState({
      updatedAnnouncement: {
        title: announcement.title,
        type: announcement.type,
        Content: announcement.Content
      }
    });
  }

  //     save(e,announcement,foo) {
  //       const Req=announcement.skills;
  //       console.log(Req);
  //       console.log(foo);
  //      Req.push(foo);
  //      announcement.skills.push(foo);
  //      this.setState({
  //         updatedannouncement:{
  //             name: announcement.name,
  //             type: announcement.type,
  //             Content: announcement.Content,
  //             skills:announcement.skills,
  //             available:announcement.available

  //        } });
  //    }

  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const usertype = cookies.get("usertype");
    if (usertype !== "admin") {
      alert("Invalid access");
      window.location.replace("/");
    }
    axios
      .get("http://localhost:5000/api/admins/announcements", {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        const announcements = res.data.data;
        this.setState({ announcements });
      });
  }
  rerender(token) {
    axios
      .get("http://localhost:5000/api/admins/announcements", {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        const announcements = res.data.data;
        this.setState({ announcements });
        window.location.reload();
      });
  }
  async updateAnnouncement(e, announcement) {
    const cookies = new Cookies();
    const token = cookies.get("token");
    var words = this.state.temp.split(",");
    if (this.state.temp) {
      announcement.skills = words;
    }

    let announcement2 = {
      title: announcement.title,
      type: announcement.type,
      Content: announcement.Content
    };
    console.log(this.state.updatedAnnouncement.type);
    console.log(this.state.updatedAnnouncement.title);
    console.log(announcement._id);
    axios.put(
      "http://localhost:5000/api/admins/announcement/" + announcement._id,
      announcement2,
      {
        headers: {
          Authorization: token
        }
      }
    );

    this.rerender(token);
    window.location.reload();
  }

  render() {
    return (
      <ul>
        {this.state.announcements.map(announcement => (
          <li>
            <p>
              announcement title: {announcement.title}
              <br />
              announcement type:{announcement.type}
              <br />
              announcement Content: {announcement.Content}
              <br />
              <div className="form-group">
                <label>Announcement Title: </label>
                <input
                  type="text"
                  className="Content-editable"
                  value={announcement.title}
                  onChange={e =>
                    this.onChangeAnnouncementTitle(announcement, e)
                  }
                />
              </div>
              <div className="form-group">
                <label> Announcement Type: </label>
                <input
                  type="text"
                  className="form-control"
                  value={announcement.type}
                  onChange={e => this.onChangeAnnouncementType(announcement, e)}
                />
              </div>
              <div className="form-group">
                <label>Announcement Content: </label>
                <input
                  type="text"
                  className="form-control"
                  value={announcement.Content}
                  onChange={e =>
                    this.onChangeAnnouncementContent(announcement, e)
                  }
                />
              </div>
              <div className="list">
                <form name="myForm">
                  <ul />
                </form>
              </div>
              <button
                type="update"
                onClick={event => this.updateAnnouncement(event, announcement)}
              >
                Update
              </button>
              <br />
            </p>{" "}
          </li>
        ))}
      </ul>
    );
  }
}
