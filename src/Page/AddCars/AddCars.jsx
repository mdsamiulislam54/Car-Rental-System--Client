import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import UserContext from "../../ContextApi/UserContext/UserContext";
import Button from "../../Components/Button/Button";
import { IoMdAddCircle } from "react-icons/io";
const AddCars = () => {
  const Navigate = useNavigate();
  const { user } = useContext(UserContext);
  const handleAddCars = async (e) => {
    try {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      data.bookingCount = 0;
      data.createdAt = new Date().toISOString();
      data.features = data.features.split(",").map((item) => item.trim());
      data.uid = user.uid;

      const res = await axios.post(
        `http://localhost:5000/

car?email=${user.email}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      if (res.data) {
        Swal.fire({
          title: "Your Cars Added Successful !",
          icon: "success",
        });
        form.reset();
        Navigate("/");
      }
    } catch (err) {
      Swal.fire({
        title: `Your Cars Added Failed ${err} `,
        icon: "error",
      });
    }
  };
  return (
    <div
      className=" min-h-screen  "
      
    >

      <div className="w-11/12 mx-auto relative z-10 ">
        <form className=" rounded-lg p-6 text-text font-rubik " onSubmit={handleAddCars}>
          {/* <h2 className="text-3xl font-bold text-text font-rubik mb-6 text-center">
            Add New Car
          </h2> */}

          <div className="">
            {/* Left Column */}
            <div className="space-y-4 grid grid-cols-2 md:grid-cols-2 gap-6">
              {/* Owner Name */}
              <fieldset>
                <label className="label  mb-2 font-medium">
                  Car Model:
                </label>
                <input
                  type="text"
                  name="carModel"
                  required
                  className="input w-full"
                  placeholder="Car Model Name..."
                />
              </fieldset>

              {/*  Booking count  */}
              <fieldset>
                <label className="label  mb-2 font-medium">
                  Booking Count:
                </label>
                <input
                  type="number"
                  name="booking"
                  required
                  className="input w-full"
                  placeholder="0"
                />
              </fieldset>

              {/* Daily Rental Price */}
              <fieldset>
                <label className="label  mb-2 font-medium">
                  Daily Rental Price ($):
                </label>
                <input
                  type="number"
                  required
                  name="dailyRentalPrice"
                  className="input w-full"
                  placeholder="50.00"
                />
              </fieldset>

              {/* Availability */}
              <fieldset>
                <label className="label  mb-2 font-medium">
                  Availability:
                </label>
                <select name="availability" Z className="select w-full">
                  <option>Available</option>
                  <option>Not Available</option>
                </select>
              </fieldset>
              {/* Location */}
              <fieldset>
                <label className="label  mb-2 font-medium">
                  Location:
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  className="input w-full"
                  placeholder="New York, USA"
                />
              </fieldset>
                {/* Vehicle Registration */}
              <fieldset>
                <label className="label  mb-2 font-medium">
                  Registration Number:
                </label>
                <input
                  type="text"
                  required
                  name="registrationNumber"
                  className="input w-full"
                  placeholder="ABC-1234"
                />
              </fieldset>

              {/* Features */}
              <fieldset>
                <label className="label  mb-2 font-medium">
                  Features:
                </label>
                <textarea
                  name="features"
                  required
                  className="textarea w-full"
                  placeholder="GPS, AC, Bluetooth (separate by comma)"
                  rows="3"
                ></textarea>
              </fieldset>

              {/* Description */}
              <fieldset>
                <label className="label  mb-2 font-medium">
                  Description:
                </label>
                <textarea
                  name="description"
                  required
                  className="textarea w-full"
                  placeholder="Car details..."
                  rows="3"
                ></textarea>
              </fieldset>

              {/* Image URL */}
              <fieldset>
                <label className="label  mb-2 font-medium">
                  Image URL:
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  required
                  className="input w-full"
                  placeholder="https://example.com/car.jpg"
                />
              </fieldset>
            </div>

          
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-end">
       
            <Button text={'Add Car'} icon={IoMdAddCircle} type="submit"/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCars;
