import React from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    send = () => {
        axios.post('http://localhost:8080/api/v1/login', {
            email: this.state.email,
            password: this.state.password
        }).then(response => {
            const token = response.data;
            const payload = token.split('.')[1];
            const decodedPayload = atob(payload);
            console.log(JSON.parse(decodedPayload));
            localStorage.setItem("user", decodedPayload)
        }).catch(error => {
            console.error(error);
        });

    }

    emailOnChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    passwordOnChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    render() {
        return (
            <div className={"d-flex justify-content-center align-items-center"} style={{height: "100vh"}}>
                <Form className={"w-25"}>
                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type={"text"} placeholder={"Enter email"}
                                      onChange={this.emailOnChange}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type={"password"} placeholder={"Enter password"}
                                      onChange={this.passwordOnChange}></Form.Control>
                    </Form.Group>
                    <Button onClick={this.send} className={"mt-3"} variant="outline-primary">Submit</Button>
                </Form>
            </div>
        )
    }
}

export default Login