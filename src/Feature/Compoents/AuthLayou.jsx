import React,{ useEffect, useState}from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {Loading} from "./index";

function Procted({chlid,auth=true}) {
  const Nav=useNavigate();
  const [loading,setloading]=useState(true);
  const AuthStatus=useSelector(state=>state.Auth.status);
  useEffect(()=>{
        if(auth&&AuthStatus!==auth){
            Nav("/login");
        }
        else if(!auth&&AuthStatus!==auth){
            Nav("/");
        }
    setloading(flase)
  },[AuthStatus,Nav,auth])

  return !loading ?(<>
  {chlid}
  </>):(
    <Loading/>
  )
}

export default Procted