import React, { useEffect,useState } from 'react'
import DataBaseService from '../../AppwriteBackend/AuthDatabase.Appwrite';
import { Container, Postform } from "../index";
import { useNavigate, useParams } from 'react-router-dom';
function EditPost() {
    const [post, setPost] = useState([]);
    const { slug } = useParams();
    const Nav = useNavigate();
    useEffect( () => {
     const getData= async ()=>{ if(slug){
       await DataBaseService.getPost(slug).then((res) => { if(res)
       return setPost(res)}).catch((error) => { throw error });
      }
      else {
        Nav("/");
      }}
      getData()
    },[slug,Nav])
    return (
        <>
            <h1 className='text-2xl text-slate-950 text-center'>Editing Post</h1>
            <Container>
                <Postform post={post} />
            </Container>
        </>
    )
}

export default EditPost