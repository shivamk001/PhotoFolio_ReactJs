import style from './form.module.css';

export default function Form({submitForm, children}){
    return <>
        <form onSubmit={submitForm} className={style.form}>
            {children}
        </form>
    </>
}