import React, { useEffect, useMemo, useState } from 'react'
import DataBaseService from '../../AppwriteBackend/AuthDatabase.Appwrite';
import { Container, Postform } from "../index";
import { useNavigate, useParams } from 'react-router-dom';
function EditPost() {
    const [Post, setPost] = useState([]);
    const { slug } = useParams();
    const Nav = useNavigate();
    useEffect( () => {
      if(slug){
        DataBaseService.getPost(slug).then((res) => { if(res) setPost(res) }).catch((error) => { throw error });
      }
      else {
        Nav("/");
      }
    })

    return (
        <>
            <h1>Edit Post</h1>
            <Container>
                <Postform post={Post} />
            </Container>
        </>
    )
}

export default EditPost