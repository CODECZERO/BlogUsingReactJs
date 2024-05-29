import React, { useEffect, useState } from "react";
import { Link,useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import DataBaseService from "../../AppwriteBackend/AuthDatabase.Appwrite";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.Auth.userPayload);
    const isAuthor = post && userData ? post.userId === userPayload.$id : false;

    useEffect(() => {
        DataBaseService.getPost(slug);
    }, [slug,navigate]);


    const deletePost = () => {
        DataBaseService.deletPost(post.$id).then((status) => {
            if (status) {
                DataBaseService.deletFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={DataBaseService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
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
    ) : null;
}