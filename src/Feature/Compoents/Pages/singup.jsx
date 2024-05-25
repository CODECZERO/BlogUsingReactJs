import React, { useState } from 'react'
import { Button, InputFiled } from "../index";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login as authLogin } from '../../store/authSlice';
import authService from '../../AppwriteBackend/Auth.Appwrite';
import { useNavigate } from 'react-router-dom';

function Singup() {
    const Nav = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [Error, setError] = useState("");
    const singup = async (data) => {
        setError("");
        const createUser = await authService.CreateAccount(data);
        if (createUser) {
            const User=await authService.getCurrentUser();
            if (User) {
                dispatch(authLogin(User));
                Nav("/");
            }
            else {
                Nav("/login");
            }
        }
    }
    return (
        <>
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                {Error && <p className="">{Error}</p>}

                <form onSubmit={handleSubmit(singup)}>
                    <InputFiled type="email" label="email" className="" placeHolder="email" {...register("email", {
                        validate: {
                            matchPatern: (value) => {
                                /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(value) || setError("Enter Valid Email");
                            }
                        }
                    })} />
                    <InputFiled type="password" label="password" className="" placeHolder="password" {...register("password", {
                        matchPatern: (value) => {
                            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(value) || setError("Enter password greater than 8 and with special charcters");
                        }
                    })} />
                    <InputFiled type="text" label="name" className="" placeHolder="name" {...register("name", {

                    })} />

                    <Button type={submit} child="Submit" />

                </form>
            </div>
        </>
    )
}

export default Singup