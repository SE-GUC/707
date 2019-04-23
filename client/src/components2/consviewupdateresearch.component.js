import React, { Component } from 'react';
import Cookies from 'universal-cookie';

const axios = require("axios");


export default class viewupdateconstresearch extends Component {
    constructor(props) {
        super(props);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onChangeInterests = this.onChangeInterests.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.updateResearch = this.updateResearch.bind(this);
        
    this.state={
        temp:'',
        title: '',
        interests: [],
        Content: ''
    }}
    onChangeInterests(project, e) {
        this.setState({
          temp: e.target.value
        })
      }
      onChangeContent(project, e) {
        this.setState({
          Content: e.target.value
        })
      }
      onChangeTitle(project, e) {
        this.setState({
          title: e.target.value
        })
      }
    componentDidMount() {
        const cookies= new Cookies();
         const token= cookies.get('token');
         
         const {research}=this.props.match.params;
         const usertype=cookies.get("usertype");
        if(usertype !=="consultancy"){
        alert("Invalid Access");
        window.location.replace("/");
        }
        else
        axios.get("http://localhost:5000/api/consultancies/researches/"+{research}.research, {  headers: {
          Authorization: token}
        })
          .then(res => {
            const research = res.data.data;
            this.setState({ 
                title:research.title,
                interests:research.interests,
                Content:research.Content
            });
          })
      }
      updateResearch(e) {
        const cookies = new Cookies();
        const token = cookies.get('token');
        const {research}=this.props.match.params;        
        var words = this.state.temp.split(',');
        
        if (this.state.temp) {
this.setState({
    interests:words
})


let researchnew = {
    title:this.state.title,
    Content:this.state.Content,
    interests:this.state.temp.split(',')
  }
  axios.put('http://localhost:5000/api/consultancies/research/' + {research}.research, researchnew, {
    headers: {
      Authorization: token
    }
  });
        }
        else{
            let researchnew = {
                title:this.state.title,
                Content:this.state.Content,
                interests:this.state.interests
              }
              axios.put('http://localhost:5000/api/consultancies/research/' + {research}.research, researchnew, {
                headers: {
                  Authorization: token
                }
              });  
        }

        this.setState({
            temp: ''
          })

      }


      render(){
          return(
              <ul>
                  {
                      <div className="form-group">
                      <label>Report Title: </label>
                      <input type="text"
                        className="content-editable"
                        value={this.state.title}
                        onChange={(e) => this.onChangeTitle(this.state.title, e)}
                      />
                      <div className="form-group">
                  <label>Report Content: </label>
                  <input type="text"
                    className="content-editable"
                    value={this.state.Content}
                    onChange={(e) => this.onChangeContent(this.state.Content, e)}
                  />
                </div>
                <p>Interests</p>
                  {this.state.interests.map(interest => {
                    return <li>{interest}</li>
                  })}
                  
                    </div>
                    
                  }
                  <form name="myForm">
                    <input type="text"
                      className="form-control"
                      value={this.state.temp}
                      onChange={(e) => this.onChangeInterests(this.state.task, e)}
                    /></form>

                    <br/>
                    <button type='update' onClick={(event) => this.updateResearch(event)}>Update</button><br />

                  </ul>

                  
          )
      }
    
    
    
    
    }