import { useState } from 'react';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';

import { db } from '../firebase/firebase'
import style from './photocard.module.css'
import Button from '../Button/Button'
import Form from '../Form/Form'
import { toast } from 'react-toastify';


export default function PhotoCard({photo, index, showImageInCarousel}){
    let {data: {imageLink}, data: {imageName}, id}=photo
    let [showButtons, setShowButtons]=useState(false);

    //to update photo details
    // let imageNameRef=useRef();
    // let imageLinkRef=useRef();
    let [imageLnk, setImageLink]=useState(imageLink);
    let [imageNam, setImageName]=useState(imageName);

    //to display edit image form
    let [displayForm, setDisplayForm]=useState(false);

    console.log(photo, imageName)


    //to open the edit image info form
    function toggleEditForm(e){
        //console.log(displayForm)
        e.stopPropagation()
        setDisplayForm(!displayForm)
    }

    //to delete the photo
    async function deletePhoto(e){
        e.preventDefault();
        await deleteDoc(doc(db, 'photos', id));
        toast('Photo deleted.')
    }

    //to update the photo details
    async function submitForm(e){
        e.preventDefault()
        await updateDoc(doc(db, 'photos', id), {
            imageLink: imageLnk,
            imageName: imageNam
        })
        toast('Image detail updated')
        toggleEditForm(e)
    }


    return <>

        {
            displayForm &&
            <Form submitForm={submitForm} toggleForm={toggleEditForm}>
                <h3>Edit Image</h3>
                <label>Image Name:</label>
                <input type='text' value={imageNam} onChange={(e)=>setImageName(e.target.value)}/>
                <label>Image Link:</label>
                <input type='text' value={imageLnk} onChange={(e)=>setImageLink(e.target.value)}/>
                <Button backgroundColor='#28a745' color='white' borderColor='white' title="Close">Submit</Button>
            </Form>
        }   


        <div 
            className={style.photoCardContainer} 
            onMouseEnter={()=>setShowButtons(true)} 
            onMouseLeave={()=>setShowButtons(false)} 
            onClick={()=>showImageInCarousel(index)}
            > 

            {showButtons && 
            <div className={style.utilButtons}>
                <button title="Edit Image" className={style.editButton} onClick={toggleEditForm}><i class="fa-solid fa-pen-to-square fa-sm"></i></button>
                <button title="Delete Image" className={style.deleteButton} onClick={deletePhoto}><i class="fa-solid fa-trash fa-sm"></i></button>
            </div>} 
            <div className={style.photoCard}  >
                <img src={imageLink} width='100%' height='200px' alt={imageLink}/>
                <p>{imageName}</p>
            </div>

        </div>

    </>

}