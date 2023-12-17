import style from './button.module.css'
export default function Button({toggleForm, backgroundColor, color, borderColor, children, title}){
    return <button onClick={toggleForm} className={style.button} title={title} style={{backgroundColor: backgroundColor, color: color, borderColor: borderColor}}>
        {children}
    </button>
}