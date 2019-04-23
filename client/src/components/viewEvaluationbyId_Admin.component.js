import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
const axios = require("axios");


export default class viewEvaluationbyId_Admin extends Component {
    constructor(props) {
        super(props);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onChangeTotal = this.onChangeTotal.bind(this);
        this.onChangePassing = this.onChangePassing.bind(this);

        this.state = {
            evaluations: [],
            eval_id: '',
            type: '',
            content: '',
            total: '',
            passing: '',
            contexteditable: false

        }
    }
    handleClick(evaluationid, e) {
        console.log(evaluationid);
        window.location.replace("/viewOneEvaluationbyId_Admin/" + evaluationid._id)
    }
    showOneEvaluation(id) {
        window.location.replace("/viewOneEvaluation_Admin/" + id)
    };
    onChangeType(e) {
        this.setState({
            type: e.target.value
        });
    }
    onChangeContent(e) {
        this.setState({
            content: e.target.value
        });
    }
    onChangeTotal(e) {
        this.setState({
            total: e.target.value
        });
    }
    onChangePassing(e) {
        this.setState({
            passing: e.target.value
        });
    }
    //certificate/evaluationTests/:certificateID/:evaluationID
    deleteOneEvaluation(id) {
        const cookies = new Cookies();
        const token = cookies.get('token');
        const { evaluation } = this.props.match.params;        
        axios.delete('http://localhost:5000/api/admins/certificate/evaluationTests/' + { evaluation }.evaluation + '/' + id, {
            headers: {
                Authorization: token
            }

                })
                .then(res => {
                    console.log(res.data.data);
                    this.setState({
                        eval_id: '',
                        type: '',
                        content: '',
                        total: '',
                        passing: ''
                        //contexteditable: false
                });
                window.location.reload();
                
            
            });
        
    };
    editOneEvaluation(id) {
        const cookies = new Cookies();
        const token = cookies.get('token');
        console.log(this.state.contexteditable);
        const { evaluation } = this.props.match.params;        
        if (!this.state.contexteditable) {
            axios.get('http://localhost:5000/api/admins/certificate/evaluationTest/' +id, {
                headers: {
                    Authorization: token
                }
            })
                .then(res => {
                    console.log(res.data.data);
                    const evaluations = res.data.data;
                    this.setState({
                        eval_id: evaluations._id,
                        type: evaluations.type,
                        content: evaluations.content,
                        total: evaluations.totalScore,
                        passing: evaluations.passingScore,
                        contexteditable: true
                    });
                    

                })

        }
        else {
            const { evaluation } = this.props.match.params;
            let updatedevaluation = {
                content: this.state.content,
                type: this.state.type,
                totalScore: this.state.total,
                passingScore: this.state.passing
            }
            axios.put('http://localhost:5000/api/admins/certificate/evaluationTests/' + { evaluation }.evaluation + '/' + this.state.eval_id, updatedevaluation, {
                headers: {
                    Authorization: token
                }
            })
                .then(res => {
                    this.setState({
                        eval_id: '',
                        type: '',
                        content: '',
                        total: '',
                        passing: '',
                        contexteditable: false
                    })
                    console.log(res.data.data);
                    window.location.reload();
               
                
        axios.get('http://localhost:5000/api/admins/certificate/evaluationTests/' + { evaluation }.evaluation, {
            headers: {
                Authorization: token
            }
        })
            .then(res => {
                console.log(res.data.data);
                const evaluations = res.data.data;
                this.setState({ evaluations });
            }) })
                }
    };
  
    componentDidMount() {
        const cookies = new Cookies();
        const token = cookies.get('token');
        const { evaluation } = this.props.match.params;
        console.log({ evaluation }.evaluation);

        axios.get('http://localhost:5000/api/admins/certificate/evaluationTests/' + { evaluation }.evaluation, {
            headers: {
                Authorization: token
            }
        })
            .then(res => {
                console.log(res.data.data);
                const evaluations = res.data.data;
                this.setState({ evaluations });
            })

    }

    render() {
        if (!this.state.contexteditable)
            return (
                <ul>

                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Evaluation Type</th>
                                <th>Evaluation Content</th>
                                <th>Evaluation Total Score</th>
                                <th>Evaluation Passing Score</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        {this.state.evaluations.map(person =>

                            <tbody>
                                <tr >
                                    <td >{person.type}</td>
                                    <td> {person.content}</td>
                                    <td>{person.totalScore}</td>
                                    <td>{person.passingScore}</td>
                                    <td>
                                    <button id="btn1" onClick={this.editOneEvaluation.bind(this, person._id)}>Edit</button></td>
                                   <td> <button id="btn2" onClick={this.deleteOneEvaluation.bind(this, person._id)}>Delete</button></td>

                                </tr>
                            </tbody>
                        )}
                    </Table>



                </ul>
            );
        else
            return (
                <Form>
                    <Form.Group controlId="formContent">
                        <Form.Label>Evaluation Content</Form.Label>
                        <Form.Control type="text" placeholder={this.state.content} onChange={this.onChangeContent} />
                        <Form.Text className="text-muted">
                            Please Enter the content to update</Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formType">
                        <Form.Label>Type</Form.Label>
                        <Form.Control type="text" placeholder={this.state.type} onChange={this.onChangeType} />
                    </Form.Group>
                    <Form.Group controlId="formPassing">
                        <Form.Label>Passing Grade</Form.Label>
                        <Form.Control type="text" placeholder={this.state.passing} onChange={this.onChangePassing} />
                    </Form.Group>
                    <Form.Group controlId="formTotal">
                        <Form.Label>Total Grade</Form.Label>
                        <Form.Control type="text" placeholder={this.state.total} onChange={this.onChangeTotal} />
                    </Form.Group>
                    <button id="btn1" onClick={this.editOneEvaluation.bind(this, this.state.eval_id)}>Edit</button>


                </Form>
            );
    }


}