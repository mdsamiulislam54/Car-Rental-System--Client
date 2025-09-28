import axios from "axios";
import  { useEffect, useState } from "react";
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
        const res = await axios.get(" https://car-rental-system-server-beta.vercel.app/car");
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
    <div className="mb-10  mt-52 md:mt-40">
      <div className="custom-container py-10">
        <h1 className="text-4xl  font-bold font-rubik text-text  text-center car-heading relative dark:text-white mb-20 ">Drive Your Dream</h1>
        <div  className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {
                cars.map((car)=><CarListingCard key={car._id} car ={car}></CarListingCard>)
            }
        </div>

        <div className="mt-10 text-center">
          <Link to={'available-cars'} className="flex justify-center items-center">
            <Button text={'See More'} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecentListingCar;
