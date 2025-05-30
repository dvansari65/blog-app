import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Input, Button, RTE, Select } from '../index';
import service from '../../appwrite/Config.js'
export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            content: post?.content || "",
            slug: post?.$id || "",
            status: post?.status || "active"
        }
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [loading, setLoading] = useState(false);  // Added loading state for async operations

    const submit = async (data) => {
        setLoading(true);  // Set loading to true while async operation is in progress
        try {
            let file;
            if (post) {
                // Update existing post
                if (post.image[0]) {
                    file = await service.uploadFile(post.image[0]);
                    if (file) {
                        service.deleteFile(post.featuredImage);  // Remove the previous featured image
                    }
                }
                const dbPost = await service.updatePost(post.$id, { ...data, featuredImage: file ? file.$id : undefined });
                if (dbPost) navigate(`/post/${dbPost.$id}`);
            } else {
                // Create new post
                if (data.image[0]) {
                    file = await service.uploadFile(data.image[0]);
                }
                if (file) {
                    data.featuredImage = file.$id;
                    const dbPost = await service.createPost({ ...data, userId: userData.$id });
                    if (dbPost) navigate(`/post/${dbPost.$id}`);
                }
            }
        } catch (error) {
            console.error("Error in post submission:", error);
        } finally {
            setLoading(false);  // Set loading to false after the operation
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.filePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full" disabled={loading}>
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}
