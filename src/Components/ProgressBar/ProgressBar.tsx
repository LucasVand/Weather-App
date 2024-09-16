

import './ProgressBar.css'

interface props {

    progress: number,
    children?: React.ReactNode
}

function ProgressBar({ progress, children }: props) {

    const percent = () => {
        if (progress > 1) {
            return 100
        }
        else if (progress <= 0) {
            return 2
        }
        return progress * 100
    }
    return (
        <>
            <div className='progressCont'>
                <div className='progressChildren'>
                    {children}
                </div>

                <div className='sliderBG'>
                    <div className='slider' style={{ left: `${100 - percent()}%`, width: `${percent()}%` }}></div>
                </div>
            </div>
        </>
    )
}

export default ProgressBar