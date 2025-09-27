import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { IoMdAddCircle } from "react-icons/io";
import Select from "react-select";
import UserContext from "../../../../ContextApi/UserContext/UserContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
const featureOptions = [
  { value: "AC", label: "AC" },
  { value: "Airbags", label: "Airbags" },
  { value: "GPS", label: "GPS" },
  { value: "Bluetooth", label: "Bluetooth" },
  { value: "USB", label: "USB" },
  { value: "Cruise Control", label: "Cruise Control" },
  { value: "Rear Camera", label: "Rear Camera" },
  { value: "Sunroof", label: "Sunroof" },
  { value: "Heated Seats", label: "Heated Seats" },
  { value: "Keyless Entry", label: "Keyless Entry" },
  { value: "Alloy Wheels", label: "Alloy Wheels" },
  { value: "ABS", label: "ABS" },
  { value: "Fog Lights", label: "Fog Lights" },
  { value: "Touchscreen", label: "Touchscreen" },
  { value: "Parking Sensors", label: "Parking Sensors" },
  { value: "Lane Assist", label: "Lane Assist" },
  { value: "Blind Spot Monitor", label: "Blind Spot Monitor" },
  { value: "Power Steering", label: "Power Steering" },
  { value: "Apple CarPlay", label: "Apple CarPlay" },
  { value: "Push Start", label: "Push Start" },
];

const AddCars = () => {
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm();
  const Navigate = useNavigate();
  const { user } = useContext(UserContext);
  const onSubmit = async (data) => {
    console.log(data);
    const featuresArray = data.features.map((item) => item.value);

    const pickupPointsArray = data.pickupPoints.split(",").map((item) => item.trim());

    const carData = {
      ownerId:user?.uid,
      carModel: data.carModel,
      brand: data.brand,
      category: data.category,
      fuelType: data.fuelType,
      transmission: data.transmission,
      seatingCapacity: parseInt(data.seatingCapacity, 10),
      dailyRentalPrice: parseFloat(data.dailyRentalPrice),
      hourlyRentalPrice: parseFloat(data.hourlyRentalPrice),
      availability: data.availability ,
      registrationNumber: data.registrationNumber,
      features: featuresArray,
      color: data.color,
      year: parseInt(data.year, 10),
      mileage: data.mileage,
      description: data.description,
      bookingCount: 0, // default value
      imageUrl: data.imageUrl,
      location: {
        city: data.city,
        pickupPoints: pickupPointsArray,
      },
      rating: parseFloat(data.rating),
      createdAt: new Date(),
    };

    try {
      const res = await axios.post(` https://car-rental-system-server-beta.vercel.app/car?email=${user.email}`, carData, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      if (res.data) {
        Swal.fire({
          title: "Your Cars Added Successful !",
          icon: "success",
        });
    
        Navigate("/");
      }
    } catch (error) {
      console.log(error)
      Swal.fire({
        title: `Your Cars Added Failed ${error.message} `,
        icon: "error",
      });
    }
  };

  return (
    <div className="w-11/12 mx-auto p-6  rounded-xl ">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Car</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Car Model */}
        <div className="form-control">
          <input
            {...register("carModel", { required: "Car model is required" })}
            className="input input-bordered w-full"
            placeholder="Car Model"
          />
          {errors.carModel && <span className="text-red-500">{errors.carModel.message}</span>}
        </div>

        {/* Brand */}
        <div className="form-control">
          <input
            {...register("brand", { required: "Brand is required" })}
            className="input input-bordered w-full"
            placeholder="Brand"
          />
          {errors.brand && <span className="text-red-500">{errors.brand.message}</span>}
        </div>

        {/* Category */}
        <div className="form-control">
          <select
            {...register("category", { required: "Category is required" })}
            className="select select-bordered w-full"
          >
            <option value="">Select Category</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Convertible">Convertible</option>
            <option value="Coupe">Coupe</option>
            <option value="Wagon">Wagon</option>
            <option value="Pickup">Pickup</option>
            <option value="Crossover">Crossover</option>
            <option value="Minivan">Minivan</option>
            <option value="Luxury">Luxury</option>
            <option value="Sports Car">Sports Car</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Coupe">Coupe</option>
            <option value="Roadster">Roadster</option>
            <option value="Off-Road">Off-Road</option>
            <option value="Supercar">Supercar</option>
            <option value="Classic">Classic</option>
            <option value="Limousine">Limousine</option>
            <option value="Performance">Performance</option>
          </select>
          {errors.category && <span className="text-red-500">{errors.category.message}</span>}
        </div>

        {/* Fuel Type */}
        <div className="form-control">
          <select
            {...register("fuelType", { required: "Fuel type is required" })}
            className="select select-bordered w-full"
          >
            <option value="">Select Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
          {errors.fuelType && <span className="text-red-500">{errors.fuelType.message}</span>}
        </div>

        {/* Transmission */}
        <div className="form-control">
          <select
            {...register("transmission", { required: "Transmission is required" })}
            className="select select-bordered w-full"
          >
            <option value="">Select Transmission</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
          {errors.transmission && <span className="text-red-500">{errors.transmission.message}</span>}
        </div>

        {/* Seating Capacity */}
        <div className="form-control">
          <select
            {...register("seatingCapacity", { required: "Seating capacity is required" })}
            className="select select-bordered w-full"
          >
            <option value="">Select Seating Capacity</option>
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
          {errors.seatingCapacity && <span className="text-red-500">{errors.seatingCapacity.message}</span>}
        </div>

        {/* Daily Rental Price */}
        <div className="form-control">
          <input
            {...register("dailyRentalPrice", { required: "Daily rental price is required" })}
            className="input input-bordered w-full"
            placeholder="Daily Rental Price"
            type="number"
          />
          {errors.dailyRentalPrice && <span className="text-red-500">{errors.dailyRentalPrice.message}</span>}
        </div>

        {/* Hourly Rental Price */}
        <div className="form-control">
          <input
            {...register("hourlyRentalPrice", { required: "Hourly rental price is required" })}
            className="input input-bordered w-full"
            placeholder="Hourly Rental Price"
            type="number"
          />
          {errors.hourlyRentalPrice && <span className="text-red-500">{errors.hourlyRentalPrice.message}</span>}
        </div>

        {/* Availability */}
        <div className="form-control">
          <select
            {...register("availability", { required: "Availability is required" })}
            className="select select-bordered w-full"
          >
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
            <option value="Maintenance">Maintenance</option>
          </select>
          {errors.availability && <span className="text-red-500">{errors.availability.message}</span>}
        </div>

        {/* Registration Number */}
        <div className="form-control">
          <input
            {...register("registrationNumber", { required: "Registration number is required" })}
            className="input input-bordered w-full"
            placeholder="Registration Number"
          />
          {errors.registrationNumber && <span className="text-red-500">{errors.registrationNumber.message}</span>}
        </div>

        {/* Features */}
        <div>
          <label className="font-semibold block mb-2"> Select Your Car Features</label>
          <Controller
            name="features"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                options={featureOptions}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            )}
          />
        </div>

        {/* Color */}
        <div className="form-control">
          <select
            {...register("color", { required: "Color is required" })}
            className="select select-bordered w-full"
          >
            <option value="">Select Color</option>
            <option value="Silver">Silver</option>
            <option value="Black">Black</option>
            <option value="White">White</option>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="Gray">Gray</option>
            <option value="Green">Green</option>
            <option value="Yellow">Yellow</option>
            <option value="Orange">Orange</option>
            <option value="Purple">Purple</option>
          </select>
          {errors.color && <span className="text-red-500">{errors.color.message}</span>}
        </div>

        {/* Mileage */}
        <div className="form-control">
          <select
            {...register("mileage", { required: "Mileage is required" })}
            className="select select-bordered w-full"
          >
            <option value="">Select Mileage</option>
            <option value="10-15 km/l">10-15 km/l</option>
            <option value="15-20 km/l">15-20 km/l</option>
            <option value="20-25 km/l">20-25 km/l</option>
            <option value="25-30 km/l">25-30 km/l</option>
            <option value="30+ km/l">30+ km/l</option>
          </select>
          {errors.mileage && <span className="text-red-500">{errors.mileage.message}</span>}
        </div>

        {/* Year */}
        <div className="form-control">
          <select
            {...register("year", { required: "Year is required" })}
            className="select select-bordered w-full"
          >
            <option value="">Select Year</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
          </select>
          {errors.year && <span className="text-red-500">{errors.year.message}</span>}
        </div>

        {/* Description */}
        <div className="form-control col-span-2">
          <textarea
            {...register("description", { required: "Description is required" })}
            className="textarea textarea-bordered w-full"
            placeholder="Description"
          />
          {errors.description && <span className="text-red-500">{errors.description.message}</span>}
        </div>

        {/* Image URL */}
        <div className="form-control">
          <input
            {...register("imageUrl", { required: "Image URL is required" })}
            className="input input-bordered w-full"
            placeholder="Image URL"
          />
          {errors.imageUrl && <span className="text-red-500">{errors.imageUrl.message}</span>}
        </div>

        {/* Location Fields */}
        <div className="form-control col-span-2">
          <input
            {...register("city", { required: "City is required" })}
            className="input input-bordered w-full"
            placeholder="City"
          />
          {errors.city && <span className="text-red-500">{errors.city.message}</span>}
        </div>

        <div className="form-control col-span-2">
          <input
            {...register("pickupPoints", { required: "Pickup points are required" })}
            className="input input-bordered w-full"
            placeholder="Pickup Points (comma separated)"
          />
          {errors.pickupPoints && <span className="text-red-500">{errors.pickupPoints.message}</span>}
        </div>

        {/* Rating */}
        <div className="form-control">
          <input
            {...register("rating", { required: "Rating is required" })}
            className="input input-bordered w-full"
            placeholder="Rating"
            type="number"
          />
          {errors.rating && <span className="text-red-500">{errors.rating.message}</span>}
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end">
          <button type="submit" className="btn btn-primary w-full sm:w-auto">
            Add Car <IoMdAddCircle className="ml-2" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCars;
