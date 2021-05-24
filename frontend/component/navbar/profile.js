import { updatePost } from '../../actions/register/register'
import Router from "next/router";
import { useState, useEffect } from "react";
import Link from 'next/link';
import Loading from '../loading'
import { Button } from '@material-ui/core'
import Singlepost from '../src/post'
const Profile = (props) => {
    const userdata=props.userInfo
    const [user, updateUser] = useState({
        user: userdata,
        posts: userdata.posts,
        src: `http://localhost:8000/profilePictures/${userdata.profile_pic}`,
        error: ""
    })
    const [edit, toggleEdit] = useState(false)
    const showError = user.error && <div className="error-notice">
        <div className="oaerror danger">
            <strong className="error ">Error</strong><br></br>{user.error}
        </div>
    </div>
    const photoUpload = (e) => {
        e.preventDefault();
        const reader = new FileReader();
        const imgFile = e.target.files[0];
        if (imgFile.size / 1024 / 1024 > 4) {
            updatePost({ ...post, error: 'file size is too large' })
        }

        else {
            reader.onloadend = () => {
                updateUser({
                    ...user,
                    src: reader.result,
                    error: '',
                });
            }
            reader.readAsDataURL(imgFile);
        }
    }
    const usernameHandler = e => {
        const updateuser = {
            ...user.user,
            username: e.target.value
        }
        updateUser({ ...user, user: updateuser })
    }
    const bioHandler = e => {
        const updateuser = {
            ...user.user,
            bio: e.target.value
        }
        updateUser({ ...user, user: updateuser })
    }
    const handleSubmit = async e => {
        e.preventDefault()
        const data = {
            username: user.user.username,
            bio: user.user.bio,
            picture: user.src,
            _id: user.user._id
        }
        const res = await updatePost(data)
        console.log(res);
        if (res.success) {
            toggleEdit(false)
        }
        else {
            updateUser({ ...user, error: res.msg })
        }


    }
    const name = `${user.user.firstName} ${user.user.lastName}`
    const handleEdit = e => {
        e.preventDefault()
        toggleEdit(true)
    }
    let postCard = user.posts.map((post, i) => {
        return <Singlepost
            key={i}
            username={user.user.username}
            profileImage={`http://localhost:8000/profilePictures/${user.user.profile_pic}`}
            title={post.title}
            postImage={`http://localhost:8000/posts/${post.picture}`}
            likes={post.no_of_likes}
            caption={post.caption}
            commentsCount={post.no_of_likes}
            comment={post.comments}
            editable={true}
        />
    })
    return (
        <>
            <div className="grid grid-cols-1 w-full lg:w-1/3 mx-auto ">
                {edit ?
                    (<div className=" login mb-5 ">
                        <div className="bg-white bg-opacity-90 text-black my-10 mx-5 lg:mx-20 p-10 relative">
                            <input type="text" onChange={usernameHandler} value={user.user.username} className="bg-transparent focus:outline-none border-b-2 border-green-500 text-xl mb-5" style={{ fontFamily: 'Lato' }} />
                            <label className='mt-10 ' htmlFor="photo-upload">
                                <img width="50%" className="rounded-full mx-auto hoverImage hover:opacity-50 " htmlFor="photo-upload" src={user.src} />
                                <input className="invisible" id="photo-upload" onChange={photoUpload} type="file" />
                            </label>
                            <h1 className="text-3xl font-bold text-center mt-5" style={{ fontFamily: 'Lato' }} >{name}</h1>
                            <hr className="border-b-1 border-green-500" />
                            <input value={user.user.bio} onChange={bioHandler} className="text-lg bg-transparent border-b-2 border-green-500 focus:outline-none mt-5" />
                            <button className="px-4 py-1 text-white font-light tracking-wider mt-5 bg-gray-900 hover:bg-gray-800 rounded"
                                type="submit"
                                onClick={handleSubmit}
                            >Update</button>
                            {showError} 
                        </div>
                    </div>)
                    : (<div className=" login mb-5 ">
                        <div className="bg-white bg-opacity-90 text-black my-10 mx-5 lg:mx-20 p-10 relative">
                            <p className="text-xl mb-5" style={{ fontFamily: 'Lato' }}>@ {user.user.username}</p>
                            <img width="50%" className="rounded-full    mx-auto hoverImage " src={`http://localhost:8000/profilePictures/${user.user.profile_pic}`} />
                            <h1 className="text-3xl font-bold text-center mt-5" style={{ fontFamily: 'Lato' }} >{name}</h1>
                            <hr className="border-b-1 border-green-500" />
                            <p className="text-lg mt-5"> {user.user.bio}</p>

                            <div className="absolute top-2 right-2">
                                <Button onClick={handleEdit} className="focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </Button>
                            </div>
                        </div>
                    </div>)}
                {postCard}
            </div>
        </>
    )
}
export default Profile