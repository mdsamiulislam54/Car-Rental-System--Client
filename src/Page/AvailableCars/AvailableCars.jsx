import React, { useEffect, useRef, useState } from "react";
import { LuSquareMenu } from "react-icons/lu";
import { IoGrid } from "react-icons/io5";

import { Link, useLocation } from "react-router";
import axios from "axios";
import AvailableCarsCard from "./AvailableCarsCard";
import Loader from "../../Components/Loader/Loader";
import { FaSearch } from "react-icons/fa";
import Button from "../../Components/Button/Button";
import { FaHome as HomeIcon, FaCar as CarIcon } from 'react-icons/fa';
import { HiChevronRight as ChevronRightIcon } from 'react-icons/hi';
const AvailableCars = () => {
  const [lineView, setLineView] = useState(false);
  const [carData, setCarData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("Default");
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(6);
  const pageNumber = Math.ceil(count / perPage) || 0
  const pageArray = [...Array(pageNumber).keys()];
  const { state } = useLocation();
  const [maxPrice, setMaxPrice] = useState(100000)
  const [minPrice, setMinPrice] = useState(0)
  const fromRef = useRef()
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          ` https://car-rental-system-server-beta.vercel.app/available-cars?search=${search}&sort=${sortOrder}&limit=${perPage}&page=${currentPage + 1
          }&minPrice=${minPrice}&maxPrice=${maxPrice}`
        );

        const data = res.data;

        setCarData(data.cars);
        setCount(data.count);
    
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search, sortOrder, perPage, currentPage, state,minPrice,maxPrice]);
  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    setSearch(searchText);
  };


  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

const handleReset = () => {
  setSearch('');
  setMinPrice(0); 
  setMaxPrice(100000); 
  if (fromRef.current) {
    fromRef.current.reset(); 
  }
}

  return (
    <div className="min-h-screen  text-text font-rubik pb-5 bg-gray-50">
      <div
        className="h-[50vh] bg-cover  bg-no-repeat relative mb-4 rounded-md"
        style={{ backgroundImage: `url(${'https://img.freepik.com/free-vector/modern-cars-automobiles-vehicles-set_107791-9139.jpg?t=st=1757069702~exp=1757073302~hmac=eede7c7720fd21887b2f938ce3f95fa0afbd1229dcf642f5ca38d26340c1a420&w=1480'})` }}
      >
        <div className="absolute inset-0 bg-black/40">
          <div className="flex justify-center items-center h-full text-white flex-col space-y-4">
            <div className="flex items-center">
              <CarIcon className="w-8 h-8 mr-3 " />
              <p className="text-3xl font-bold font-rubik ">
                Available Cars
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Link to={'/'} className="flex items-center hover:text-red-300 transition-colors">
                <HomeIcon className="w-4 h-4 mr-1" /> 
                Home
              </Link>
              <ChevronRightIcon className="w-4 h-4 text-gray-400" /> 
              <span className="flex items-center text-gray-300 font-semibold">
                <CarIcon className="w-4 h-4 mr-1 text-gray-400" /> 
                Available Cars
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-11/12 mx-auto flex flex-col md:flex-row gap-6">
        {/* Left Side - Filters */}
        <div className="w-full md:w-1/4 lg:w-1/5 space-y-6">
          {/* Search Box */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-rubik font-bold text-lg mb-4 text-gray-800">Search Cars</h3>
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                name="search"
                placeholder="Model, brand, location..."
                className="w-full border border-gray-300 rounded-md py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-700 input "
              />
              <button
                type="submit"
                className="absolute top-1/2 -translate-y-1/2 right-2 text-gray-500 hover:text-red-500"
              >
                <FaSearch />
              </button>
            </form>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-rubik font-bold text-lg mb-4 text-gray-800">Filters</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="select"
                >
                  <option value="default">Default</option>
                  <option value="asc">Lowest Price First</option>
                  <option value="desc">Highest Price First</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                <form rom ref={fromRef} className="flex items-center space-x-2" >
                  <input
                    type="number"
                    placeholder="Min"
                    onChange={(e)=>setMinPrice(e.target.value)}
                    className="input"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    onChange={(e)=>setMaxPrice(e.target.value)}
                    className="input"
                  />
                </form>
              </div>

             
              <Button  text={"Reset Filters"}  onClick={()=>handleReset()}/>
            </div>
          </div>
        </div>

        {/* Right Side - Car Listings */}
        <div className="w-full md:w-3/4 lg:w-4/5">
          {/* View Toggle and Results Count */}
          <div className="flex justify-end items-center mb-6">
           
            <button
              onClick={() => setLineView(!lineView)}
              className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition"
            >
              {lineView ? <IoGrid size={20} /> : <LuSquareMenu size={20} />}
            </button>
          </div>

          {/* Car Listings */}
          {carData?.length === 0 ? (
            <div className="min-h-[50vh] flex justify-center items-center flex-col gap-4 bg-white rounded-lg shadow p-8">
              <p className="text-2xl text-center font-rubik font-bold text-gray-700">No cars found</p>
              <Link to={'/available-cars'}>
                <Button text={'Try Again'}/>
              </Link>
            </div>
          ) : (
            loading ? (<Loader />) : (
              <div className={lineView ? "space-y-2" : "grid md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-2 min-h-screen"}>
                {carData?.map((car) => (
                  <AvailableCarsCard
                    key={car._id}
                    car={car}
                    lineView={lineView}
                  />
                ))}
              </div>
            )

          )}

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
      </div>
    </div>
  );
};

export default AvailableCars;
