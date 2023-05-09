import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";

class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                sub: "usr"
            },
            isAdmin: false
        };
    }

    componentDidMount() {
        const curUser = localStorage.getItem("user")
        const parsed = JSON.parse(curUser)
        this.setState({
            user: parsed
        })
        if (parsed.roles.includes('ROLE_ADMIN')) {
            this.setState({
                isAdmin: true
            })
        }
    }

    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">VTS</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {this.state.isAdmin && <Nav.Link href="#home">Users</Nav.Link>}
                            <Nav.Link href="#link">Reports</Nav.Link>
                            <Nav.Link href="#link">Routes</Nav.Link>
                            <Nav.Link href="#link">Change password</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: <a href="#login">{this.state.user.sub}</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default AdminDashboard