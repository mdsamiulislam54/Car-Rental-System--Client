import React from "react";
import { Link } from "react-router";
import { FaCar, FaChair, FaGasPump, FaTachometerAlt, FaPalette } from "react-icons/fa";
import Button from "../../Components/Button/Button";

const AvailableCarsCard = ({ lineView, car }) => {
  const {
    carModel,
    dailyRentalPrice,
    hourlyRentalPrice,
    availability,
    features,
    imageUrl,
    description,
    registrationNumber,
    bookingCount,
    location,
    _id,
    seatingCapacity,
    fuelType,
    mileage,
    color,
    brand,
  } = car;

  return (
    <div className=" font-rubik">
      {!lineView ? (
        // ✅ Grid View
        <div className="relative rounded-lg shadow hover:shadow-md transition-all duration-300 overflow-hidden bg-white ">
          {/* Image with status badge */}
          <div className="relative">
            <img
              src={imageUrl}
              alt={carModel}
              className="w-full h-40 object-contain p-2 "
            />
            <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${availability ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {availability ? "Available" : "Booked"}
            </span>
          </div>

          {/* Content */}
          <div className="p-3 space-y-2">
            {/* Title + Price */}
            <div className="flex justify-between items-center">
              <h2 className="text-base font-bold text-gray-800 line-clamp-1">{carModel}</h2>
              <div className="text-right">
                <p className="text-sm font-semibold text-green-600">৳{dailyRentalPrice}<span className="text-xs text-gray-500">/day</span></p>
              
              </div>
            </div>

            {/* Features */}
            <div className="flex items-center gap-3 text-xs text-gray-600 mt-1">
              {seatingCapacity && (
                <span className="flex items-center gap-1">
                  <FaChair className="text-indigo-500 text-xs" />
                  {seatingCapacity} Seats
                </span>
              )}
              
            </div>

            {/* Book Button */}
            <div className="mt-2">
              <Link to={`/car-details/${_id}`}>
                <Button text={"See Details"} />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        // ✅ Line/Table View
        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white rounded-xl shadow hover:shadow-md transition">
          <img
            src={imageUrl}
            alt={carModel}
            className="w-full sm:w-36 h-36 object-contain rounded bg-gray-50 p-2"
          />
          <div className="flex-1 text-center sm:text-left space-y-1">
            <h2 className="text-lg font-semibold">{carModel}</h2>
            <p className="text-sm text-gray-600">{brand}</p>
            <div className="flex gap-4 text-sm text-gray-700 justify-center sm:justify-start flex-wrap mt-1">
              {seatingCapacity && (
                <span className="flex items-center gap-1">
                  <FaChair className="text-indigo-500" />
                  {seatingCapacity}
                </span>
              )}
              {fuelType && (
                <span className="flex items-center gap-1">
                  <FaGasPump className="text-yellow-500" />
                  {fuelType}
                </span>
              )}
              {mileage && (
                <span className="flex items-center gap-1">
                  <FaTachometerAlt className="text-emerald-600" />
                  {mileage}
                </span>
              )}
              {color && (
                <span className="flex items-center gap-1">
                  <FaPalette className="text-red-400" />
                  {color}
                </span>
              )}
            </div>
          
          </div>
          <div className="text-center sm:text-right space-y-2">
            <p className="text-md font-bold text-green-600">৳ {dailyRentalPrice} /day</p>
            <p className="text-sm font-bold text-blue-600">৳ {hourlyRentalPrice} /hour</p>
            <Link
              to={`/car-details/${_id}`}
              className=""
            >
              <Button text={"Book Now"}/>
            </Link>
          </div>
        </div>
      )}

      
    </div>
  );
};

export default AvailableCarsCard;
