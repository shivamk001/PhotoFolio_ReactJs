import style from './photocard.module.css'
export default function PhotoCard({photo}){
    let {data: {imageLink}, data: {imageName}}=photo
    console.log(photo, imageName)
    return <div className={style.photoCard}>
        <img src={imageLink} width='100%' height='200px'/>
        <p>{imageName}</p>
    </div>
}