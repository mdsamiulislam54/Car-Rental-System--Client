import React, { useContext, useEffect, useState } from "react";
import UseAuth from "../../../Hook/useAuth/useAuth";
import {
    totalBookinCar,
    totalBookinCarPending,
    totalCar,
    totalUser,
} from "../../../Hook/dashboardApi/dashbordApi";
import {
    CarFront,
    Users,
    ClipboardList,
    Clock3,
    
} from "lucide-react";
import {


  CheckCircle,
  XCircle,
} from "lucide-react";
import BookingContext from "../../../ContextApi/myBookingContext/BookingContext";

const DashboardHomePage = () => {
          const [bookingData, setBookingData] = useState(null);
    const { user } = UseAuth();
    const [totalCars, setTotalCar] = useState(0);
    const [totalUsers, setTotalUser] = useState(0);
    const [bookingCar, setBookingCar] = useState([]);
    const [pending, setBookingPending] = useState([]);
    const {booking,pendingBooking,confirmedBooking,cancelledBooking} = useContext(BookingContext)

    useEffect(() => {
        const fetchTotal = async () => {
            const [car, users, bookings, pendings] = await Promise.all([
                totalCar(),
                totalUser(),
                totalBookinCar(),
                totalBookinCarPending(),
            ]);
            setTotalCar(car);
            setTotalUser(users);
            setBookingCar(bookings);
            setBookingPending(pendings);
        };
        fetchTotal();
    }, []);


  const handleBookingInfo = (dataFromChild) => {
    setBookingData(dataFromChild);
    console.log("Child থেকে আসা ডেটা:", dataFromChild);
  };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                {user?.role==='admin' ? "Admin":"User"} Dashboard Overview
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Cars */}
                {user?.role === "admin" && (
                    <div className="stat bg-white shadow-md rounded-lg p-4 ">
                        <div className="stat-figure text-primary">
                            <CarFront size={32} />
                        </div>
                        <div className="stat-title">Total Cars</div>
                        <div className="stat-value text-primary">{totalCars}</div>
                    </div>
                )}

                {/* Total Users */}
                {user?.role === "admin" && (
                    <div className="stat bg-white shadow-md rounded-lg p-4 ">
                        <div className="stat-figure text-secondary">
                            <Users size={32} />
                        </div>
                        <div className="stat-title">Total Users</div>
                        <div className="stat-value text-secondary">{totalUsers}</div>
                    </div>
                )}

                {/* Total Booking Cars */}
                {user?.role === "admin" && (
                    <div className="stat bg-white shadow-md rounded-lg p-4 ">
                        <div className="stat-figure text-accent">
                            <ClipboardList size={32} />
                        </div>
                        <div className="stat-title">Total Booking Cars</div>
                        <div className="stat-value text-accent">{bookingCar.length}</div>
                    </div>
                )}

                {/* Pending Bookings */}
                {user?.role === "admin" && (
                    <div className="stat bg-white shadow-md rounded-lg p-4 ">
                        <div className="stat-figure text-warning">
                            <Clock3 size={32} />
                        </div>
                        <div className="stat-title">Pending Bookings</div>
                        <div className="stat-value text-warning">{pending.length}</div>
                    </div>
                )}

              
            </div>
            <div>
                  {
                    user?.role === 'user' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="stat bg-white shadow-md rounded-lg p-4 ">
                                <div className="stat-figure text-primary">
                                    <ClipboardList size={32} />
                                </div>
                                <div className="stat-title">My Bookings</div>
                                <div className="stat-value text-primary">{booking.length}</div>
                            </div>

                            <div className="stat bg-white shadow-md rounded-lg p-4 ">
                                <div className="stat-figure text-warning">
                                    <Clock3 size={32} />
                                </div>
                                <div className="stat-title">Pending</div>
                                <div className="stat-value text-warning">{pendingBooking.length}</div>
                            </div>

                            <div className="stat bg-white shadow-md rounded-lg p-4 ">
                                <div className="stat-figure text-success">
                                    <CheckCircle size={32} />
                                </div>
                                <div className="stat-title">Confirm</div>
                                <div className="stat-value text-success">{confirmedBooking.length}</div>
                            </div>

                            <div className="stat bg-white shadow-md rounded-lg p-4 ">
                                <div className="stat-figure text-error">
                                    <XCircle size={32} />
                                </div>
                                <div className="stat-title">Canceled</div>
                                <div className="stat-value text-error">{cancelledBooking.length}</div>
                            </div>
                        </div>


                    )
                }
            </div>
        </div>
    );
};

export default DashboardHomePage;
