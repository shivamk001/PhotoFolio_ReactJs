import {db} from '../firebase/firebase'
import { useState } from 'react'

import AlbumCard from "../AlbumCard/AlbumCard"

export default function AlbumContainer(){

    let [allAlbums, setAllAlbums]=useState([])

    //get all albums
    //useEffect(()=>{},[])

    return <div>
        AlbumContainer
        <AlbumCard/>
    </div>
}