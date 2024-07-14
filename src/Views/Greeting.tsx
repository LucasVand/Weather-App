import StaticBox from "../Components/StaticBox/StaticBox"
import { useState, useEffect } from "react"
import { weatherDataPromise, defaultWeather } from "../WeatherAPI"

import './Greeting.css'

function Greeting() {
    const time: Date = new Date()
    const timeOfDayMessage = () => {
        if (time.getHours() < 12) {
            return "Good Morning"
        } else if (time.getHours() < 17) {
            return "Good Afternoon"
        } else {
            return "Good Evening"
        }
    }
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const hour = () => {
        if (time.getHours() > 12) {
            return [time.getHours() - 12, 'PM']
        } else {
            return [time.getHours(), 'AM'];
        }
    }
    const [weatherData, setWeatherData] = useState(defaultWeather)


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
                <div >
                    <div>
                        <div style={{ fontSize: '0.8em' }}>{timeOfDayMessage()}</div>
                        <div style={{ fontSize: '0.6em' }}> {days[time.getDay()] + ' ' + months[time.getMonth()] + ' ' + time.getDate() + ' ' + hour()[0] + ':' + (time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()) + ' ' + hour()[1]} </div>
                    </div>
                    <div className="cityText">{weatherData.location.locationData.city + ', ' + weatherData.location.locationData.principalSubdivision + ', ' + weatherData.location.locationData.countryCode}</div>
                </div>
            </StaticBox>
        </>

    )
}

export default Greeting

