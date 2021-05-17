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
const LandingOPage = () => {
    const [page, setPage] = useState('home')
    useEffect(() => {
        (
            async () => {
                const user = await isAuth()

                if (user.success) {

                }
                else {
                    deleteCokkies()
                    alert('you are loged out')
                    Router.push('/')
                }
            }
        )()
    }, [])
    let Home = <Posts />
    switch (page) {
        case 'home': Home = <Posts />
            break;
        case 'search': Home = <Search />
            break;
        case 'add': Home = <Addpost />
            break;
        case 'profile': Home = <Profile />
            break;
    }



    const pageHandler = (option) => {
        setPage(option)
    }
    return (
        <>
            <div className="min-h-screen  bg-white-100">
                {Home}
                <div className="block fixed inset-x-0 bottom-0 z-10">
                    <Footer page={pageHandler} />
                </div>
            </div>
        </>
    )
}
export default LandingOPage