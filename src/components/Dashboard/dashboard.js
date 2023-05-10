import React from "react";
import {NavLink} from "react-bootstrap";
import  './dashboard.css'
import {
    FaTh,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList
}from "react-icons/fa";
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
            path: "/",
            name: "Dashboard",
            icon:<FaTh/>
        },
        {
            path: "/about",
            name: "About",
            icon:<FaUserAlt/>
        },
        {
            path: "/analytics",
            name: "Analytics",
            icon:<FaRegChartBar/>
        },
        {
            path: "/comment",
            name: "Comment",
            icon:<FaCommentAlt/>
        },
        {
            path: "/product",
            name: "Product",
            icon:<FaShoppingBag/>
        },
        {
            path: "/productList",
            name: "Product List",
            icon:<FaThList/>
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
                                <div className="icon">{item.icon}</div>
                                <div className="link_text">{item.name}</div>
                            </NavLink>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default Dashboard