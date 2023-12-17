import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <ToastContainer/>
    </>
  );
}

export default App;
