
import StaticBox from '../StaticBox/StaticBox'
import './ProgressBar.css'

interface props {
    height?: number,
    progress: number,
    children?: React.ReactNode
}

function ProgressBar({ height, progress, children }: props) {

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
            <StaticBox height={height}>
                <div className='progressCont'>
                    <div className='progressChildren'>
                        {children}
                    </div>

                    <div className='sliderBG'>
                        <div className='slider' style={{ left: `${100 - percent()}%`, width: `${percent()}%` }}></div>
                    </div>
                </div>
            </StaticBox>

        </>
    )
}

export default ProgressBar