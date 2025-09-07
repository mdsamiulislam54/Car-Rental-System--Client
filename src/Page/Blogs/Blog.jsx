import React from 'react'
import { FaFacebookSquare, FaTwitterSquare } from 'react-icons/fa';
import { FaPerson } from 'react-icons/fa6'
import { FcBusinessman } from 'react-icons/fc'
import { PiCopyThin } from "react-icons/pi";
import { IoMdShare } from "react-icons/io";
import { Link } from 'react-router';
import { IoIosArrowRoundForward } from "react-icons/io";

const Blog = ({ blogs }) => {
    const { coverImage, published, views, tags, categories, author, excerpt, content, title, slug, _id } = blogs
    return (
        <article>

            <div className='overflow-hidden'>
                <img src={coverImage} alt={title} loading='lazy' className='w-full h-[350px] object-cover rounded-md hover:scale-125 transition-all duration-500 cursor-pointer'  />
            </div>
            <div className='my-2 flex justify-between items-center cursor-pointer'>
                <div className='flex items-center gap-2 font-rubik'>
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
                <div className='flex justify-center items-center gap-4'>
                    <div className='flex items-center gap-1 text-sm'>
                        <PiCopyThin />
                        <span>Copy</span>

                    </div>
                    <div className='flex items-center gap-2 text-sm' >
                        <FaFacebookSquare />
                        <FaTwitterSquare />
                    </div>
                    <div className='flex items-center gap-1 text-sm'>
                        <IoMdShare />
                        <span>Share</span>
                    </div>
                </div>
            </div>

            <div className='text-start'>
                <p className='text-2xl font-bold font-rubik line-clamp-1 mb-4'>{title}</p>
                <p className='text-sm text-gray-800 font-rubik line-clamp-3 leading-6'>{excerpt}...</p>

                <div className='flex justify-end my-2'>
                    <Link
                       to={`/blog/details/${_id}`}
                        className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md hover:bg-red-500 hover:text-white transition-colors w-fit"
                    >
                        <span className="font-medium">See More</span>
                        <IoIosArrowRoundForward size={22} />
                    </Link>
                </div>
            </div>
        </article>
    )
}

export default Blog