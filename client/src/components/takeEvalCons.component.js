import axios from "axios";
import React, { Component } from "react";
import Cookies from "universal-cookie";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export default class takeEvalCons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            evaluations: [],
            answer:""
          };
      }

      answerchanged = e => {
        if (e.target.value === "") {
        } else {
          this.setState({
            answer: e.target.value
          });
        }
      };

      emailchanged = e => {
          this.setState({
            answer: e.target.value
          });
        
      };
      componentDidMount() {
        const cookies = new Cookies();
        const token = cookies.get("token");
        const {evaluation}=this.props.match.params
        axios
          .get("http://localhost:5000/api/consultancies/certificate/evaluationTest/"+{evaluation}.evaluation, {
            headers: {
              Authorization: token
            }
          })
          .then(res =>{
                console.log(res.data.data);
                this.setState({ evaluations:[res.data.data] });
            console.log(this.state);
          });
      }

      submitEval(id) {
        const cookies = new Cookies();
        const token = cookies.get("token");
        const {evaluation}=this.props.match.params
        const {certificate}=this.props.match.params
        var answer = {
            answer:this.state.answer}
        axios
          .post("http://localhost:5000/api/consultancies/certificate/evaluationTests/"+{certificate}.certificate+"/"+{evaluation}.evaluation,answer,{
            headers: {
              Authorization: token
            }
          }).then(res => alert(res.data.msg));
     
        
    }
   
      render() {
        return (
          <ul>
           { this.state.evaluations.map(evaluation => (<li>
                <p>
                evaluation content: {evaluation.content}<br></br>        
          <div className="form-group"> 
          <label>Evaluation Answer: </label>
          <input  type="text"
                  className="content-editable"
                  value={this.state.answer}
                  onChange={e => this.emailchanged(e)}
                  />
      </div>        
      </p><br></br>                      
      <button type="button" className="btn btn-success" onClick={this.submitEval.bind(this, evaluation._id)}>Submit Evaluation</button><br></br>

             </li>))}
          </ul>
          );
      }

}


{/* 
{this.state.evaluations.map(evaluation => (
              <li>
               <div className="form-group">
            <label>type: {evaluation.type}</label>
          </div>
          <div className="form-group">
            <label>content: {evaluation.content}</label>
          </div>
          <div className="form-group">
            <label>totalScore: {String(evaluation.totalScore)}</label>
          </div>
          <div className="form-group">
            <label>Passing Score: {String(evaluation.passingScore)}</label>
          </div>
    
          <div className="form-group"> 
          <label>Evaluation Answer: </label>
          <input  type="text"
                  className="content-editable"
                  value={evaluation.answer}
                  onChange={e => this.answerchanged(e)}
                  />
      </div>
              </li>
            ))} */}