import Button from '@material-ui/core/Button';
import Router from 'next/router'
import { useState } from 'react'
import Link from 'next/link'
import Loading from '../loading'
import { addComment } from '../../actions/post/post'
export default function Likes(props) {
    const options = props.data.opt
    const userID = props.data.commntedBy
    const AraayofData = props.data.array
    const [loading, setLoading] = useState(false)
    const [comment, setComment] = useState({
        content: "",
        user_id: userID
    })
    Router.onRouteChangeStart = (url) => { setLoading(true); }
    Router.onRouteChangeComplete = (url) => setLoading(false);
    Router.onRouteChangeError = (url) => setLoading(false);
    const [data, setData] = useState(AraayofData)
    const HandleContent = (e) => {
        setComment({
            ...comment,
            content: e.target.value
        })
    }
    const addCommentHandler = async () => {
        const dataObj = {
            post_id: props.data.post_id,
            content: comment.content,
            commentedby: comment.user_id
        }
        const res = await addComment(dataObj)
        if (res.success) {
            Router.reload('/home')
            setComment({ ...comment, content: "" })
        }
        else {
            alert("something went wrong")
        }
    }
    let ListOfItems = null
    if (props.data.opt === "Commented By") {
        ListOfItems = data.map((comments, i) => {
            const router = `/profile/${comments.user._id}/${userID}`
            return <div
                key={i}
                className="flex items-center mb-3 ">
                <Link href={router} >
                    <div className="hover:cursor-pointer">
                        <img className="rounded-full ml-2" src={`http://localhost:8000/profilePictures/${comments.user.profile_pic}`} height="40" width="40" />
                    </div>
                </Link>
                <Link href={router} >
                    <p className="p-1 hover:cursor-pointer text-sm font-bold " style={{ fontFamily: 'Lato' }}>{comments.user.username}</p>
                </Link>
                <p className="p-1 text-sm">{comments.content}</p>
            </div>
        })
    }
    if (props.data.opt === "Liked By") {
        ListOfItems = data.map((comments, i) => {
            const router = `/profile/${comments._id}?id=${userID}`
            return <div
                key={i}
                className="flex items-center mb-2 ">
                <Link href={router} >
                    <div className="hover:cursor-pointer">
                        <img className="rounded-full ml-2" src={`http://localhost:8000/profilePictures/${comments.profile_pic}`} height="40" width="40" />
                    </div>
                </Link>
                <Link href={router} >

                    <p className="p-1 hover:cursor-pointer text-sm font-bold " style={{ fontFamily: 'Lato' }}>{comments.username}</p>
                </Link>

                <p className="p-1 text-sm">{comments.content}</p>
            </div>
        })
    }

    return (
        <>
            {loading && <Loading />}

            <div className="text-black min-h-screen relative  lg:border-2">
                <div className="flex items-center border-t-2  mb-2 ">
                    <div>
                        <img className="rounded-full ml-2" src={`http://localhost:8000/profilePictures/${props.user.profile_pic}`} height="50" width="50" />
                    </div>
                    <p className="p-3 text-xl mb-2" style={{ fontFamily: 'Lato' }}>{props.user.username}</p>
                </div>
                <div className="flex justify-between    mb-3">
                    <p className="font-bold p-2">{props.data.opt}</p>
                    <Button onClick={props.back} className="focus:outline-none ">

                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        <b>Back</b>

                    </Button>
                </div>
                <div className="flex flex-col mt-2 mt-20">
                    {ListOfItems}
                </div>
                {
                    props.data.opt == "Commented By" &&
                    <div className="flex justify-between border-2 absolute top-32 w-full rounded-full">
                        <input className=" bg-transparent focus:outline-none p-2 " onChange={HandleContent} placeholder="Comment... " />
                        <Button onClick={addCommentHandler} className="focus:outline-none ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </Button>
                    </div>
                }
            </div>

        </>
    )

}