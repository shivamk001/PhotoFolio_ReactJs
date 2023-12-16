import {db} from '../firebase/firebase'
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from 'react'

import style from './albumcontainer.module.css'
import AlbumCard from "../AlbumCard/AlbumCard"
import Button from '../Button/Button'
import Form from '../Form/Form'

export default function AlbumContainer(){

    let [name, setName]=useState([])

    let [allAlbums, setAllAlbums]=useState([])

    let [displayForm, setDisplayForm]=useState(false);

    //get all albums
    useEffect(()=>{
        onSnapshot(collection(db, 'albums'), (snapshot)=>{
            let albumList=[]
            snapshot.forEach((doc)=>{
                albumList.push(doc.data())
                console.log(doc);
                
            })
            setAllAlbums(albumList)
        })
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
        setName('')
    }

    return <>
        <div className={style.AlbumContainer}>
            <header className={style.AlbumContainerHeader}>
                <h1>Albums</h1>
                <Button toggleForm={toggleForm}>Create Album</Button>
            </header>
            {
                displayForm &&
                <Form submitForm={submitForm}>
                    <input type='text' placeholder='Enter Album Name' onChange={(e)=>setName(e.target.value)} value={name}/>
                    <Button>Submit</Button>
                </Form>
            }

            <div className={style.albums}>
                {allAlbums.map((album)=>{
                   return <AlbumCard name={album.name}/>
                })}
                
            </div>
        
        </div>
    </>

}