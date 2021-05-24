import Button from '@material-ui/core/Button';
import { useState } from 'react'
import {updateLikes} from '../../actions/post/post'
export default function Singlepost(props) {
    const likes = props.likes
    const comments = props.commentsCount
    const [like, unlike] = useState(true)
    const [count, setCount] = useState({
        likes: likes,
        comments: comments
    })
    const likeHandler = () => {
        let data = {}
        if (like) {
            const updateLikes = count.likes + 1
            setCount({ ...count, likes: updateLikes })
            data = {
                like: +1,
                likedBy: props.likedBy,
                likedTo: props.likedto
            }
        }
        if (!like) {
            const updateLikes = count.likes - 1
            setCount({ ...count, likes: updateLikes })
            data = {
                like: -1,
                likedBy: props.likedBy,
                likedTo: props.likedto

            }
        }
        unlike(!like)
        
        updateLikes(data)

    }
    const likesStr = `${count.likes} likes`
    const commentsStr = `view all ${count.comments} comments`
    return (
        <>
            <div className="text-black mb-2">
                <div className="flex ">
                    <div>
                        <img className="rounded-full ml-2" src={props.profileImage} height="50" width="50" />
                    </div>
                    <p className="p-3 text-xl " style={{ fontFamily: 'Lato' }}>{props.username}</p>
                </div>
                <h1 className="text-center text-2xl text-bold ">{props.title}</h1>
                <div className="w-full mt-1">
                    <img src={props.postImage} width="100%" height="200px" />
                </div>
                <div className="flex ">
                    <Button onClick={likeHandler} className=" focus:outline-none ">
                        {
                            like ?
                                <img src='/images/unlike.png' height="35" width="35" />
                                :
                                <img src='/images/like.png' height="35" width="35" />
                        }
                    </Button>
                    <Button className=" focus:outline-none bg-white">
                        <img src='/images/comment.png' height="35" width="35" />
                    </Button>
                </div>
                <Button className="font-bold focus:outline-none ml-2"><b>{likesStr}</b></Button>
                <p className="ml-2">{props.caption}</p>
                <Button className="ml-2 focus:outline-none"><b>{commentsStr}</b></Button>
                <p className="ml-2">0 sec ago</p>
            </div>
        </>
    )
}