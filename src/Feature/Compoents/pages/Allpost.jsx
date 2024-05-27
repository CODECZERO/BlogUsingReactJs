import React, { useEffect, useMemo, useState } from 'react';
import DataBaseService from '../../AppwriteBackend/AuthDatabase.Appwrite';
import { Card, Container } from "../index";
import { useNavigate } from 'react-router-dom';
function Allpost() {
    const [posts, setPosts] = useState([])

    useMemo(() => {
        DataBaseService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
    console.log(posts)

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <Card {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Allpost