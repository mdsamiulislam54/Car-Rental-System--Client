import React from 'react';
import { Link, useLoaderData } from 'react-router';
import { CalendarDays, Eye, User, Clock, Tag, FolderOpen } from 'lucide-react';
import { FcBusinessman } from 'react-icons/fc';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { IoIosArrowRoundBack } from 'react-icons/io';

const BlogsDetails = () => {
    const blog = useLoaderData();
    const {
        coverImage,
        published,
        views,
        tags,
        categories,
        author,
        excerpt,
        content,
        title,
        publishedAt
    } = blog;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const calculateReadTime = (content) => {
        const wordsPerMinute = 200;
        const wordCount = JSON.stringify(content).split(' ').length;
        return Math.ceil(wordCount / wordsPerMinute);
    };

    const readTime = calculateReadTime(content);

    return (
        <div className="min-h-screen  py-10">
            {/* Hero Section */}
            <div className="hero ">
                <div className="">
                    <div className="lg:w-8/12 custom-container mx-auto ">
                        <Link className='' to={-1}>
                            <IoIosArrowRoundBack size={24} />
                        </Link>

                        <h1 className="text-3xl md:text-5xl font-bold font-rubik text-base-content mt-4  lg:text-start text-center dark:text-white">
                            {title}
                        </h1>

                        <p className="py-6 text-sm text-base-content/70 italic lg:text-start text-center dark:text-white">
                            {excerpt}
                        </p>

                        {/* Author and Metadata */}
                        <div className="flex flex-col sm:flex-row dark:text-white  gap-4 mb-8">
                            <div className='flex items-center max-lg:justify-center gap-2 font-rubik'>
                                <div className='bg-gray-100 p-2 rounded-full'>
                                    <FcBusinessman size={30} />
                                </div>
                                <p className='flex flex-col text-start text-[14px] '>
                                    <span>
                                        {author.name}
                                    </span>
                                    <span className='text-[12px]'>
                                        {author.email}
                                    </span>
                                </p>
                            </div>

                            <div className="flex flex-wrap justify-center gap-4 text-sm text-base-content/60 dark:text-white">
                                <div className="flex items-center gap-1">
                                    <CalendarDays size={16} />
                                    <span>{formatDate(publishedAt)}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock size={16} />
                                    <span>{readTime} min read</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Eye size={16} />
                                    <span>{views} views</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-8/12 custom-container mx-auto  py-0 ">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Article Content */}
                    <article className="flex-1 font-rubik">
                        {/* Cover Image */}
                        <div className="mb-8">
                            <img
                                src={coverImage || '/images/default-cover.jpg'}
                                alt={title}
                                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                            />
                        </div>

                        {/* Introduction */}
                        {content.introduction && (
                            <div className="prose prose-lg max-w-none mb-8 ">
                                <p className="md:text- text-sm leading-relaxed text-base-content/80 dark:text-white">
                                    {content.introduction}
                                </p>
                            </div>
                        )}

                        {/* Content Sections */}
                        {content.sections?.map((section, index) => (
                            <div key={index} className="mb-8">
                                <h2 className="text-2xl font-bold text-base-content mb-4 dark:text-white">
                                    {section.heading}
                                </h2>
                                <div className="prose prose-lg max-w-none">
                                    <p className="text-base-content/80 leading-relaxed whitespace-pre-line dark:text-white">
                                        {section.body}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* Conclusion */}
                        {content.conclusion && (
                            <div className="bg-base-200 dark:bg-gray-900 dark:text-white rounded-lg p-6 mb-8">
                                <h3 className="text-xl font-semibold text-base-content mb-4 dark:text-white">
                                    Conclusion
                                </h3>
                                <p className="text-base-content/80 leading-relaxed dark:text-white">
                                    {content.conclusion}
                                </p>
                            </div>
                        )}

                        {/* Tags */}
                        {tags && tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-8">
                                {tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="badge  badge-lg bg-gray-100 dark:bg-gray-900 dark:text-white"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </article>


                </div>

            


            </div>
        </div>
    );
};



export default BlogsDetails;