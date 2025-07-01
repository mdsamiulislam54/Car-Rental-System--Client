import axios from "axios";
import React, { useEffect, useState } from "react";
import CarListingCard from "./CarListingCard";
import { Link } from "react-router";

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }
  return (
    <div className="my-10">
      <div className="w-11/12 mx-auto py-10">
        <h1 className="text-3xl my-10 font-bold  text-center car-heading relative  ">Recently Listings cars</h1>
        <div  className=" grid grid-cols-1 s md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
                cars.map((car)=><CarListingCard key={car._id} car ={car}></CarListingCard>)
            }
        </div>

        <div className="mt-10 text-center">
          <Link to={'available-cars'} className="btn btn-outline hover:bg-primary hover:text-white transition-all duration-300 border-primary">See More</Link>
        </div>
      </div>
    </div>
  );
};

export default RecentListingCar;
