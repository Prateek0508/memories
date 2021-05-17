import cookie from "js-cookie";
export const isAuth = async () => {
    let user = {}
    const token = cookie.get('token')
    const req = {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": token
        }
    }
    await fetch('http://localhost:8000/api/users/protected', req)
        .then(response => response.json())
        .then(data => {

            if (data) user = { user: data.user, success: data.success }

        })
        .catch(err => {
            if (err.status === 401) user = { success: false }
        })
    return user
}
export const deleteCokkies = () => {
    cookie.remove('token', {
        expires: 1,
    });
}