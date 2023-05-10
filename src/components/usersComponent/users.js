import React from "react";
import axios from "axios";
import {Alert, Button, Modal} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            cars: [],
            show: false,
            alert: "",
            firstname: "",
            lastname: "",
            password: "",
            checkPassword: "",
            isAdmin: false,
            email: "",
            color: 'danger',
            showAssign: false,
            selectedUser: "",
            selectedCars: [],
            alertAssign: "",
            alertAssignColor: 'danger'
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/v1/users')
            .then(response => {
                this.setState({
                    users: response.data,
                })
            }).catch(error => {
            console.error(error);
        });
        axios.get('http://localhost:8080/api/v1/cars')
            .then(response => {
                this.setState({
                    cars: response.data,
                })
                console.log(response.data)
            }).catch(error => {
            console.error(error);
        });
    }

    handleClose = () => {
        this.setState({
            show: false,
            alert: "",
            color: 'danger'
        })
    }
    handleShow = () => {
        this.setState({
            show: true
        })
    }
    handleCloseAssignCar = () => {
        this.setState({
            showAssign: false,
            selectedCars: []
        })
    }
    handleShowAssignCar = () => {
        this.setState({
            showAssign: true
        })
    }
    setSelectedUser = (user) => {
        this.setState({
            selectedUser: user
        })
        this.handleShowAssignCar()
    }
    handleFirstnameChange = (e) => {
        this.setState({
            firstname: e.target.value
        })
    }
    handleLastnameChange = (e) => {
        this.setState({
            lastname: e.target.value
        })
    }
    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    handleCheckPasswordChange = (e) => {
        this.setState({
            checkPassword: e.target.value
        })
    }
    handleIsAdminChange = (e) => {
        this.setState({
            isAdmin: e.target.value
        })
    }
    handleSelectChange = (event) => {
        const options = event.target.options;
        const selectedValues = [];

        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedValues.push(options[i].value);
            }
        }
        this.setState({
            selectedCars: selectedValues
        })
    };
    handleAddUser = () => {
        console.log(this.state.password, this.state.checkPassword, this.state.email, this.state.isAdmin)
        if (this.state.email === "" || this.state.firstname === "" || this.state.lastname === "" || this.state.password === "" ||
            this.state.checkPassword === "") {
            this.setState({
                alert: "Fill all fields",
            })
            return
        }
        if (this.state.password.length < 4) {
            this.setState({
                alert: "Password length is short",
            })
            return
        }
        if (this.state.password !== this.state.checkPassword) {
            this.setState({
                alert: "Passwords don't match",
            })
            return
        }
        const body = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password
        }
        axios.post('http://localhost:8080/api/v1/user', body)
            .then(response => {
                if (response.status === 201) {
                    this.setState({
                        alert: "User created",
                        color: 'success'
                    })
                } else {
                    this.setState({
                        alert: "User already exists",
                    })
                }
            }).catch(error => {
            this.setState({
                alert: "Error in creating user",
            })
            console.error(error);
        })
    }
    handleSubmitAssignToUser = () => {
        if (this.state.selectedCars.length === 0) {
            this.setState(({
                alertAssign: "Choose the cars"
            }))
        }
        const body = {
            email: this.state.selectedUser,
            govIds: this.state.selectedCars
        }
        axios.post('http://localhost:8080/api/v1/assign/car', body)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        alertAssign: "Car assigned to user" + this.state.selectedUser,
                        alertAssignColor: 'success'
                    })
                }
            }).catch(err => {
            this.setState({
                alertAssign: "Error in assigning the cars"
            })
            console.log(err)
        })
    }

    render() {
        return (
            <div className={"d-flex justify-content-center align-items-center w-100"}>
                <div className={"w-75"}>
                    <Table responsive={true} striped bordered hover className={"shadow-lg"}>
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>firstname</th>
                            <th>lastname</th>
                            <th>email</th>
                            <th>roles</th>
                            <th>cars</th>
                            <th>Assign car</th>
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
                                    <td>
                                        <Button variant="outline-secondary"
                                                onClick={() => this.setSelectedUser(user.email)}>Assign car</Button>
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
                                <Form.Group className="mb-3">
                                    <Form.Label>Firstname</Form.Label>
                                    <Form.Control type="text" placeholder="Enter firstname"
                                                  onChange={this.handleFirstnameChange}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Lastname</Form.Label>
                                    <Form.Control type="text" placeholder="Enter lastname"
                                                  onChange={this.handleLastnameChange}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="text" placeholder="Enter email"
                                                  onChange={this.handleEmailChange}/>
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password"
                                                  onChange={this.handlePasswordChange}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Check password</Form.Label>
                                    <Form.Control type="password" placeholder="password"
                                                  onChange={this.handleCheckPasswordChange}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Check type="checkbox" label="is Admin"
                                                onChange={this.handleIsAdminChange}/>
                                </Form.Group>
                            </Form>
                            {this.state.alert !== "" &&
                                <Alert variant={this.state.color}>{this.state.alert}</Alert>}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" type="submit" onClick={this.handleAddUser}>
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={this.state.showAssign} onHide={this.handleCloseAssignCar}>
                        <Modal.Header closeButton>
                            <Modal.Title>Assign car to {this.state.selectedUser}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {
                                <Form.Select multiple value={this.state.selectedCars}
                                             onChange={this.handleSelectChange}>
                                    {
                                        this.state.cars.map(car => (
                                            <option>{car.govId}</option>
                                        ))
                                    }
                                </Form.Select>
                            }
                            <p>Selected cars: {this.state.selectedCars.join(', ')}</p>
                        </Modal.Body>
                        {this.state.alertAssign !== "" &&
                            <Alert variant={this.state.alertAssignColor}>{this.state.alertAssign}</Alert>}
                        <Modal.Footer>
                            <Button variant="primary" onClick={this.handleSubmitAssignToUser}>
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