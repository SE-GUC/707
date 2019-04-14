import React, { Component } from 'react';
import Cookies from 'universal-cookie';
const axios = require("axios");


export default class updateAnnouncement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      temp:'',
      announcements: [],
      updatedAnnouncement:{
            title: '',
            type: '',
            content: ''
      }
    }
}
 
      onChangeAnnouncementTitle(announcement,e) {
        announcement.title=e.target.value;        
        this.setState({
            updatedAnnouncement:{
              title: announcement.title,
              type: announcement.type,
              content: announcement.content
              
         } });
    }
    onChangeAnnouncementType(announcement,e) {
        announcement.type=e.target.value;        
      this.setState({
        updatedAnnouncement:{
            title: announcement.title,
            type: announcement.type,
            content: announcement.content
            
       } });
  }
  onChangeAnnouncementContent(announcement,e) {
   
    announcement.content=e.target.value;        
    this.setState({
        updatedAnnouncement:{
            title: announcement.title,
            type: announcement.type,
            content: announcement.content
            
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
    //             content: announcement.content,
    //             skills:announcement.skills,
    //             available:announcement.available
                
    //        } });
    //    }

      componentDidMount() {
         const cookies = new Cookies();
         const token= cookies.get('token')
        axios.get('http://localhost:5000/api/admins/announcements', { headers: {
            Authorization: token}
          })
          .then(res => {
            const announcements = res.data.data;
            this.setState({ announcements });
          })
      }
      rerender(token) {
       axios.get('http://localhost:5000/api/admins/announcements', { headers: {
           Authorization: token}
         })
         .then(res => {
           const announcements = res.data.data;
           this.setState({ announcements });
         })
     }
   async updateAnnouncement(e,announcement){
       const cookies=new Cookies();
       const token= cookies.get('token');
       var words = this.state.temp.split(',');
       if(this.state.temp){
        announcement.skills=words
       }
       
 let announcement2={
    title: announcement.title,
    type: announcement.type,
    content: announcement.content
 }
    console.log(this.state.updatedAnnouncement.type);
    console.log(this.state.updatedAnnouncement.title);
    console.log(announcement._id);
       axios.put('http://localhost:5000/api/admins/announcement/'+announcement._id,announcement2,{ headers: {
        Authorization: token}});
        this.rerender(token);

   }

      render() {
        return (
          <ul>
            { this.state.announcements.map(announcement => <li>
                <p>announcement title: {announcement.title}<br></br>
                announcement type:{announcement.type}<br></br>
                announcement content: {announcement.content}<br></br>
              
               <div className="form-group"> 
                        <label>Announcement Title: </label>
                        <input  type="text"
                                className="content-editable"
                                value={announcement.title}
                                onChange={(e) => this. onChangeAnnouncementTitle(announcement, e)}
                                />
                    </div>
                    <div className="form-group"> 
                        <label> Announcement Type: </label>
                        <input  type="text"
                                className="form-control"
                                value={announcement.type}
                                onChange={(e) => this.onChangeAnnouncementType(announcement, e)}
                                />
                    </div>
                    <div className="form-group"> 
                        <label>Announcement content: </label>
                        <input  type="text"
                                className="form-control"
                                value={announcement.content}
                                onChange={(e) => this.onChangeAnnouncementContent(announcement, e)}
                                />
                    </div>               
                            <div className="list">
           
              <form name="myForm"> 
             
              <ul>
             
               
              </ul>
              </form>
            </div>
                           
                      
               <button type='update' onClick={(event)=>this.updateAnnouncement(event,announcement)}>Update</button><br/>
            </p>   </li>)}

          </ul>
        )
      }
    };