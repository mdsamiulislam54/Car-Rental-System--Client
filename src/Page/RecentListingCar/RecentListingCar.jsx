import axios from "axios";
import React, { useEffect, useState } from "react";
import CarListingCard from "./CarListingCard";
import { Link } from "react-router";
import Loader from "../../Components/Loader/Loader";
import Button from "../../Components/Button/Button";

const RecentListingCar = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/car");
       
        const data = res.data;
       
        setCars(data);
      } catch (err) {
   
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }
  return (
    <div className="my-10">
      <div className="w-11/12 mx-auto py-10">
        <h1 className="text-4xl my-10 font-bold font-rubik text-text  text-center car-heading relative  ">Latest Vehicle</h1>
        <div  className=" grid grid-cols-1 s md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
                cars.map((car)=><CarListingCard key={car._id} car ={car}></CarListingCard>)
            }
        </div>

        <div className="mt-10 text-center">
          <Link to={'available-cars'} className="flex justify-center items-center">
            <Button text={'See More'}/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecentListingCar;
