import React, { useEffect, useMemo, useState } from 'react'
import DataBaseService from '../../AppwriteBackend/AuthDatabase.Appwrite'
import { Link } from 'react-router-dom'

function Card({ $id, Title, thumbnail_Image }) {
    const [Post, setPost] = useState("")
    useEffect(() => {
        if (thumbnail_Image) {
            const image = DataBaseService.getFilePreview(thumbnail_Image).then((res) => { return setPost(res) });
            if (image) {
                setPost(image);
            }
        }
    }, [])
    console.log($id)
    return (
        <Link to={`/post/${$id}`}>



            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img className="rounded-t-lg" src={Post.href} alt={Title} />
                </a>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{Title}</h5>
                    </a>
                    <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </a>
                </div>
            </div>


        </Link>
    )
}



export default Card