import React, { Component } from 'react';
export default class Report extends Component{
    constructor(props){
        super(props)
    }


    render(){
    const report= this.props.report
    return(
        <ul>
           
            

                <li> Title: {report.title}</li>
                     <br></br>
                <li> Interests: {report.interests.map(interest=>
                      <p> {interest}</p> 
                 )}</li> 
                    <br></br>
                <li> Content: {report.Content} </li> 
          
            
        </ul>
    )
}

};