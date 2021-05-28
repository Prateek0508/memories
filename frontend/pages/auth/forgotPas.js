import { useState } from "react"
import Router from "next/router";
import Loader from "../../component/loading"
const ForgotPas = () => {

    const [data, setData] = useState({
        email: '',
        success: false,
        error: '',
        loading: false
    })
    const ShowError = data.error && <div className="error-notice">
        <div className="oaerror danger">
            <strong className="error">Error</strong><br></br>{data.error}
        </div>
    </div>
    const showSuccess = data.success && <div className="bg-green-100 border-t-4 border-green-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
        <div className="flex">
            <div>
                <p className="font-bold">{`check your email ${data.email}. and follow instructions`}</p>
            </div>
        </div>
    </div>
    const emailHandler = (e) => {
        setData({ ...data, email: e.target.value })
    }
    const handleForgotPass = (e) => {
        e.preventDefault()
        setData({ ...data, loading: true })
        const req = {
            method: 'POST',
            body: JSON.stringify({ email: data.email }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }
        fetch('http://localhost:8000/api/users/forgotPassword', req)
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    setData({ ...data, success: true, error: "",loading: false });
                }
                else {
                    setData({ ...data, success: false, error: response.msg,loading: false });
                }

            })
    }
    const handleLogin = (e) => {
        e.preventDefault()
        Router.push('/')
    }
    return (
        <>
        {data.loading&&<Loader/>}
            <div className="h-screen font-sans login bg-cover" >
                <div className="container mx-auto h-full flex flex-1 justify-center items-center">
                    <div className="w-full max-w-lg">
                        <div className="leading-loose">
                            <form className="max-w-sm m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl">
                                <label className="block text-sm text-white" htmlFor="email">Email</label>
                                <input
                                    className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                    type="email"
                                    autoComplete="off"
                                    id="username"
                                    placeholder="enter your email"
                                    aria-label="Username"
                                    onChange={emailHandler}
                                />
                                <div className="flex justify-between mt-5 mb-5">
                                    <button className="px-4 py-1 text-white font-light tracking-wider  bg-gray-900 hover:bg-gray-800 rounded"
                                        type="submit"
                                        onClick={handleForgotPass}
                                    >Set Password</button>
                                    <button className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                                        type="submit"
                                        onClick={handleLogin}
                                    >Login</button>
                                </div>
                                {showSuccess}
                                {ShowError}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ForgotPas