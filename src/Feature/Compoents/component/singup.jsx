import React, { useState } from 'react'
import { Button, Input } from "../index";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login as authLogin } from '../../store/authSlice';
import authService from '../../AppwriteBackend/Auth.Appwrite';
import { useNavigate } from 'react-router-dom';
import { LodingScreenPage } from '../index';

function Singup() {
    const Nav = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [loading,setloading]=useState(false);
    const [err, seterr] = useState("");
    const singup = async (data) => {
        
        try {
            setloading(true)
            const createUser = await authService.CreateAccount(data);
            if (createUser) {
                const userPayload = await authService.getCurrentUser();
                if (userPayload) {
                    dispatch(authLogin(userPayload));
                    setloading(false)
                    Nav("/");
                }
                else {
                    setloading(false)
                    Nav("/login");
                }
            }
        } catch (error) {
            throw error
        }
    }
    return !loading ? (
        <>
            <p>{err}</p>
            <div className="w-full max-w-sm p-4 bg-white borde border-gray-200 rounded-lg shadow  mt-20 mb-20 sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 flex justify-center items-center">
                <form onSubmit={handleSubmit(singup)}>
                    <Input type="email" label="email" className="" placeholder="email" {...register("email", {
                        required: true, validate: {
                            matchPatern: (value) => {
                                /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(value) || seterr("Enter Valid Email");
                            }
                        }
                    })} />
                    <Input type="password" label="password" className="" placeholder="password" {...register("password", {
                        required: true, validate: {
                            matchPatern: (value) => {
                                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(value) || seterr("Enter password greater than 8 and with special charcters");
                            }
                        }
                    })} />
                    <Input type="text" label="name" className="" placeholder="name" {...register("name", {
                        required: true, validate: {

                        }

                    })} />

                    <Button type="submit" child="Singup" />

                </form>
            </div>
        </>
    ) :
        (


            <LodingScreenPage />


        )



}

export default Singup