import { useContext, useState } from "react";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import UserContext from "../../ContextApi/UserContext/UserContext";
import axios from "axios";
import Button from "../../Components/Button/Button";
import { FaCar } from "react-icons/fa";

const CarDetailsPage = () => {
  const car = useLoaderData();
  const [bookigModal, setBookingModal] = useState(false);
  const [bookingType, setBookingType] = useState("day");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndtDate] = useState("");
  const { user } = useContext(UserContext);
  const [error, setError] = useState("");

  const diffDay = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end.getTime() - start.getTime();
    return timeDiff / (1000 * 3600 * 24);
  };


  const diffHour = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end.getTime() - start.getTime();
    return timeDiff / (1000 * 3600);
  };

  const totalCost = () => {
    if (bookingType === "day") {
      return diffDay() * car.dailyRentalPrice || 0
    }
    return diffHour() * car.hourlyRentalPrice || 0
  };

  const resetBookingForm = () => {
    setStartDate("");
    setEndtDate("");
    setError("");
  };

  const handleBookNow = async (totalPrice) => {
    // if (user.role === "admin") {
    //   return Swal.fire({
    //     title: "Access Denied!",
    //     text: "Admin is not allowed to perform this action.",
    //     icon: "warning",
    //     confirmButtonText: "Okay",
    //   });
    // }
    if (!startDate || !endDate) {
      setError("Please select both start and end date");
      return;
    }
    const bookCar = {
      totalPrice,
      carModel: car.carModel,
      availability: car.availability,
      startDay: startDate,
      endDate: endDate,
      totalHour: diffHour(),
      userUid: user?.uid,
      userEmail: user?.email,
      userName: user?.displayName,
      bookingStatus: "pending",
      carImages: car.imageUrl,
      carId: car._id,
      paymentStatus: "paid",
    };

    const res = await axios.post(`http://localhost:5000/booking-car`, bookCar);
    if (res.data) {
      Swal.fire({ title: "Your Booking Successful!!", icon: "success" });
      resetBookingForm();
      setBookingModal(false);
    } else {
      Swal.fire({ title: "Your Booking UnSuccessful!!", icon: "error" });
    }
  };

  return (
    <div className="w-11/12 mx-auto py-8 font-rubik space-y-10">
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-2xl  p-6">
        {/* Left - Car Image */}
        <div className="flex justify-center items-center">
          <img
            src={car.imageUrl}
            alt={car.carModel}
            className="w-full max-w-lg rounded-lg shadow-lg"
          />
        </div>

        {/* Right - Car Info */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">{car.carModel}</h2>

          <div className="flex flex-wrap items-center gap-6 text-lg font-semibold text-gray-800">
            <span>৳ {car.dailyRentalPrice} / Day</span>
            <span className="text-gray-400">|</span>
            <span>৳ {car.hourlyRentalPrice} / Hour</span>
          </div>

          <p>
            <strong>Availability:</strong>{" "}
            <span
              className={`p-1 rounded-md text-sm font-bold ${car.availability ? "bg-green-200" : "bg-red-200"
                }`}
            >
              {car.availability ? "Available" : "Not Available"}
            </span>
          </p>

          {/* Car Meta Data */}
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
            <p><strong>Brand:</strong> {car.brand}</p>
            <p><strong>Category:</strong> {car.category}</p>
            <p><strong>Fuel Type:</strong> {car.fuelType}</p>
            <p><strong>Transmission:</strong> {car.transmission}</p>
            <p><strong>Seating:</strong> {car.seatingCapacity}</p>
            <p><strong>Reg No:</strong> {car.registrationNumber}</p>
            <p><strong>Color:</strong> {car.color}</p>
            <p><strong>Mileage:</strong> {car.mileage}</p>
          </div>

          <Button
            text="Book Now"
            icon={FaCar}
            onClick={() => setBookingModal(true)}
          />
        </div>
      </div>

      {/* Description */}
      <section>
        <h3 className="text-2xl font-semibold mb-3 text-gray-900">Description</h3>
        <p className="text-gray-700 leading-relaxed">{car.description}</p>
      </section>

      {/* Features */}
      <section>
        <h3 className="text-2xl font-semibold mb-3 text-gray-900">Key Features</h3>
        <ul className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 pl-6 ">
          {car.features.map((feature, i) => (
            <li
              key={i}
              className="bg-gray-100  p-2 rounded-md text-sm font-medium text-text"
            >
              {feature}
            </li>
          ))}
        </ul>
      </section>

      {/* Why Choose */}
      {car.whyChoose && (
        <section>
          <h3 className="text-2xl font-semibold mb-3 text-gray-900">Why Choose This Car</h3>
          <ul className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2">
            {car.whyChoose.map((point, i) => (
              <li key={i} className="bg-gray-100 p-2 rounded-md text-sm font-medium text-text">{point}</li>
            ))}
          </ul>
        </section>
      )}



      {/* Booking Modal */}
      {bookigModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Booking Confirmation</h2>
          
          

            <label className="block mb-1">Booking Type:</label>
            <select
              value={bookingType}
              onChange={(e) => setBookingType(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            >
              <option value="day">Per Day</option>
              <option value="hour">Per Hour</option>
            </select>

      
                 <label className="block mb-1">Start Date & Time:</label>
            <input
              type="datetime-local"
              className="w-full border p-2 rounded mb-2"
              onChange={(e) => setStartDate(e.target.value)}
            />

            <label className="block mb-1">End Date & Time:</label>
            <input
              type="datetime-local"
              className="w-full border p-2 rounded mb-4"
              onChange={(e) => setEndtDate(e.target.value)}
            />
     


            {error && <p className="text-red-500 text-sm">{error}</p>}
            <p className="mb-4">Total Cost: ৳ {totalCost().toFixed(2) || 0} </p>
            <p className="mb-2">
              Total Hours: <strong>{diffHour()}</strong>
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setBookingModal(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => handleBookNow(diffDay() * car.dailyRentalPrice)}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetailsPage;
