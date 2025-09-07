import axios from "axios";
import { CarIcon, ChevronRightIcon, HomeIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router";
import Blog from "./Blog";

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false)
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(3);
    const pageNumber = Math.ceil(count / perPage) || 0
    const pageArray = [...Array(pageNumber).keys()];

    const fetchBlogsData = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`http://localhost:5000/blogs?page=${currentPage}&limit=${perPage}`);
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
    }, [currentPage, perPage])









    const tags = [
        "Charging",
        "Longevity",
        "Battery",
        "Porsche",
        "Heritage",
        "Maintenance",
        "Review",
        "Technology",
        "BMW E30",
        "Engineering",
        "How-To",
        "Ferrari ",
    ];
    const categories = [
        "Technology",
        "Electric Vehicles",
        "Repair & Maintenance",
        "DIY & Restoration",
        "Classic Cars",
        "Maintenance",
        "Safety",
        "Culture",
        "Hypercars",
    ];
    return (
        <div className="min-h-screen flex flex-col">
            {/* Banner */}
            <div
                className="h-[40vh] sm:h-[50vh] bg-cover bg-no-repeat relative mb-6 rounded-md"
                style={{
                    backgroundImage: `url(${"https://img.freepik.com/free-vector/modern-cars-automobiles-vehicles-set_107791-9139.jpg"})`,
                }}
            >
                <div className="absolute inset-0 bg-black/50">
                    <div className="flex justify-center items-center h-full text-white flex-col space-y-4 px-4 text-center">
                        {/* Title */}
                        <div className="flex items-center">
                            <CarIcon className="w-8 h-8 mr-2" />
                            <p className="text-3xl sm:text-4xl font-bold font-rubik">
                                Blogs
                            </p>
                        </div>

                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-sm flex-wrap justify-center">
                            <Link
                                to={"/"}
                                className="flex items-center hover:text-red-300 transition-colors gap-1"
                            >
                                <HomeIcon size={18} />
                                Home
                            </Link>
                            <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                            <span className="flex items-center text-gray-300 font-semibold">
                                <CarIcon className="w-4 h-4 mr-1 text-gray-400" />
                                Cars Blogs
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="w-11/12 mx-auto flex-1 my-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    {/* Left Column (Search) */}
                    <div className="lg:col-span-3 col-span-12">
                        <form className="relative mb-4">
                            <input
                                type="text"
                                name="search"
                                placeholder="Model, brand, location..."
                                className="w-full border border-gray-300 rounded-md py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-700 input input-bordered"
                            />
                            <button
                                type="submit"
                                className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500 hover:text-red-500"
                            >
                                <FaSearch />
                            </button>
                        </form>
                        {/* Example Sidebar */}
                        <div className="p-4 rounded-md ">
                            <h2 className="font-semibold mb-2">Categories</h2>
                            <ul className="space-y-1 text-sm text-gray-700 ml-4">
                                {categories.map((cat, idx) => (
                                    <li
                                        key={idx}
                                        className="hover:text-red-500 transition-colors cursor-pointer text-[14px] font-rubik"
                                    >
                                        {cat}
                                    </li>
                                ))}
                            </ul>


                            <div>
                                <h2 className="font-semibold mb-2 font-rubik my-4">Tags</h2>
                                <ul className="space-y-1 text-sm text-gray-700 grid  lg:grid-cols-2   md:grid-cols-6 xl:grid-cols-3 grid-cols-4 gap-4 lg:ml-4">
                                    {tags.map((tag, idx) => (
                                        <li key={idx} className="hover:text-red-500 transition-colors cursor-pointer text-[12px] font-rubik bg-gray-100 p-2 text-center  rounded-md">
                                            {tag}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Middle Column (Main Content) */}
                    <div className="lg:col-span-9 col-span-12">
                        <div className="p-4 bg-base-100 rounded-md  text-center">
                            <div className="space-y-8">
                                {
                                    blogs?.map((blog) => {
                                        return (
                                            <Blog key={blog._id} blogs={blog} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Extra widgets / ads) */}
                    {/* <div className="lg:col-span-3 col-span-12">
                        <div className="p-4 bg-base-200 rounded-md shadow">
                            <h2 className="font-semibold mb-2">Trending</h2>
                            <ul className="space-y-1 text-sm text-gray-700">
                                <li>🔥 Top 10 Cars of 2025</li>
                                <li>💡 Hybrid vs Electric</li>
                                <li>🏎️ Fastest Cars This Year</li>
                            </ul>
                        </div>
                    </div> */}
                </div>
            </div>
            {/* Pagination */}
            <div className="flex justify-center my-8">
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
                                    {page + 1}
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
    );
};

export default Blogs;
