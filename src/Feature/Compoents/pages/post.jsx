import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import DataBaseService from "../../AppwriteBackend/AuthDatabase.Appwrite";
import { LodingScreenPage } from "../index";

export default function Post() {
    const [post, setPost] = useState(null);
    const [Image,setImage]=useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.Auth.userPayload);
    const isAuthor = post && userData ? post.userId === userData.$id : false;
    console.log(isAuthor);
    useEffect(() => {
        if (slug) {
            DataBaseService.getPost(slug).then((post) => {
                console.log(post)
                if (post) {
                    setPost(post)
                }
                else { navigate("/") };
            });
        } else navigate("/");
    }, [slug, navigate]);


    const deletePost = () => {
        DataBaseService.deletPost(post.$id).then((status) => {
            if (status) {
                DataBaseService.deletFile(post.thumbnail_Image);
                navigate("/");
            }
        });
    };

    const ImageRender=()=>{
        DataBaseService.getFilePreview(post.thumbnail_Image).then((res)=>{
            return setImage(res.href)})
    }
    return post ? (
        
        <div className="py-8">
            <Container> 
            {ImageRender()}
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={Image}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <button bgColor="bg-green-500" className="mr-3" >
                                    Edit
                                </button>
                            </Link>
                            <button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.Title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.BlogContent)}
                </div>
            </Container>
        </div>
    ) : <LodingScreenPage/>
}