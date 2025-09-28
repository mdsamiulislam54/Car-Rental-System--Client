import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../../../../Components/Loader/Loader';
import Pagination from '../../../../Components/Pagination/Pagination';
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
                        <div className="overflow-x-auto bg-white dark:bg-gray-800 dark:text-white font-rubik">
                            <table className="table">

                                <thead>
                                    <tr className='text-center'>
                                        <th className='dark:text-white'>Images</th>
                                        <th className='dark:text-white'>Title</th>
                                        <th className='dark:text-white'>Author Name </th>
                                        <th className='dark:text-white'>Published</th>
                                        <th className='dark:text-white'>Action</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        blogs?.map((blog) => <tr key={blog._id} className=''>
                                            <td>
                                                <img className='md:w-10 w-10 object-contain' src={blog.coverImage} alt={blog.title} />
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
                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pageArray={pageArray}/>
               
            </div>
        </div>
    )
}

export default ManageBlogs