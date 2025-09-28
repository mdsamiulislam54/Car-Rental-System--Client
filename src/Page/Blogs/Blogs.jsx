import axios from "axios";
import { CarIcon, ChevronRightIcon, HomeIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router";
import Blog from "./Blog";
import Loader from "../../Components/Loader/Loader";
import Pagination from "../../Components/Pagination/Pagination";

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false)
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(4);
    const pageNumber = Math.ceil(count / perPage) || 0
    const pageArray = [...Array(pageNumber).keys().map(i => i + 1)];
    const [category, setCategory] = useState('');
    const [search, setSearch] = useState('')

    const fetchBlogsData = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`https://car-rental-system-server-beta.vercel.app/blogs?page=${currentPage}&limit=${perPage}&category=${category}&search=${search}`);
            (res?.data.blogs);
            setBlogs(res?.data?.blogs)
            setCount(res?.data?.count)
            setLoading(false)

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchBlogsData()
    }, [currentPage, perPage, category, search])

    const handleSearch = (e) => {
        e.preventDefault();
        const search = e.target.search.value;
        setSearch(search)
    }


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
                    backgroundImage: `url(${"https://img.freepik.com/free-vector/convertible-car-drive-road-mountain-sand-desert_107791-20832.jpg?t=st=1757240011~exp=1757243611~hmac=021ac9ae1d269b25aa7ca65a0481fc69a50c7352b2240e6b7eade97922960f03&w=1480"})`,
                }}
            >
                <div className="absolute inset-0 bg-black/50">
                    <div className="flex justify-center items-center h-full text-white flex-col space-y-4 px-4 text-center">
                        {/* Title */}
                        <div className="flex items-center">

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
            <div className="custom-container flex-1 my-5">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    {/* Left Column (Search) */}
                    <div className="lg:col-span-3 col-span-12 border-r dark:border-gray-600 pr-2 border-gray-200 ">
                        <form className="relative mb-4" onSubmit={handleSearch}>
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
                            <h2 className="font-semibold mb-2 dark:text-gray-100">Categories</h2>
                            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-100 ml-4">
                                {categories.map((cat, idx) => (
                                    <li
                                        onClick={() => setCategory(cat)}
                                        key={idx}
                                        className="hover:text-accent transition-colors cursor-pointer text-[14px] font-rubik"
                                    >
                                        {cat}
                                    </li>
                                ))}
                            </ul>


                            <div>
                                <h2 className="font-semibold dark:text-white mb-2 font-rubik my-4">Tags</h2>
                                <ul className="space-y-1 text-sm text-gray-700 grid  lg:grid-cols-2   md:grid-cols-6 xl:grid-cols-2 grid-cols-3 gap-4 lg:ml-2">
                                    {tags.map((tag, idx) => (
                                        <li key={idx} className="badge bg-gray-100 dark:bg-gray-900 dark:text-white text-[12px]">
                                            #{tag}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Middle Column (Main Content) */}
                    <div className="lg:col-span-9 col-span-12">
                        {blogs?.length === 0 ? (
                            <div className="flex justify-center items-center min-h-screen ">
                                <div className="flex flex-col items-center justify-center space-y-4">

                                    <h2 className="text-xl font-semibold text-gray-600">
                                        No Blogs Found
                                    </h2>
                                    <p className="text-gray-500">
                                        We couldn’t find any blogs for this category. Try changing the filter.
                                    </p>
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                    >
                                        Refresh
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="p-4 rounded-md text-center">
                                <div className="space-y-8 sm:grid grid-cols-2 gap-4">
                                    {
                                        loading ? <Loader /> : (
                                            blogs?.map((blog) => {
                                                return <Blog key={blog._id} blogs={blog} />;
                                            })
                                        )
                                    }

                                </div>
                            </div>
                        )}

                        {/* Pagination */}
                      <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} pageArray={pageArray} />
                    </div>

                        
                             
                       
                </div>
            </div>

        </div>
    );
};

export default Blogs;
