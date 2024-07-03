import { useState } from 'react'
import StaticBox from './Components/StaticBox/StaticBox'
import Toggle from './Components/Toggle/Toggle'
import RadioButton from './Components/RadioButton/RadioButton'
import CircleButton from './Components/CircleButton/CircleButton'
import Button from './Components/Button/Button'
import ProgressBar from './Components/ProgressBar/ProgressBar'

//rgb(86, 211, 174) original accent Color!!!

function App() {

  const [on, setON] = useState(true)
  const [onT, setONT] = useState(true)
  const [b, setB] = useState(false)
  const [bb, setBB] = useState(false)


  const Heart = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart-fill" viewBox="0 -1 16 16">
        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
      </svg>
    )
  }
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <StaticBox height={3}> </StaticBox>
        <StaticBox height={2}> </StaticBox>
        <StaticBox height={1}> </StaticBox>
        <ProgressBar progress={0.5}>Percentage</ProgressBar>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <StaticBox height={3} inset={true}> </StaticBox>
        <StaticBox height={2} inset={true}> </StaticBox>
        <StaticBox height={1} inset={true}> </StaticBox>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Toggle toggled={false} ></Toggle>
        <Toggle toggled={onT} onClick={() => { setONT(!onT) }} ></Toggle>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <RadioButton on={false}></RadioButton>
        <RadioButton on={on} onClick={() => { setON(!on) }}></RadioButton>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <CircleButton>
          <Heart></Heart>
        </CircleButton>
        <CircleButton on={b} onClick={() => { setB(!b) }}>
          <Heart></Heart>
        </CircleButton>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Button></Button>
        <Button>This is Large Text</Button>
      </div>


    </>
  )

}

export default App
