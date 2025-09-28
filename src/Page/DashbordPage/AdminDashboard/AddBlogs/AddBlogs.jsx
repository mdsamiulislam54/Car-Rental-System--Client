import axios from "axios";

import { useForm, useFieldArray } from "react-hook-form";
import Swal from "sweetalert2";

const AddBlogs = () => {
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
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
            const response = await axios.post("https://car-rental-system-server-beta.vercel.app/admin/blog/post", data);

            if (response.data) {
                Swal.fire({
                    title: "Blog posted successfully!",
                    icon: 'success'
                })
                reset();
            }
        } catch (error) {
            Swal.fire({
                title: "Failed to post blog. Please try again.",
                icon: "error"
            })
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="md:m-6 m-0 p-5 bg-base-100 dark:bg-gray-800 shadow-xl rounded-xl space-y-6"
        >
            <h2 className="text-2xl font-bold text-primary">✍️ Create Blog Post</h2>

            <div className="grid grid-cols-2 gap-2">
                {/* Title */}
                <div>
                    <input
                        {...register("title", { required: "Title is required" })}
                        placeholder="Blog Title"
                        className="input input-bordered w-full"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>

                {/* Slug */}
                <div>
                    <input
                        {...register("slug", { required: "Slug is required" })}
                        placeholder="Slug (url-friendly)"
                        className="input input-bordered w-full"
                    />
                    {errors.slug && <p className="text-red-500 text-sm">{errors.slug.message}</p>}
                </div>
            </div>

            {/* Excerpt */}
            <div>
                <textarea
                    {...register("excerpt", { required: "Excerpt is required" })}
                    placeholder="Excerpt"
                    className="textarea textarea-bordered w-full"
                />
                {errors.excerpt && <p className="text-red-500 text-sm">{errors.excerpt.message}</p>}
            </div>

            {/* Cover Image */}
            <div>
                <input
                    {...register("coverImage", {
                        required: "Cover image URL is required",
                        pattern: { value: /^(http|https):\/\/[^ "]+$/, message: "Must be a valid URL" }
                    })}
                    placeholder="Cover Image URL"
                    className="input input-bordered w-full"
                />
                {errors.coverImage && <p className="text-red-500 text-sm">{errors.coverImage.message}</p>}
            </div>

            {/* Introduction */}
            <div>
                <textarea
                    {...register("content.introduction", { required: "Introduction is required" })}
                    placeholder="Introduction"
                    className="textarea textarea-bordered w-full"
                />
                {errors.content?.introduction && <p className="text-red-500 text-sm">{errors.content.introduction.message}</p>}
            </div>

            {/* Sections */}
            <div>
                <h3 className="font-semibold text-secondary">📑 Sections</h3>
                {fields.map((item, index) => (
                    <div
                        key={item.id}
                        className="card bg-base-200 p-4 mt-3 rounded-lg space-y-2"
                    >
                        <input
                            {...register(`content.sections.${index}.heading`, { required: "Section heading is required" })}
                            placeholder="Section Heading"
                            className="input input-bordered w-full"
                        />
                        {errors.content?.sections?.[index]?.heading && (
                            <p className="text-red-500 text-sm">{errors.content.sections[index].heading.message}</p>
                        )}

                        <textarea
                            {...register(`content.sections.${index}.body`, { required: "Section body is required" })}
                            placeholder="Section Body"
                            className="textarea textarea-bordered w-full"
                        />
                        {errors.content?.sections?.[index]?.body && (
                            <p className="text-red-500 text-sm">{errors.content.sections[index].body.message}</p>
                        )}

                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="btn bg-gray-100 text-gray-800 btn-sm"
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

            {/* Author Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                    <input
                        {...register("author.name", { required: "Author name is required" })}
                        placeholder="Author Name"
                        className="input input-bordered w-full"
                    />
                    {errors.author?.name && <p className="text-red-500 text-sm">{errors.author.name.message}</p>}
                </div>
                <div>
                    <input
                        {...register("author.email", {
                            required: "Email is required",
                            pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
                        })}
                        placeholder="Author Email"
                        className="input input-bordered w-full"
                    />
                    {errors.author?.email && <p className="text-red-500 text-sm">{errors.author.email.message}</p>}
                </div>
                <div>
                    <input
                        {...register("author.userId", { required: "User ID is required" })}
                        placeholder="Author User ID"
                        className="input input-bordered w-full"
                    />
                    {errors.author?.userId && <p className="text-red-500 text-sm">{errors.author.userId.message}</p>}
                </div>
            </div>

            {/* Categories */}
            <div>
                <input
                    {...register("categories", { required: "Categories are required" })}
                    placeholder="Categories (comma separated)"
                    className="input input-bordered w-full"
                />
                {errors.categories && <p className="text-red-500 text-sm">{errors.categories.message}</p>}
            </div>

            {/* Tags */}
            <div>
                <input
                    {...register("tags", { required: "Tags are required" })}
                    placeholder="Tags (comma separated)"
                    className="input input-bordered w-full"
                />
                {errors.tags && <p className="text-red-500 text-sm">{errors.tags.message}</p>}
            </div>

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
