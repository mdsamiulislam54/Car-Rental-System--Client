import React, { useEffect, useState } from 'react';
import { totalBookinCarPending } from '../../../../Hook/dashboardApi/dashbordApi';
import { formatDate } from '../../../../Hook/DateFormate';



const ManageBookingCar = () => {
  const [bookingCar, setBookingCar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await totalBookinCarPending();
        setBookingCar(data || []);
      } catch (error) {
        console.error("Error fetching booking cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Booking Cars</h2>

      {loading ? (
        <p className="text-blue-500 text-lg">Loading...</p>
      ) : bookingCar.length === 0 ? (
        <p className="text-red-500 text-lg">No bookings found.</p>
      ) : (
        <div className="ooverflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table ">
            {/* Table Head */}
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th>Image</th>
                <th>Car Model</th>
                <th>Total Price</th>
                <th>Booking Status</th>
                <th>Payment Status</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {bookingCar.map((car, index) => (
                <tr key={index} className="hover">
                  <td>
                    <img
                      src={car?.carImages || 'https://via.placeholder.com/100'}
                      alt="car"
                      className="w-30 object-cover rounded"
                    />
                  </td>
                  <td>{car?.carModel || "N/A"}</td>
                  <td>${car?.totalPrice || 0}</td>
                  <td>
                    <span className={`badge ${car.bookingStatus === 'pending' ? 'badge-warning' : 'badge-success'}`}>
                      {car.bookingStatus}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${car.paymentStatus === 'unpaid' ? 'badge-error' : 'badge-success'}`}>
                      {car.paymentStatus}
                    </span>
                  </td>
                  <td>{formatDate(car?.startDay)}</td>
                  <td>{formatDate(car?.endDate)}</td>
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-sm btn-success">Confirm</button>
                      <button className="btn btn-sm btn-error">Cancel</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageBookingCar;
