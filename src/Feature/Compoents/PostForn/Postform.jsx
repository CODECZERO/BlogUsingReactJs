import React,{useEffect,useCallback} from 'react';
import { Button, Input, Select, RTE } from "./../index";
import DataBaseService from '../../AppwriteBackend/AuthDatabase.Appwrite';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Postform({ post }) {
  const date=new Date();
  const userData = useSelector((state )=> state.Auth.userPayload);

  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      Title: post?.Title || "",
      slug: post?.$id || "",
      BlogContent: post?.BlogContent || "",
      isPublish: post?.isPublish ||"active",
      PublishDate:date,
      userName:userData.name,
    },
  });
  const Nav = useNavigate();
  //const userData = useSelector((state )=> state.Auth.userPayload);
  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? await DataBaseService.uploadFile(data.image[0]) : null;

      if (file) {
          DataBaseService.deletFile(post.thumbnail_Image);
      }

      const dbPost = await DataBaseService.updatePost(post.$id, {
          ...data,
          thumbnail_Image: file ? file.$id : undefined,
      });

      if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
      }
  } else {
      const file = await DataBaseService.uploadFile(data.thumbnail_Image[0]);

      if (file) {
          const fileId = file.$id;
          data.thumbnail_Image = fileId;
          const dbPost = await DataBaseService.createPost({ ...data, userId: userData.$id });

          if (dbPost) {
              Nav(`/post/${dbPost.$id}`);
          }
      }
  }
};

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
        return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-");

    return "";
}, []);

React.useEffect(() => {
    const subscription = watch((value, { name }) => {
        if (name === "Title") {
            setValue("slug", slugTransform(value.Title), { shouldValidate: true });
        }
    });

    return () => subscription.unsubscribe();
}, [watch, slugTransform, setValue]);

return (
  <>
    <div>
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
          <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("Title", { required: true })}
          />
          <Input
            label="slug :"
            placeholder="slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
          />
          <RTE label="BlogContent :" name="BlogContent" control={control} defaultValue={getValues("BlogContent")} />
        </div>
        <div className="w-1/3 px-2">
          <Input
            label="thumbnail_Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("thumbnail_Image", { required: !post })}
          />
          {post && (
            <div className="w-full mb-4">
              <img
                src={DataBaseService.getFilePreview(post.thumbnail_Image)}
                alt={post.Title}
                className="rounded-lg"
              />
            </div>
          )}
       <Select
                    options={["active", "inactive"]}
                    label="isPublish"
                    className="mb-4"
                    {...register("isPublish", { required: true })}
                />
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                  {post ? "Update" : "Submit"}</button>
        </div>
      </form>
    </div>
  </>
)
}
export default Postform