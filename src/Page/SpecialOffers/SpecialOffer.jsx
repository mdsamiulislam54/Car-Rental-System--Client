import { motion } from "framer-motion";
import { FaCarAlt } from "react-icons/fa";
import { Link } from "react-router";
import Button from "../../Components/Button/Button";

const SpecialOffer = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="w-11/12 mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10 px-5">
        {/* Left Content */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2 text-center md:text-left space-y-5"
        >
          <h2 className=" md:text-2xl font-rubik font-bold text-gray-800 leading-tight">
            <span className="">Drive Luxury</span> at Just{" "}
            <span className="text-primary">৳2000/day</span>
          </h2>
          <p className="text-gray-600 text-sm font-rubik">
            Explore the city in style with our premium cars. Book today and get
            an exclusive discount this holiday season!
          </p>
          <div className="flex items-center justify-center md:justify-start gap-4 mt-4">
            <FaCarAlt className="text-3xl text-primary" />
            <p className="text-gray-800 font-medium font-rubik ">
              Unlimited kilometers and full insurance
            </p>
          </div>
          <Link
            to="/available-cars"
            className="max-lg:flex justify-center"
          >
           <Button text={' Book Nowd'}/>
          </Link>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2"
        >
          <img
            src="https://img.freepik.com/free-photo/family-with-little-son-autumn-park-sitting-car_1303-11743.jpg?t=st=1754155361~exp=1754158961~hmac=b2c8d97e5d12544d654ae56712d18cb620dd1c136abd0337d246d62a6fc17ce9&w=1380"
            alt="Special Offer Car"
            className="rounded-2xl shadow-lg w-full object-cover h-[400px]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default SpecialOffer;
