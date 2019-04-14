import React, { Component } from "react";
export default class Research extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const research = this.props.research;
    return (
      <ul>
        <li> Title: {research.title}</li>
        <br />
        <li>
          {" "}
          Interests:{" "}
          {research.interests.map(interest => (
            <p> {interest}</p>
          ))}
        </li>
        <br />
        <li> Content: {research.Content} </li>
      </ul>
    );
  }
}
