import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Button from '../../Components/Button/Button';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function BookingCar() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [carType, setCarType] = useState([]);
  const [location, setLocation] = useState([])
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    (data)
    try {
      navigate('/available-cars', {
        state: {
          carModel: data.carModel,
          location: data.pickupLocation
        }
      });
    } catch (error) {
      (error.message)
    }
  };

  useEffect(() => {
    const fetchCarTypes = async () => {
      try {
        const res = await axios.get('https://car-rental-system-server-beta.vercel.app/car-type', { withCredentials: true });
        if (res.status !== 200) {
          throw new Error("Failed to fetch car types");
        }
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
    <div className="bg-white dark:bg-black p-6 shadow rounded-xl dark:shadow-white dark:text-white">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end"
      >
        {/* Car Type */}
        <div>
          <label className="block mb-2 font-medium font-rubik text-text">🚗 Select Your Car Type</label>
          <select 
            {...register("carModel", { required: true })} 
            className="select text-black"
          >
            <option value="">-- Choose Car Type --</option>
            {carType?.map(type => <option  className='text-gray-800' key={type}>{type}</option>)}
          </select>
          {errors.carModel && <span className="text-red-500 text-sm">Car type is required</span>}
        </div>

        {/* Pick Up */}
        <div>
          <label className="block mb-2 font-medium font-rubik text-text">📍 Pick-Up Location</label>
          <select 
            {...register("pickupLocation", { required: true })} 
            className="select text-black"
          >
            <option value="">-- Choose Pick-Up --</option>
            {unickPicupLocation?.map(type => <option  className='text-gray-800' key={type}>{type}</option>)}
          </select>
          {errors.pickupLocation && <span className="text-red-500 text-sm">Pick-up location is required</span>}
        </div>

        {/* Drop Off */}
        <div>
          <label className="block mb-2 font-medium font-rubik text-text">📍 Drop-Off Location</label>
          <select 
            {...register("dropLocation", { required: true })} 
            className="select text-black "
          >
            <option value="">-- Choose Drop-Off --</option>
            {unickPicupLocation?.map(type => <option className='text-gray-800'  key={type}>{type}</option>)}
          </select>
          {errors.dropLocation && <span className="text-red-500 text-sm">Drop-off location is required</span>}
        </div>

        {/* Button */}
        <div className="flex justify-start md:justify-center lg:justify-end">
          <Button text={'Search Car'} type='submit' />
        </div>
      </form>
    </div>
  );
}

export default BookingCar;
