import React, { Component } from 'react';
import Cookies from 'universal-cookie';
const axios = require("axios");

export default class getcertificatebyID_cons extends Component {

    state = {
        certificates: []
      }
    
      componentDidMount() {
        const cookies= new Cookies();
         const token= cookies.get('token')
        axios.get("http://localhost:5000/api/consultancies/certificates", {  headers: {
          Authorization: token}
        })
          .then(res => {
            const certificates = res.data.data;
            this.setState({ certificates });
          })
      }
      onSubmit(id) {

        const cookies = new Cookies();

        const token= cookies.get('token');

        console.log(token)

        axios.get('http://localhost:5000/api/consultancies/certificate/'+ id, { headers: {

            Authorization: token}

          })

          .then(res => {

            const certificates = res.data.data;
            this.setState({certificates:[certificates]})
            console.log(certificates);
            this.rerender(token,id);

          })

    }

    onSubmit2(id1,id) {

        window.location.replace("/takeEvalCons/"+id1+"/"+id)
        
    }
    
    rerender(token,id) {
        axios.get('http://localhost:5000/api/consultancies/certificate/'+id, { headers: {

            Authorization: token}

          })


          .then(res => {
            const certificates = [res.data.data];

            this.setState({ certificates });

            console.log(certificates);

          })

      }
      render() {
        return (
          <ul>
            { this.state.certificates.map(person => <li>
                <p>
                Certificate name: {person.name}<br></br> 
                certificate description: {String (person.description)}<br></br>
                Certificate category: {String (person.category)}<br></br>
                Certificate Skills:{person.skills.map(skill=>
                 <p>
                    skill:{skill}
                  </p>    
                    )}<br></br> 
                certificate available: {String (person.available)}<br></br>

                <button type="button" className="btn btn-success" onClick={this.onSubmit.bind(this, person._id)}>Get certificate</button><br></br>
           
                Certificate EvaluationTests  : {person.evaluationTests.map(evaluationTest =>
                    <p>
                        <br></br>
                        evaluation type: {evaluationTest.type},<br></br>
                        evaluation content:{evaluationTest.content}<br></br>
                        <br></br>
            <div className="form-group">
            <input
              type="submit"
              value="take evaluation"
              className="btn btn-primary"
              onClick={this.onSubmit2.bind(this, person._id, evaluationTest._id)}
            />
            </div>
                    </p>)}<br></br>  
                
            </p>   </li>)}

         
          </ul>
        )
      }
    

}