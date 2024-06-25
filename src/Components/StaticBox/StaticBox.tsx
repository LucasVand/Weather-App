
import style from './StaticBox.module.css'

interface props {
    height?: number
    children?: React.ReactNode
    inset?: boolean
}

function StaticBox({ height = 1, children, inset }: props) {
    const values = () => {
        if (height == 1) {
            if (inset) {
                return ['inset ', 2, 3]
            } else {
                return ['', 1, 3]
            }
        }
        if (height == 2) {
            if (inset) {
                return ['inset ', 2, 6]
            } else {
                return ['', 3, 8]
            }
        }
        if (height == 3) {
            if (inset) {
                return ['inset ', 4, 10]
            } else {
                return ['', 6, 17]
            }
        }
        return ['', 1, 3]
    }
    return (
        <>
            <div className={style.bg} style={{ boxShadow: `${values()[0]}${values()[1]}px ${values()[1]}px ${values()[2]}px rgb(24, 24, 27), ${values()[0]}-${values()[1]}px -${values()[1]}px ${values()[2]}px rgb(60, 60, 67)` }}>
                {children}
            </div>
        </>
    )
}

export default StaticBox