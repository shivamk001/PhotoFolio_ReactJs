import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css';
import Navbar from './Navbar/Navbar';
import Album from './Album/Album';
import AlbumContainer from './AlbumContainer/AlbumContainer'

function App() {

  const router=createBrowserRouter(
    [
      {
        path: '/', element: <Navbar/>,
        children:[
          {index: true, element: <AlbumContainer/>},
          {path:'album/:id', element: <Album/>}
        ]
      }
    ]
  )

  return (
    <>
        {/* <Navbar/>
        <AlbumContainer/> */}
        <RouterProvider router={router}/>
    </>
  );
}

export default App;
