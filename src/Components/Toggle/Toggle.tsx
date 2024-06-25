
import './Toggle.css'
interface props {
    toggled: boolean
    onClick?: Function
}
function Toggle({ toggled, onClick = () => { } }: props) {

    return (
        <>
            <div className={`toggleBG ${toggled ? 'toggled' : ''}`}>

                <div className={`dot ${toggled ? 'toggled' : ''}`} onClick={() => onClick()}></div>
            </div>
        </>
    )
}

export default Toggle