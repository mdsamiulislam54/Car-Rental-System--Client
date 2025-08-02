import React from "react";
import { Link } from "react-router";
import { FaCar } from "react-icons/fa";
import Button from "../../Components/Button/Button";

const AvailableCarsCard = ({ lineView, car }) => {
  const {
    carModel,
    dailyRentalPrice,
    availability,
    features,
    imageUrl,
    description,
    registrationNumber,
    bookingCount,
    location,
    _id
  } = car;


  return (
    <div className="my-10 font-rubik">
      {/*  Grid View */}
      {!lineView ? (
        <div className=" relative rounded-lg shadow hover:shadow-lg transition overflow-hidden ">
          <img
            src={imageUrl}
            alt={carModel}
            className="w-full h-40 object-contain"
          />
          <div className="p-4 border-t border-gray-200">
            <span className="flex items-center justify-between flex-wrap mb-2">
              <h2 className="text-xl md:text-xl font-bold">{carModel}</h2>
              <p className="text-lg md:text-sm font-semibold  mt-2">
                ৳ {dailyRentalPrice}
              </p>

            </span>
            {/* <p className="text-gray-600 text-sm md:text-sm mb-2">{description}</p> */}
            <span className="flex items-center justify-between">
              <p className="text-sm font-bold">Booking  ({bookingCount})</p>
              <p
                className={`font-medium text-sm  ${availability ? "bg-accent/30 text-text tracking-wider px-1 rounded-md" : "text-red-600"
                  }`}
              >
                {availability ? "available" : "Not available"}
              </p>
            </span>

            <span>
              <p className=" flex flex-row-reverse justify-between items-center mt-4 font-medium text-sm">
                {location}
                <span>
                  <span className=" font-bold tracking-wide text-sm">Reg.</span> <span className="text-sm">{registrationNumber}</span>
                </span>
              </p>
            </span>

            {/* Book Now Button */}
            <div className="flex my-2 ">
              <Link to={`/car-details/${_id}`} className="flex items-center gap-2 border-gray-200">
                
                <Button text={'Book Now'} icon={FaCar}/>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        // 👉 Line/Table View
        <div className="flex flex-col sm:flex-row items-center gap-4 p-3 rounded-lg shadow hover:shadow-md transition">
          <img
            src={imageUrl}
            alt={carModel}
            className="w-full sm:w-32 h-32 object-contain rounded"
          />
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-lg md:text-xl font-semibold">{carModel}</h2>
            {/* <p className="text-gray-500 text-sm md:text-base lg:pr-20">{description}</p> */}
            <p
              className={`text-sm font-medium ${availability ? "text-green-600" : "text-red-600"
                }`}
            >
              {availability ? "Available" : "Not Available"}
            </p>

            {/* ✅ features array map
            <ul className="text-xs md:text-sm text-gray-500 mt-1 list-disc list-inside space-y-1">
              {features && features.length > 0 ? (
                features.map((feature, idx) => <li key={idx}>{feature}</li>)
              ) : (
                <li>No features</li>
              )}
            </ul> */}
            <p className="text-md font-bold">Booking ({bookingCount})</p>
            <p className=" font-medium  text-md">
              {location}
            </p>

          </div>
          <div className="text-center sm:text-right space-y-2">
            <p className="text-lg font-bold ">
              ৳ {dailyRentalPrice} /day
            </p>
            {/* Book Now Button */}
            <Link to={`/car-details/${_id}`} className="Hover:bg-primary hover:text-white border border-primary px-4 py-2 rounded hover:bg-primary/90 transition text-sm md:text-base">
              Book Now
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailableCarsCard;
