import React, { useEffect, useState } from 'react';
import { totalBookinCarPending } from '../../../../Hook/dashboardApi/dashbordApi';

import Swal from 'sweetalert2';
import axios from 'axios';
import { formatDate } from '../../../../Hook/DateFormate';



const ManageBookingCar = () => {
    const [bookingCar, setBookingCar] = useState([]);
    const [loading, setLoading] = useState(true);


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
    useEffect(() => {


        fetchData();
    }, []);

    const handleConfirm = async (id) => {
        try {
            const res = await axios.patch(` https://car-rental-system-server-beta.vercel.app/admin/booking/confirm/${id}`);

            if (res.data) {
                Swal.fire({
                    title: "Success!",
                    text: "Booking confirmed successfully",
                    icon: "success",
                    confirmButtonText: "OK"
                });
            }
            fetchData()
        } catch (error) {
            console.error("Confirm error:", error);
            Swal.fire({
                title: "Error!",
                text: "Failed to confirm booking",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    };

    const handleCancelBooking = async (id) => {
        try {
            // Confirm action
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You want to cancel this booking!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, cancel it!'
            });

            if (result.isConfirmed) {
                // Call the cancel booking API
                const res = await axios.patch(` https://car-rental-system-server-beta.vercel.app/admin/booking/cencel/${id}`);

                if (res.data?.message === 'Booking canceled successfully') {
                    Swal.fire(
                        'Cancelled!',
                        'The booking has been canceled.',
                        'success'
                    );
                    fetchData()
                }
            }
        } catch (error) {
            Swal.fire('Error!', 'Failed to cancel the booking.', 'error');
            console.error("Cancel error:", error);
        }
    };

    return (
        <div className="md:p-8">


            {loading ? (
                <p className="text-blue-500 text-lg">Loading...</p>
            ) : bookingCar.length === 0 ? (
                <div className="text-red-500 text-lg flex justify-center items-center min-h-screen">
                    <p>No Pending Booking Car</p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-box border border-base-content/5 bg-white dark:bg-gray-800 dark:text-white">
                    <table className="table ">
                        {/* Table Head */}
                        <thead className="bg-white text-gray-700 dark:bg-gray-800 dark:text-white">
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
                                            className="w-10 object-cover rounded"
                                        />
                                    </td>
                                    <td>{car?.carModel || "N/A"}</td>
                                    <td>৳ {(car?.totalPrice).toFixed(2) || 0}</td>
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
                                            <button className="btn btn-sm btn-success" onClick={() => handleConfirm(car._id)}>Confirm</button>
                                            <button onClick={() => handleCancelBooking(car._id)} className="btn btn-sm btn-error text-white">Cancel</button>
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
