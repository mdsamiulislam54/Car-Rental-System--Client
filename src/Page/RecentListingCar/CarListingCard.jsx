import React from "react";
import { FaCar, FaUsers, FaGasPump, FaTachometerAlt } from "react-icons/fa";
import { Link } from "react-router";
import Button from "../../Components/Button/Button";

const CarListingCard = ({ car }) => {
  return (
    <div className="bg-white dark:bg-gray-900  dark:text-white font-rubik rounded-2xl shadow hover:shadow-lg transition duration-300 overflow-hidden">
      <div className="relative pb-0 overflow-hidden">
        <img
          src={car.imageUrl}
          alt={car.carModel}
          className="w-full h-40 object-cover mx-auto hover:scale-110 transition duration-300 hover:cursor-zoom-in"
        />

      </div>

      <div className="p-4 border-t border-gray-200">
        {/* Title + Availability */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-text">{car.carModel}</h2>
          <span
            className={`text-sm px-3 py-1 rounded-md ${car.availability ? "dark:bg-gray-700 bg-gray-200 " : "bg-red-100 text-red-600"
              }`}
          >
            {car.availability ? "Available" : "Unavailable"}
          </span>
        </div>

      

        {/* Icons Row */}
        <div className="grid  grid-cols-3  gap-3 text-sm text-gray-600 dark:text-gray-200 mb-4 ">
          <div className="flex items-center gap-2">
            <FaUsers className="text-accent" />
            <span>{car.seatingCapacity} seats</span>
          </div>
          <div className="flex items-center gap-2">
            <FaGasPump className="text-accent" />
            <span className="capitalize">{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCar className="text-accent" />
            <span className="capitalize">{car.color}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaTachometerAlt className="text-accent" />
            <span>{car.mileage}</span>
          </div>
        </div>

        {/* Book Now Button */}
        <div className="flex">
          <Link to={`/car-details/${car._id}`} className="w-full">
            <Button text="See Details" icon={FaCar} className={"text-[12px] w-full text-center"} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarListingCard;
