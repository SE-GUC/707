import React, { Component } from 'react';
import Cookies from 'universal-cookie';
const axios = require("axios");


export default class deleteReport_cons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      temp:'',
      reports: [],
      updatedreport:{
            title: '',
            type: '',
            Content: ''
      }
    }
}
 
      onChangeAnnouncementTitle(report,e) {
        report.title=e.target.value;        
        this.setState({
            updatedreport:{
              title: report.title,
              type: report.type,
              Content: report.Content
              
         } });
    }
    onChangeAnnouncementType(report,e) {
        report.type=e.target.value;        
      this.setState({
        updatedreport:{
            title: report.title,
            type: report.type,
            Content: report.Content
            
       } });
  }
  onChangeAnnouncementContent(report,e) {
   
    report.Content=e.target.value;        
    this.setState({
        updatedreport:{
            title: report.title,
            type: report.type,
            Content:  report.Content
            
       } });
           
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
         const token= cookies.get('token')
        axios.get('http://localhost:5000/api/consultancies/reports', { headers: {
            Authorization: token}
          })
          .then(res => {
            const reports = res.data.data;
            this.setState({ reports });
          })
      }
      rerender(token) {
       axios.get('http://localhost:5000/api/consultancies/reports', { headers: {
           Authorization: token}
         })
         .then(res => {
           const reports = res.data.data;
           this.setState({ reports });
         })
     }
   async updateReport(e,report){
       const cookies=new Cookies();
       const token= cookies.get('token');
       var words = this.state.temp.split(',');
       if(this.state.temp){
        report.skills=words
       }
       
 let report2={
    title: report.title,
    type: report.type,
    Content: report.Content
 }
    console.log(this.state.updatedreport.type);
    console.log(this.state.updatedreport.title);
    console.log(report._id);
       axios.put('http://localhost:5000/api/consultancies/report/'+report._id,report2,{ headers: {
        Authorization: token}});
        this.rerender(token);

   }

      render() {
        return (
          <ul>
            { this.state.reports.map(report => <li>
                <p>report title: {report.title}<br></br>
                report interests:{report.interests}<br></br>
                report Content: {report.Content}<br></br>
              
               <div className="form-group"> 
                        <label>report Title: </label>
                        <input  type="text"
                                className="Content-editable"
                                value={report.title}
                                onChange={(e) => this. onChangeAnnouncementTitle(report, e)}
                                />
                    </div>
                    <div className="form-group"> 
                        <label> Report interests: </label>
                        <input  type="text"
                                className="form-control"
                                value={report.type}
                                onChange={(e) => this.onChangeAnnouncementType(report, e)}
                                />
                    </div>
                    <div className="form-group"> 
                        <label>report Content: </label>
                        <input  type="text"
                                className="form-control"
                                value={report.Content}
                                onChange={(e) => this.onChangeAnnouncementContent(report, e)}
                                />
                    </div>               
                            <div className="list">
           
              <form name="myForm"> 
             
              <ul>
             
               
              </ul>
              </form>
            </div>
                           
                      
               <button type='update' onClick={(event)=>this.updateReport(event,report)}>Update</button><br/>
            </p>   </li>)}

          </ul>
        )
      }
    };