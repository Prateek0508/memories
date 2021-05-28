import Router from "next/router";
import { useState, useEffect } from "react";
import { isAuth, deleteCokkies } from '../../actions/auth/isauth'
import Link from 'next/link';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useStyles } from './homeCss';
import Footer from "./navbar";
import Posts from '../posts';
import Addpost from './addMemories'
import Search from './search'
import Profile from './profile'
const LandingOPage = (props) => {
    const [page, setPage] = useState('home')
    const [user, setUser] = useState(props.userInformation)
    const [posts, setPosts] = useState(props.posts)
    const pageHandler = (option) => {
        setPage(option)
    }
    let Home = null
    switch (page) {
        case 'home': Home = <Posts userInfo={user} posts={posts} />
            break;
        case 'search': Home = <Search userInfo={user} />
            break;
        case 'add': Home = <Addpost userInfo={user} />
            break;
        case 'profile': Home = <Profile userInfo={user} />
            break;
    }
    return (
        <>
            <div className="min-h-screen mb-10 bg-white-100">

                {Home}
                <div className="block fixed inset-x-0 bottom-0 z-10">
                    <Footer page={pageHandler} />
                </div>
            </div>

        </>
    )
}
export default LandingOPage