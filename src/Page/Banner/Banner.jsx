import { Link } from "react-router";
import { FaCheckCircle } from "react-icons/fa";
import Button from "../../Components/Button/Button";
import { motion } from "framer-motion";
import BookingCar from "../BookingCar/BookingCar";

const Banner = () => {
  return (
    <div
      className="relative sm:h-[60vh] lg:h-[90vh] h-[100vh] bg-white bg-cover "
      style={{
        backgroundImage: `url("https://i.postimg.cc/QCb7vDK8/28531.jpg")`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      {/* Content */}
      <div className="relative custom-container flex justify-center items-center h-full z-10 ">
        <motion.div
          initial={{ opacity: 0, x: -120 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center items-center gap-4 text-white"
        >
          <h4 className="text-md font-semibold font-rubik text-text">
            Plan your trip today
          </h4>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-wider font-rubik text-center">
            Enjoy <span>great</span> savings <br /> on car rentals
          </h1>
          <p className="text-base font-rubik text-gray-200 lg:max-w-md text-center">
            Join us in driving positive change and reaching our sustainability goals—
            together, we can make a difference.
          </p>

          <Link to="/available-cars">
            <Button text="Book Ride Car" icon={FaCheckCircle} />
          </Link>
        </motion.div>
      </div>
      <div className="absolute md:-bottom-16 -bottom-45 left-[50%] translate-x-[-50%] custom-container  ">
        <BookingCar/>
      </div>
    </div>
  );
};

export default Banner;
