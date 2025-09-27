import { Link } from "react-router";
import { FaCheckCircle } from "react-icons/fa";
import Button from "../../Components/Button/Button";
import { motion } from "framer-motion";
import BookingCar from "../BookingCar/BookingCar";

const Banner = () => {
  return (
    <div
      className="relative h-[90vh] bg-white bg-cover "
      style={{
        backgroundImage: `url("https://img.freepik.com/free-vector/car-led-lights-realistic-composition-with-dark-silhouette-automobile-with-dimmed-headlights-shadows-illustration_1284-28532.jpg?t=st=1758950120~exp=1758953720~hmac=c622a3b5d27b59c0a3309756e397053f8e61ad5daa7cb4e61200444b95a2c83a&w=1480")`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Content */}
      <div className="relative custom-container flex justify-center items-center h-full z-10">
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
      <div className="absolute -bottom-24 left-[50%] translate-x-[-50%] custom-container  ">
        <BookingCar/>
      </div>
    </div>
  );
};

export default Banner;
