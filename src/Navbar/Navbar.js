import { Outlet } from 'react-router-dom'
import style from './navbar.module.css'
import picture from './picture.png'

export default function Navbar(){
    return <>
    <div className="App">
        <header className={style.header}>
            <img src={picture} height='100%' alt='icon'/>
            <h2>PhotoFolio</h2>
        </header>
        <Outlet/>
    </div>

    </>
}