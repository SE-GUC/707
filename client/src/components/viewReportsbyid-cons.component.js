import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Table from 'react-bootstrap/Table';
const axios = require("axios");

export default class getallReports extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onChangeEmailType = this.onChangeEmailType.bind(this);
    this.onChangeInterests=this.onChangeInterests.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        title: '',
        Content: '',
        emailType: '',
        receiverEmail:'',
        reports:[],
        interests:[],
        createReport:false
        
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

onChangeEmailType(e) {
  this.setState({
      emailType: e.target.value
  });
}
onChangeInterests(e) {
  var interest = e.target.value.split(",");
  this.setState({
      interests: interest
  });
}
onSubmit(e) {
  e.preventDefault();
  
  console.log(`Title: ${this.state.title}`);
  console.log(`Content: ${this.state.Content}`);
  const report = {
      title: this.state.title,
      Content: this.state.Content,
      interests: this.state.interests
  };
   const cookies= new Cookies();
   const token= cookies.get('token')
  axios.post("http://localhost:5000/api/consultancies/report",report,{  headers: {
      Authorization: token}
    })
      .then(res => alert("Report created successfully "));
      this.setState({
      title: '',
      Content: '',
      interests:[]
      })
}
      componentDidMount() {
        const cookies= new Cookies();
         const token= cookies.get('token')
        axios.get("http://localhost:5000/api/consultancies/reports", {  headers: {
          Authorization: token}
        })
          .then(res => {
            const reports = res.data.data;
            this.setState({ reports });
          })
      }
      
      onSubmit2(id) {

        const cookies = new Cookies();

        const token= cookies.get('token');

        console.log(token)

        axios.delete('http://localhost:5000/api/consultancies/report/'+ id, { headers: {

            Authorization: token}

          })

          .then(res => {

            const deletedEmail = res.data.data;
            alert("You deleted this report successfully ");
           
            this.rerender2(token);
          })

    }

    rerender2(token) {
        axios.get('http://localhost:5000/api/consultancies/reports', { headers: {

            Authorization: token}

          })

          .then(res => {
            const reports = res.data.data;

            this.setState({ reports });

            console.log(reports);

          })

      }
      redirect(e){
        this.setState({createReport:true})
    }
    onSubmit3(id) {
        
      const cookies = new Cookies();

      const token= cookies.get('token');

      console.log(token)

      axios.get('http://localhost:5000/api/consultancies/report/'+ id, { headers: {

          Authorization: token}

        })

        .then(res => {

          const reports = res.data.data;

          console.log(reports);
          this.rerender(token,id);

        })

  }
  rerender(token,id) {
    axios.get('http://localhost:5000/api/consultancies/report/'+id, { headers: {

        Authorization: token}

      })


      .then(res => {
        const reports = [res.data.data];

        this.setState({ reports });

        console.log(reports);

      })

  }

     
      render() {
        if(this.state.createReport){
          return (
            <div style={{marginTop: 10}}>
                <h3>Create new Report</h3>
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
                        <textarea
                                type="text" 
                                className="form-control"
                                value={this.state.Content}
                                onChange={this.onChangeContent}
                                />
                     </div>
                     <div className="form-group">
                        <label>Interests: </label>
                        <textarea
                                type="text" 
                                className="form-control"
                                value={this.state.interests}
                                onChange={this.onChangeInterests}
                                />
                     </div>
                     
                    <div className="form-group">
                        <input type="submit" value="Create New Report" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    
        }else{
        return (
          <ul>
             
                <button type="button" className="btn btn-danger" onClick={this.redirect.bind(this)}>Create new report</button>
                
             
             <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                
                                <th>Report Title</th>
                                <th>Report Content</th>
                                <th>Report interests</th>
                                <th>Delete</th>
                                <th>View</th>
                            </tr>
                        </thead>
            { this.state.reports.map(sent => (
              <tbody>
            <tr >
                <td> {sent.title}<br></br></td>
                <td> {sent.Content}<br></br></td>
                <td>{sent.interests.map(interest =>
                    <p>
                        interest: {interest}
                    </p>)}<br></br></td> 
                   
                
                <td><button type="button" className="btn btn-danger" onClick={this.onSubmit2.bind(this, sent._id)}>Delete</button><br></br></td>
                     
                <td><button type="button" className="btn btn-danger" onClick={this.onSubmit3.bind(this, sent._id)}>view report</button><br></br></td> 
                 
         
                                </tr>
                           <tr>     
                  </tr>
                            </tbody>
                            
                       ) )}
                        </Table>

             <br/>  
             <br/>
             </ul>
             );
            }
      }
    

};