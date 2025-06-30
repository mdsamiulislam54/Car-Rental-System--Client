import axios from "axios";
import React, { useEffect, useState } from "react";
import CarListingCard from "./CarListingCard";

const RecentListingCar = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://car-rental-system-server-beta.vercel.app/car");
       
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
    <div>
      <div className="w-11/12 mx-auto">
        <h1 className="text-3xl my-10 font-bold  text-center car-heading relative  text-primary">Recently Listings cars</h1>
        <div  className=" grid grid-cols-1 s md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
                cars.map((car)=><CarListingCard key={car._id} car ={car}></CarListingCard>)
            }
        </div>
      </div>
    </div>
  );
};

export default RecentListingCar;
