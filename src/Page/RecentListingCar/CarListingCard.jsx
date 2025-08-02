import React from "react";
import { FaCar } from "react-icons/fa";
import { Link } from "react-router";
import Button from "../../Components/Button/Button";
const CarListingCard = ({ car }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden">
      <div className=" relative">
        <img
          src={car.imageUrl}
          alt={car.carModel}
          className="w-70 h-70 object-contain mx-auto hover:scale-125 transition duration-300 hover:cursor-zoom-in"
        />
        <div className=" w-14 h-14 flex justify-center items-center text-sm font-bold text-primary rounded-full absolute top-2 right-2 ">
          ৳ {car.dailyRentalPrice}
        </div>
      </div>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold mb-1">{car.carModel}</h2>
          <span
            className={`inline-block px-3 py-1 text-sm font-medium rounded-md ${
              car.availability === "Available"
                ? "bg-accent/20 text-text tracking-wider"
                : "bg-accent/20 text-text"
            }`}
          >
            {car.availability}
          </span>
        </div>

         <div className="flex my-2 ">
              <Link to={`/car-details/${car._id}`} className="flex items-center gap-2 border-gray-200">
                
                <Button text={'Book Now'} icon={FaCar}/>
              </Link>
            </div>
      </div>
    </div>
  );
};

export default CarListingCard;
