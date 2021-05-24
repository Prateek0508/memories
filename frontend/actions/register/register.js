import FormData from 'form-data'
import axios from 'axios'
import cookie from "js-cookie";

export const registerHandle = async (credentials) => {
    let info;
    const req = {
        method: "POST",
        // Adding body or contents to send
        body: JSON.stringify(credentials),
        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }
    await fetch('http://localhost:8000/api/users/register', req)
        .then(async (response) => {

            const data = await response.json();
            const token = data.token
            await cookie.set('token', token)
            info = data
        })
    return info
}
export const profileUpdate = async (data) => {
    var info = {}
    //sending data using formData
    // //console.log(data.src)
    // let form = new FormData();
    // form.append('file', data.src)
    // //form.append('username', data.username)
    // // const req = {
    // //     method: 'POST',
    // //     body: form,

    // // }
    // axios.post('http://localhost:8000/api/users/uploadProfilePicture', form, {
    //     headers: {
    //         "Content-Type": " multipart/form-data; boundary=something"
    //     }
    // })
    //     .then((res) => console.log(res))
    const req = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    await fetch('http://localhost:8000/api/users/uploadProfilePicture', req)
        .then((response) => response.json())
        .then((data) => info = data)
    return info
}

export const uploadPost = async (data) => {
    var info = {}
    //sending data using formData
    // //console.log(data.src)
    // let form = new FormData();
    // form.append('file', data.src)
    // //form.append('username', data.username)
    // // const req = {
    // //     method: 'POST',
    // //     body: form,

    // // }
    // axios.post('http://localhost:8000/api/users/uploadProfilePicture', form, {
    //     headers: {
    //         "Content-Type": " multipart/form-data; boundary=something"
    //     }
    // })
    //     .then((res) => console.log(res))
    const req = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    await fetch('http://localhost:8000/post/createPost', req)
        .then((response) => response.json())
        .then((data) => info = data)
    return info
}


export const updatePost = async (data) => {
    // console.log(data);
    let info = {}
    const req = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    await fetch('http://localhost:8000/api/users/updateProfile', req)
        .then(response => response.json())
        .then(data => { info = data })
    return info
}
