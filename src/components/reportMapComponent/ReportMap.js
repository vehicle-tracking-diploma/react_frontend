import React from "react";
import axios from "axios";
import {
    GoogleMap,
    LoadScript,
    MarkerF
} from "@react-google-maps/api";

class ReportMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    containerStyle = {
        width: '100%',
        height: '700px'
    };

    center = {
        lat: 51.129313,
        lng: 71.439246
    };

    componentDidMount() {
        const location = window.location.href.split('/')[3]
        const id = location.split("=")[1]
        console.log(id)
        axios({
            url: `http://localhost:8080/api/v1/report`,
            method: 'GET',
            params: {
                reportId: id
            }
        }).then(response => {
            console.log(response.data)
            this.setState({
                coordinates: {
                    lat: parseFloat(response.data.latitude),
                    lng: parseFloat(response.data.longitude)
                }
            })
        });

    }


    render() {
        return (
            <div className={"d-flex justify-content-center align-items-center w-100"}>
                {
                    this.state.coordinates !== undefined ? (
                        <LoadScript
                            googleMapsApiKey="AIzaSyAkvV72uGI04gRtFVa15c5cIgZw8dfAMs4"
                        >
                            <GoogleMap
                                mapContainerStyle={this.containerStyle}
                                center={this.center}
                                zoom={10}
                            >
                                <MarkerF position={this.state.coordinates}/>
                            </GoogleMap>
                        </LoadScript>
                    ) : (
                        <div>Coordinates are not set</div>
                    )
                }
            </div>
        )
    }
}

export default ReportMap