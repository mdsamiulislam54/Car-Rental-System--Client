import React, { useEffect, useState } from "react";
import { LuSquareMenu } from "react-icons/lu";
import { IoGrid } from "react-icons/io5";
import bannerImages from "../../assets/stylish-elegant-couple-car-salon.jpg";
import { Link, useLocation } from "react-router";
import axios from "axios";
import AvailableCarsCard from "./AvailableCarsCard";
import Loader from "../../Components/Loader/Loader";
import { FaSearch } from "react-icons/fa";

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
  console.log('state',state)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5000/available-cars?search=${search}&sort=${sortOrder}&limit=${perPage}&page=${currentPage + 1
          }&carModel=${state?.carModel || ''}&location=${state?.location || ""}`
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
  }, [search, sortOrder, perPage, currentPage, state]);
  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    setSearch(searchText);
  };
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }


  return (
    <div className="min-h-screen  text-text font-rubik pb-5">
      <div
        className="h-[600px] bg-cover bg-no-repeat relative mb-4 rounded-md"
        style={{ backgroundImage: `url(${'https://img.freepik.com/free-photo/full-shot-family-traveling-together_23-2149272092.jpg?t=st=1754152847~exp=1754156447~hmac=3df34ac7e7e7b815b3e00ce79759d8da4a2ba2673c82651fef24f8d2540e8cf0&w=1380'})` }}
      >
        <div className="absolute inset-0 bg-black/60">
          <div className="flex justify-center items-center h-full text-white flex-col">
            <p className="text-3xl font-bold mb-4 font-rubik">Available Cars</p>
            <div className="flex gap-4">
              <Link to={'/'} className="text-md font-medium hover:underline">Home</Link>
              <span>{">"}</span>
              <Link className="text-gray-300 font-bold font-rubik">Available Cars</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-11/12 mx-auto">
        <nav className="md:flex justify-between items-center py-4 shadow px-2">
          <div className="w-full">


            <form onSubmit={handleSearch} className="relative w-full max-w-md mb-4">
              <input
                type="text"
                name="search"

                placeholder="Search car model, brand, or location..."
                className="w-full border-2 border-gray-200 rounded-md py-2 pl-4 pr-12 focus:outline-none text-gray-700"
              />
              <button
                type="submit"

                className="absolute top-1/2 -translate-y-1/2 right-2 bg-primary text-white p-2 rounded-md hover:bg-primary/90 transition"
              >
                <FaSearch />
              </button>
            </form>

          </div>
          <div className="lg:flex items-center justify-between gap-2 flex-1/2">
            <div>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full lg:w-64 mb-4 lg:mb-0 px-4 py-2 border-2 border-gray-200 text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent transition duration-200 font-rubik font-bold"
              >
                <option value="default" className="text-gray-500">Default</option>
                <option value="asc">⬆️ Lowest Price First</option>
                <option value="desc">⬇️ Highest Price First</option>
              </select>

            </div>
            <div className="flex justify-between items-center gap-4">
              <div>
                <button
                  onClick={() => setSearch("")}
                  className="bg-gray-200 p-1.5 px-2 text-text font-rubik font-bold rounded-md cursor-pointer"
                >
                  All
                </button>
              </div>
              <div>
                {lineView ? (
                  <button
                    onClick={() => setLineView(!lineView)}
                    className="p-2 bg-gray-200 text-xl text-text rounded-md hover:text-secondary transition-all duration-300 cursor-pointer"
                  >
                    <IoGrid />
                  </button>
                ) : (
                  <button
                    onClick={() => setLineView(!lineView)}
                    className="p-2 bg-gray-200 text-xl text-text rounded-md hover:text-secondary transition-all duration-300 cursor-pointer"
                  >
                    <LuSquareMenu />
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>

        {carData?.length === 0 ? (
          <div>
            <p className="text-4xl text-center ">Data not Found</p>
          </div>
        ) : (
          <div
            className={`${lineView
                ? ""
                : "grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 "
              }`}
          >
            {carData?.map((car) => (
              <AvailableCarsCard
                key={car._id}
                car={car}
                lineView={lineView}
              ></AvailableCarsCard>
            ))}
          </div>
        )}

        <div className="flex justify-center items-center">
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
  );
};

export default AvailableCars;
