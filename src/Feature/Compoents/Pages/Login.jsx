import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import {Button,InputFiled} from "../index"
import { login as authLogin } from '../../store/authSlice';
import authService from '../../AppwriteBackend/Auth.Appwrite';

function Login() {
    const Nav = useNavigate();
    const dispatch = useDispatch();
    const [Error, setError] = useState("");
    const { register, handleSubmit } = useForm();
    const login = async (data) => {
        setError("");
        try {
            const seesion = await authService.login(data);
            if (seesion) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(authLogin(userPayload=userData));
                    Nav("/")
                }
            }
        } catch (error) {
            console.log(`Appwrite error/Backend Error ${error}`);
        }
    }
    return (
       <>
        {Error && <p className="">{Error}</p>}
        <form onSubmit={handleSubmit(login)} className="">
            <InputFiled type="email" label="email" className="" placeHolder="email" {...register("email",{validate:{
                matchPatern:(value)=>
                  { /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(value)||"Enter Valid Email"
            }}})}/>
            <InputFiled type="password" label="password" className="" placeHolder="password" {...register("password",{
                
            })}/>
            <Button type={submit} child="Submit"/>
        </form>
        
       </>
    )
}

export default Login