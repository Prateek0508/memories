export const getPosts = async () => {
        let info = {}
        await fetch('http://localhost:8000/post/getPosts')
                .then(data => data.json())
                .then(response => info = response)
        return info
}

export const updateLikes = async (data) => {
        const req = {
                method: "POST",
                // Adding body or contents to send
                body: JSON.stringify(data),
                // Adding headers to the request
                headers: {
                        "Content-type": "application/json; charset=UTF-8"
                }
        }
        await fetch('http://localhost:8000/post/likes',req)       
}