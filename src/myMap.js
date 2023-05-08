import React from "react";
import {
    DirectionsRenderer,
    DirectionsService,
    GoogleMap,
    InfoWindowF,
    LoadScript,
    MarkerF
} from "@react-google-maps/api";
import Form from "react-bootstrap/Form";


class MyMap extends React.Component {
    containerStyle = {
        width: '100%',
        height: '700px'
    };

    center = {
        lat: 51.129313,
        lng: 71.439246
    };

    constructor(props) {
        super(props);
        this.state = {
            showInfoWindow: false,
            route: {
                origin: {
                    lat: 51.125372,
                    lng: 71.431394
                },
                destination: {
                    lat: 51.110868,
                    lng: 71.416471
                }
            },
            car: "car1"
        };
    }

    arr = [
        {
            name: "car1",
            origin: {
                lat: 51.125372,
                lng: 71.431394
            },
            destination: {
                lat: 51.110868,
                lng: 71.416471
            }
        },
        {
            name: "car2",
            origin: {
                lat: 51.089731,
                lng: 71.424858
            },
            destination: {
                lat: 51.092224,
                lng: 71.450458
            }
        },
        {
            name: "car3",
            origin: {
                lat: 51.070761,
                lng: 71.417802
            },
            destination: {
                lat: 51.090750,
                lng: 71.403019
            }
        }
    ]
    changeCar = (event) => {
        this.setState({
            car: event.target.value
        })
        console.log(event.target.value);
    };
    toggleInfoWindow = () => {
        this.setState((prevState) => ({
            showInfoWindow: !prevState.showInfoWindow
        }))
    };
    directionsCallback = (response) => {
        if (response !== null) {
            this.setState(() => ({
                response
            }));
        }
    };
    update = () => {
        const car = this.arr.find(x => x.name === this.state.car)
        this.setState({
            route: {
                origin: {
                    lat: car.origin.lat,
                    lng: car.origin.lng
                },
                destination: {
                    lat: car.destination.lat,
                    lng: car.destination.lng
                }
            },
        })
    }

    render() {
        return (
            <LoadScript
                googleMapsApiKey="AIzaSyAkvV72uGI04gRtFVa15c5cIgZw8dfAMs4"
            >
                <Form.Select onChange={this.changeCar}>
                    {
                        this.arr.map(cur => (
                            <option>{cur.name}</option>
                        ))
                    }
                </Form.Select>
                <button onClick={this.update}>Change car</button>
                <GoogleMap
                    mapContainerStyle={this.containerStyle}
                    center={this.center}
                    zoom={10}
                >
                    {this.state.response !== null && (
                        <DirectionsRenderer
                            options={{directions: this.state.response}}
                        />
                    )}
                    <DirectionsService
                        options={{
                            origin: this.state.route.origin,
                            destination: this.state.route.destination,
                            travelMode: 'DRIVING'
                        }}
                        callback={this.directionsCallback}
                    />
                    <MarkerF position={this.center} onClick={this.toggleInfoWindow}>
                        {this.state.showInfoWindow && (
                            <InfoWindowF onCloseClick={this.toggleInfoWindow}>
                                <div>
                                    <h3>Custom Marker</h3>
                                    <p>Custom marker text goes here.</p>
                                </div>
                            </InfoWindowF>
                        )}
                    </MarkerF>
                </GoogleMap>
            </LoadScript>
        )
    }
}

export default MyMap;