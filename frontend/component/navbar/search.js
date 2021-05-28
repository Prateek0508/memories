import Link from 'next/link';
import { useState, useEffect } from "react";
import Loading from '../loading'
import Router from "next/router";
import Loader from '../loading'
const Search = () => {
    const [user, setUser] = useState([])
    const [loading, SetLoading] = useState(false)
    const searchHandler = async (e) => {
        SetLoading(true)
        const req = {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        var url = `http://localhost:8000/api/users/search?search=${e.target.value}`
        await fetch(url, req)
            .then(data => data.json())
            .then(data => {
                if (data.success) {
                    SetLoading(false)
                    setUser(data.users)
                }
            })
    }
    var showResult = null
    if (user[0]) {
        showResult = user.map((data, i) => {
            var name = `${data.firstName} ${data.lastName}`
            const router = `/profile/${data._id}`
            return (
                <Link
                    key={i}
                    href={router }>
                    <div
                        key={i}
                        className=" flex">
                        <div className="my-2">
                            <img className="rounded-full ml-2" src={`http://localhost:8000/profilePictures/${data.profile_pic}`} height="50" width="50" />
                        </div>
                        <div className="flex flex-col mt-3 mx-2 style={{ fontFamily: 'Lato' }}">
                            <div>
                                <p className=" text-m font-bold" >{data.username}</p>
                            </div>
                            <div>
                                <p className=" text-sm " >{name}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            )
        })
    }
    else {
        showResult = <div>
            No User Found
        </div>
    }
    return (
        <>
            <div className="p-6 sm:p-4 flex flex-col">
                <div className="bg-white flex items-center rounded-full shadow-xl ">
                    <input onChange={searchHandler} className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none" autoComplete="off" id="search" type="text" placeholder="Search" />
                    <div className="p-4">
                        <button className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="border-t-2 mt-6">
                    {loading && <Loader />}
                    {showResult}
                </div>
            </div>
        </>
    )
}
export default Search