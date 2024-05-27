import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import {Button,Input} from "../index"
import { login as authLogin } from '../../store/authSlice';
import authService from '../../AppwriteBackend/Auth.Appwrite';

function Login() {
    const Nav = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const login = async (data) => {
        try {
            const seesion = await authService.login(data);
            if (seesion) {
                const userPayload = await authService.getCurrentUser()
                if (userPayload) {
                    dispatch(authLogin({userPayload}));
                    Nav("/")
                }
            }
        } catch (error) {
            console.log(`Appwrite error/Backend Error ${error}`);
        }
    }
    return (
       <>
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700  flex justify-center items-center">
        <form onSubmit={handleSubmit(login)} className="">
            <Input type="email" label="email" className="" placeholder="email" {...register("email",{ required:true,validate:{
                matchPatern:(value)=>
                  { /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(value)||"Enter Valid Email";
            }}})}/>
            <Input type="password" label="password" className="" placeholder="password" {...register("password",{
                 required:true,validate:{matchPatern:(value)=>{
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(value)||"Enter password greate then 8 and with special charcters";
                }}
            })}/>
            <Button type="submit" child="Submit"/>
        </form>
        </div>
        
       </>
    )
}

export default Login