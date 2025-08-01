import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { formatDateTime } from "../../Hook/DateFormate";
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
import UserContext from "../../ContextApi/UserContext/UserContext";
import { Link } from "react-router";
import Loader from "../../Components/Loader/Loader";

const MyBooking = () => {
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modifyDate, setModifyDate] = useState(false);
  const [modifyId, setModifyId] = useState("");
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndtDate] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user?.uid) {
      bookingDataFatch();
    }
  }, [user]);

  const bookingDataFatch = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/

booking-car?uid=${user.uid}&email=${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      setBooking(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
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
            `http://localhost:5000/cancel-booking/${id}`
          );
          const data = res.data;
          console.log(data);

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
        `http://localhost:5000/

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

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="min-h-screen bg-gray-50 w-11/12 mx-auto">
      {booking.length === 0 ? (
       <div className="flex justify-center flex-col gap-8 items-center min-h-screen bg-gray-50 px-4 text-center">
                <div className="text-7xl text-primary animate-bounce">🚗</div>
      
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 drop-shadow-lg">
                  No Booking Cars Found!
                </h2>
      
                <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
                  Looks like you haven't added any cars yet. Start listing your
                  beautiful rides and let people rent them today!
                </p>
      
                <Link
                  to={"/available-cars"}
                  className="px-6 py-3 bg-primary text-white rounded-lg font-semibold text-lg shadow hover:bg-orange-600 transition duration-300 flex items-center gap-2"
                >
                  <span></span> Booking Cars
                </Link>
              </div>
      ) : (
        <div className="">
          <div className="mb-20">
            {loading ? (
              <Loader />
            ) : chartBookingData.length === 0 ? (
              <p className="text-center text-lg">No chart data found</p>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  width={500}
                  height={300}
                  data={chartBookingData}
                  syncId="anyId"
                  margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#FF0000"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className=" ">
            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse relative ">
                <thead className="bg-gray-200 ">
                  <tr>
                    <th className="p-3 text-sm md:text-base font-bold">
                      Car Image
                    </th>
                    <th className="p-3 text-sm md:text-base font-bold">
                      Car Model
                    </th>
                    <th className="p-3 text-sm md:text-base font-bold">
                      Booking Date
                    </th>
                    <th className="p-3 text-sm md:text-base font-bold">
                      Total Price
                    </th>
                    <th className="p-3 text-sm md:text-base font-bold">
                      Status
                    </th>
                    <th className="p-3 text-sm md:text-base font-bold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="text-center bg-gray-50 ">
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="p-5 text-lg">
                        <Loader />
                      </td>
                    </tr>
                  ) : booking.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-5 text-lg">
                        No Bookings Found
                      </td>
                    </tr>
                  ) : (
                    booking.map((car) => (
                      <tr
                        key={car._id}
                        className=" hover:bg-gray-200 transition bg-gray-100"
                      >
                        <td className="p-3">
                          <img
                            src={car.carImages}
                            alt=""
                            className="w-14 h-14 md:w-20 md:h-20 object-contain mx-auto rounded"
                          />
                        </td>
                        <td className="p-2 md:p-3 text-sm md:text-base">
                          {car.carModel}
                        </td>

                        <td className="p-3 flex flex-col gap-1 items-center text-xs sm:text-sm md:text-base">
                          <span>{formatDateTime(car.startDay)}</span>
                          <br />
                          <span>{formatDateTime(car.endDate)}</span>
                        </td>

                        <td className="p-2 md:p-3 text-sm md:text-base">
                          {car.totalPrice} ৳
                        </td>

                        <td
                          className={`p-2 md:p-3 font-semibold  text-sm md:text-base`}
                        >
                          <p
                            className={`${
                              car.bookingStatus === "Canceled"
                                ? "text-red-300 line-through  "
                                : "text-green-300"
                            }`}
                          >
                            {" "}
                            {car.bookingStatus}
                          </p>
                        </td>

                        <td className="  ">
                          <div className="flex justify-center gap-2 items-center ">
                            <button
                              onClick={() => handleCancelBooking(car._id)}
                              className={`flex items-center gap-2 bg-red-500 px-3 py-1 rounded text-white text-xs md:text-sm  `}
                            >
                              Cancel <FaTrashAlt />
                            </button>
                            <button
                              onClick={() => handleModifyDate(car._id)}
                              className="flex items-center gap-2 bg-blue-500 px-3 py-1 rounded text-white text-xs md:text-sm"
                            >
                              Modify <SlCalender />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
                {modifyDate && (
                  <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-md  bg-white p-5 shadow-2xl">
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold mb-4">
                        Modify Your Booking Date
                      </h2>
                      <div>
                        <label className="text-md font-medium ">
                          Start Date:
                        </label>
                        <input
                          onChange={(e) => setStartDate(e.target.value)}
                          type="date"
                          name=""
                          id=""
                          required
                          className="w-full p-2 border-2 rounded-md border-primary mb-2"
                        />
                      </div>
                      <div>
                        <label className="text-md font-medium ">
                          End Date:
                        </label>
                        <input
                          onChange={(e) => setEndtDate(e.target.value)}
                          type="date"
                          name=""
                          required
                          className="w-full p-2 border-2 rounded-md border-primary mb-4"
                        />
                      </div>

                      <div className="flex justify-end gap-5">
                        <button
                          onClick={handleConfirmModifyDate}
                          className="bg-primary p-2 text-white rounded-md cursor-pointer "
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setModifyDate(!modifyDate)}
                          className="bg-secondary  p-2 text-white rounded-md cursor-pointer "
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBooking;
