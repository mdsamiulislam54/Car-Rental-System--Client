import axios from 'axios';
import { Blocks } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { MdBlock } from 'react-icons/md';
import Swal from 'sweetalert2';
import UserContext from '../../../../ContextApi/UserContext/UserContext';

const ManageUser = () => {
    const [users, setUser] = useState([]);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true)
    const [perPage, setPerPage] = useState(6);
    const pageNumber = Math.ceil(count / perPage) || 0
    const pageArray = [...Array(pageNumber).keys()];
    const { user } = useContext(UserContext);
    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                ` https://car-rental-system-server-beta.vercel.app/admin/user?email=${user.email}&limit=${perPage}&page=${currentPage + 1
                }`,
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`,
                    },
                }
            );

            const data = res.data;

            setUser(data?.user)
            setCount(data?.count)
        } catch (err) {
            (err)
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData()
    }, [perPage, currentPage])

    const manageUser = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You want to Block this User!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!'

        })

        if (result.isConfirmed) {
            const res = await axios.delete(`https://car-rental-system-server-beta.vercel.app/admin/user/block?id=${id}`)
            
            (res)
            if (res.status === 200) {
                Swal.fire(
                    'Cancelled!',
                    `${res?.data.message}`,
                    'success'
                );

                fetchData()
            }

        }
    }

    return (
        <div>
            <div className=' p-0 md:p-8'>
                <div className="overflow-x-auto bg-white dark:bg-gray-800 dark:text-white font-rubik">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className=''>
                                <th className='dark:text-white'>Name</th>
                                <th className='dark:text-white'>Role</th>
                                <th className='dark:text-white'>Email</th>
                                <th className='dark:text-white'>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                users?.map((user) => <tr key={user.userEmail} className=''>
                                    <th>{user.userName}</th>
                                    <td>{user.role}</td>
                                    <td>{user.userEmail}</td>
                                    <td className=''>
                                        <button
                                            onClick={() => manageUser(user._id)}
                                            className='flex justify-center items-center gap-2 bg-gray-200 dark:bg-gray-600 p-2 rounded-md text-sm cursor-pointer hover:bg-gray-100  dark:hover:text-gray-500 transition-all duration-300'>
                                            <MdBlock color='red' />
                                            Block
                                        </button>

                                    </td>
                                </tr>)
                            }


                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center items-center mt-20">
                    <button
                        className="btn mx-4"
                        disabled={currentPage === 0}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                        Prev
                    </button>
                    <ul className="flex gap-4">
                        {pageArray?.map((page) => {
                            return (
                                <li
                                    key={page}
                                    className={`btn bg-gray-200 ${currentPage === page ? "bg-primary text-white" : ""
                                        }`}
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page + 1}
                                </li>
                            );
                        })}
                        <button
                            className="btn mx-4"
                            disabled={pageArray?.length - 1 === currentPage ? true : false}
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                        >
                            Next
                        </button>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ManageUser