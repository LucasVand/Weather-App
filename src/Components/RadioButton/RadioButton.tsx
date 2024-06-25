import './RadioButton.css'
interface props {
    on: boolean
    onClick?: Function
}
function RadioButton({ on, onClick = () => { } }: props) {

    return (
        <>
            <div className={`radioBG ${on ? 'toggle' : ''}`} onClick={() => { onClick() }}>

                <div className={`radioExpand ${on ? 'toggle' : ''}`}></div>
                <div className={`radioDot ${on ? 'toggle' : ''}`}></div>

            </div>
        </>
    )
}

export default RadioButton