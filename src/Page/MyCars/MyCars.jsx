import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../ContextApi/UserContext/UserContext";
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
import Loader from "../../Components/Loader/Loader";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const MyCars = () => {
  const [carData, setCarData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [selectedCar, setSelectedCar] = useState(null);
  const [sortOrder, setSortOrder] = useState("Default");

  console.log(user.accessToken);
  useEffect(() => {
    fetchData();
  }, [sortOrder]);
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://car-rental-system-server-beta.vercel.app/

my-cars?uid=${user.uid}&sort=${sortOrder}&email=${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      const data = res.data;
      setCarData(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const fromData = new FormData(form);
    const updatedCar = Object.fromEntries(fromData.entries());
    console.log(updatedCar);

    await axios
      .patch(
        `https://car-rental-system-server-beta.vercel.app/

update-car/${selectedCar._id}`,
        updatedCar
      )
      .then((res) => {
        if (res.data.modifiedCount === 1) {
          Swal.fire({
            title: "Your Car Updated Successful!",
            icon: "success",
          });
          form.reset();
          setSelectedCar(null);
          fetchData();
        }
      })
      .catch(() => {
        Swal.fire({
          title: "Your Car Updated Successful!",
          icon: "error",
        });
      });
  };
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  const chartData = carData.map((car) => ({
    name: car.carModel,
    price: car.dailyRentalPrice,
    bookingCount: car.bookingCount,
  }));

  const handleDeleteCar = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.delete(`https://car-rental-system-server-beta.vercel.app/

my-cars/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Your car has been deleted.", "success");
          fetchData();
        }
      }
    });
  };

  return (
    <div className=" w-11/12 mx-auto min-h-screen bg-center relative z-0 py-5 text-white">
      {carData.length === 0 ? (
        <div className="flex justify-center flex-col gap-8 items-center min-h-screen bg-gray-50 px-4 text-center">
          <div className="text-7xl text-primary animate-bounce">🚗</div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 drop-shadow-lg">
            No Cars Found!
          </h2>

          <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
            Looks like you haven't added any cars yet. Start listing your
            beautiful rides and let people rent them today!
          </p>

          <Link
            to={"/add-cars"}
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold text-lg shadow hover:bg-orange-600 transition duration-300 flex items-center gap-2"
          >
            <span></span> Add Your Car
          </Link>
        </div>
      ) : (
        <div>
          <div className="mb-20">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={chartData}
                syncId="myCarsSync"
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="bookingCount" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="overflow-x-auto">
            <div className=" flex justify-end text-black ">
              <div className="mb-5  flex items-center gap-4">
                
                <select
                  onChange={(e) => setSortOrder(e.target.value)}
                  defaultValue="Default"
                  className="select w-[400px]"
                >
                  <option value="default">Default</option>
                  <option value="asc">Newest First </option>
                  <option value="desc">Oldest First</option>
                </select>
              </div>
            </div>
            <table className="w-full text-center border-collapse">
              <thead className="text-black bg-gray-100">
                <tr>
                  <th className="p-3">Image</th>
                  <th className="p-3">Car Model</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Booking</th>
                  <th className="p-3">Availability</th>
                  <th className="p-3">Date Added</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-gray-50 text-black">
                {carData.map((car) => (
                  <tr
                    key={car._id}
                    className="hover:bg-gray-200 transition-all"
                  >
                    <td className="p-2 flex justify-center items-center">
                      <img
                        src={car.imageUrl}
                        alt={car.carModel}
                        className="w-20 h-14 object-contain rounded"
                      />
                    </td>
                    <td className="p-2">{car.carModel}</td>
                    <td className="p-2">{car.dailyRentalPrice}</td>
                    <td className="p-2">{car.bookingCount}</td>
                    <td className="p-2 ">{car.availability}</td>
                    <td className="p-2">
                      {new Date(car.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-2 flex items-center justify-center gap-4  ">
                      <button onClick={() => setSelectedCar(car)} className=" ">
                        <FaEdit size={20} color="blue" />
                      </button>
                      <button
                        onClick={() => handleDeleteCar(car._id)}
                        className=""
                      >
                        <MdDeleteForever size={24} color="red" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {selectedCar && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-100">
          <div className="bg-white p-6 mt-14 rounded-lg w-11/12 md:w-2/3 lg:w-1/2 relative  text-black">
            <h2 className="text-xl font-bold mb-4">Update Car</h2>
            <form onSubmit={handleUpdate} className="space-y-3">
              <div className="flex gap-3 justify-center">
                <input
                  name="carModel"
                  defaultValue={selectedCar.carModel}
                  className="border-2 rounded-md p-2 w-full "
                  placeholder="Car Model"
                />
                <input
                  name="dailyRentalPrice"
                  defaultValue={selectedCar.dailyRentalPrice}
                  className="border-2 rounded-md p-2 w-full "
                  placeholder="Daily Rental Price"
                />
              </div>

              <select
                name="availability"
                id=""
                className="border-2 rounded-md p-2 w-full "
              >
                <option value={selectedCar.availability}>
                  {selectedCar.availability}
                </option>
                <option value="Not Available">Not Available</option>
              </select>

              <div className="flex gap-3">
                <input
                  name="registrationNumber"
                  defaultValue={selectedCar.registrationNumber}
                  className="border-2 rounded-md p-2 w-full "
                  placeholder="Registration Number"
                />
                <input
                  name="features"
                  defaultValue={selectedCar.features}
                  className="border-2 rounded-md p-2 w-full "
                  placeholder="Features"
                />
              </div>
              <textarea
                name="description"
                defaultValue={selectedCar.description}
                className="border-2 rounded-md p-2 w-full "
                placeholder="Description"
              />
              <div className="flex gap-3">
                <input
                  name="image"
                  defaultValue={selectedCar.imageUrl}
                  className="border-2 rounded-md p-2 w-full "
                  placeholder="Image URL"
                />
                <input
                  name="location"
                  defaultValue={selectedCar.location}
                  className="border-2 rounded-md p-2 w-full "
                  placeholder="Location"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCar(null)}
                  className="btn btn-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-sm bg-primary text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCars;
