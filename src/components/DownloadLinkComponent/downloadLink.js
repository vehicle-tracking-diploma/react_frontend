import React from 'react';
import axios from "axios";
import Table from 'react-bootstrap/Table';
import {Button} from "react-bootstrap";
import Form from "react-bootstrap/Form";

class DownloadLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: [],
            selectedCar: "",
            disabled: true,
            reports: []
        };
    }

    componentDidMount() {
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

    const
    handleClick = (format) => {
        axios({
            url: `http://localhost:8080/api/v1/download/${format}`,
            method: 'GET',
            responseType: 'blob',
            params: {
                govId: this.state.selectedCar
            }
        }).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${format}Report_${this.state.selectedCar}.${format}`);
            document.body.appendChild(link);
            link.click();
        });
    };
    handleSelectChange = (event) => {
        const selected = event.target.value
        this.setState({
            selectedCar: selected,
            disabled: false,
            reports: []
        })
        const car = this.state.cars.find(x => x.govId == event.target.value)
        const car_reports = car.reports
        if (car_reports.length > 0) {
            this.setState({
                reports: car_reports
            })
        }
    }
    goToMap = (govId) => {
        window.location.href = `http://localhost:3000/reportMap?reportId=${govId}`
    }

    render() {
        return (
            <div className={"d-flex justify-content-center align-items-center"} style={{height:"100vh"}}>
                <div>
                    {

                        this.state.selectedCar === "" ? (
                            <p>No car is selected</p>
                        ) : (
                            <Table striped bordered hover className={"shadow-lg"}>
                                <thead>
                                <tr>
                                    <th>id</th>
                                    <th>title</th>
                                    <th>localDateTime</th>
                                    <th>detail</th>
                                    <th>Show on the map</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.reports.map(report => (
                                        <tr>
                                            <td>{report.id}</td>
                                            <td>{report.title}</td>
                                            <td>{report.localDateTime}</td>
                                            <td>{report.detail}</td>
                                            <td>

                                                <Button variant="outline-secondary"
                                                        onClick={() => this.goToMap(report.id)}
                                                        style={{width: "100%", height: "100%"}}>Show
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </Table>
                        )
                    }
                    <br/>
                    <div className={"d-flex"}>
                        <Form.Select className={"w-25"} onClick={this.handleSelectChange}>
                            {
                                this.state.cars.map(car => (
                                    <option>{car.govId}</option>
                                ))
                            }
                        </Form.Select>
                        <Button className={"ms-1"} variant="outline-danger" disabled={this.state.disabled}
                                onClick={() => this.handleClick("pdf")}>Download
                            pdf</Button>
                        <Button className={"ms-1"} variant="outline-success" disabled={this.state.disabled}
                                onClick={() => this.handleClick("xlsx")}>Download excel</Button>
                    </div>
                    <div className={"badge bg-primary text-wrap p-3 mt-2"}>Selected car: {this.state.selectedCar}</div>
                </div>
            </div>
        )
    }
}

export default DownloadLink;