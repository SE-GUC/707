import React, { Component } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';

export default class Createuser extends Component {

    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onChangeInterests = this.onChangeInterests.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: '',
            Content: '',
            interests:[]
         //   todo_completed: false
        }
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeContent(e) {
        this.setState({
            Content: e.target.value
        });
    }

    onChangeInterests(e) {
        var temp=e.target.value
        this.setState({
            interests: temp.split(',')
        });
    }


    onSubmit(e) {
        e.preventDefault();
        const cookies = new Cookies();
        const token = cookies.get('token');
        const user = {
            Content: this.state.Content,
            title: this.state.title,
            interests: this.state.interests
            //todo_completed: this.state.todo_completed
        };
        // axios.post('http://localhost:5000/api/'+this.state.type+'/register', user)
//https://lirtenhub-707.herokuapp.com/api/
  
        axios.post('http://localhost:5000/api/consultancies/research', user,{headers: {
            Authorization: token
          }
        })
            
           // <Redirect to="/register"/>
            this.setState({
                title: '',
                Content: '',
                interests: []
            })
    }

    render() {
        const cookies =new Cookies();
        const usertype=cookies.get("usertype");
        if(usertype !=="consultancy"){
        alert("Invalid Access");
        window.location.replace("/");
        }
        else
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Research</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Title: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.title}
                                onChange={this.onChangeTitle}
                                />
                    </div>
                    <div className="form-group">
                        <label>Content: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.Content}
                                onChange={this.onChangeContent}
                                />
                    </div>
                    <div className="form-group">
                    <label>Interests: </label>
                            <input   type="text" 
                                    className="form-control"
                                    value={this.state.interests}

                                    onChange={this.onChangeInterests}
                                    />
                            
                        </div>
                       
                         
                       
                   

                    <div className="form-group">
                        <input type="submit" value="Create Research" className="btn btn-primary" />
                    </div>
                </form>

      </div>
    );
  }
}
