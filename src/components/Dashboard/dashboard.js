import React from "react";
import {NavLink} from "react-router-dom";
import './dashboard.css'
import {
    FaRegChartBar,
    FaUsers, FaRoute
} from "react-icons/fa";
import {BiLogOut} from "react-icons/bi";
import {FiSettings} from "react-icons/fi";

class Dashboard extends React.Component {
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

    menuItem = [
        {
            path: "/users",
            name: "Users",
            icon: <FaUsers/>
        },
        {
            path: "/routeMap",
            name: "Routes history",
            icon: <FaRoute/>
        },
        {
            path: "/reports",
            name: "Reports",
            icon: <FaRegChartBar/>
        },
        {
            path: "/",
            name: "Change password",
            icon: <FiSettings/>
        },
        {
            path: "/",
            name: "Log out",
            icon: <BiLogOut/>
        }
    ]

    render() {
        return (
            <div className={"con"}>
                <div className="sidebar">
                    <div className="top_section">
                        <h1 className="logo">VTS</h1>
                    </div>
                    {
                        this.menuItem.map((item, index) => (
                            <NavLink to={item.path} key={index} className="link">
                                <div className={"icon-wrapper"}>
                                    <div className="icon">{item.icon}</div>
                                    <div className="link_text">{item.name}</div>
                                </div>
                            </NavLink>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default Dashboard