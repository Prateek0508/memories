import { useState, useEffect } from 'react'
import Router from 'next/router'
import { isAuth, deleteCokkies } from '../../actions/auth/isauth'
import LazyImage from '../src/UI/LazyImage'
import FormData from 'form-data'
import { profileUpdate } from '.././../actions/register/register'
export default function Upload() {
    const [user, updateUser] = useState({
        "user": {},
    })
    const [profile, updateProfile] = useState({
        "src": "/images/profile.jpg",
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
        let newUser = user.user
        newUser = { ...newUser, bio: e.target.value }
        updateUser({ user: newUser })
        console.log(user.user)
    }
    const photoUpload = e => {
        e.preventDefault();
        const reader = new FileReader();
        const imgFile = e.target.files[0];
        reader.onloadend = () => {
            updateProfile({
                "src": reader.result,
                file: imgFile
            });
        }
        reader.readAsDataURL(imgFile);
    }
    const HandleSubmit = (e) => {
        e.preventDefault();
        const data = {
            "username": user.user.username,
            "src": profile.file
        }
        profileUpdate(data)

    }
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
                                    <img className="rounded-full imageBorder mx-auto hoverImage  hover:opacity-50" htmlFor="photo-upload" width="80%" src={profile.src} />
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