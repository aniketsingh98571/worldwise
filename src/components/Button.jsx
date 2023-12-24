import classes from './Button.module.css'
export default function Button({children,onClick,type}){
    return (
        <button onClick={onClick} className={`${classes.btn} ${classes[type]}`}>
            {children}
        </button>
    )
}