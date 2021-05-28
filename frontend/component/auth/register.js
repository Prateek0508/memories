import { useState, useEffect } from "react";
import Router from "next/router";
import { registerHandle } from '../../actions/register/register'
import Loading from '../loading'
import UploadProfile from '../auth/uploadProfile'

const Register = (props) => {
    const [ShowRegister, updateRegister] = useState(true)
    const [value, setValue] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        rePassword: "",
        userName: "",
        RePasswordError: "",
        error: "",
        loading: false

    })
    Router.onRouteChangeStart = (url) => { setValue({ ...value, loading: true }); }
    Router.onRouteChangeComplete = (url) => setValue({ ...value, loading: false });
    Router.onRouteChangeError = (url) => setValue({ ...value, loading: false });

    const ShowError = value.error == "" ? <div></div> : <div className="error-notice">
        <div className="oaerror danger">
            <strong className="error">Error</strong><br></br>{value.error}
        </div>
    </div>

    const HandleFirstName = (e) => {

        setValue({ ...value, firstName: e.target.value })
    }
    const HandleLastName = (e) => {
        setValue({ ...value, lastName: e.target.value })
    }
    const HandleEmail = (e) => {
        setValue({ ...value, email: e.target.value })
    }
    const HandlePassword = (e) => {
        setValue({ ...value, password: e.target.value })
    }
    const HandleRePassword = (e) => {
        if (value.password === e.target.value) {
            setValue({ ...value, RePasswordError: "", rePassword: e.target.value })
        }
        else {
            setValue({ ...value, RePasswordError: "password does not match" })
        }
    }
    const HandleUserName = (e) => {
        setValue({ ...value, userName: e.target.value })
    }
    const HandleSubmit = async (e) => {
        e.preventDefault()
        const credentials = {
            "username": value.userName,
            "password": value.password,
            "email": value.email,
            "firstName": value.firstName,
            "lastName": value.lastName
        }
        if (value.password === value.rePassword) {
            const response = await registerHandle(credentials)
            if (response.success) {
                updateRegister(false)
            }
            else {
                setValue({ ...value, error: response.error })
            }
        }
        else {
            setValue({ ...value, RePasswordError: "password does not match" })
        }

    }
    return (
        <div>
            {value.loading && <Loading></Loading>}
            {ShowRegister ?
                (
                    <div className="h-screen font-sans login bg-cover" >

                        <div className="container mx-auto h-full flex flex-1 justify-center items-center">
                            <div className="w-full max-w-lg">
                                <div className="leading-loose">
                                    <form className="max-w-sm m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl">
                                        <p className="text-white font-medium text-center text-lg font-bold">CREATE YOUR ACCOUNT</p>
                                        <div className="">
                                            <label className="block text-sm text-white" htmlFor="email">First Name</label>
                                            <input
                                                className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                                type="string"
                                                id="name"
                                                placeholder="enter your Name"
                                                aria-label="name"
                                                onChange={HandleFirstName}
                                                required
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <label className="block  text-sm text-white">Last Name</label>
                                            <input
                                                className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                                type="string"
                                                id="lName"
                                                placeholder="enter your Surname"
                                                arial-label="last-name" required
                                                onChange={HandleLastName}
                                                required
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <label className="block  text-sm text-white">Username</label>
                                            <input
                                                className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                                type="string"
                                                id="username"
                                                placeholder="enter your password"
                                                arial-label="username" required
                                                onChange={HandleUserName}
                                                required
                                            />

                                        </div>
                                        <div className="mt-2">
                                            <label className="block  text-sm text-white">Email</label>
                                            <input
                                                className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                                type="email"
                                                id="email"
                                                placeholder="enter your Email"
                                                onChange={HandleEmail}
                                                arial-label="email" required />
                                        </div>
                                        <div className="mt-2">
                                            <label className="block  text-sm text-white">password</label>
                                            <input
                                                className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                                type="password"
                                                id="password"
                                                placeholder="enter your password"
                                                onChange={HandlePassword}
                                                arial-label="password" required />
                                        </div>
                                        <div className="mt-2">
                                            <label className="block  text-sm text-white">Re-enter password</label>
                                            <input
                                                className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                                type="password"
                                                id="Repassword"
                                                placeholder="Re-enter your password"
                                                arial-label="password" required
                                                onChange={HandleRePassword} />
                                            <p className="text-red-700">{value.RePasswordError}</p>

                                        </div>

                                        <div className="mt-4 items-center flex justify-between">
                                            <button className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                                                type="submit"
                                                onClick={HandleSubmit}
                                            >Register</button>
                                            <button className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                                                onClick={props.showPageHandler}
                                            >Login</button>
                                        </div>
                                        {ShowError}
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>) :
                <UploadProfile />
            }

        </div>
    )
}
export default Register