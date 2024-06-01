import React, { useEffect, useMemo, useState } from 'react';
import DataBaseService from '../../AppwriteBackend/AuthDatabase.Appwrite';
import { Card, Container } from "../index";
import { LoadingScreenBlog } from '../index';
function Allpost() {
    const [posts, setPosts] = useState([]);;
    const [loading, setloading] = useState(true);

    useEffect(() => {
            DataBaseService.getPosts([]).then((PostData) => {
                if (PostData) {
                    setloading(false);
                    return setPosts(PostData.documents);
                }
            })

    }, [])



    return !loading ? (
        <>
            <div className='w-full py-8'>
                <Container>
                    <div className='flex flex-wrap'>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 w-full'>
                                <Card {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        </>
    ) :
        (


            <LoadingScreenBlog />


        )
}

export default Allpost