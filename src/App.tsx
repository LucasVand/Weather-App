import { useState } from 'react'
import Greeting from './Views/Greeting'
import TemperatureView from './Views/Temperature'
import { defaultWeather, getWeather } from './WeatherAPI'
import StaticBox from './Components/StaticBox/StaticBox'
import Button from './Components/Button/Button'

//rgb(86, 211, 174) original accent Color!!!

function App() {
  const [weatherData, setWeatherData] = useState(defaultWeather)

  const [weatherGot, setWeatherGot] = useState(false)
  const [error, setError] = useState(false)

  async function getWeatherComp(la: number, lo: number) {

    getWeather(la, lo)
      .then((value) => {
        setWeatherData(value)

        console.log(value)

      })
      .catch(() => {
        console.log('error fetching')
        setError(true)
      })
  }

  const locationMessage = () => {
    var text = 'This will prompt you to allow your location to be used'
    if (error) {
      text = 'Please allow for your location to be used'
    }
    return (
      <span style={{ fontSize: '0.3em' }}>{text}</span>
    )
  }

  return (
    <>

      <Greeting location={weatherData.location} current={weatherData.current} daily={weatherData.daily} hourly={weatherData.hourly}></Greeting>
      <TemperatureView location={weatherData.location} current={weatherData.current} daily={weatherData.daily} hourly={weatherData.hourly}></TemperatureView>
      <div className={`locationPromptCont ${weatherGot ? 'makeGone' : ''} `}>

        <StaticBox>
          <div className='locationPrompt'>
            <div className='cordTitle'>Find Location</div>

            <Button onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position: any) => {
                  getWeatherComp(position.coords.latitude, position.coords.longitude)
                  setWeatherGot(true)
                })
              }
              else {
                console.log('Cant Fetch Location')
              }

            }}> <div className='findButtonText'>Find For Me <br></br>{locationMessage()}</div>

            </Button>
            <div style={{ height: '1em' }}></div>

          </div>
        </StaticBox >

      </div >
    </>
  )

}

export default App
