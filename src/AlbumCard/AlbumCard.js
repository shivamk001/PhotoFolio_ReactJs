import png from './photo-album.png'
import style from './albumcard.module.css'
import { useNavigate } from 'react-router-dom'

export default function AlbumCard({album}){
    let {data: {name}, id}=album
    //console.log(album, name, id)
    const navigate=useNavigate()
    function handleClick(){
        navigate(`/album/${id}`)
    }
    return <div className={style.albumCard} onClick={handleClick}>
        <img src={png} height='125px' width='125px' alt={png}/>
        <p>{name}</p>
    </div>
}