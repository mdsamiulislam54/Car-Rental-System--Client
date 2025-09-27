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
        <div className="relative rounded-lg shadow hover:shadow-md transition-all duration-300 overflow-hidden bg-white dark:bg-gray-900 dark:text-white">
          {/* Image with status badge */}
          <div className="relative">
            <img
              src={imageUrl}
              alt={carModel}
              className="w-full h-40 object-contain p-2 "
            />
           
          </div>

          {/* Content */}
          <div className="p-3 space-y-2">
            {/* Title + Price */}
            <div className="flex justify-between items-center">
              <h2 className="text-base font-bold text-gray-800 dark:text-white line-clamp-1">{carModel?.slice(0, 15)}...</h2>
              <div className="text-right">
                <p className="text-md font-bold tracking-wide ">৳{dailyRentalPrice}</p>

              </div>
            </div>

            {/* Features */}
            <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-white my-4">
              {seatingCapacity && (
                <span className="flex items-center gap-1">
                  <FaChair className="text-accent text-xs" />
                  {seatingCapacity} Seats
                </span>
              )}
              <div className="flex items-center gap-2">
                <FaGasPump className="text-accent" />
                <span className="capitalize">{fuelType}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <FaTachometerAlt className="text-accent" />
                <span>{mileage}</span>
              </div>

            </div>

            {/* Book Button */}
            <div className="mt-2">
              <Link to={`/car-details/${_id}`}>
                <Button text={"See Details"} className={"text-[12px] w-full"} />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        // ✅ Line/Table View
        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 dark:bg-gray-900 dark:text-white rounded-xl shadow hover:shadow-md transition">
          <img
            src={imageUrl}
            alt={carModel}
            className="w-full sm:w-36 h-36 object-contain rounded "
          />
          <div className="flex-1 text-center sm:text-left space-y-1">
            <h2 className="text-lg font-semibold">{carModel}</h2>
            <p className="text-sm text-gray-600 dark:text-white">{brand}</p>
            <div className="flex gap-4 text-sm text-gray-700 dark:text-white justify-center sm:justify-start flex-wrap mt-1">
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
            <p className="text-md font-bold ">৳ {dailyRentalPrice} </p>
         
            <Link
              to={`/car-details/${_id}`}
              className=""
            >
              <Button text={"Book Now"} className={'text-[12px]'} />
            </Link>
          </div>
        </div>
      )}


    </div>
  );
};

export default AvailableCarsCard;
