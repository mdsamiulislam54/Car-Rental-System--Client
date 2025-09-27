
import { FaFacebookSquare, FaTwitterSquare } from 'react-icons/fa';

import { FcBusinessman } from 'react-icons/fc'
import { PiCopyThin } from "react-icons/pi";
import { IoMdShare } from "react-icons/io";
import { Link } from 'react-router';

import Button from '../../Components/Button/Button';

const Blog = ({ blogs }) => {
    const { coverImage,  author, excerpt, title,  _id } = blogs
    return (
        <article className='shadow p-2 dark:shadow-gray-700'>

            <div className='overflow-hidden'>
                <img src={coverImage} alt={title} loading='lazy' property className='w-full h-[300px] object-cover rounded-md hover:scale-125 transition-all duration-500 cursor-pointer'  />
            </div>
            <div className='my-2 flex justify-between items-center cursor-pointer'>
                <div className='flex items-center gap-2 font-rubik dark:text-white'>
                    <div className='bg-gray-100  rounded-full '>
                        <FcBusinessman size={20} />
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
                <div className='flex justify-center items-center gap-4 dark:text-white'>
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

            <div className='text-start text-white'>
                <p className='text-xl dark:text-white text-gray-800 font-bold font-rubik line-clamp-1 mb-4'>{title}</p>
                <p className='text-sm text-gray-800 dark:text-gray-50 font-rubik line-clamp-3 leading-6'>{excerpt}...</p>

                <div className='flex justify-end my-2'>
                    <Link
                       to={`/blog/details/${_id}`}
                       
                    >
                     <Button text={"See More"}/>
                    </Link>
                </div>
            </div>
        </article>
    )
}

export default Blog