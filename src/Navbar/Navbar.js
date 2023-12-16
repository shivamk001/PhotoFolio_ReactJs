import { Outlet } from 'react-router-dom'
import style from './navbar.module.css'

export default function Navbar(){
    return <>
    <div className="App">
        <header className={style.header}>
            <h2>PhotoFolio</h2>
        </header>
        <Outlet/>
    </div>

    </>
}