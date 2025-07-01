import React from "react";
const CarListingCard = ({ car }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden">
      <img
        src={car.imageUrl}
        alt={car.carModel}
        className="w-70 h-70 object-contain mx-auto hover:scale-125 transition duration-300 hover:cursor-zoom-in"
      />
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold mb-1">{car.carModel}</h2>
           <span
            className={`inline-block px-3 py-1 text-sm font-medium rounded-md ${
              car.availability === "Available"
                ? "bg-accent text-text tracking-wider"
                : "bg-accent/20 text-text"
            }`}
          >
            {car.availability}
          </span>
        </div>
        <p className="text-gray-600 mb-2 flex justify-between items-center">
          <span>
            <strong>Price</strong> ৳{car.dailyRentalPrice}/day
          </span>

        <span className="mt-2 text-gray-700 text-sm ">
            <strong>Booking</strong> ({car.bookingCount})
          </span>
        </p>

        <div className="flex items-center justify-between">
         
          <p className="text-gray-600 ">
            <strong>Posted</strong> 2 days ago
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarListingCard;
