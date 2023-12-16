import style from './button.module.css'
export default function Button({toggleForm, backgroundColor, color, borderColor, children}){
    return <button onClick={toggleForm} className={style.button} style={{backgroundColor, color, borderColor}}>
        {children}
    </button>
}