import React from "react";
import { FaCar, FaUsers, FaGasPump, FaTachometerAlt } from "react-icons/fa";
import { Link } from "react-router";
import Button from "../../Components/Button/Button";

const CarListingCard = ({ car }) => {
  return (
    <div className="bg-white font-rubik rounded-2xl shadow hover:shadow-lg transition duration-300 overflow-hidden">
      <div className="relative p-3 pb-0">
        <img
          src={car.imageUrl}
          alt={car.carModel}
          className="w-full h-40 object-contain mx-auto hover:scale-110 transition duration-300 hover:cursor-zoom-in"
        />

      </div>

      <div className="p-4 border-t border-gray-200">
        {/* Title + Availability */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-text">{car.carModel}</h2>
          <span
            className={`text-sm px-3 py-1 rounded-md ${car.availability ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
              }`}
          >
            {car.availability ? "Available" : "Unavailable"}
          </span>
        </div>

      

        {/* Icons Row */}
        <div className="grid  grid-cols-3  gap-3 text-sm text-gray-600 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <FaUsers className="text-primary" />
            <span>{car.seatingCapacity} seats</span>
          </div>
          <div className="flex items-center gap-2">
            <FaGasPump className="text-primary" />
            <span className="capitalize">{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCar className="text-primary" />
            <span className="capitalize">{car.color}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaTachometerAlt className="text-primary" />
            <span>{car.mileage}</span>
          </div>
        </div>

        {/* Book Now Button */}
        <div className="flex">
          <Link to={`/car-details/${car._id}`} className="w-full">
            <Button text="See Details" icon={FaCar} className="" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarListingCard;
