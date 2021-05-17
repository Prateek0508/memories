import { isAuth, deleteCokkies } from '../../actions/auth/isauth'
import Router from "next/router";
import { useState, useEffect } from "react";
import Link from 'next/link';
import Loading from '../loading'
import { Button } from '@material-ui/core'
const Profile = () => {
    const [value, setValue] = useState(false)
    const [user, updateUser] = useState({
        "user": {}
    })
    useEffect(() => {
        (
            async () => {

                const user = await isAuth()
                console.log(user.success)
                if (user.success) {
                    updateUser({ "user": user.user })
                }
                else {
                    deleteCokkies()
                    Router.push('/')
                }
            }
        )()
    }, [])
    const handleUpload = () => {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
    }
    return (
        <>
        </>
    )
}
export default Profile