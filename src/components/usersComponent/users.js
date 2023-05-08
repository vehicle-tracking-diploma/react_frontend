import React from "react";
import axios from "axios";
import {Button, Modal} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            show: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/v1/users')
            .then(response => {
                this.setState({
                    users: response.data,
                })
                console.log(response.data)
            }).catch(error => {
            console.error(error);
        });
    }

    handleClose = () => {
        this.setState({
            show: false
        })
    }
    handleShow = () => {
        this.setState({
            show: true
        })
    }

    render() {
        return (
            <div className={"d-flex justify-content-center align-items-center"} style={{height:"100vh"}}>
                <div>
                    <Table striped bordered hover className={"shadow-lg"}>
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>firstname</th>
                            <th>lastname</th>
                            <th>email</th>
                            <th>roles</th>
                            <th>cars</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.users.map(user => (
                                <tr>
                                    <td>{user.id}</td>
                                    <td>{user.firstname}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.email}</td>
                                    <td>{
                                        <Form.Select>
                                            {
                                                user.roles.map(role => (
                                                    <option>{role.name}</option>
                                                ))
                                            }
                                        </Form.Select>
                                    }</td>
                                    <td>
                                        <Form.Select>
                                            {
                                                user.cars.map(car => (
                                                    <option>{car.govId}</option>
                                                ))
                                            }
                                        </Form.Select>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                    <br/>
                    <Button variant="outline-primary" onClick={this.handleShow}>Add a new user</Button>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add a new user</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email"/>
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password"/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Check me out"/>
                                </Form.Group>

                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Users