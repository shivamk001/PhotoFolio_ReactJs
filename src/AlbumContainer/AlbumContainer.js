import {db} from '../firebase/firebase'
import { collection, addDoc, onSnapshot,  } from "firebase/firestore";
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";

import style from './albumcontainer.module.css'
import AlbumCard from "../AlbumCard/AlbumCard"
import Button from '../Button/Button'
import Form from '../Form/Form'

export default function AlbumContainer(){

    let [name, setName]=useState([])

    let [allAlbums, setAllAlbums]=useState([])

    let [displayForm, setDisplayForm]=useState(false);

    //isLoading
    const [isLoading, setisLoading]=useState(true)

    //get all albums
    useEffect(()=>{
        onSnapshot(collection(db, 'albums'), (snapshot)=>{
            let albumList=[]
            snapshot.forEach((doc)=>{
                albumList.push({data: doc.data(), id: doc.id})
            })
            setAllAlbums(albumList)
            setisLoading(false)
        })
        document.title='Photofolio'
    },[])


    function toggleForm(){
        console.log(displayForm)
        setDisplayForm(!displayForm)
    }

    async function submitForm(e){
        e.preventDefault()
        console.log(name)
        let docRef=await addDoc(collection(db, 'albums'), {
            name: name
        })
        console.log("Document written with ID: ", docRef.id);

        toggleForm()

        toast(`${name} album created.`)

        setName('')

        
    }


    return <>
            <div className={style.AlbumContainer}>
            <header className={style.AlbumContainerHeader}>
                <h1>Albums</h1>
                <Button toggleForm={toggleForm} backgroundColor='white' color='#007bff' borderColor='#007bff'>Create Album</Button>
            </header>

            {
                displayForm &&
                <Form submitForm={submitForm} toggleForm={toggleForm}>
                    <h3>Create Album</h3>
                    <input type='text' placeholder='Enter Album Name' onChange={(e)=>setName(e.target.value)} value={name} required/>
                    <Button backgroundColor='#28a745' color='white' borderColor='white' title="Close">Submit</Button>
                </Form>
            }

            {isLoading?
                <ClipLoader
                        color='black'
                        loading={isLoading}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                />
            :
                <div className={style.albums}>
                    {allAlbums.map((album)=>{
                    return <AlbumCard key={album.id} album={album}/>
                    })}
                    
                </div>
            }
        
            </div>

    </>

}