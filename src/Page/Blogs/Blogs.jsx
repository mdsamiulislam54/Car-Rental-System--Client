import { CarIcon, ChevronRightIcon, HomeIcon } from "lucide-react";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router";

const Blogs = () => {
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
      <div className="w-11/12 mx-auto flex-1">
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
            <div className="p-4 bg-base-200 rounded-md shadow">
              <h2 className="font-semibold mb-2">Categories</h2>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>🚗 Car Reviews</li>
                <li>⚡ Electric Cars</li>
                <li>🛠️ Maintenance Tips</li>
                <li>📢 News & Updates</li>
              </ul>
            </div>
          </div>

          {/* Middle Column (Main Content) */}
          <div className="lg:col-span-6 col-span-12">
            <div className="p-4 bg-base-100 rounded-md shadow text-center">
              <h1 className="text-2xl font-bold mb-4">
                Welcome to Car Blogs 🚘
              </h1>
              <p className="text-gray-600">
                Explore the latest car reviews, news, and automotive tips from
                experts around the world. Stay updated with trending topics!
              </p>
            </div>
          </div>

          {/* Right Column (Extra widgets / ads) */}
          <div className="lg:col-span-3 col-span-12">
            <div className="p-4 bg-base-200 rounded-md shadow">
              <h2 className="font-semibold mb-2">Trending</h2>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>🔥 Top 10 Cars of 2025</li>
                <li>💡 Hybrid vs Electric</li>
                <li>🏎️ Fastest Cars This Year</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
