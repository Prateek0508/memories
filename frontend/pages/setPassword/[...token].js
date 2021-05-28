import { useRouter } from 'next/router'
import Loading from '../../component/loading'
import { useState } from 'react'
const Setpassword = () => {
    const router = useRouter()
    const { token } = router.query
    const [data, setData] = useState({
        password: '',
        rePassword: '',
        error: "",
        success: false,
        loading:false
    })
    const ShowError = data.error && <div className="error-notice">
        <div className="oaerror danger">
            <strong className="error">Error</strong><br></br>{data.error}
        </div>
    </div>
    const showSuccess = data.success && <div className="bg-green-100 border-t-4 border-green-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
        <div className="flex">
            <div>
                <p className="font-bold">Password Successfully Updated</p>
            </div>
        </div>
    </div>
    const passwordHandler = (e) => {
        setData({ ...data, password: e.target.value })
    }
    const RepasswordHandler = (e) => {
        if (data.password === e.target.value) {
            setData({ ...data, error: "", rePassword: e.target.value })
        }
        else {
            setData({ ...data, error: "password does not match" })
        }
    }
    const handleSetPass = async (e) => {
        e.preventDefault()
        setData({...data,loading: true})
        const cred = {
            user_id: token[0],
            token: token[1],
            password: data.password
        }
        console.log(cred)
        const req = {
            method: "POST",
            // Adding body or contents to send
            body: JSON.stringify(cred),
            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        await fetch('http://localhost:8000/setPassword', req)
            .then(data => data.json())
            .then(data => {
                if (data.success) {
                    setData({ ...data, error: "", success: true, loading:false})
                }
                else {
                    setData({ ...data, error: data.msg, success: false,loading:false })
                }
            })
    }
    return (
        <>
        {data.loading&&<Loading/>} 
        <div className="h-screen font-sans login bg-cover" >
            <div className="container mx-auto h-full flex flex-1 justify-center items-center">
                <div className="w-full max-w-lg">
                    <div className="leading-loose">
                        <form className="max-w-sm m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl">
                            <label className="block text-sm text-white" htmlFor="email">Password</label>
                            <input
                                className="w-full px-5 py-1 mb-3 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                type="password"
                                id="password"
                                placeholder="Enter Your Password"
                                aria-label="password"
                                onChange={passwordHandler}
                            />
                            <label className="block text-sm text-white" htmlFor="email">re-enter Password</label>
                            <input
                                className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                type="password"
                                id="repassword"
                                placeholder="Enter Your Password"
                                aria-label="password"
                                onChange={RepasswordHandler}
                            />

                            <button className="px-4 py-1 my-5 text-white font-light tracking-wider  bg-gray-900 hover:bg-gray-800 rounded"
                                type="submit"
                                onClick={handleSetPass}>Set Password</button>
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
export default Setpassword