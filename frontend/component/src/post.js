import Link from 'next/link'
import Button from '@material-ui/core/Button';
import { useState } from 'react'
import { updateLikes } from '../../actions/post/post'
import Likes from '../src/likes'
import moment from 'moment';
export default function Singlepost(props) {
   const date= moment(props.CreatedAt).format('YYYY-MM-DD');
   const time=moment(date, 'YYYY.MM.DD').fromNow();
    let liked = false
    props.likeArray.map(obj => {
        let user_id = (obj._id)
        if (user_id == props.likedBy) {
            liked = true
        }
    })
    const likesCount = props.likes
    const comments = props.commentsCount
    const [like, unlike] = useState(liked)
    const [count, setCount] = useState({
        likes: likesCount,
        comments: comments
    })
    const [data, setData] = useState(null)
    const [post, showPost] = useState(true)
    const likeHandler = async () => {
        let data = {}
        if (!like) {
            const updateLikes = count.likes + 1
            setCount({ ...count, likes: updateLikes })
            data = {
                like: +1,
                likedBy: props.likedBy,
                likedTo: props.likedto
            }
        }
        if (like) {
            const updateLikes = count.likes - 1
            setCount({ ...count, likes: updateLikes })
            data = {
                like: -1,
                likedBy: props.likedBy,
                likedTo: props.likedto

            }
        }
        const response = await updateLikes(data)
        if (response.success) {
            unlike(!like)
        }
        else {
            alert("something went wrong")
        }
    }
    const likesStr = `${count.likes} likes`
    const commentsStr = `view all ${count.comments} comments`
    const likeAndCommentHandler = (option) => async () => {
        if (option === "like") {
            await setData({
                opt: "Liked By",
                array: props.likeArray,
                commntedBy: props.likedBy,
                post_id: props.likedto
            })
        }
        else {
            await setData({
                opt: "Commented By",
                array: props.commentsArray,
                commntedBy: props.likedBy,
                post_id: props.likedto

            })

        }
        showPost(false)
    }
    const backHandler = (option) => {
        showPost(true)
    } 
    const router =`/profile/${props.userInfo._id}/${props.likedBy}`
    return (
        <>
            {
                post ?
                    (
                        <div className="text-black mb-2">
                            <Link href={router}>
                                <div className="flex ">

                                    <div>
                                        <img className="rounded-full ml-2" src={props.profileImage} height="50" width="50" />
                                    </div>
                                    <p className="p-3 text-xl " style={{ fontFamily: 'Lato' }}>{props.username}</p>

                                </div>
                            </Link>
                            <h1 className="text-center hover:cursor-pointer text-2xl text-bold ">{props.title}</h1>
                            <div className="w-full mt-1">
                                <img src={props.postImage} width="100%" height="200px" />
                            </div>
                            <div className="flex ">
                                <Button onClick={likeHandler} className="hover:cursor-pointer focus:outline-none ">
                                    {
                                        like ?
                                            <img src='/images/like.png' height="35" width="35" />
                                            :
                                            <img src='/images/unlike.png' height="35" width="35" />
                                    }
                                </Button>
                                <Button onClick={likeAndCommentHandler("comment")} className=" focus:outline-none bg-white">
                                    <img src='/images/comment.png' height="35" width="35" />
                                </Button>
                            </div>
                            <Button onClick={likeAndCommentHandler("like")} className="font-bold focus:outline-none ml-2"><b>{likesStr}</b></Button>
                            <p className="ml-2">{props.caption}</p>
                            <Button onClick={likeAndCommentHandler("comment")} className="ml-2 focus:outline-none"><b>{commentsStr}</b></Button>
                            <p className="ml-2">{time}</p>
                        </div>) :
                    <Likes
                        user={props.userInfo}
                        data={data}
                        back={backHandler}
                    />
            }

        </>
    )
}