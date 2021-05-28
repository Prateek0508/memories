import Button from '@material-ui/core/Button';
import Singlepost from './src/post'
import { useState, useEffect } from 'react'
import { getPosts } from '../actions/post/post'
export default function posts(props) {
    const [post, setPost] = useState(props.posts)
    const [user, setUser] = useState(props.userInfo)
    let postCard = post.posts.map((post, i) => {
        return <Singlepost       
            key={i}
            username={post.user.username}
            profileImage={`http://localhost:8000/profilePictures/${post.user.profile_pic}`}
            title={post.title}
            postImage={`http://localhost:8000/posts/${post.picture}`}
            likes={post.no_of_likes}
            caption={post.caption}
            commentsCount={post.no_of_comments}
            commentsArray={post.comments}
            likeArray={post.likes}
            likedBy={user._id}
            likedto={post._id}
            userInfo={post.user}
            CreatedAt={post.createdAt}
        />
    })
    return (
        <>
            <h1 className="text-center text-4xl font-bold mb-1" style={{ fontFamily: 'Lato' }}>  Memories</h1>
            <div className="grid grid-cols-1 w-full lg:w-1/2 xl:w-1/3  mx-auto gap-5 ">
                {postCard}
            </div>
        </>
    )
}