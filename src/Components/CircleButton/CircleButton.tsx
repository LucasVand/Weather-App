import './CircleButton.css'

interface props {
    on?: boolean
    onClick?: Function
    children?: React.ReactNode
}
function CircleButton({ on, onClick = () => { }, children }: props) {
    return (
        <>
            <div className={`circleBG ${on ? 'toggle' : ''}`} onClick={() => { onClick() }}>
                <div className='circleChild'>{children}</div>

                <div className={`circleBGoverlay ${on ? 'toggle' : ''}`} />

            </div>
        </>
    )
}

export default CircleButton
