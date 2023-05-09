import React from 'react';
import Reports from "./components/ReportsComponent/reports";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ReportMap from "./components/reportMapComponent/ReportMap";
import RoutesMap from "./components/RoutesMapComponent/Routes";
import Login from "./components/loginComponent/login";
import Users from "./components/usersComponent/users";
import AdminDashboard from "./components/AdminDashboard/adminDashboard";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/reportMap" element={<ReportMap/>}/>
                        <Route path="/reports" element={<Reports/>}/>
                        <Route path="/routeMap" element={<RoutesMap/>}/>
                        <Route path="/" element={<Login/>}/>
                        <Route path="/users" element={<Users/>}/>
                        <Route path="/admin" element={<AdminDashboard/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
