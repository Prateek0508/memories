import Link from 'next/link';
import { useState, useEffect } from "react";
import Loading from '../loading'
import Router from "next/router";
import { defaultprofile } from '../../public/defaultProfile'
import { isAuth, deleteCokkies } from '../../actions/auth/isauth'
import { uploadPost } from '../../actions/register/register'
const AddMemories = (props) => {
    const [loading, setLoading] = useState(false)
    const [post, updatePost] = useState({
        user: props.userInfo,
        src: '/images/unnamed.png',
        file: {},
        caption: '',
        title: '',
        error: '',
        success: false
    })
    Router.onRouteChangeStart = (url) => { setLoading(true); }
    Router.onRouteChangeComplete = (url) => setLoading(false);
    Router.onRouteChangeError = (url) => setLoading(false);
    const ShowError = post.error && <div className="error-notice">
        <div className="oaerror danger">
            <strong className="error">Error</strong><br></br>{post.error}
        </div>
    </div>
    const showSuccess = post.success && <div className="bg-green-100 border-t-4 border-green-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
        <div className="flex">
            <div>
                <p className="font-bold">Successfully Uploaded</p>
            </div>
        </div>
    </div>
    const photoUpload = (e) => {
        const reader = new FileReader();
        const imgFile = e.target.files[0];
        if (imgFile.size / 1024 / 1024 > 40) {
            updatePost({ ...post, error: 'file size is too large' })
        }

        else {
            reader.onloadend = () => {
                updatePost({
                    ...post,
                    src: reader.result,
                    error: '',
                    file: imgFile,
                });
            }
            reader.readAsDataURL(imgFile);
        }
    }
    const titleHandle = e => {
        updatePost({ ...post, title: e.target.value })
    }
    const captionHandle = e => {
        updatePost({ ...post, caption: e.target.value })
    }
    const submitHandler = async (e) => {
        e.preventDefault();

        if (post.src == '/images/unnamed.png') {
            updatePost({ ...post, error: 'upload image!!!' })
        }
        else {
            const data = {
                title: post.title,
                caption: post.caption,
                image: post.src,
                user_id: post.user._id
            }
            const info = await uploadPost(data)
            if (info.success) {
                Router.reload('/home')
                // updatePost({
                //     ...post,
                //     src: '/images/unnamed.png',
                //     caption: '',
                //     title: '',
                //     error: '',
                //     success: true

                // })
            }
            else updatePost({ ...post, error: info.msg })
        }
    }
    return (
        <>
                {loading&&<Loading/>}

            <div className="h-screen font-sans login bg-cover" >
                <div className="container mx-auto h-full flex flex-1 justify-center items-center">
                    <div className="w-full max-w-lg">
                        <div className="leading-loose">
                            <form onSubmit={submitHandler} className="max-w-sm m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl">
                                <p className="text-white font-medium text-center text-lg font-bold">Add Memories</p>
                                <label className='mt-10 ' htmlFor="photo-upload">
                                    <img width="80%" className="rounded-full  mx-auto hoverImage  hover:opacity-50" htmlFor="photo-upload" src={post.src} />
                                    <input className="invisible" id="photo-upload" onChange={photoUpload} type="file" />
                                </label>
                                <label className="block  text-sm text-white">Tittle</label>
                                <input
                                    className="w-full px-5 py-1 text-black text-bold border-b-2 bg-transparent focus:outline-none"
                                    type="text"
                                    id="password"
                                    onChange={titleHandle}
                                    arial-label="password" required />
                                <label className="block  text-sm text-white">caption</label>
                                <input
                                    className="w-full px-5 py-1 text-black text-bold border-b-2 bg-transparent focus:outline-none"
                                    type="text"
                                    id="password"
                                    onChange={captionHandle}
                                    arial-label="password" required />
                                <button className="px-4 py-1 mt-2 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                                    type="submit"
                                >Add!!!</button>
                                {ShowError}
                                {showSuccess}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
export default AddMemories