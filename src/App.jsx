import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import authService from './Feature/AppwriteBackend/Auth.Appwrite';
import { login, logout } from './Feature/store/authSlice';
import { Footer, Header, LodingScreenPage} from './Feature/Compoents';
import { Outlet } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/next"

function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser().then((userPayload) => {
      if (userPayload) {
        dispatch(login({ userPayload}));
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
        <SpeedInsights/>
      </div>
    </>
  ) :
    (

      <>
      <LodingScreenPage/>
      <SpeedInsights/>
      </>


    )
}

export default App