import { useRouter } from 'next/router'
import Router from "next/router";
import Button from '@material-ui/core/Button';
import Loading from '../../component/loading'
import { useState, useEffect } from 'react'
import { userPost } from '../../actions/post/post'
import Singlepost from '../../component/src/post'
const Profile = () => {
    const [user, updateUser] = useState(null)
    const router = useRouter()
    const { pid, id } = router.query
    const [userId, setUserId] = useState(pid)
    const [count, setcount] = useState(true)// becouse i  want to execute if code once only becouse state is updating in it soo to prevent it from infinite loop
    if (pid && count) {
        setcount(false)
        const req = {
            method: "Post",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({ user_id: pid })
        }
        fetch('http://localhost:8000/api/users/userDetail', req)
            .then(response => response.json())
            .then(async (response) => {
                if (response.success) {
                    await updateUser(response.user)

                }
            })
    }
    let postCard = null
    let name = ""
    if (user) {
        postCard = user.posts.map((post, i) => {
            return <Singlepost
                key={i}
                username={user.username}
                profileImage={`http://localhost:8000/profilePictures/${user.profile_pic}`}
                title={post.title}
                postImage={`http://localhost:8000/posts/${post.picture}`}
                likes={post.no_of_likes}
                caption={post.caption}
                commentsCount={post.no_of_comments}
                commentsArray={post.comments}
                likeArray={post.likes}
                likedBy={id}//current login
                likedto={post._id}//post_id
                userInfo={user}//about post`s owner
                CreatedAt={post.createdAt}
            />
        })
        name = `${user.firstName} ${user.lastName}`
    }

    return (
        <>
            {user && (<div className="grid grid-cols-1 w-full lg:w-1/3 mx-auto ">
                <div className=" login mb-5 ">
                    <div className="bg-white bg-opacity-90 text-black my-10 mx-5 lg:mx-20 p-10 relative">
                        <p className="text-xl mb-5" style={{ fontFamily: 'Lato' }}>@ {user.username}</p>
                        <img width="50%" className="rounded-full    mx-auto hoverImage " src={`http://localhost:8000/profilePictures/${user.profile_pic}`} />
                        <h1 className="text-3xl font-bold text-center mt-5" style={{ fontFamily: 'Lato' }} >{name}</h1>
                        <hr className="border-b-1 border-green-500" />
                        <p className="text-lg mt-5"> {user.bio}</p>
                        <div className="absolute top-2 right-2">
                            <Button onClick={() => Router.push('/home')} className="focus:outline-none ">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                                <b>Back</b>

                            </Button>
                        </div>
                    </div>
                </div>
                {postCard}

            </div>)
            }
        </>
    )
}

export default Profile;