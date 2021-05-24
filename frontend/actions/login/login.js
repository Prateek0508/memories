import cookie from "js-cookie";
export const loginCheck = async (credentials) => {
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
    await fetch('http://localhost:8000/api/users/login', req)
        .then(async (reqItem) => {
            let data = await reqItem.json()
            if (data.success) {
                const token = data.token
                await cookie.set('token', token)
                info = {
                    "success": data.success
                }
            }
            else {
                info = {
                    "success": data.success,
                    "message": data.msg,
                    "status": data.status
                }
            }
        }).catch(err => { console.log(err) })
    return info



}