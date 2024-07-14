import Greeting from './Views/Greeting'
import TemperatureView from './Views/Temperature'

//rgb(86, 211, 174) original accent Color!!!

function App() {

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Greeting></Greeting>
        <TemperatureView></TemperatureView>
      </div>
    </>
  )

}

export default App
