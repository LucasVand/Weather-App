import './Button.css'

interface props {
    on?: boolean
    onClick?: Function
    children?: React.ReactNode
}
function Button({ on, onClick = () => { }, children }: props) {
    return (
        <>
            <div className={`buttonBG ${on ? 'toggle' : ''}`} onClick={() => { onClick() }}>
                <div className='buttonChild'>{children}</div>

                <div className={`buttonBGoverlay ${on ? 'toggle' : ''}`} />

            </div>
        </>
    )
}

export default Button