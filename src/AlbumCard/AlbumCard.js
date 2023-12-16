import png from './photo-album.png'
import style from './albumcard.module.css'
import { useNavigate } from 'react-router-dom'

export default function AlbumCard({name}){
    const navigate=useNavigate()
    function handleClick(){
        navigate('/album/fvbfvb')
    }
    return <div className={style.albumCard} onClick={handleClick}>
        <img src={png} height='125px' width='125px'/>
        <p>{name}</p>
    </div>
}