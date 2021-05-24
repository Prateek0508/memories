import HomePage from '../component/navbar/home'
import { useState, useEffect } from 'react'
import  {isAuth, deleteCokkies} from '../actions/auth/isauth'
import { getPosts } from '../actions/post/post'
import Router from "next/router";
const Home = () => {
const [user,setUser]=useState({
    user:null,
    posts:[]
})
const [posts,setPosts]=useState([])
useEffect(async () => {
    const user = await isAuth()
    const postArray = await getPosts()
    if (user.success) {
       
        setUser({user:user.user,posts:postArray})
    }
    else {
        deleteCokkies()
        alert('you are loged out')
        Router.push('/')
    }
}, [])
    return (
        user.user&&<HomePage userInformation={user.user} posts={user.posts}/>
    )
}
export default Home