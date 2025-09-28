import React, { useEffect, useState } from 'react'
import BookingContext from './BookingContext'
import UseAuth from '../../Hook/useAuth/useAuth';
import axios from 'axios';

const BookingProvider = ({ children }) => {
    const [booking, setBookingData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [perPage, setPerPage] = useState(5);
    const pageNumber = Math.ceil(count / perPage) || 0
    const pageArray = [...Array(pageNumber).keys()];
    const [startDate, setStartDate] = useState(booking?.startDay || "");
    const [endDate, setEndDate] = useState(booking?.endDate || "");

    const { user } = UseAuth()

    const bookingDataFatch = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                ` https://car-rental-system-server-beta.vercel.app/booking-car?uid=${user.uid}&email=${user.email}&limit=${perPage}&page=${currentPage + 1}`,
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`,
                    },
                }
            );
            (res)
            setBookingData(res?.data?.result);
            setCount(res?.data?.count)

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            bookingDataFatch();
        }
    }, [user, currentPage, perPage]);

    const pendingBooking = booking.filter((item) => item.bookingStatus === "pending");
    const confirmedBooking = booking.filter((item) => item.bookingStatus === "confirmed");
    const cancelledBooking = booking.filter((item) => item.bookingStatus === "canceled");

    return (
        <BookingContext.Provider value={{ bookingDataFatch, booking, setBookingData, loading, error, pendingBooking, confirmedBooking, cancelledBooking, currentPage, pageArray, setCurrentPage }}>
            {children}
        </BookingContext.Provider>

    )
}

export default BookingProvider