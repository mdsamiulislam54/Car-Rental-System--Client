import React, { useEffect, useState } from "react";
import { LuSquareMenu } from "react-icons/lu";
import { IoGrid } from "react-icons/io5";
import bannerImages from "../../assets/stylish-elegant-couple-car-salon.jpg";
import { Link } from "react-router";
import axios from "axios";
import AvailableCarsCard from "./AvailableCarsCard";
import Loader from "../../Components/Loader/Loader";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://car-rental-system-server-beta.vercel.app/available-cars?search=${search}&sort=${sortOrder}&limit=${perPage}&page=${
            currentPage +1
          }`
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
  }, [search, sortOrder, perPage, currentPage]);
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
    <div className="min-h-screen w-11/12 mx-auto">
      <div
        className="h-[300px] bg-cover bg-no-repeat relative mb-4 rounded-md"
        style={{ backgroundImage: `url(${bannerImages})` }}
      >
        <div className="absolute inset-0 bg-black/60">
          <div className="flex justify-center items-center h-full text-white flex-col">
            <p className="text-3xl font-bold mb-4">Available Cars</p>
            <div className="flex gap-4">
              <Link className="text-md font-medium hover:underline">Home</Link>
              <span>{">"}</span>
              <Link className="text-gray-300">Available Cars</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <nav className="md:flex justify-between items-center py-4 shadow px-2">
          <div className="w-full">
            <form onSubmit={handleSearch} className="flex w-full mb-4 ">
              <input
                type="text"
                name="search"
                placeholder="Search car model, brand, or location ..."
                className=" md:w-6/12 w-full  border-2 border-primary p-2 rounded-tl-md  rounded-bl-md "
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white  font-bold cursor-pointer  rounded-tr-md  rounded-br-md"
              >
                Search
              </button>
            </form>
          </div>
          <div className="lg:flex items-center justify-between gap-2 flex-1/2">
            <div>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border-2 p-3 border-primary rounded-md lg:max-md:w-8/12 w-full mb-4 lg:mb-0 "
              >
                <option value="default">Default</option>
                <option value="asc">Lowest First / Highest First</option>
                <option value="desc">Highest First / Lowest First</option>
              </select>
            </div>
            <div className="flex justify-between items-center gap-4">
              <div>
                <button
                  onClick={() => setSearch("")}
                  className="bg-primary p-1.5 text-white font-bold rounded-md cursor-pointer"
                >
                  All
                </button>
              </div>
              <div>
                {lineView ? (
                  <button
                    onClick={() => setLineView(!lineView)}
                    className="p-2 bg-primary text-xl text-white rounded-md hover:text-secondary transition-all duration-300 cursor-pointer"
                  >
                    <IoGrid />
                  </button>
                ) : (
                  <button
                    onClick={() => setLineView(!lineView)}
                    className="p-2 bg-primary text-xl text-white rounded-md hover:text-secondary transition-all duration-300 cursor-pointer"
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
            className={`${
              lineView
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
                  className={`btn bg-gray-200 ${
                    currentPage === page ? "bg-primary text-white" : ""
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page+1}
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
