import React, { useEffect, useState } from 'react';

import { Link, Navigate, useNavigate } from 'react-router';
import Button from '../../Components/Button/Button';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function BookingCar() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [carType, setCarType] = useState([]);
    const [location, setLocation] = useState([])

    const navigate = useNavigate()

    const onSubmit = async (data) => {
        console.log("Booking Data:", data);
        try {
            navigate('/available-cars', {
                state: {
                    carModel: data.carModel,
                    location: data.pickupLocation
                }
            });

        } catch (error) {
            console.log(error.message)
        }


    };

    useEffect(() => {
        const fetchCarTypes = async () => {
            try {
                const res = await axios.get('https://car-rental-system-server-beta.vercel.app/car-type', { withCredentials: true });
                if (res.status !== 200) {
                    throw new Error("Failed to fetch car types");
                }


                // console.log(res.data.carTypes)
                // console.log(res.data.location)
                setCarType(res.data.carTypes) || []
                setLocation(res.data.location) || []

            } catch (error) {
                console.error("Error fetching car types:", error.message);
            }
        };

        fetchCarTypes();
    }, [])

    const pickupLocation = location.flatMap(item => item.pickupPoints);
    const unickPicupLocation = [...new Set(pickupLocation)];


    return (
        <div className=''>
            <h3 className='text-2xl  mb-4 text-text font-bold font-rubik'>Pick-Up Car</h3>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>



                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                    <div>
                        <label className='block mb-2 font-medium font-rubik text-text'>Select Your Car Type</label>
                        <select {...register("carModel", { required: true })} className='w-full input px-3 py-2 rounded text-gray-400'>
                            <option value="">-- Choose Car Type --</option>
                            {
                                carType?.map(type => <option key={type}>{type}</option>)
                            }
                        </select>
                        {errors.carModel && <span className='text-red-500 text-sm'>Car type is required</span>}
                    </div>
                    <div>
                        <label className='block mb-2 font-medium font-rubik text-text'>📍 Pick-Up Location</label>
                        <select {...register("pickupLocation", { required: true })} className='w-full input px-3 py-2 rounded text-gray-400'>
                          {
                                unickPicupLocation?.map(type => <option key={type}>{type}</option>)
                            }
                        </select>
                        {errors.pickupLocation && <span className='text-red-500 text-sm'>Pick-up location is required</span>}
                    </div>

                    <div>
                        <label className='block mb-2 font-medium font-rubik text-text'>📍 Drop-Up Location</label>
                        <select {...register("dropLocation", { required: true })} className='w-full input px-3 py-2 rounded text-gray-400'>
                            <option value="">-- Choose Drop-Up --</option>
                            {
                                unickPicupLocation?.map(type => <option key={type}>{type}</option>)
                            }
                        </select>
                        {errors.dropLocation && <span className='text-red-500 text-sm'>Drop-up location is required</span>}
                    </div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 items-end'>
                    <div>
                        <label className='block mb-2 font-medium font-rubik text-text'>📅 Pick-Up Date</label>
                        <input type="date" {...register("pickupDate", { required: true })} className='w-full input px-3 py-2 text-gray-400 rounded' />
                        {errors.pickupDate && <span className='text-red-500 text-sm'>Pick-up date is required</span>}
                    </div>

                    <div>
                        <label className='block mb-2 font-medium font-rubik text-text'>📅 Drop-Up Date</label>
                        <input type="date" {...register("dropDate", { required: true })} className='w-full input px-3 py-2 text-gray-400 rounded' />
                        {errors.dropDate && <span className='text-red-500 text-sm'>Drop-up date is required</span>}
                    </div>
                    <div>
                        <Button text={'Search Car'} type='submit' />
                    </div>
                </div>


            </form>
        </div>
    );
}

export default BookingCar;
