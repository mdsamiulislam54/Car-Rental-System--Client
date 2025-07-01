import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import UserContext from "../../ContextApi/UserContext/UserContext";
import axios from "axios";

const CarDetailsPage = () => {
  const car = useLoaderData();
  const [bookigModal, setBookingModal] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndtDate] = useState(null);
  const { user } = useContext(UserContext);
  const [error,setError] = useState('')


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
      if (!startDate || !endDate) {
    setError("Please select both start and end date");
    return;
  }
    const bookCar = {
      totalPrice :totalPrice,
      carModel:car.carModel,
      availability:car.availability,
      startDay: startDate,
      endDate:endDate,
      userUid :user.uid,
      bookingStatus: 'Confirmed',
      carImages : car.imageUrl,
      carId:car._id
    }
    console.log(bookCar)
 
    // save data database

    const res = await axios.post(`http://localhost:5000/

booking-car`,bookCar)
    if(res.data){
      
      Swal.fire({
        title:"Your Booking Successful!!",
        icon:"success"
      })
      resetBookingForm()
      setBookingModal(!bookigModal)
    }else{
       Swal.fire({
        title:"Your Booking UnSuccessful!!",
        icon:"error"
      })
    }
  


   
    

  };


  return (
    <div className="">
      <div className="w-11/12 mx-auto py-8 relative">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Car Image */}
          <div>
            <img
              src={car.imageUrl}
              alt={car.carModel}
              className="w-full rounded-lg shadow"
            />
          </div>

          {/* Car Info */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-[#145d84]">
              {car.carModel}
            </h2>
            <p className="text-lg">
              <strong>Price/Day:</strong>{" "}
              <span className="text-[#fd6932] font-semibold">
                {car.dailyRentalPrice} ৳
              </span>
            </p>
            <p className="text-lg">
              <strong>Availability:</strong> {car.availability}
            </p>
            <p className="text-lg">
              <strong>Features:</strong> {car.features}
            </p>
            <p>
              <strong>Description:</strong> {car.description}
            </p>

            {/* Book Now Button */}
            <button
              onClick={() => setBookingModal(!bookigModal)}
              className="bg-[#145d84] text-white px-6 py-3 rounded-md hover:bg-[#0f4d6d] transition"
            >
              Book Now
            </button>
          </div>

          {bookigModal && (
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center  bg-black/20 ">
              <div className="w-[400px] h-[400px] bg-white shadow-2xl p-4">
                <h2 className="text-xl font-bold mb-4">Booking Confirmation</h2>
                <p className="font-medium mb-2">
                  Your are booking : <strong>{car.carModel}</strong>
                </p>
                <p className="font-medium mb-2">
                  Price Per Day :{" "}
                  <strong className="text-primary">
                    ৳ {car.dailyRentalPrice}
                  </strong>
                </p>
                <p className="font-medium mb-2">
                  Availability :{" "}
                  <strong className="text-primary">{car.availability}</strong>
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
                {
                  error && <p className="text-sm text-red-500">{error}</p>
                }
                <p>Total Cost : ৳{diffDay() * car.dailyRentalPrice }</p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setBookingModal(!bookigModal)}
                    className="bg-secondary p-2 rounded-md text-white hover:bg-secondary/90 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                  onClick={()=>handleBookNow(diffDay() * car.dailyRentalPrice )}
                  className="bg-primary p-2 rounded-md text-white hover:bg-primary/90 cursor-pointer">
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
