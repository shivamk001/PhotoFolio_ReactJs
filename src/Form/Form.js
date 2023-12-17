import style from './form.module.css';

export default function Form({submitForm, toggleForm, children}){
    return (<>
        <div className={style.formContainer}>
        
            <form onSubmit={submitForm} className={style.form}>
                <button onClick={toggleForm} className={style.closeButton}>X</button>
                
                {children}
                
                
            </form>
        </div>
    </>)

}