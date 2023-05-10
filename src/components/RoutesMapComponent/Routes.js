import React from "react";
import axios from "axios";
import {GoogleMap, LoadScript, MarkerF} from "@react-google-maps/api";
import {Button, Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";


class RoutesMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: [],
            drivers: [],
            selectedCar: "",
            selectedDate: "",
            routes: [],
            selectedRouteId: "",
            route: {},
            showNotFound: false,
            show: false
        };
    }

    containerStyle = {
        width: '100%',
        height: '750px'
    };

    center = {
        lat: 51.129313,
        lng: 71.439246
    };

    componentDidMount() {
        const curUser = localStorage.getItem("user")
        const parsed = JSON.parse(curUser)
        console.log(parsed)
        let url = 'http://localhost:8080/api/v1/cars'
        let params = {}
        if (!parsed.roles.includes('ROLE_ADMIN')) {
            url = 'http://localhost:8080/api/v1/user/cars'
            params = {
                email: parsed.sub
            }
        }
        axios.get(url,{params})
            .then(response => {
                this.setState({
                    cars: response.data,
                })
                console.log(response.data)
            }).catch(error => {
            console.error(error);
        });
    }

    handleDateChange = (event) => {
        const selected = event.target.value
        this.setState({
            selectedDate: selected
        })
        console.log(selected)
    }
    handleSelectChange = (event) => {
        const selected = event.target.value
        this.setState({
            selectedCar: selected
        })
        console.log(selected)
    }
    handleSubmit = () => {
        const car = this.state.cars.find(x => x.govId === this.state.selectedCar)
        const trip = car.trips.filter(x => x.date === this.state.selectedDate)
        if (trip.length > 0) {
            console.log(trip)
            trip.forEach((el, i) => {
                const newElement = {
                    id: ++i,
                    origin: {
                        lat: parseFloat(el.originLat),
                        lng: parseFloat(el.originLng)
                    },
                    destination: {
                        lat: parseFloat(el.destLat),
                        lng: parseFloat(el.destLng)
                    }
                }
                this.setState(prevState => ({
                    routes: [...prevState.routes, newElement]
                }))
            })
            this.state({
                showNotFound: false
            })
        } else {
            this.setState({
                routes: [],
                showNotFound: true
            })
            console.log("trip not found")
        }
    }
    handleRouteChange = (event) => {
        const id = event.target.value
        this.setState({
            selectedRouteId: id
        })
    }
    handleRouteSubmit = () => {
        const curRoute = this.state.routes.find(x => x.id == this.state.selectedRouteId)
        if (curRoute !== undefined && curRoute) {
            this.setState({
                route: curRoute,
            })
        } else {
            this.setState({
                route: {},
            })
        }
        this.handleShow()
        console.log(curRoute)
    }
    handleClose = () => {
        this.setState({
            show: false
        })
        window.location.reload()
    }
    handleShow = () => {
        this.setState({
            show: true
        })
    }

    render() {
        return (
            <div className={"w-100 bg-light align-items-center d-flex justify-content-center"}>
                <div className={"w-25"}>
                    <div>
                        <Form>
                            <Form.Select className={"mt-2"} onClick={this.handleSelectChange}>
                                {
                                    this.state.cars.map(car => (
                                        <option>{car.govId}</option>
                                    ))
                                }
                            </Form.Select>
                            <Form.Control className={"mt-2"} type={"date"} onChange={this.handleDateChange}/>
                            <Button className={"mt-2 w-100"} variant="outline-primary"
                                    onClick={this.handleSubmit}>Submit</Button>
                        </Form>
                        <div>
                            <div className={"badge bg-primary text-wrap p-3 mt-2 w-100"}>Selected
                                car: {this.state.selectedCar}</div>
                            <br/>
                            <div className={"badge bg-primary text-wrap p-3 mt-2 w-100"}>Selected
                                date: {this.state.selectedDate}</div>
                        </div>
                        {this.state.routes.length > 0 ? (
                            <div className={"d-flex mt-2"}>
                                <Form.Select className={""} onClick={this.handleRouteChange}>
                                    {
                                        this.state.routes.map(route => (
                                            <option>{route.id}</option>
                                        ))
                                    }
                                </Form.Select>
                                <Button className={"ms-2"} variant="outline-primary"
                                        onClick={this.handleRouteSubmit}>Show
                                    on
                                    map</Button>
                            </div>
                        ) : (
                            this.state.showNotFound ? (
                                <div className={"badge bg-primary text-wrap p-3 mt-2 w-100"}>Trip not found</div>
                            ) : (
                                <div className={"badge bg-primary text-wrap p-3 mt-2 w-100"}>Choose the car and date</div>
                            )
                        )}
                    </div>
                </div>
                <div>
                    {
                        Object.keys(this.state.route).length > 0 && (
                            <Modal show={this.state.show} onHide={this.handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>The route</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <LoadScript
                                        googleMapsApiKey="AIzaSyAkvV72uGI04gRtFVa15c5cIgZw8dfAMs4"
                                    >
                                        <GoogleMap
                                            mapContainerStyle={this.containerStyle}
                                            center={this.center}
                                            zoom={10}
                                        >
                                            <MarkerF position={this.state.route.origin}/>
                                            <MarkerF position={this.state.route.destination}/>
                                        </GoogleMap>
                                    </LoadScript>
                                </Modal.Body>
                            </Modal>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default RoutesMap;