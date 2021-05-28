export const getPosts = async () => {
        let info = {}
        await fetch('http://localhost:8000/post/getPosts')
                .then(data => data.json())
                .then(response => info = response)
        return info
}

export const updateLikes = async (data) => {
        let info = null
        const req = {
                method: "POST",
                // Adding body or contents to send
                body: JSON.stringify(data),
                // Adding headers to the request
                headers: {
                        "Content-type": "application/json; charset=UTF-8"
                }
        }
        await fetch('http://localhost:8000/post/likes', req)
                .then(data => data.json())
                .then(data => info = data)
        return info
}
export const addComment = async (data) => {
        let info = null
        const req = {
                method: "POST",
                // Adding body or contents to send
                body: JSON.stringify(data),
                // Adding headers to the request
                headers: {
                        "Content-type": "application/json; charset=UTF-8"
                }
        }
        await fetch('http://localhost:8000/post/addComment', req)
                .then(response => response.json())
                .then(data => info = data)
        return info
}

export const userPost = async (data) => {
        let info = null
        const req = {
                method: "Post",
                headers: {
                        "Content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify(data)
        }

        await fetch('http://localhost:8000/api/users/userDetail', req)
                .then(response => response.json())
                .then(response => {
                        info = response
                })
        return info
}

