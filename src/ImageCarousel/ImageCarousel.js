import { useState } from 'react'
import style from './imagecarousel.module.css'

export default function ImageCarousel({photos, currentIndex}){

    let [cI, setCI]=useState(currentIndex)
    console.log(photos, currentIndex, photos[currentIndex].data.imageLink)
    let totalPhotos=photos.length

    function goLeft(){
        if((cI-1)<0){
            setCI(totalPhotos-1)
        }
        else{
            setCI((cI-1)%totalPhotos)
        }
        
    }

    function goRight(){
        setCI((cI+1)%totalPhotos)
    }

    return (<>
        <div className={style.carousel}>
            <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
                <button><i class="fa-solid fa-x"></i></button>
            </div>
            
            <img src={photos[cI].data.imageLink} height='60%' width='60%'/>
            <div>
                <button title='prev image' onClick={goLeft}><i class='fas fa-angle-left'></i></button>
                <button title='next image' onClick={goRight}><i className='fas fa-angle-right'></i></button>
            </div>
        </div>

    </>)
}