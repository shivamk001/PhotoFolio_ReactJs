import { useEffect, useState } from 'react'
import { collection, doc, getDoc, addDoc, query, onSnapshot, where } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from 'react-toastify';

import {db} from '../firebase/firebase'
import style from './album.module.css'
import Button from '../Button/Button';
import Form from '../Form/Form'
import PhotoCard from '../PhotoCard/PhotoCard';
import ImageCarousel from '../ImageCarousel/ImageCarousel';


export default function Album(){
    let {id: albumId}=useParams()
    
    //to display add image form
    let [displayForm, setDisplayForm]=useState(false);

    //used when adding new image
    let [albumName, setAlbumName]=useState('')
    let [imageLink, setImageLink]=useState('')
    let [imageName, setImageName]=useState('')

    //to display all photos
    let [allPhotos, setAllPhotos]=useState([])

    //to show/remove carousel
    let [showCarousel, setShowCarousel]=useState(false)
    let [imageIndex, setimageIndex]=useState(-1)

    //to navigate
    const navigate=useNavigate()

    //isLoading
    const [isLoading, setisLoading]=useState(true)

    //console.log(albumId)

    useEffect(()=>{
        //get album data
        let getAlbumDoc=async ()=>{
            let albumRef=doc(db, 'albums', albumId)

            let albumDoc=await getDoc(albumRef)
            //console.log(albumDoc.data())
            let {name}=albumDoc.data()
            setAlbumName(name)
            setisLoading(false)
        }
        getAlbumDoc()

        //GET ALL PHOTOS

        //QUERY
        const q=query(collection(db, 'photos'), where('albumName', '==', albumName));

        //onSnapshot
        onSnapshot(q, (querySnapshot)=>{
            //console.log('QUERYSNAPSHOT:', querySnapshot)
            let photos=[]
            querySnapshot.forEach((doc)=>{
                photos.push({data: doc.data(), id: doc.id})
            })
            console.log(photos)
            setAllPhotos(photos)
        })

        document.title=albumName

    },[albumId, albumName])

    function toggleForm(){
        //console.log(displayForm)
        setDisplayForm(!displayForm)
    }

    async function submitForm(e){
        e.preventDefault()
        await addDoc(collection(db, 'photos'),{
            imageLink,
            imageName,
            albumName
        })
        toggleForm()
        setImageLink('')
        toast(`${imageName} image created`)
        setImageName('')
        
    }

    function goBack(){
        navigate('/')
    }

    function showImageInCarousel(i){
        setShowCarousel(true)
        setimageIndex(i)
    }

    function closeCarousel(){
        setShowCarousel(false)
        setimageIndex(-1)
    }


    return <div className={style.AlbumContainer}>
        <div style={{display: 'flex', justifyContent: 'flex-start', width: '100%', height: '30px'}}>
            <button className={style.homeButton} title="Go back" onClick={goBack}><i className="fa-solid fa-house fa-xl"></i></button>
        </div>

        {isLoading?
                  <ClipLoader
                  color='black'
                  loading={isLoading}
                  size={150}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
                :
            <>
                <header className={style.AlbumContainerHeader}>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
                        
                        <h1>Images in {albumName}</h1>
                    </div>
                        
                        <Button toggleForm={toggleForm} backgroundColor='white' color='#007bff' borderColor='#007bff'>Add Image</Button>
                </header>

                {
                    displayForm &&
                    <Form submitForm={submitForm} toggleForm={toggleForm}>
                        <h3>Add Image</h3>
                        <input type='text' placeholder='Enter Image Name' onChange={(e)=>setImageName(e.target.value)} value={imageName}/>
                        <input type='text' placeholder='Enter Image Link' onChange={(e)=>setImageLink(e.target.value)} value={imageLink}/>
                        <Button backgroundColor='#28a745' color='white' borderColor='white'>Submit</Button>
                    </Form>
                }

                {/* DISPLAY THE CAROUSEL */}
                {
                    showCarousel &&
                    <ImageCarousel photos={allPhotos} currentIndex={imageIndex} closeCarousel={closeCarousel}/>
                }



                <div className={style.albums}>
                        {allPhotos.map((photo, index)=>{
                            return <PhotoCard photo={photo} key={photo.id} index={index} showImageInCarousel={showImageInCarousel}/>
                        })}
                </div>
            </>
        }
    </div>
}