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
    TrendingUp,
    TrendingDown,
    BanknoteArrowUp
} from "lucide-react";

import { CheckCircle, XCircle } from "lucide-react";
import BookingContext from "../../../ContextApi/myBookingContext/BookingContext";
import { MdMoney } from "react-icons/md";
import StatCard from "./StatCard";
import AdminChart from "./AdminChart/AdminChart";
import RecentlyBooking from "./RecentlyBooking/RecentlyBooking";
const DashboardHomePage = () => {
    const { user } = UseAuth();
    const [totalCars, setTotalCar] = useState(0);
    const [totalUsers, setTotalUser] = useState(0);
    const [bookingCar, setBookingCar] = useState([]);
    const [pending, setBookingPending] = useState([]);
    const [totalPaid, setTotalledPaid] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState([]);

    const { booking, pendingBooking, confirmedBooking, cancelledBooking } =
        useContext(BookingContext);

    useEffect(() => {
        const fetchTotal = async () => {
            const [car, users, bookings, pendings] = await Promise.all([
                totalCar(),
                totalUser(),
                totalBookinCar(),
                totalBookinCarPending(),
            ]);
            setTotalCar(car.total);
            setTotalledPaid(car.paid || 0);
            setTotalRevenue(car.totalPaid)
            setTotalUser(users);
            setBookingCar(bookings);
            setBookingPending(pendings);
        };
        fetchTotal();
    }, []);
    const formatNumber = (num) => {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(2) + "B";
        } else if (num >= 1000000) {
            return (num / 1000000).toFixed(2) + "M";
        } else if (num >= 1000) {
            return (num / 1000).toFixed(2) + "K";
        } else {
            return num.toString();
        }
    };

    const revenueChartData = totalRevenue.map((car) => (
        {
            carName: car.carModel,
            price: car.totalPrice,
            userName: car.userName,
            status: car.paymentStatus
        }
    ))

    return (
        <div className="p-6 ">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Dashboard Overview
            </h2>

            {/* Statistical Report */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 py-2">
                {user?.role === "admin" && (
                    <>
                        <StatCard
                            title="Total Revenue"
                            value={`৳ ${formatNumber(totalPaid)}`}
                            icon={BanknoteArrowUp}
                            color="text-text"
                            change={16.24}
                            className="font-semibold  "
                        />
                        <StatCard
                            title="Total Cars"
                            value={totalCars}
                            icon={CarFront}
                            color="text-blue-500"
                            change={5.67}
                        />
                        <StatCard
                            title="Total Users"
                            value={totalUsers}
                            icon={Users}
                            color="text-purple-500"
                            change={2.14}
                        />
                        <StatCard
                            title="Total Bookings"
                            value={bookingCar.length}
                            icon={ClipboardList}
                            color="text-orange-500"
                            change={-1.23}
                        />



                    </>
                )}

                {user?.role === "user" && (
                    <>
                        <StatCard
                            title="My Bookings"
                            value={booking.length}
                            icon={ClipboardList}
                            color="text-blue-500"
                            change={4.56}
                        />
                        <StatCard
                            title="Pending"
                            value={pendingBooking.length}
                            icon={Clock3}
                            color="text-yellow-500"
                            change={-2.12}
                        />
                        <StatCard
                            title="Confirmed"
                            value={confirmedBooking.length}
                            icon={CheckCircle}
                            color="text-green-500"
                            change={1.88}
                        />
                        <StatCard
                            title="Canceled"
                            value={cancelledBooking.length}
                            icon={XCircle}
                            color="text-red-500"
                            change={-0.75}
                        />
                    </>
                )}
            </div>

            {
                user?.role === 'admin' && (
                    <div className="w-full">
                        <AdminChart revenueChartData={revenueChartData} />
                        <div>
                            <RecentlyBooking bookingCar={bookingCar}/>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default DashboardHomePage;