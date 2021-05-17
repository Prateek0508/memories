import FormData from 'form-data'
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
            const expiresIn = data.expires
            document.cookie = `token=${token};expires=${expiresIn}`
            info = data
        })
    console.log(info);
    return info
}
export const profileUpdate = async (data) => {
    let form = new FormData();
    form.append('file', data.src)

    const req = {
        method: 'POST',
        body: form,
        headers: {
            "Content-type": "multipart / form - data ; charset=UTF-8"
        }
    }
    fetch('http://localhost:8000/api/users/uploadProfilePicture', req)
        .then((res) => res.json())
        .then((data) => console.log(data))
}