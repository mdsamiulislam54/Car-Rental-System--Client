import axios from "axios";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Swal from "sweetalert2";

const AddBlogs = () => {
    const { register, handleSubmit, control, reset } = useForm({
        defaultValues: {
            title: "",
            slug: "",
            excerpt: "",
            coverImage: "",
            categories: "",
            tags: "",
            content: {
                introduction: "",
                sections: [{ heading: "", body: "" }],
                conclusion: "",
            },
            author: {
                name: "",
                email: "",
                userId: "",
            },
            published: false,
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "content.sections",
    });

   

    const onSubmit = async (data) => {
        try {
            

            // POST request to server
            const response = await axios.post("http://localhost:5000/admin/blog/post", data);

            if (response.data) {
                console.log("Blog posted successfully:", response.data);
               Swal.fire({
                title:"Blog posted successfully!",
                icon:'success'
               })
                reset(); // reset the form after successful post
            }
        } catch (error) {
            console.error("Error posting blog:", error);
            Swal.fire({
                title:"Failed to post blog. Please try again.",
                icon:"error"
            })
        }
    };


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className=" md:m-6 m-0  p-5 bg-base-100 shadow-xl rounded-xl space-y-6"
        >
            <h2 className="text-2xl font-bold text-primary">✍️ Create Blog Post</h2>

            {/* Title */}
            <input
                {...register("title")}
                placeholder="Blog Title"
                className="input input-bordered w-full"
            />

            {/* Slug */}
            <input
                {...register("slug")}
                placeholder="Slug (url-friendly)"
                className="input input-bordered w-full"
            />

            {/* Excerpt */}
            <textarea
                {...register("excerpt")}
                placeholder="Excerpt"
                className="textarea textarea-bordered w-full"
            />

            {/* Cover Image */}
            <input
                {...register("coverImage")}
                placeholder="Cover Image URL"
                className="input input-bordered w-full"
            />

            {/* Introduction */}
            <textarea
                {...register("content.introduction")}
                placeholder="Introduction"
                className="textarea textarea-bordered w-full"
            />

            {/* Sections */}
            <div>
                <h3 className="font-semibold text-secondary">📑 Sections</h3>
                {fields.map((item, index) => (
                    <div
                        key={item.id}
                        className="card bg-base-200 p-4 mt-3 rounded-lg space-y-2"
                    >
                        <input
                            {...register(`content.sections.${index}.heading`)}
                            placeholder="Section Heading"
                            className="input input-bordered w-full"
                        />
                        <textarea
                            {...register(`content.sections.${index}.body`)}
                            placeholder="Section Body"
                            className="textarea textarea-bordered w-full"
                        />
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="btn btn-error btn-sm"
                        >
                            Remove Section
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => append({ heading: "", body: "" })}
                    className="btn btn-outline btn-primary mt-2"
                >
                    ➕ Add Section
                </button>
            </div>

            {/* Conclusion */}
            <textarea
                {...register("content.conclusion")}
                placeholder="Conclusion"
                className="textarea textarea-bordered w-full"
            />

            {/* Author Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                    {...register("author.name")}
                    placeholder="Author Name"
                    className="input input-bordered w-full"
                />
                <input
                    {...register("author.email")}
                    placeholder="Author Email"
                    className="input input-bordered w-full"
                />
                <input
                    {...register("author.userId")}
                    placeholder="Author User ID"
                    className="input input-bordered w-full"
                />
            </div>

            {/* Categories */}
            <input
                {...register("categories")}
                placeholder="Categories (comma separated)"
                className="input input-bordered w-full"
            />

            {/* Tags */}
            <input
                {...register("tags")}
                placeholder="Tags (comma separated)"
                className="input input-bordered w-full"
            />

            {/* Published */}
            <label className="label cursor-pointer justify-start gap-2">
                <input type="checkbox" {...register("published")} className="checkbox" />
                <span className="label-text">Publish Now</span>
            </label>

            {/* Submit */}
            <button type="submit" className="btn bg-primary text-white w-full">
                Save Blog
            </button>
        </form>
    );
};

export default AddBlogs;
