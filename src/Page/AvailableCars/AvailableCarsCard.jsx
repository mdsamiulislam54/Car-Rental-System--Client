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
    <div className="my-10 font-rubik">
      {!lineView ? (
        // ✅ Grid View
        <div className="relative rounded-xl shadow hover:shadow-lg transition overflow-hidden bg-white">
          <img
            src={imageUrl}
            alt={carModel}
            className="w-full h-44 object-contain bg-gray-50"
          />
          <div className="p-4 space-y-2">
            {/* Title + Price */}
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">{carModel}</h2>
              <div className="text-right text-sm font-medium">
                <p className="text-green-600">৳ {dailyRentalPrice} /day</p>
                <p className="text-blue-600">৳ {hourlyRentalPrice} /hour</p>
              </div>
            </div>

            {/* Info Table */}
            <div className="flex justify-between items-center gap-y-2 text-sm text-gray-700">

              <div>{seatingCapacity && (
                <p className="col-span-1 flex items-center gap-1">
                  <FaChair className="text-indigo-500" />
                  {seatingCapacity} Seats
                </p>
              )}
                {color && (
                  <span className="flex items-center gap-1">
                    <FaPalette className="text-red-400" />
                    {color}
                  </span>
                )}
              </div>
              <div>
                {fuelType && (
                  <p className="col-span-1 flex items-center gap-1 ">
                    <FaGasPump className="text-yellow-600" />
                    {fuelType}
                  </p>
                )}
                {mileage && (
                  <p className="col-span-2 flex items-center gap-1">
                    <FaTachometerAlt className="text-emerald-600" />
                    {mileage}
                  </p>
                )}
              </div>
            </div>

            {/* Booking + Status */}
            <div className="flex justify-between text-sm font-medium">
              <p>Bookings: {bookingCount}</p>
              <p
                className={`px-2 rounded ${availability ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
                  }`}
              >
                {availability ? "Available" : "Not Available"}
              </p>
            </div>

            {/* Registration + Location */}
            <div className="flex justify-between text-sm">
              <p>Reg: {registrationNumber}</p>
              <p>{location?.city || "N/A"}</p>
            </div>

            {/* Book Button */}
            <div className="mt-3">
              <Link to={`/car-details/${_id}`}>
                <Button text="Book Now" icon={FaCar} />
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
            <p className="text-sm font-medium">
              Reg: {registrationNumber} | City: {location?.city || "N/A"}
            </p>
            <p className="text-sm font-semibold">
              Booking ({bookingCount}) —{" "}
              <span className={`${availability ? "text-green-600" : "text-red-600"}`}>
                {availability ? "Available" : "Not Available"}
              </span>
            </p>
          </div>
          <div className="text-center sm:text-right space-y-2">
            <p className="text-md font-bold text-green-600">৳ {dailyRentalPrice} /day</p>
            <p className="text-sm font-bold text-blue-600">৳ {hourlyRentalPrice} /hour</p>
            <Link
              to={`/car-details/${_id}`}
              className="hover:bg-primary hover:text-white border border-primary px-4 py-2 rounded transition text-sm inline-block"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailableCarsCard;
