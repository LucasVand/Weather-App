import { useEffect, useState } from "react"
import StaticBox from "../Components/StaticBox/StaticBox"

import { weatherDataPromise, defaultWeather } from "../WeatherAPI"

import './Temperature.css'
import ProgressBar from "../Components/ProgressBar/ProgressBar"

function TemperatureView() {
    const [weatherData, setWeatherData] = useState(defaultWeather)

    const Cloud = () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-cloud-drizzle-fill" viewBox="0 0 16 16">
                <path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m-3.5 1.5a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m.747-8.498a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973" />
            </svg>
        )
    }

    const Humidity = () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-moisture" viewBox="0 0 16 16">
                <path d="M13.5 0a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V7.5h-1.5a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V15h-1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5V.5a.5.5 0 0 0-.5-.5zM7 1.5l.364-.343a.5.5 0 0 0-.728 0l-.002.002-.006.007-.022.023-.08.088a29 29 0 0 0-1.274 1.517c-.769.983-1.714 2.325-2.385 3.727C2.368 7.564 2 8.682 2 9.733 2 12.614 4.212 15 7 15s5-2.386 5-5.267c0-1.05-.368-2.169-.867-3.212-.671-1.402-1.616-2.744-2.385-3.727a29 29 0 0 0-1.354-1.605l-.022-.023-.006-.007-.002-.001zm0 0-.364-.343zm-.016.766L7 2.247l.016.019c.24.274.572.667.944 1.144.611.781 1.32 1.776 1.901 2.827H4.14c.58-1.051 1.29-2.046 1.9-2.827.373-.477.706-.87.945-1.144zM3 9.733c0-.755.244-1.612.638-2.496h6.724c.395.884.638 1.741.638 2.496C11 12.117 9.182 14 7 14s-4-1.883-4-4.267" />
            </svg>
        )
    }

    const Sun = () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-sun" viewBox="0 0 16 16">
                <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
            </svg>
        )
    }

    const Thermometer = () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-thermometer-half" viewBox="0 0 16 16">
                <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415" />
                <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1" />
            </svg>
        )
    }

    useEffect(() => {
        async function w() {
            weatherDataPromise
                .then((value) => {
                    setWeatherData(value)

                })
                .catch(() => {
                    console.log('error fetching')
                })
        }
        w()
    }, [])



    const uvIndexSevarity = () => {
        const uv = weatherData.hourly.uv_index[0]
        if (uv < 3) {
            return "Low"
        } else if (uv < 6) {
            return "Moderate"
        } else if (uv < 8) {
            return "High"
        } else if (uv < 10) {
            return "Very High"
        } else {
            return "Extreme"
        }
    }


    return (
        <>
            <StaticBox>

                <div className="tempCont">

                    <div style={{ fontSize: '1em' }}>Weather</div>
                    <div style={{ fontWeight: 'bold', fontSize: '5em' }}>{weatherData.current.temperature2m.toFixed(0) + '°C'}</div>
                    <div>{'Feels like ' + weatherData.current.apparent_temperature.toFixed(0) + '°C'}</div>

                    <div className="weatherWidgetCont">
                        <StaticBox inset={true}>
                            <div className="weatherWidget">
                                <div className="weatherWidgetTitle"> <Cloud></Cloud> {"Precipitation"} </div>
                                <div className="rainTotal">{weatherData.daily.precipitation[0].toFixed(0) + 'mm'}</div>
                                <div style={{ fontSize: '0.5em' }}>in last 24 hours</div>
                                <div style={{ fontSize: '1.4em' }}>{weatherData.daily.precipitation_probability_max[0].toFixed(0) + '%'}</div>
                            </div>
                        </StaticBox>
                        <StaticBox inset={true}>
                            <div className="weatherWidget">
                                <div className="weatherWidgetTitle"> <Humidity></Humidity> {" Humidity"} </div>
                                <div className="relitiveHumidityDesc">Relitive Humidity</div>
                                <div style={{ fontSize: '2.4em', fontWeight: '600' }}>{weatherData.current.relative_humidity_2m.toFixed(0) + '%'}</div>
                                <div style={{ fontSize: '0.7em' }}>{'Dew Point is ' + weatherData.hourly.dew_point[0].toFixed(0) + '°C'}</div>
                            </div>

                        </StaticBox>
                    </div>
                    <div className="weatherWidgetCont">
                        <StaticBox inset={true}>
                            <div className="weatherWidget">
                                <div className="weatherWidgetTitle"> <Sun></Sun> {"UV Index"} </div>
                                <div style={{ fontSize: '2.2em' }}>{weatherData.hourly.uv_index[0].toFixed(0)}</div>
                                <div style={{ fontSize: '1.1em' }}>{uvIndexSevarity()}</div>
                                <ProgressBar progress={weatherData.hourly.uv_index[0] / 11}></ProgressBar>
                            </div>
                        </StaticBox>
                        <StaticBox inset={true}>
                            <div className="weatherWidget">
                                <div className="weatherWidgetTitle"> <Thermometer></Thermometer> {"Min and Max"} </div>
                                <div style={{ fontSize: '0.4em' }}>Max Temperature</div>
                                <div style={{ fontSize: '1.5em', fontWeight: '600' }}>{weatherData.daily.temperature_Max[0].toFixed(0) + '°C'}</div>
                                <div style={{ fontSize: '0.4em' }}>Min Temperature</div>
                                <div style={{ fontSize: '1.5em', fontWeight: '600' }}>{weatherData.daily.temperature_Min[0].toFixed(0) + '°C'}</div>
                            </div>

                        </StaticBox>
                    </div>

                </div>

            </StaticBox>
        </>
    )
}

export default TemperatureView

