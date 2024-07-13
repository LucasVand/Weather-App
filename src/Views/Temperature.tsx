import { useEffect, useState } from "react"
import StaticBox from "../Components/StaticBox/StaticBox"

import { weatherDataPromise, defaultWeather } from "../WeatherAPI"

import './Temperature.css'

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


    useEffect(() => {
        async function w() {
            weatherDataPromise
                .then((value) => {
                    setWeatherData(value)
                    console.log(value)
                })
                .catch(() => {
                    console.log('error fetching')
                })
        }
        w()
    }, [])
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
                                <div className="rainTotal">{weatherData.daily.precipitation + 'mm'}</div>
                                <div style={{ fontSize: '0.5em' }}>in last 24 hours</div>
                                <div style={{ fontSize: '1.4em' }}>{weatherData.hourly.precipitationChance + '%'}</div>
                            </div>
                        </StaticBox>
                        <StaticBox inset={true}>
                            <div className="weatherWidget">
                                <div className="weatherWidgetTitle"> <Humidity></Humidity> {" Humidity"} </div>
                                <div className="relitiveHumidityDesc">Relitive Humidity</div>
                                <div style={{ fontSize: '2.4em', fontWeight: '600' }}>{weatherData.current.relative_humidity_2m.toFixed(0) + '%'}</div>
                                <div style={{ fontSize: '0.7em' }}>{'Dew Point is ' + weatherData.hourly.dew_point.toFixed(0) + '°C'}</div>
                            </div>

                        </StaticBox>
                    </div>

                </div>

            </StaticBox>
        </>
    )
}

export default TemperatureView

