import React from 'react';
import Table from 'react-bootstrap/Table';
import WeatherMap from '../WeatherMap/WeatherMap';

const conditions = (props) => {
    return (
        <div>

            {props.error && <small>Please enter a valid city.</small>}

            {props.loading && <div />}


            {props.responseObj.cod === 200 ?
                <div>
                    <WeatherMap location={props.responseObj.coord} />
                    <p><strong>{props.responseObj.name}, {props.responseObj.sys.country}</strong></p>
                    <img alt="imagen" src={`http://openweathermap.org/img/wn/${props.responseObj.weather[0].icon}@2x.png`}></img>
                    <Table striped bordered hover size='sm'>
                        <thead>
                            <tr>
                                <th>Temperature</th>
                                <th>Pressure</th>
                                <th>Humidity</th>
                                <th>Min Temperature</th>
                                <th>Max Temperature</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{Math.round(props.responseObj.main.temp)} º</td>
                                <td>{Math.round(props.responseObj.main.pressure)} mb</td>
                                <td>{Math.round(props.responseObj.main.humidity)} %</td>
                                <td>{Math.round(props.responseObj.main.temp_min)} º</td>
                                <td>{Math.round(props.responseObj.main.temp_max)} º</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            : null
            }
        </div>
    )
}

export default conditions;