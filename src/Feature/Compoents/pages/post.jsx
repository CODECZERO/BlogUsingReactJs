import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../index";
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
    <div className="py-8 flex items-center justify-center">
      <Container className="flex flex-col space-y-8">
        {imageUrl && (
          <div className="w-full rounded-lg overflow-hidden">
            <img src={imageUrl} alt={post.title} className="w-full h-auto object-cover" /><br/>
          </div>
        )}
        <br/>
        <div className="flex flex-col space-y-4 mt-96 "> {/* Added flex-col and space-y-4 for styling */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-center">{post.Title}</h1>
            {isAuthor && (
              <div className="flex space-x-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500" child="Edit" className="mr-3" />
                </Link>
                <Button bgColor="bg-red-500" onClick={deletePost} child="Delete" />
              </div>
            )}
          </div>
          <div className="browser-css">{parse(post.BlogContent)}</div>
        </div>
      </Container>
    </div>
  ) : (
    <LodingScreenPage />
  );
}
