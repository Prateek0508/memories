import { useState, useEffect } from 'react'
import Router from 'next/router'
import { isAuth, deleteCokkies } from '../../actions/auth/isauth'
import LazyImage from '../src/UI/LazyImage'
import FormData from 'form-data'
import { profileUpdate } from '.././../actions/register/register'
import { defaultprofile } from '../../public/defaultProfile'
export default function Upload() {
    const [user, updateUser] = useState({
        "user": {},
        "error": null,
        "bio": ''
    })
    const [profile, updateProfile] = useState({
        "src": defaultprofile.profile,
        file: {}
    })
    useEffect(() => {
        (
            async () => {
                const user = await isAuth()
                if (user.success) {
                    updateUser({ ...user, "user": user.user })
                }
                else {
                    deleteCokkies()
                    Router.push('/')
                }
            }
        )()
    }, [])
    const bioChangeHandler = (e) => {
        updateUser({ ...user, "bio": e.target.value })
    }
    const photoUpload = e => {
        e.preventDefault();
        const reader = new FileReader();
        const imgFile = e.target.files[0];
        if (imgFile.size / 1024 / 1024 > 4) {
            updateUser({ ...user, 'error': 'file size is too large' })
        }

        else {
            reader.onloadend = () => {
                updateProfile({
                    "src": reader.result,
                    file: imgFile,
                });
            }
            reader.readAsDataURL(imgFile);
        }
    }
    const HandleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            "_id": (user.user._id).toString(),
            "src": profile.src,
            "bio": user.bio
        }
        const info = await profileUpdate(data)
        if (info.success) {
            Router.push('/home')
        }
        else {
            updateUser({ ...user, error: info.msg })
        }
    }
    const ShowError = user.error && <div className="error-notice">
        <div className="oaerror danger">
            <strong className="error">Error</strong><br></br>{user.error}
        </div>
    </div>
    const heading = `Hii ${user.user.username}!!! you can upload your profile picture and bio`
    return (
        <>
            <div className="h-screen font-sans login bg-cover" >

                <div className="container mx-auto h-full flex flex-1 justify-center items-center">
                    <div className="w-full max-w-lg">
                        <div className="leading-loose">
                            <form onSubmit={HandleSubmit} className="max-w-sm m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl">
                                <p className="text-white font-medium text-center text-lg font-bold">{heading}</p>
                                <label className='mt-10 ' htmlFor="photo-upload">
                                    <img width="80%" className="rounded-full imageBorder mx-auto hoverImage  hover:opacity-50" htmlFor="photo-upload" src={profile.src} />
                                    <input className="invisible" id="photo-upload" onChange={photoUpload} type="file" />
                                </label>
                                <div className="">
                                    <label className="block text-sm text-white" htmlFor="email">Bio</label>
                                    <input
                                        className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                        type="string"
                                        onChange={bioChangeHandler}
                                    />
                                </div>
                                <div className="mt-4 items-center flex justify-between">
                                    <button className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                                        type="submit"

                                    >Done!!!</button>
                                </div>
                                {ShowError}
                            </form>

                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="h-screen font-sans login bg-cover  ">
                <div className="bg-white bg-opacity-25 rounded shadow-xl  mx-auto lg:w-1/3 sm:w-1/2 items-center	 ">
                    <h1 className="text-white font-medium text-center text-lg font-bold">{heading}</h1>
                    <label className='mt-10 ' htmlFor="photo-upload">
                        <img className="rounded-full imageBorder mx-auto" htmlFor="photo-upload" width="80%" src={profile.src} />
                        <input className="invisible" id="photo-upload" type="file" />
                    </label>
                    <p className="font-bold text-center text-lg"> Bio</p>
                    <input className="bg-transparent border-2 rounded-full mx-5 border-black mx-auto	" />

                </div>
            </div> */}
        </>
    )
}