import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import { FaTrashAlt } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Swal from "sweetalert2";

import { Link } from "react-router";

import { formatDate } from "../../../../Hook/DateFormate";
import UserContext from "../../../../ContextApi/UserContext/UserContext";
import Loader from "../../../../Components/Loader/Loader";
import BookingContext from "../../../../ContextApi/myBookingContext/BookingContext";
import ModifyBookingModal from "./ModifyBookingModal";

const MyBooking = () => {

  const [loading, setLoading] = useState(false);
  const [modifyDate, setModifyDate] = useState(false);
  const [modifyId, setModifyId] = useState("");
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndtDate] = useState(null);
  const { user } = useContext(UserContext)
  const { booking, pageArray, currentPage, setCurrentPage,bookingDataFatch } = useContext(BookingContext);




  const chartBookingData = booking.map((car) => ({
    name: car.carModel,
    price: Number(car.totalPrice) || 0,
  }));

  const handleCancelBooking = (id) => {
    Swal.fire({
      title: "Are you sure you want to cancel this booking?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(
            ` http://localhost:5000/cancel-booking/${id}`
          );
          const data = res.data;


          if (data.acknowledged) {
            Swal.fire({
              title: "Booking cancelled successfully!",
              icon: "success",
            });
            // Data re-fetch after successful deletion
            bookingDataFatch();
          } else {
            Swal.fire({
              title: "Failed to cancel booking!",
              icon: "error",
            });
          }
        } catch (err) {
          Swal.fire({
            title: `Failed to cancel booking: ${err.message}`,
            icon: "error",
          });
        }
      }
    });
  };

  const handleModifyDate = (id) => {
    setModifyDate(!modifyDate);
    setModifyId(id);
  };

  const handleConfirmModifyDate = async () => {
    if (!startDate || !endDate) {
      return Swal.fire("Please select both start and end dates!");
    }
    try {
      const res = await axios.patch(
        ` http://localhost:5000/

update-booking/${modifyId}`,
        {
          startDay: startDate,
          endDate: endDate,
        }
      );
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Booking date updated successfully!",
          icon: "success",
        });

        setModifyDate(false);
        bookingDataFatch();
      } else {
        Swal.fire("No changes made!", "", "info");
      }
    } catch (err) {
      Swal.fire("Failed to update booking date!", err.message, "error");
    }
  };


  return (
    <div className="min-h-screen mx-5 max-sm:mx-0 ">
      {booking.length === 0 ? (
        <div className="flex justify-center flex-col gap-8 items-center min-h-screen  px-4 text-center">


          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 font-rubik">
            No booking cars found!
          </h2>

          <p className="text-gray-600 text-sm max-w-xl leading-relaxed">
            Looks like you haven't added any cars yet. Start listing your
            beautiful rides and let people rent them today!
          </p>

          <Link
            to={"/available-cars"}
            className="px-6 py-2 bg-primary text-white rounded-lg font-semibold text-lg shadow hover:bg-orange-600 transition duration-300 flex items-center gap-2 font-rubik"
          >
            <span></span> Booking Cars
          </Link>
        </div>
      ) : (
        <div className="min-h-screen">

          <div className="overflow-x-auto  rounded-lg  p-2">
            {/* Desktop Table */}
            <table className="hidden sm:table w-full text-center border-collapse relative bg-white">
              <thead className="font-rubik">
                <tr>
                  <th className="p-2 md:p-3 text-xs md:text-sm font-bold">Car Image</th>
                  <th className="p-2 md:p-3 text-xs md:text-sm font-bold">Car Model</th>
                  <th className="p-2 md:p-3 text-xs md:text-sm font-bold">Booking Date</th>
                  <th className="p-2 md:p-3 text-xs md:text-sm font-bold">Total Price</th>
                  <th className="p-2 md:p-3 text-xs md:text-sm font-bold">Status</th>
                  <th className="p-2 md:p-3 text-xs md:text-sm font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {booking.map((car) => (
                  <tr key={car._id} className="hover:bg-gray-50 transition">
                    <td className="p-2">
                      <img
                        src={car.carImages}
                        alt={car.carModel}
                        className="w-14 h-14 md:w-20 md:h-20 object-contain mx-auto rounded"
                      />
                    </td>
                    <td className="p-2 text-xs md:text-sm">{car.carModel}</td>
                    <td className="p-2 text-xs md:text-sm">
                      {formatDate(car.startDay)} <br /> {formatDate(car.endDate)}
                    </td>
                    <td className="p-2 text-xs md:text-sm">{car.totalPrice} ৳</td>
                    <td className="p-2 text-xs md:text-sm">
                      <span
                        className={`px-2 py-1 rounded text-white text-xs ${car.bookingStatus === "pending"
                          ? "bg-yellow-500"
                          : car.bookingStatus === "canceled"
                            ? "bg-red-500"
                            : "bg-green-500"
                          }`}
                      >
                        {car.bookingStatus}
                      </span>
                    </td>
                    <td className="p-2">
                      <div className="flex flex-wrap justify-center gap-2">
                        <button
                          onClick={() => handleCancelBooking(car._id)}
                          className="flex items-center gap-1 bg-red-500 px-3 py-1 rounded text-white text-xs md:text-sm"
                        >
                          Cancel <FaTrashAlt />
                        </button>
                        <button
                          onClick={() => handleModifyDate(car._id)}
                          className="flex items-center gap-1 bg-blue-500 px-3 py-1 rounded text-white text-xs md:text-sm"
                        >
                          Modify <SlCalender />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile Card Layout */}
            <div className="sm:hidden space-y-4">
              {booking.map((car) => (
                <div
                  key={car._id}
                  className=" rounded-lg p-3 shadow-sm bg-white flex flex-col gap-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={car.carImages}
                      alt={car.carModel}
                      className="w-20 h-20 object-contain rounded"
                    />
                    <div>
                      <h3 className="font-bold text-sm">{car.carModel}</h3>
                      <p className="text-xs text-gray-600">
                        {formatDate(car.startDay)} - {formatDate(car.endDate)}
                      </p>
                      <p className="text-sm font-semibold">{car.totalPrice} ৳</p>
                      <span
                        className={`inline-block mt-1 px-2 py-1 rounded text-white text-xs ${car.bookingStatus === "pending"
                          ? "bg-yellow-500"
                          : car.bookingStatus === "canceled"
                            ? "bg-red-500"
                            : "bg-green-500"
                          }`}
                      >
                        {car.bookingStatus}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCancelBooking(car._id)}
                      className="flex-1 flex items-center justify-center gap-1 bg-red-500 px-3 py-1 rounded text-white text-xs"
                    >
                      Cancel <FaTrashAlt />
                    </button>
                    <button
                      onClick={() => handleModifyDate(car._id)}
                      className="flex-1 flex items-center justify-center gap-1 bg-blue-500 px-3 py-1 rounded text-white text-xs"
                    >
                      Modify <SlCalender />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    {
      modifyDate && <ModifyBookingModal setEndtDate={setEndtDate} setStartDate={setStartDate} startDate={startDate} endDate={endDate} handleConfirmModifyDate={handleConfirmModifyDate}/>
    }

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <nav className="flex items-center gap-1 sm:gap-2">
          {/* Previous Button */}
          <button
            className="px-3 py-1 sm:px-4 sm:py-2 border border-gray-300 rounded-md disabled:opacity-50 text-sm sm:text-base"
            disabled={currentPage === 0}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            <span className="hidden sm:inline">Previous</span>
            <span className="sm:hidden">←</span>
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {pageArray?.map((page) => {
              // Show only first, last, and nearby pages on mobile
              if (window.innerWidth < 640 &&
                page !== 0 &&
                page !== pageArray.length - 1 &&
                Math.abs(page - currentPage) > 1) {
                if (Math.abs(page - currentPage) === 2) {
                  return <span key={page} className="px-2">...</span>;
                }
                return null;
              }

              return (
                <button
                  key={page}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md text-sm sm:text-base ${currentPage === page
                    ? "bg-primary text-white"
                    : "border border-gray-300 hover:bg-gray-100"
                    }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page + 1}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            className="px-3 py-1 sm:px-4 sm:py-2 border border-gray-300 rounded-md disabled:opacity-50 text-sm sm:text-base"
            disabled={pageArray?.length - 1 === currentPage}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            <span className="hidden sm:inline">Next</span>
            <span className="sm:hidden">→</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default MyBooking;
