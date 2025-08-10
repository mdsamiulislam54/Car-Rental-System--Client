import axios from 'axios'
import React, { useEffect, useState } from 'react'
import TotalCarChart from './TotalCarChart';
import Example from './TotalCarChart';

const RecentlyBooking = () => {

    const [bookingCar, setBookingCar] = useState([])
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [perPage, setPerPage] = useState(5);
    const pageNumber = Math.ceil(count / perPage) || 0
    const pageArray = [...Array(pageNumber).keys()];
    const totalBookinCar = async () => {

        try {
            const res = await axios.get(`http://localhost:5000/admin/recently/added/car?limit=${perPage}&page=${currentPage + 1}`)
            const data = res?.data.bookings;
            console.log(data)
            setBookingCar(data)
            setCount(res?.data.total)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        totalBookinCar()
    }, [perPage, currentPage,])
    return (
        <div className='grid md:grid-cols-3 gap-4'>
            <div className='bg-white mt-10 p-4 rounded-md lg:col-span-2 '>
                <nav className="flex items-center justify-between py-4 border-b border-gray-200 mb-4">
                    <h2 className="text-lg font-semibold font-rubik text-gray-800">
                        Recently Booking Car
                    </h2>
                </nav>
                <div>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Images</th>
                                <th>Car Model</th>
                                <th>Total Price</th>
                                <th>Payment Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bookingCar.map(car => <tr key={car._id}>
                                    <th>
                                        <img src={car.carImages} alt="carImages" className='w-20 h-20 object-contain ' />
                                    </th>
                                    <th>{car.carModel}</th>
                                    <th>{car.totalPrice}</th>
                                    <th className=' text-green-500'>{car.paymentStatus}</th>
                                </tr>)
                            }
                        </tbody>
                    </table>
                    {/* Pagination */}
                    <div className="flex justify-center mt-8">
                        <nav className="flex items-center gap-1 sm:gap-2">
                            {/* Previous Button */}
                            <button
                                className="px-3 py-1 sm:px-4 sm:py-2 border border-gray-300 rounded-md disabled:opacity-50 text-sm sm:text-base"
                                disabled={currentPage === 0}
                                onClick={() => setCurrentPage((prev) => prev - 1)}
                            >
                                <span className="hidden sm:inline">Previous</span>
                                <span className="sm:hidden">←</span>
                            </button>

                            {/* Page Numbers */}
                            <div className="flex items-center gap-1">
                                {pageArray?.map((page) => {
                                    // Show only first, last, and nearby pages on mobile
                                    if (window.innerWidth < 640 &&
                                        page !== 0 &&
                                        page !== pageArray.length - 1 &&
                                        Math.abs(page - currentPage) > 1) {
                                        if (Math.abs(page - currentPage) === 2) {
                                            return <span key={page} className="px-2">...</span>;
                                        }
                                        return null;
                                    }

                                    return (
                                        <button
                                            key={page}
                                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md text-sm sm:text-base ${currentPage === page
                                                ? "bg-primary text-white"
                                                : "border border-gray-300 hover:bg-gray-100"
                                                }`}
                                            onClick={() => setCurrentPage(page)}
                                        >
                                            {page + 1}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Next Button */}
                            <button
                                className="px-3 py-1 sm:px-4 sm:py-2 border border-gray-300 rounded-md disabled:opacity-50 text-sm sm:text-base"
                                disabled={pageArray?.length - 1 === currentPage}
                                onClick={() => setCurrentPage((prev) => prev + 1)}
                            >
                                <span className="hidden sm:inline">Next</span>
                                <span className="sm:hidden">→</span>
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
            <div className='lg:col-span-1 bg-white mt-10 p-4 rounded-md  '>
                
                    <TotalCarChart/>
                   
            </div>
        </div>
    )
}

export default RecentlyBooking