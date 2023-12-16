import { useEffect, useState } from 'react'
import { collection, doc, getDoc, addDoc, query, onSnapshot, where } from "firebase/firestore";
import { useParams } from "react-router-dom";

import {db} from '../firebase/firebase'
import style from './album.module.css'
import Button from '../Button/Button';
import Form from '../Form/Form'


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

    //console.log(albumId)

    useEffect(()=>{
        //get album data
        let getAlbumDoc=async ()=>{
            let albumRef=doc(db, 'albums', albumId)

            let albumDoc=await getDoc(albumRef)
            //console.log(albumDoc.data())
            let {name}=albumDoc.data()
            setAlbumName(name)
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
                photos.push(doc.data())
            })
            console.log(photos)
            setAllPhotos(photos)
        })

    },[albumId, albumName])

    function toggleForm(){
        console.log(displayForm)
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
        setImageName('')
    }


    return <div className={style.AlbumContainer}>
        
        <header className={style.AlbumContainerHeader}>
                <h1>Images in {albumName}</h1>
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

        <div className={style.albums}>
                
        </div>
    </div>
}