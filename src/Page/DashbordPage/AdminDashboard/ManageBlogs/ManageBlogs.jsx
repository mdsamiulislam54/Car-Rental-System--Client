import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../../../../Components/Loader/Loader';
import { FaDeleteLeft } from 'react-icons/fa6';
import { MdDeleteForever } from 'react-icons/md';
import Swal from 'sweetalert2';

const ManageBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false)
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const pageNumber = Math.ceil(count / perPage) || 0
    const pageArray = [...Array(pageNumber).keys().map(i => i + 1)];
    const [category, setCategory] = useState('');
    const [search, setSearch] = useState('')

    const fetchBlogsData = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`http://localhost:5000/admin/manage/blogs?page=${currentPage}&limit=${perPage}`);
            console.log(res?.data.blogs);
            setBlogs(res?.data?.blogs)
            setCount(res?.data?.count)
            setLoading(false)

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchBlogsData()
    }, [currentPage, perPage,])

    const handleBlogsDeleteById = (id) => {
        Swal.fire({
            icon: "warning",
            title: "Are you sure?",
            text: "This action cannot be undone!",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {

                    const response = await axios.delete(
                        `http://localhost:5000/admin/delete/blogs/${id}`
                    );

                    if (response.status === 200) {
                        Swal.fire("Deleted!", "Blog has been deleted.", "success");
                        fetchBlogsData()
                    }
                } catch (error) {
                    console.error("Delete error:", error);
                    Swal.fire("Error!", "Failed to delete blog.", "error");
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire("Cancelled", "Your blog is safe 😊", "info");
            }
        });
    };

    return (
        <div>
            <div className='md:p-8'>
                {
                    loading ? (<Loader />) : (
                        <div className="overflow-x-auto bg-white font-rubik">
                            <table className="table">

                                <thead>
                                    <tr className='text-center'>
                                        <th>Images</th>
                                        <th>Title</th>
                                        <th>Author Name </th>
                                        <th>Published</th>
                                        <th>Action</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        blogs?.map((blog) => <tr key={blog._id} className=''>
                                            <td>
                                                <img className='md:w-30 w-20 object-contain' src={blog.coverImage} alt={blog.title} />
                                            </td>
                                            <td>
                                                {blog.title}
                                            </td>

                                            <td>
                                                {blog.author.name}
                                            </td>
                                            <td>
                                                {blog.published === true ? <p className='text-green-500'>Published</p> : "Pending"}
                                            </td>
                                            <td>
                                                <button onClick={() => handleBlogsDeleteById(blog._id)} className='flex items-center btn'>
                                                    Delete
                                                    <MdDeleteForever />
                                                </button>
                                            </td>
                                        </tr>)
                                    }


                                </tbody>
                            </table>
                        </div>
                    )
                }

                {/* Pagination */}
                <div className="flex justify-center mt-8">
                    <nav className="flex items-center gap-1 sm:gap-2">
                        {/* Previous Button */}
                        <button
                            className="px-3 py-1 sm:px-4 sm:py-2 border border-gray-300 rounded-md disabled:opacity-50 text-sm sm:text-base"
                            disabled={currentPage === 0}
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                        >
                            <span className="hidden sm:inline">Previous</span>
                            <span className="sm:hidden">←</span>
                        </button>

                        {/* Page Numbers */}
                        <div className="flex items-center gap-1">
                            {pageArray?.map((page) => {
                                // Show only first, last, and nearby pages on mobile
                                if (window.innerWidth < 640 &&
                                    page !== 0 &&
                                    page !== pageArray.length - 1 &&
                                    Math.abs(page - currentPage) > 1) {
                                    if (Math.abs(page - currentPage) === 2) {
                                        return <span key={page} className="px-2">...</span>;
                                    }
                                    return null;
                                }

                                return (
                                    <button
                                        key={page}
                                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md text-sm sm:text-base ${currentPage === page
                                            ? "bg-primary text-white"
                                            : "border border-gray-300 hover:bg-gray-100"
                                            }`}
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        {page}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Next Button */}
                        <button
                            className="px-3 py-1 sm:px-4 sm:py-2 border border-gray-300 rounded-md disabled:opacity-50 text-sm sm:text-base"
                            disabled={pageArray?.length - 1 === currentPage}
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                        >
                            <span className="hidden sm:inline">Next</span>
                            <span className="sm:hidden">→</span>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default ManageBlogs