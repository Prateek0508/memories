import { render } from "react-dom"
import { useState, useEffect } from "react";
import Router from "next/router";
import { loginCheck } from "../../actions/login/login"
import Loading from '../loading'
import React from 'react'
import Register from './register'
const Login = () => {
    const [login, setlogin] = useState(true)
    const [value, setValue] = useState({
        userName: "",
        password: "",
        error: false,
        usernameError: "",
        passwordError: "",
        loading: false
    })

    const showPageHandler = (e) => {
        e.preventDefault()
        setlogin(false)
    }
    const userHandler = (e) => {
        setValue({ ...value, 'userName': e.target.value })
    }
    const passwordHandler = (e) => {
        setValue({ ...value, 'password': e.target.value })
    }
    const handleSubmit = async (e) => {
        setValue({ ...value, loading: true })
        e.preventDefault()
        const credentials = {
            "username": value.userName,
            "password": value.password
        }
        let info = await loginCheck(credentials)
        if (info.success) {
            Router.push('/home')
        }
        else {
            const message = info.message
            if (info.status == 404) {
                setValue({ ...value, usernameError: message })
            }
            else {
                setValue({ ...value, passwordError: message })
            }
            Router.push('/')
        }

    }
    return (
        <>

            {value.loading && <Loading></Loading>}
            {login ?
                (

                    <div className="h-screen font-sans login bg-cover" >
                        <div className="container mx-auto h-full flex flex-1 justify-center items-center">
                            <div className="w-full max-w-lg">
                                <div className="leading-loose">
                                    <form className="max-w-sm m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl">
                                        <p className="text-white font-medium text-center text-lg font-bold">LOGIN</p>
                                        <div className="">
                                            <label className="block text-sm text-white" htmlFor="email">Username</label>
                                            <input
                                                className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                                type="string"
                                                id="username"
                                                placeholder="enter your username"
                                                aria-label="Username"
                                                onChange={userHandler}
                                            />
                                            <p className="text-red-700">{value.usernameError}</p>
                                        </div>
                                        <div className="mt-2">
                                            <label className="block  text-sm text-white">password</label>
                                            <input
                                                className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                                type="password"
                                                id="password"
                                                placeholder="enter your password"
                                                onChange={passwordHandler}
                                                arial-label="password" />
                                            <p className="text-red-700 font-weight: 100">{value.passwordError}</p>
                                        </div>

                                        <div className="mt-4 items-center flex justify-between">
                                            <button className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                                                type="submit"
                                                onClick={handleSubmit}
                                            >Login</button>
                                            <a className="inline-block right-0 align-baseline font-bold text-sm text-500 text-white hover:text-red-400" href="/auth/forgotPas">
                                                forgot password ?
                                            </a>
                                        </div>
                                        <div className="text-center">
                                            <button onClick={showPageHandler} className="inline-block right-0 align-baseline font-normal text-sm text-lg hover:text-red-400">
                                                new to memories
                                            </button>
                                        </div>

                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                ) : <Register />
            }
        </>
    )


}

export default Login

