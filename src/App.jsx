import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import authService from './Feature/AppwriteBackend/Auth.Appwrite';
import { login, logout } from './Feature/store/authSlice';
import { Footer, Header, LodingScreenPage} from './Feature/Compoents';
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser().then((payload) => {
      if (payload) {
        dispatch(login({ userPayload }));
      }
      else {
        dispatch(logout());
      }
    }).catch((err) => { console.log(err) }).finally(() => { setloading(false) })
  }, [])

  return !loading ? (
    <>
      <div>
        <div>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  ) :
    (


      <LodingScreenPage/>


    )
}

export default App