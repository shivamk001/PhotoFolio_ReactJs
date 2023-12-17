import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { collection, deleteDoc, doc, getDocs, query, updateDoc, writeBatch, where } from 'firebase/firestore';

import { db } from '../firebase/firebase'
import png from './photo-album.png'
import style from './albumcard.module.css'
import Button from '../Button/Button'
import Form from '../Form/Form'
import { toast } from 'react-toastify';


export default function AlbumCard({album}){
    let {data: {name}, id}=album

    //
    let [nam, setName]=useState(name)
    let [showButtons, setShowButtons]=useState(false);

    //to display edit image form
    let [displayForm, setDisplayForm]=useState(false);
    //console.log(album, name, id)
    const navigate=useNavigate()
    function handleClick(){
        navigate(`/album/${id}`)
    }

    //to open the edit album info form
    function toggleEditForm(){
            //console.log(displayForm)
            if(!displayForm){
                setName(name)
            }
            setDisplayForm(!displayForm)
    }

    //to update the album details
    async function submitForm(e){
            e.preventDefault()

            //then update the album
            await updateDoc(doc(db, 'albums', id), {
                name: nam
            })
            toast('Album name updated')
            toggleEditForm()

            //query
            let q=query(collection(db, 'photos'), where('albumName', '==', name))
            

            const batch=writeBatch(db);

            //get all photos
            let querysnapshot=await getDocs(q)

            querysnapshot.forEach((doc)=>{
                    console.log(doc.id," ", doc.data())

                    batch.set(doc.ref, {
                        ...doc.data(),
                        albumName: nam,

                    })
            })

            await batch.commit()
            
    }

    //to delete the photo
    async function deleteAlbum(e){
            e.preventDefault();
            await deleteDoc(doc(db, 'albums', id));
            toast('Album deleted.')


            //query
            let q=query(collection(db, 'photos'), where('albumName', '==', name))
            

            const batch=writeBatch(db);

            //get all photos
            let querysnapshot=await getDocs(q)

            querysnapshot.forEach((doc)=>{
                    console.log(doc.id," ", doc.data())

                    batch.delete(doc.ref)
            })

            await batch.commit()
    }

    return (
    <>
                {
        displayForm &&
            <Form submitForm={submitForm} toggleForm={toggleEditForm}>
                <h3>Edit Image</h3>
                <label>Album Name:</label>
                <input type='text' value={nam} onChange={(e)=>setName(e.target.value)}/>

                <Button backgroundColor='#28a745' color='white' borderColor='white' title="Close">Submit</Button>
            </Form>
        }

    <div className={style.albumCardContainer} onMouseEnter={()=>setShowButtons(true)} onMouseLeave={()=>setShowButtons(false)}>  
        {showButtons && 
            <div className={style.utilButtons}>
                <button title="Edit Album" className={style.editButton} onClick={toggleEditForm}><i class="fa-solid fa-pen-to-square fa-sm"></i></button>
                <button title="Delete Album" className={style.deleteButton} onClick={deleteAlbum}><i class="fa-solid fa-trash fa-sm"></i></button>
        </div>} 
        <div className={style.albumCard} onClick={handleClick} >
            <img src={png} height='125px' width='125px' alt={png}/>
            <p>{name}</p>
        </div>
    </div>
    </>)

}