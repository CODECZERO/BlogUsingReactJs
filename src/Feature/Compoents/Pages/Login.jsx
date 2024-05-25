import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
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
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        {Error && <p className="">{Error}</p>}
        <form onSubmit={handleSubmit(login)} className="">
            <InputFiled type="email" label="email" className="" placeHolder="email" {...register("email",{validate:{
                matchPatern:(value)=>
                  { /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(value)||setError("Enter Valid Email");
            }}})}/>
            <InputFiled type="password" label="password" className="" placeHolder="password" {...register("password",{
                matchPatern:(value)=>{
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(value)||setError("Enter password greate then 8 and with special charcters");
                }
            })}/>
            <Button type={submit} child="Submit"/>
        </form>
        </div>
        
       </>
    )
}

export default Login