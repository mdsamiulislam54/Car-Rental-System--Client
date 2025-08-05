import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import UserContext from "../../ContextApi/UserContext/UserContext";
import axios from "axios";
import Button from "../../Components/Button/Button";
import { FaCar } from "react-icons/fa";

const CarDetailsPage = () => {
  const car = useLoaderData();
  const [bookigModal, setBookingModal] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndtDate] = useState(null);
  const { user } = useContext(UserContext);
  const [error, setError] = useState("");

  const diffDay = () => {
    const startDay = new Date(startDate);
    const endDay = new Date(endDate);

    const timeDiff = endDay.getTime() - startDay.getTime();
    const dayDiff = timeDiff / (1000 * 3600 * 24);

    return dayDiff;
  };

  const resetBookingForm = () => {
    setStartDate("");
    setEndtDate("");
    setError("");
  };

  const handleBookNow = async (totalPrice) => {


    if (user.role === 'admin') {
      return Swal.fire({
        title: 'Access Denied!',
        text: 'Admin is not allowed to perform this action.',
        icon: 'warning',
        confirmButtonText: 'Okay'
      });
    }
    if (!startDate || !endDate) {
      setError("Please select both start and end date");
      return;
    }
    const bookCar = {
      totalPrice: totalPrice,
      carModel: car.carModel,
      availability: car.availability,
      startDay: startDate,
      endDate: endDate,
      userUid: user?.uid,
      userEmail: user?.email,
      userName: user?.displayName,
      bookingStatus: "pending",
      carImages: car.imageUrl,
      carId: car._id,
      paymentStatus: 'paid'
    };
    console.log(bookCar);

    // save data database

    const res = await axios.post(
      `http://localhost:5000/

booking-car`,
      bookCar
    );
    if (res.data) {
      Swal.fire({
        title: "Your Booking Successful!!",
        icon: "success",
      });
      resetBookingForm();
      setBookingModal(!bookigModal);
    } else {
      Swal.fire({
        title: "Your Booking UnSuccessful!!",
        icon: "error",
      });
    }
  };

  console.log(car)

  return (
    <div className="">
      <div className="w-11/12 mx-auto py-8 relative border border-gray-200 rounded-2xl">
        <div className="flex flex-col justify-center items-center font-rubik">
          {/* Car Image */}
          <div>
            <img
              src={car.imageUrl}
              alt={car.carModel}
              className="w-[500px] rounded-lg "
            />
          </div>

          {/* Car Info */}
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold text-">{car.carModel}</h2>
            <p className="text-lg">
              <span className=" font-semibold">
                ৳ {car.dailyRentalPrice} Per Day
              </span>
            </p>
            <p className="text-lg">
              <strong>Availability:</strong> {car.availability}
            </p>
            <ul className=" flex space-x-3 justify-center items-center">
              <p className="text-lg font-bold">Features :</p>
              {
                car.features.map((feature, ind) => {
                  return (
                    <li className="bg-accent/30 p-2 font-bold text-sm" key={ind}>{feature}</li>
                  )
                })
              }
            </ul>

            <p className="lg:w-5/12 mx-auto px-4 text-text text-sm tracking-wide">
              {car.description}
            </p>

            {/* Book Now Button */}

            <div className="flex justify-center ">
              <Button text={' Book Now'} icon={FaCar} onClick={() => setBookingModal(!bookigModal)} />
            </div>
          </div>

          {bookigModal && (
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center  bg-black ">
              <div className="w-[500px] h-[450px] bg-white shadow-2xl p-6">
                <h2 className="text-xl font-bold mb-4">Booking Confirmation</h2>
                <p className="font-medium mb-2">
                  Your are booking : <strong>{car.carModel}</strong>
                </p>
                <p className="font-medium mb-2">
                  Price Per Day :{" "}
                  <strong className="">
                    ৳ {car.dailyRentalPrice}
                  </strong>
                </p>
                <p className="font-medium mb-2">
                  Availability :{" "}
                  <strong className="text-black bg-accent/30 p-2 rounded-md">{car.availability}</strong>
                </p>
                <div>
                  <label className="text-md font-medium ">Start Date:</label>
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
                  <label className="text-md font-medium ">End Date:</label>
                  <input
                    onChange={(e) => setEndtDate(e.target.value)}
                    type="date"
                    name=""
                    required
                    className="w-full p-2 border-2 rounded-md border-primary mb-4"
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <p>Total Cost : ৳{diffDay() * car.dailyRentalPrice}</p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setBookingModal(!bookigModal)}
                    className="hover:bg-secondary p-2 rounded-md hover:text-white border border-primary text-text cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() =>
                      handleBookNow(diffDay() * car.dailyRentalPrice)
                    }
                    className="hover:bg-primary p-2 rounded-md hover:text-white border border-primary text-text cursor-pointer"
                  >
                    Conform
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;
