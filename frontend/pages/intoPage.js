import Router from 'next/router'
import Loader from '../component/loading'
import {useState} from 'react'
const IntroPage = () => {
    const [loading, setLoading] = useState(false)
    Router.onRouteChangeStart = (url) => setLoading(true);
    Router.onRouteChangeComplete = (url) => setLoading(false);
    Router.onRouteChangeError = (url) => setLoading(false);
    return (
        <>
            {loading && <Loader />}
            <div className="h-screen font-sans login bg-cover" >
                <div className="container mx-auto h-full flex flex-1 justify-center items-center">
                    <div className="w-full max-w-lg">
                        <div className="leading-loose">
                            <div className="max-w-sm m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl">
                                <p className="text-lg font-bold mb-5">Devloped by Prateek Patidar</p>
                                <img width="80%" className="rounded-full mb-5 mx-auto hoverImage  " htmlFor="photo-upload" src="/images/prateek.jpg" />
                                <p className="font-bold mb-5">for any query mail us at application.memories@gmail.com</p>
                                <button className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                                    onClick={() => Router.push('/home')}
                                >Home</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default IntroPage