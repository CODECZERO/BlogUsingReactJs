import React, { useEffect, useState } from 'react';
import DataBaseService from '../../AppwriteBackend/AuthDatabase.Appwrite';
import { Link } from 'react-router-dom';

function Card({ $id, Title, thumbnail_Image, BlogContent, userName }) {
  const [Post, setPost] = useState("");
  const data = BlogContent.replace(/<[^>]*>/g, '');
  const MaxText = data.length > 100 ? `${data.substring(0, 100).replace(/\s+/g, ' ')}...` : data.replace(/\s+/g, ' ');

  useEffect(() => {
    async function fetchThumbnail() {
      if (thumbnail_Image && !Post.href) { // Check if thumbnail_Image exists and Post.href is empty
        try {
          const res = await DataBaseService.getFilePreview(thumbnail_Image);
          setPost(res);
        } catch (error) {
          console.error("Error fetching thumbnail:", error);
        }
      }
    }

    fetchThumbnail();
  }, [thumbnail_Image, Post.href]);

  return (
    <Link to={`/post/${$id}`}>
      <div className="mx-auto max-w-[32rem] bg-white rounded-lg shadow-md"> {/* Centered, wider width, white background, rounded corners, shadow */}
        <div className="relative overflow-hidden rounded-t-lg"> {/* Rounded top corners for image section */}
          <img
            src={Post.href}
            alt={Title}
            className="w-full h-32 object-cover rounded" 
          />
        </div>
        <div className="p-4"> {/* Maintained padding for content */}
          <h4 className="text-xl font-semibold text-gray-900 mb-2"> {/* Title - smaller font, bolder font, darker color */}
            {Title}
          </h4>
          <p className="text-base text-gray-700 line-clamp-2"> {/* Description - smaller font, limit to 2 lines with ellipsis */}
            {MaxText}
          </p>
        </div>
        <div className="flex items-center justify-between p-2 border-t border-gray-200"> {/* Divider line at bottom */}
          <p className="text-gray-700">
            {userName}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Card;


