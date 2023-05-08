import React from 'react';
import DownloadLink from "./components/DownloadLinkComponent/downloadLink";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ReportMap from "./components/reportMapComponent/ReportMap";
import RoutesMap from "./components/RoutesMapComponent/Routes";
import Login from "./components/loginComponent/login";
import Users from "./components/usersComponent/users";

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
                        <Route path="/reports" element={<DownloadLink/>}/>
                        <Route path="/routeMap" element={<RoutesMap/>}/>
                        <Route path="/" element={<Login/>}/>
                        <Route path="/users" element={<Users/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
