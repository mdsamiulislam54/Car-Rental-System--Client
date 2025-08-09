import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ManageUser = () => {
    const [user, setUser] = useState([]);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true)
    const [perPage, setPerPage] = useState(6);
    const pageNumber = Math.ceil(count / perPage) || 0
    const pageArray = [...Array(pageNumber).keys()];
    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                ` http://localhost:5000/admin/user?email=${user.email}&limit=${perPage}&page=${currentPage + 1
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
            console.log(err)
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData()
    }, [perPage, currentPage])
    return (
        <div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                           
                            {
                                user?.map((user) => <tr key={user.userEmail}>
                                    <th>{user.userName}</th>
                                    <td>{user.role}</td>
                                    <td>{user.userEmail}</td>
                                    <td>
                                        <button>Block</button>

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