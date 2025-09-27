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
import Pagination from "../../Components/Pagination/Pagination";
const AvailableCars = () => {
  const [lineView, setLineView] = useState(false);
  const [carData, setCarData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("Default");
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(16);
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

      let query = `search=${search}&sort=${sortOrder}&limit=${perPage}&page=${currentPage + 1}&minPrice=${minPrice}&maxPrice=${maxPrice}&carModel=${state?.carModel || ""}`;

      const res = await axios.get(
        `http://localhost:5000/available-cars?${query}`
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
}, [search, sortOrder, perPage, currentPage, state, minPrice, maxPrice]);



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
    <div className="min-h-screen  text-text font-rubik pb-5  dark:bg-black">
      {/* <div
        className="h-[60vh] bg-center    relative mb-4 rounded-md"
        style={{ backgroundImage: `url(${'https://img.freepik.com/free-vector/car-driving-road-along-night-beach-automobile_107791-15615.jpg?t=st=1758973465~exp=1758977065~hmac=839b5e4dfe1df5194ac6e5839ae297c86d64ecfba9f23492b0c8b4afc86203d8&w=1480'})` }}
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
      </div> */}
      <div className="custom-container flex flex-col lg:flex-row gap-6 my-10">
        
        {/* Left Side - Filters */}
        <div className="w-full lg:w-1/5 space-y-6 lg:mt-16">
          {/* Search Box */}
          <div className="bg-white dark:bg-gray-900  p-4 rounded-lg shadow">
            <h3 className="font-rubik font-bold text-lg mb-4 text-gray-800 dark:text-white">Search Cars</h3>
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
          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow">
            <h3 className="font-rubik font-bold text-lg mb-4 text-gray-800 dark:text-white">Filters</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Sort By</label>
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
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Price Range</label>
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
        <div className="w-full  lg:w-4/5">
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
            <div className="min-h-[50vh] flex justify-center items-center flex-col gap-4 bg-white  dark:bg-gray-900 rounded-lg shadow p-8">
              <p className="text-2xl text-center font-rubik font-bold text-gray-700 dark:text-gray-100">No cars found</p>
              <Link to={'/available-cars'}>
                <Button text={'Try Again'}/>
              </Link>
            </div>
          ) : (
            loading ? (<Loader />) : (
              <div className={lineView ? "space-y-2" : "grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xxl:grid-cols-4 gap-2 "}>
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
          <Pagination setCurrentPage={setCurrentPage} pageArray={pageArray} currentPage={currentPage}/>
        </div>
      </div>
    </div>
  );
};

export default AvailableCars;
