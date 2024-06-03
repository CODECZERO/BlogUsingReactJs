import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button} from "../index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import DataBaseService from "../../AppwriteBackend/AuthDatabase.Appwrite";
import { LodingScreenPage } from "../index";

export default function Post() {
    const [post, setPost] = useState(null);
    const [imageUrl, setImageUrl] = useState(null); // use imageUrl for better naming convention
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.Auth.userPayload);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            DataBaseService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                    DataBaseService.getFilePreview(post.thumbnail_Image).then((res) =>
                        setImageUrl(res.href)
                    );
                } else {
                    navigate("/");
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        DataBaseService.deletPost(post.$id).then((status) => {
            if (status) {
                DataBaseService.deletFile(post.thumbnail_Image);
                navigate("/");
            }
        });
    };

    return post ? (
        <>
            {isAuthor && (
                <div className="flex space-x-2 items-center justify-center ">
                    <Link to={`/EditPost/${post.$id}`}>
                        <Button bgColor="bg-green-500" child="Edit" className="mr-3" />
                    </Link>
                    <Button bgColor="bg-red-500" onClick={deletePost} child="Delete" />
                </div>
            )}
          

            <div className="flex-col items-center justify-center bg-slate-300 ">
                <div className=" ml-14 mt-7 h-[200px] w-[300px] md:ml-[800px] md:h-full bg-black">
                    <img src={imageUrl} alt={post.Title} width={"500px"} />
                </div>
                <div className="text-xl mt-10  text-black md:text-4xl text-center">{post.Title}</div>
                <div className="mt-23 text-sm space-x-2 p-8 md:p-11 md:pl-11 mx-8 md:text-lg font-sans bg-slate-100">{parse(post.BlogContent)}</div>
                
            </div>
        </>

    ) : (
        <LodingScreenPage />
    );
}
