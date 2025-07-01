import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import UserContext from "../../ContextApi/UserContext/UserContext";

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
      className="bg-base-200 min-h-screen bg-center relative z-0 py-5"
      style={{
        backgroundImage: `url("https://i.postimg.cc/Bbsr5vWm/avdjlxno5-ezgif.com-webp-to-jpg-converter-removebg-preview.png")`,
      }}
    >
      <div className="absolute inset-0 bg-black/50 -z-10"></div>
      <div className="w-11/12 mx-auto relative z-10 mt-">
        <form className=" rounded-lg p-6 " onSubmit={handleAddCars}>
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Add New Car
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Owner Name */}
              <fieldset>
                <label className="label text-white mb-2 font-medium">
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
                <label className="label text-white mb-2 font-medium">
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
                <label className="label text-white mb-2 font-medium">
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
                <label className="label text-white mb-2 font-medium">
                  Availability:
                </label>
                <select name="availability" Z className="select w-full">
                  <option>Available</option>
                  <option>Not Available</option>
                </select>
              </fieldset>
              {/* Location */}
              <fieldset>
                <label className="label text-white mb-2 font-medium">
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
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Vehicle Registration */}
              <fieldset>
                <label className="label text-white mb-2 font-medium">
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
                <label className="label text-white mb-2 font-medium">
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
                <label className="label text-white mb-2 font-medium">
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
                <label className="label text-white mb-2 font-medium">
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
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="btn btn-primary text-white w-full py-3 rounded-lg font-semibold"
            >
              Add Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCars;
