import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from './Feature/store/store.js'
import { Provider } from 'react-redux'
import './index.css'
import { Route, createBrowserRouter, createRoutesFromElements,RouterProvider } from 'react-router-dom'
import Allpost from "./Feature/Compoents/pages/Allpost.jsx"
import AddPost from "./Feature/Compoents/pages/AddPost.jsx"
import EditPost from "./Feature/Compoents/pages/EditPot.jsx"
import Login from "./Feature/Compoents/pages/login.jsx"
import Post from "./Feature/Compoents/pages/post.jsx"
import Singup from "./Feature/Compoents/pages/singup.jsx"
import Home from './Feature/Compoents/pages/Home.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
    <Route path='' element={<Home />}/> 
    <Route path='/Allpost' element={<Allpost />} />
    <Route path='/Addpost' element={<AddPost />} />
    <Route path='/EditPost/:slug' element={<EditPost />} />
    <Route path='/Login' element={<Login />} />
    <Route path='/post/:slug' element={<Post />} />
    <Route path='/Singup' element={<Singup />} />
  </Route>
  )
)



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
